'use client';

import { useChat } from 'ai/react';
import { ethers } from 'ethers';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useAccount } from 'wagmi';

import { useEthersSigner } from '@/app/contexts/useEthersSigner';
import { BusinessInfo as BusinessInfoComponent } from '@/components/business-info';
import { RewardsDialog } from '@/components/rewards-dialog';
import { SignoutPrompt } from '@/components/signout-prompt';
import { CHAT_API_URL, DEMO_FORM_DATA } from '@/constant';
import { siteConfig } from '@/constant/config';
import StampXAbi from '@/contracts/StampX.json';
import { BusinessInfo } from '@/lib/types';

export default function CheckoutPageContent() {
  const { businessId } = useParams();
  const { address } = useAccount();
  const signer = useEthersSigner({
    chainId: siteConfig.defaultChain.id as any,
  });
  const [points, setPoints] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [isRewardsOpen, setIsRewardsOpen] = useState(false);
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSignoutPrompt, setShowSignoutPrompt] = useState(false);

  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat({
      api: CHAT_API_URL,
      id: businessId as string,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${process.env.NEXT_PUBLIC_CHAT_USER_KEY}`,
      },
      onResponse: async (response) => {
        console.log('response', response);
        const data = await response.json();

        const receivedMessages = data.response || data;
        const newMessages = receivedMessages.map((content: string) => ({
          id: Date.now().toString(),
          role: 'assistant',
          content,
        }));
        setMessages((prevMessages: any) => [...prevMessages, ...newMessages]);
      },
    });

  const handleTransaction = async (amount: string) => {
    if (!address || !signer || !businessId || !businessInfo) return;

    try {
      setLoading(true);
      const contract = new ethers.Contract(
        siteConfig.contractAddress,
        StampXAbi.abi,
        signer,
      );

      const tx = await contract.recordTransaction(
        businessId,
        businessInfo.paymentAddress,
        ethers.parseEther(amount),
      );
      await tx.wait();

      alert('Transaction recorded successfully!');
      setShowSignoutPrompt(true);
    } catch (error) {
      console.error('Transaction failed:', error);
      alert('Transaction failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const checkRewards = async () => {
    if (!address || !signer || !businessId) return;

    try {
      const contract = new ethers.Contract(
        siteConfig.contractAddress,
        StampXAbi.abi,
        signer,
      );
      const points = await contract.getPoints(businessId, address);
      setPoints(Number(points));
      setIsRewardsOpen(true);
    } catch (error) {
      console.error('Error checking rewards:', error);
    }
  };

  const fetchBusinessInfo = async () => {
    if (!signer || !businessId) return;

    try {
      setError(null);
      const contract = new ethers.Contract(
        siteConfig.contractAddress,
        StampXAbi.abi as any,
        signer,
      );

      const info = await contract.getBusinessInfo(businessId);

      if (!info || !info[1]) {
        throw new Error('Invalid business data received');
      }

      setBusinessInfo({
        owner: info[0],
        name: info[1],
        rewardThreshold: ethers.formatEther(info[2]),
        rewardAmount: ethers.formatEther(info[3]),
        isActive: info[4],
        paymentAddress: info[5],
        businessContext: info[6],
      });
    } catch (error: any) {
      console.error('Error fetching business info:', error);
      setBusinessInfo(DEMO_FORM_DATA);
    }
  };

  useEffect(() => {
    if (signer && businessId) {
      fetchBusinessInfo();
    }
  }, [signer, businessId]);

  const calculatePointsToNextReward = () => {
    if (!businessInfo || points === null) return null;
    const threshold = Number(businessInfo.rewardThreshold);
    return Math.max(0, threshold - points);
  };

  return (
    <div className='container mx-auto p-6'>
      {error ? (
        <div className='max-w-lg mx-auto bg-red-50 border-l-4 border-red-500 p-4 rounded-md'>
          <div className='flex items-center gap-3'>
            <FaExclamationTriangle className='text-red-500 w-6 h-6' />
            <div>
              <h3 className='text-lg font-medium text-red-800'>
                Error Loading Business
              </h3>
              <p className='text-red-600'>{error}</p>
              <button
                onClick={() => fetchBusinessInfo()}
                className='mt-2 text-red-700 hover:text-red-800 underline'
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className='grid lg:grid-cols-[400px,1fr] gap-6'>
          <div className='lg:sticky lg:top-6 lg:self-start'>
            {businessInfo && (
              <BusinessInfoComponent
                businessInfo={businessInfo}
                currentPoints={points}
              />
            )}
          </div>

          <div className='space-y-6'>
            {!address ? (
              <p className='text-red-500'>
                Please connect your wallet to continue
              </p>
            ) : (
              <>
                <div className='space-y-4'>
                  <div className='h-[500px] overflow-y-auto border rounded-md p-4 bg-white shadow-sm'>
                    {messages.map((message: any) => (
                      <div
                        key={message.id}
                        className={`mb-2 ${
                          message.role === 'assistant'
                            ? 'text-blue-600'
                            : 'text-gray-800'
                        }`}
                      >
                        <strong>
                          {message.role === 'assistant' ? 'AI: ' : 'You: '}
                        </strong>
                        {message.content}
                      </div>
                    ))}
                  </div>

                  <form
                    onSubmit={(e) =>
                      handleSubmit(e, {
                        body: {
                          businessContext: businessInfo?.businessContext,
                          message: input,
                        },
                      })
                    }
                    className='flex gap-2'
                  >
                    <input
                      value={input}
                      onChange={handleInputChange}
                      className='flex-1 rounded-md border border-gray-300 p-2'
                      placeholder='Chat with AI assistant...'
                    />
                    <button
                      type='submit'
                      disabled={loading}
                      className='bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 disabled:opacity-50'
                    >
                      Send
                    </button>
                  </form>

                  <button
                    onClick={checkRewards}
                    className='w-full border border-primary-600 text-primary-600 py-2 px-4 rounded-md hover:bg-primary-50'
                  >
                    Check Rewards
                  </button>
                </div>

                <RewardsDialog
                  isOpen={isRewardsOpen}
                  onClose={() => setIsRewardsOpen(false)}
                  points={points}
                  pointsToNextReward={calculatePointsToNextReward()}
                />

                <SignoutPrompt
                  isOpen={showSignoutPrompt}
                  onClose={() => setShowSignoutPrompt(false)}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
