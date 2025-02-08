import CheckoutPageContent from '@/components/checkout-page-content';

export async function generateStaticParams() {
  // Fetch the list of business IDs from your data source
  const businessIds: Array<string> = [];

  return businessIds.map((id: string) => ({
    businessId: id,
  }));
}

export default function CheckoutPage() {
  return <CheckoutPageContent />;
}
