import '@/lib/env';
import {
  BuildingStorefrontIcon,
  QrCodeIcon,
  TicketIcon,
} from '@heroicons/react/24/outline';
import Head from 'next/head';
import Link from 'next/link';

import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
import { siteConfig } from '@/constant/config';

export default function HomePage() {
  return (
    <main>
      <Head>
        <title>StampX - Web3 Loyalty Rewards</title>
      </Head>
      <section className='bg-white'>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center py-8 text-center'>
          <QrCodeIcon className='h-16 w-16 text-primary-500' />
          <h1 className='mt-4'>{siteConfig.title}</h1>
          <p className='mt-2 text-md text-gray-800'>{siteConfig.slogan}</p>

          <div className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-2'>
            <Link href='/launch'>
              <div className='rounded-lg border p-4 transition-all hover:border-primary-500 hover:shadow-md cursor-pointer'>
                <BuildingStorefrontIcon className='mx-auto h-8 w-8 text-primary-500' />
                <h3 className='mt-2 text-lg font-bold'>For Businesses</h3>
                <p className='text-sm text-gray-600'>
                  Set up your AI loyalty program and configure custom rewards
                  for your customers
                </p>
              </div>
            </Link>
            <Link href='/about'>
              <div className='rounded-lg border p-4 transition-all hover:border-primary-500 hover:shadow-md cursor-pointer'>
                <TicketIcon className='mx-auto h-8 w-8 text-primary-500' />
                <h3 className='mt-2 text-lg font-bold'>For Customers</h3>
                <p className='text-sm text-gray-600'>
                  Scan, earn, and redeem rewards with smart contract security
                </p>
              </div>
            </Link>
          </div>

          <ButtonLink className='mt-6' href='/launch' variant='light'>
            Launch Store
          </ButtonLink>

          <ArrowLink className='mt-4' href='/about'>
            Learn more about StampX
          </ArrowLink>

          <footer className='absolute bottom-2 text-gray-700'>
            StampX &copy; {new Date().getFullYear()}
          </footer>
        </div>
      </section>
    </main>
  );
}
