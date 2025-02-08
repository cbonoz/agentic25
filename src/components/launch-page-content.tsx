'use client';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { useEthersSigner } from '@/app/contexts/useEthersSigner';
import { siteConfig } from '@/constant/config';
import StampXAbi from '@/contracts/StampX.json';

export default function LaunchPageContent() {
  const { address } = useAccount();
  const signer = useEthersSigner({
    chainId: siteConfig.defaultChain.id as any,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLaunch = async () => {
    if (!address || !signer) return;

    try {
      setLoading(true);
      const contract = new ethers.Contract(
        siteConfig.contractAddress,
        StampXAbi.abi,
        signer,
      );

      const tx = await contract.launchBusiness();
      await tx.wait();

      alert('Business launched successfully!');
    } catch (error) {
      console.error('Launch failed:', error);
      alert('Launch failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!address) {
      setError('Please connect your wallet to continue');
    } else {
      setError(null);
    }
  }, [address]);

  return (
    <div className='container mx-auto p-6'>
      {error ? (
        <div className='max-w-lg mx-auto bg-red-50 border-l-4 border-red-500 p-4 rounded-md'>
          <div className='flex items-center gap-3'>
            <div>
              <h3 className='text-lg font-medium text-red-800'>
                Error
              </h3>
              <p className='text-red-600'>{error}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className='space-y-6'>
          <button
            onClick={handleLaunch}
            disabled={loading}
            className='bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 disabled:opacity-50'
          >
            Launch Business
          </button>
        </div>
      )}
    </div>
  );
}
