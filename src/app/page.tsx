'use client';

import Head from 'next/head';
import * as React from 'react';
import '@/lib/env';

import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import { QrCodeIcon, TicketIcon, BuildingStorefrontIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { siteConfig } from '@/constant/config';

export default function HomePage() {
  return (
    <main>
      <Head>
        <title>StampX - Web3 Loyalty Rewards</title>
      </Head>
      <section className='bg-white'>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
          <QrCodeIcon className='h-16 w-16 text-primary-500' />
          <h1 className='mt-4'>StampX</h1>
          <p className='mt-2 text-sm text-gray-800'>
            A Web3 QR code system for loyalty rewards, powered by Coinbase Developer Platform
          </p>

          <div className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div className='rounded-lg border p-4'>
              <BuildingStorefrontIcon className='mx-auto h-8 w-8 text-primary-500' />
              <h3 className='mt-2 text-lg font-bold'>For Businesses</h3>
              <p className='text-sm text-gray-600'>Set up QR codes and configure custom rewards for your customers</p>
            </div>
            <div className='rounded-lg border p-4'>
              <TicketIcon className='mx-auto h-8 w-8 text-primary-500' />
              <h3 className='mt-2 text-lg font-bold'>For Customers</h3>
              <p className='text-sm text-gray-600'>Scan, earn, and redeem rewards with smart contract security</p>
            </div>
          </div>

          <ButtonLink className='mt-6' href='/dashboard' variant='light'>
            Launch App
          </ButtonLink>

          <ArrowLink className='mt-4' href='/about'>
            Learn more about StampX
          </ArrowLink>

          <footer className='absolute bottom-2 text-gray-700'>
            StampX &copy; {new Date().getFullYear()} - Built during ETHDenver 2024
          </footer>
        </div>
      </section>
    </main>
  );
}
