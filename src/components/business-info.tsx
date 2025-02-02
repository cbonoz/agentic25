import { BusinessInfo as BusinessInfoType } from '@/lib/types';

interface BusinessInfoProps {
  businessInfo: BusinessInfoType;
}

export function BusinessInfo({ businessInfo }: BusinessInfoProps) {
  return (
    <div className='p-4 bg-white rounded-lg shadow'>
      <h2 className='text-xl font-semibold mb-2'>{businessInfo.name}</h2>
      <div className='text-sm text-gray-600'>
        <p>Reward Threshold: {businessInfo.rewardThreshold} ETH</p>
        <p>Reward Amount: {businessInfo.rewardAmount} ETH</p>
        {businessInfo.isActive ? (
          <p className='text-green-600'>Active</p>
        ) : (
          <p className='text-red-600'>Inactive</p>
        )}
      </div>
    </div>
  );
}
