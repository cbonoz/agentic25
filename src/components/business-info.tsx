import { AddressLink } from '@/components/ui/address-link';
import { BusinessInfo as BusinessInfoType } from '@/lib/types';
import { motion } from 'framer-motion';
import { FaCoins, FaStore } from 'react-icons/fa';

interface BusinessInfoProps {
  businessInfo: BusinessInfoType;
  currentPoints: any;
}

export function BusinessInfo({
  businessInfo,
  currentPoints,
}: BusinessInfoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className='bg-gradient-to-br from-primary-500/10 to-primary-600/5 rounded-2xl p-6 shadow-lg border border-primary-200'
    >
      <div className='flex items-center gap-3 mb-4'>
        <div className='p-3 bg-primary-100 rounded-full'>
          <FaStore className='w-6 h-6 text-primary-600' />
        </div>
        <div>
          <h2 className='text-2xl font-bold text-gray-800'>
            {businessInfo.name}
          </h2>
          <p className='text-sm text-gray-500'>
            Owner: <AddressLink address={businessInfo.owner} />
          </p>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-4 mt-4'>
        <div className='bg-white p-4 rounded-xl shadow-sm'>
          <div className='flex items-center gap-2 mb-2'>
            <FaCoins className='text-amber-500' />
            <span className='text-sm font-semibold text-gray-600'>
              Reward Threshold
            </span>
          </div>
          <p className='text-2xl font-bold text-gray-800'>
            {businessInfo.rewardThreshold}
          </p>
        </div>

        <div className='bg-white p-4 rounded-xl shadow-sm'>
          <div className='flex items-center gap-2 mb-2'>
            <FaCoins className='text-amber-500' />
            <span className='text-sm font-semibold text-gray-600'>
              Your Progress
            </span>
          </div>
          <p className='text-2xl font-bold text-gray-800'>
            {currentPoints ?? '0'}
          </p>
        </div>
      </div>

      <div className='mt-4 space-y-4'>
        <div className='flex justify-between items-center'>
          <span className='text-sm font-medium text-gray-600'>Status</span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              businessInfo.isActive
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {businessInfo.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>

        <div className='flex justify-between items-center'>
          <span className='text-sm font-medium text-gray-600'>
            Cash back at reward
          </span>
          <span className='text-lg font-bold text-primary-600'>
            {businessInfo.rewardAmount}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
