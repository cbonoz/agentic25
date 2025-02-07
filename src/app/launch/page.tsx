'use client';

import { PencilSquareIcon, QrCodeIcon } from '@heroicons/react/24/outline';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { keccak256, toBytes } from 'viem';

import { CreateBusinessPayload } from '@/lib/types';

import { BusinessContextModal } from '@/components/BusinessContextModal';
import { Tooltip } from '@/components/Tooltip';

import { DEMO_FORM_DATA } from '@/constant';
import { siteConfig } from '@/constant/config';
import { StampXAbi } from '@/contracts/StampX';

import { useWallet } from '../contexts/WalletContext';

export default function LaunchPage() {
  const { address, provider } = useWallet();
  const [formData, setFormData] = useState<CreateBusinessPayload>({
    name: '',
    rewardThreshold: '',
    rewardAmount: '',
    paymentAddress: '',
    businessContext: '',
  });

  // Add useEffect to auto-fill payment address
  useEffect(() => {
    if (address) {
      setFormData((prev) => ({
        ...prev,
        paymentAddress: address,
      }));
    }
  }, [address]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isContextModalOpen, setIsContextModalOpen] = useState(false);

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
      setFormData({
        name: '',
        rewardThreshold: '',
        rewardAmount: '',
        paymentAddress: '',
        businessContext: '',
      });
    } catch (err: any) {
      setError(
        err.message || 'An error occurred while registering the business',
      );
    } finally {
      setLoading(false);
    }
  };

  // Update handleChange to handle both input and textarea
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const fillExampleData = () => {
    setFormData({
      name: DEMO_FORM_DATA.name,
      rewardThreshold: DEMO_FORM_DATA.rewardThreshold,
      rewardAmount: DEMO_FORM_DATA.rewardAmount,
      paymentAddress: DEMO_FORM_DATA.paymentAddress,
      businessContext: DEMO_FORM_DATA.businessContext,
    });
  };

  if (!address) {
    return (
      <div className='min-h-screen bg-gray-50 px-4 py-8'>
        <div className='max-w-2xl mx-auto text-center'>
          <p className='text-lg text-gray-600'>
            Please connect your wallet to create a business
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-2xl mx-auto'>
        <div className='text-center mb-8'>
          <QrCodeIcon className='h-16 w-16 text-primary-500 mx-auto mb-2' />

          <h1 className='text-3xl font-bold text-gray-900'>
            {siteConfig.createBusinessHeading}
          </h1>
          <p className='mt-2 text-gray-600'>{siteConfig.businessDescription}</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className='bg-white p-6 rounded-lg shadow-md'
        >
          <div className='space-y-6'>
            <button
              type='button'
              onClick={fillExampleData}
              className='mb-4 text-sm text-primary-600 hover:text-primary-700'
            >
              Fill with Example Data
            </button>

            <div>
              <div className='flex items-center'>
                <label
                  htmlFor='name'
                  className='block text-sm font-medium text-gray-700'
                >
                  Business Name
                </label>
                <Tooltip content={siteConfig.formTooltips.businessName} />
              </div>
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
              <div className='flex justify-between items-center'>
                <div className='flex items-center'>
                  <label
                    htmlFor='businessContext'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Business Context
                  </label>
                  <Tooltip content={siteConfig.formTooltips.businessContext} />
                </div>
                <button
                  type='button'
                  onClick={() => setIsContextModalOpen(true)}
                  className='text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1'
                >
                  <PencilSquareIcon className='h-4 w-4' />
                  Edit
                </button>
              </div>
              <textarea
                name='businessContext'
                id='businessContext'
                required
                rows={6}
                value={formData.businessContext}
                onChange={handleChange}
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500'
                readOnly
                onClick={() => setIsContextModalOpen(true)}
              />
            </div>

            <BusinessContextModal
              isOpen={isContextModalOpen}
              onClose={() => setIsContextModalOpen(false)}
              value={formData.businessContext}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, businessContext: value }))
              }
            />

            <div>
              <div className='flex items-center'>
                <label
                  htmlFor='rewardThreshold'
                  className='block text-sm font-medium text-gray-700'
                >
                  Reward Threshold (ETH)
                </label>
                <Tooltip content={siteConfig.formTooltips.rewardThreshold} />
              </div>
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
              <div className='flex items-center'>
                <label
                  htmlFor='rewardAmount'
                  className='block text-sm font-medium text-gray-700'
                >
                  Reward Amount (ETH)
                </label>
                <Tooltip content={siteConfig.formTooltips.rewardAmount} />
              </div>
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

            <div>
              <div className='flex items-center'>
                <label
                  htmlFor='paymentAddress'
                  className='block text-sm font-medium text-gray-700'
                >
                  Payment Address
                </label>
                <Tooltip content={siteConfig.formTooltips.paymentAddress} />
              </div>
              <input
                type='text'
                name='paymentAddress'
                id='paymentAddress'
                required
                value={formData.paymentAddress}
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
