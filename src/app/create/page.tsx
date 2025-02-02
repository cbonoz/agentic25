'use client';

import { ethers } from 'ethers';
import { useState } from 'react';
import { keccak256, toBytes } from 'viem';

import { siteConfig } from '@/constant/config';
import { StampXAbi } from '@/contracts/StampX';

import { useWallet } from '../contexts/WalletContext';

export default function CreatePage() {
  const { address, provider } = useWallet();
  const [formData, setFormData] = useState({
    name: '',
    rewardThreshold: '',
    rewardAmount: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address || !provider) {
      setError('Please connect your wallet first');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const businessHash = keccak256(toBytes(`${formData.name}${address}`));

      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        siteConfig.contractAddress,
        StampXAbi as any,
        signer,
      );

      const tx = await contract.registerBusiness(
        businessHash,
        formData.name,
        ethers.parseEther(formData.rewardThreshold),
        ethers.parseEther(formData.rewardAmount),
      );


      await tx.wait();
      // log
      console.log('Business registered successfully!', tx.hash);

      setSuccess(true);
      setFormData({ name: '', rewardThreshold: '', rewardAmount: '' });
    } catch (err: any) {
      setError(
        err.message || 'An error occurred while registering the business',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (!address) {
    return (
      <div className='min-h-screen bg-gray-50 px-4 py-12'>
        <div className='max-w-md mx-auto text-center'>
          <p className='text-lg text-gray-600'>
            Please connect your wallet to create a business
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md mx-auto'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>
            Create Your Business
          </h1>
          <p className='mt-2 text-gray-600'>
            Register your business to start offering loyalty rewards
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className='bg-white p-6 rounded-lg shadow-md'
        >
          <div className='space-y-6'>
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                Business Name
              </label>
              <input
                type='text'
                name='name'
                id='name'
                required
                value={formData.name}
                onChange={handleChange}
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500'
              />
            </div>

            <div>
              <label
                htmlFor='rewardThreshold'
                className='block text-sm font-medium text-gray-700'
              >
                Reward Threshold (ETH)
              </label>
              <input
                type='number'
                step='0.001'
                name='rewardThreshold'
                id='rewardThreshold'
                required
                value={formData.rewardThreshold}
                onChange={handleChange}
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500'
              />
            </div>

            <div>
              <label
                htmlFor='rewardAmount'
                className='block text-sm font-medium text-gray-700'
              >
                Reward Amount (ETH)
              </label>
              <input
                type='number'
                step='0.001'
                name='rewardAmount'
                id='rewardAmount'
                required
                value={formData.rewardAmount}
                onChange={handleChange}
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500'
              />
            </div>

            {error && <div className='text-red-600 text-sm'>{error}</div>}

            {success && (
              <div className='text-green-600 text-sm'>
                Business registered successfully!
              </div>
            )}

            <button
              type='submit'
              disabled={loading}
              className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-400'
            >
              {loading ? 'Registering...' : 'Register Business'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
