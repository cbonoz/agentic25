import CheckoutPageContent from '@/components/checkout-page-content';
import { Suspense } from 'react';

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutPageContent />
    </Suspense>
  );
}
