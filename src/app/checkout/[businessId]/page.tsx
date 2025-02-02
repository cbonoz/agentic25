'use client';

import { Dialog } from '@headlessui/react';
import { useChat } from 'ai/react'; // https://sdk.vercel.ai/docs/getting-started/nextjs-app-router
import { ethers } from 'ethers';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useWallet } from '@/app/contexts/WalletContext';
import { BusinessInfo as BusinessInfoComponent } from '@/components/business-info';
import { siteConfig } from '@/constant/config';
import StampXAbi from '@/contracts/StampX.json';
import { BusinessCommand, BusinessCommands, BusinessInfo } from '@/lib/types';

export default function CheckoutPage() {
  const { businessId } = useParams();
  const { address, provider } = useWallet();
  const [points, setPoints] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [isRewardsOpen, setIsRewardsOpen] = useState(false);
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo | null>(null);

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
    onResponse: (response: any) => {
      // Extract amount from AI response and process transaction
      console.log('AI response:', response);
      const command = extractCommand(response);
      const amount = 0;
      console.log('Extracted command:', command, amount);
      if (amount) {
        handleTransaction(amount);
      }
    },
  });

  const extractCommand = (response: string): BusinessCommand | null => {
    const command = BusinessCommands.find((cmd: any) =>
      response.includes(cmd.command),
    );
    if (!command) return null;

    const amount = response.match(command.regex);
    if (!amount) return null;

    return {
      command: command.command,
      amount: amount[1],
    };
  };

  const handleTransaction = async (amount: string) => {
    if (!address || !provider || !businessId) return;

    try {
      setLoading(true);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        siteConfig.contractAddress,
        StampXAbi as any,
        signer,
      );

      const tx = await contract.recordTransaction(
        businessId, // Use businessId instead of contract address
        address,
        ethers.parseEther(amount),
      );
      await tx.wait();

      alert('Transaction recorded successfully!');
    } catch (error) {
      console.error('Transaction failed:', error);
      alert('Transaction failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const checkRewards = async () => {
    if (!address || !provider || !businessId) return;

    try {
      const contract = new ethers.Contract(
        siteConfig.contractAddress,
        StampXAbi.abi,
        provider,
      );
      const points = await contract.getPoints(businessId, address);
      setPoints(Number(points));
      setIsRewardsOpen(true);
    } catch (error) {
      console.error('Error checking rewards:', error);
    }
  };

  // Add new function to fetch business info
  const fetchBusinessInfo = async () => {
    if (!provider || !businessId) return;

    try {
      const contract = new ethers.Contract(
        siteConfig.contractAddress,
        StampXAbi.abi,
        provider,
      );

      const info = await contract.getBusinessInfo(businessId);
      setBusinessInfo({
        owner: info[0],
        name: info[1],
        rewardThreshold: ethers.formatEther(info[2]),
        rewardAmount: ethers.formatEther(info[3]),
        isActive: info[4],
      });
    } catch (error) {
      console.error('Error fetching business info:', error);
    }
  };

  // Call fetchBusinessInfo when component mounts
  useEffect(() => {
    if (provider && businessId) {
      fetchBusinessInfo();
    }
  }, [provider, businessId]);

  const calculatePointsToNextReward = () => {
    if (!businessInfo || points === null) return null;
    const threshold = Number(businessInfo.rewardThreshold);
    return Math.max(0, threshold - points);
  };

  return (
    <div className='container mx-auto p-6'>
      <div className='grid lg:grid-cols-[400px,1fr] gap-6'>
        <div className='lg:sticky lg:top-6 lg:self-start'>
          {businessInfo && <BusinessInfoComponent businessInfo={businessInfo} />}
        </div>

        <div className='space-y-6'>
          <h1 className='text-2xl font-bold'>Chat Checkout</h1>

          {!address ? (
            <p className='text-red-500'>Please connect your wallet to continue</p>
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

                <form onSubmit={handleSubmit} className='flex gap-2'>
                  <input
                    value={input}
                    onChange={handleInputChange}
                    className='flex-1 rounded-md border border-gray-300 p-2'
                    placeholder='Chat to complete your purchase...'
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

              <Dialog
                open={isRewardsOpen}
                onClose={() => setIsRewardsOpen(false)}
                className='relative z-50'
              >
                <div className='fixed inset-0 bg-black/30' aria-hidden='true' />
                <div className='fixed inset-0 flex items-center justify-center p-4'>
                  <Dialog.Panel className='bg-white rounded-lg p-6 max-w-sm w-full'>
                    <Dialog.Title className='text-lg font-medium'>
                      Your Rewards
                    </Dialog.Title>
                    <div className='mt-4'>
                      {points !== null && (
                        <>
                          <p>Current Points Balance: {points}</p>
                          <p className='mt-2'>
                            Amount needed for next reward:{' '}
                            {calculatePointsToNextReward()}
                          </p>
                        </>
                      )}
                    </div>
                    <button
                      onClick={() => setIsRewardsOpen(false)}
                      className='mt-4 w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700'
                    >
                      Close
                    </button>
                  </Dialog.Panel>
                </div>
              </Dialog>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
