'use client';

import { OnchainKitProvider } from '@coinbase/onchainkit';
import type { ReactNode } from 'react';

import { siteConfig } from '@/constant/config';

import { WalletProvider } from './contexts/WalletContext';

export function Providers(props: { children: ReactNode }) {
  return (
    <WalletProvider>
      <OnchainKitProvider
        apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
        chain={siteConfig.defaultChain} // add baseSepolia for testing
      >
        {props.children}
      </OnchainKitProvider>
    </WalletProvider>
  );
}
