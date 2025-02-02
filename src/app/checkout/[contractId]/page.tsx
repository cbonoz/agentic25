'use client';

import { Dialog } from '@headlessui/react';
import { useChat } from 'ai/react'; // https://sdk.vercel.ai/docs/getting-started/nextjs-app-router
import { ethers } from 'ethers';
import { useState } from 'react';

import { useWallet } from '@/app/contexts/WalletContext';
import { siteConfig } from '@/constant/config';
import StampXAbi from '@/contracts/StampX.json';

export default function CheckoutPage() {
  const { address, provider } = useWallet();
  const [points, setPoints] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [isRewardsOpen, setIsRewardsOpen] = useState(false);

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
    onResponse: (response: any) => {
      // Extract amount from AI response and process transaction
      const amount = extractAmountFromResponse(response);
      if (amount) {
        handleTransaction(amount);
      }
    },
  });

  const extractAmountFromResponse = (response: string) => {
    // Simple regex to extract numerical amount
    const match = response.match(/\$?(\d+(\.\d{1,2})?)/);
    return match ? match[1] : null;
  };

  const handleTransaction = async (amount: string) => {
    if (!address || !provider) return;

    try {
      setLoading(true);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        siteConfig.contractAddress,
        StampXAbi as any,
        signer
      );

      const tx = await contract.recordTransaction(
        siteConfig.contractAddress,
        address,
        ethers.parseEther(amount)
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
    if (!address || !provider) return;

    try {
      const contract = new ethers.Contract(
        siteConfig.contractAddress,
        StampXAbi as any,
        provider
      );
      const points = await contract.getPoints(siteConfig.contractAddress, address);
      setPoints(Number(points));
      setIsRewardsOpen(true);
    } catch (error) {
      console.error('Error checking rewards:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-6">Chat Checkout</h1>

      {!address ? (
        <p className="text-red-500">Please connect your wallet to continue</p>
      ) : (
        <>
          <div className="space-y-4">
            <div className="h-[400px] overflow-y-auto border rounded-md p-4">
              {messages.map((message: any) => (
                <div
                  key={message.id}
                  className={`mb-2 ${
                    message.role === 'assistant' ? 'text-blue-600' : 'text-gray-800'
                  }`}
                >
                  <strong>{message.role === 'assistant' ? 'AI: ' : 'You: '}</strong>
                  {message.content}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                value={input}
                onChange={handleInputChange}
                className="flex-1 rounded-md border border-gray-300 p-2"
                placeholder="Chat to complete your purchase..."
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 disabled:opacity-50"
              >
                Send
              </button>
            </form>

            <button
              onClick={checkRewards}
              className="w-full border border-primary-600 text-primary-600 py-2 px-4 rounded-md hover:bg-primary-50"
            >
              Check Rewards
            </button>
          </div>

          <Dialog
            open={isRewardsOpen}
            onClose={() => setIsRewardsOpen(false)}
            className="relative z-50"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="bg-white rounded-lg p-6 max-w-sm w-full">
                <Dialog.Title className="text-lg font-medium">Your Rewards</Dialog.Title>
                <div className="mt-4">
                  {points !== null && (
                    <p>Current Points Balance: {points}</p>
                  )}
                </div>
                <button
                  onClick={() => setIsRewardsOpen(false)}
                  className="mt-4 w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700"
                >
                  Close
                </button>
              </Dialog.Panel>
            </div>
          </Dialog>
        </>
      )}
    </div>
  );
}
