'use client';

import { useSearchParams } from 'next/navigation';
import QRCode from 'react-qr-code';

export default function QRPage() {
  const searchParams = useSearchParams();
  const hash = searchParams.get('hash');

  if (!hash) {
    return <div className="p-4">Error: No hash provided</div>;
  }

  const checkoutUrl = `${window.location.origin}/checkout/${hash}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <QRCode
          value={checkoutUrl}
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          viewBox={`0 0 256 256`}
        />
      </div>
      <p className="mt-4 text-sm text-gray-600">Scan to access checkout</p>
    </div>
  );
}



