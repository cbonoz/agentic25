'use client';

import { createCheckoutUrl } from '@/lib/utils';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import QRCode from 'react-qr-code';

export default function QRPage() {
  const { businessId: hash } = useParams();

  if (!hash) {
    return (
      <div className='p-4'>
        Error: No business extension provided in url
        <br />
        Got to: <pre>/qr/[businessId]</pre>
      </div>
    );
  }

  // get window origin from next router
  const checkoutUrl = createCheckoutUrl(hash as string);
  if (!checkoutUrl) {
    return null;
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4'>
      <div className='bg-white p-4 rounded-lg shadow-lg'>
        <QRCode
          value={checkoutUrl}
          size={256}
          style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
          viewBox='0 0 256 256'
        />
      </div>
      <p className='mt-4 text-sm text-gray-600'>Scan to access checkout</p>
    </div>
  );
}
