'use client';

import { OnchainKitProvider } from '@coinbase/onchainkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiConfig, WagmiProvider } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';

import NavBar from './components/nav-bar';
import { config } from './contexts/wagmiConfig';

const queryClient = new QueryClient();

export function Providers({
  children,
  initialState,
}: {
  children: React.ReactNode;
  initialState: any;
}) {
  return (
    <WagmiConfig config={config}>
      <WagmiProvider config={config} initialState={initialState}>
        <QueryClientProvider client={queryClient}>
          <OnchainKitProvider
            apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
            chain={baseSepolia as any} // add baseSepolia for testing
          >
            <NavBar />
            {/* <WalletProvider> */}
            {children}
          </OnchainKitProvider>
          {/* </WalletProvider> */}
        </QueryClientProvider>
      </WagmiProvider>
    </WagmiConfig>
  );
}
