'use client';

import { createCoinbaseWalletSDK } from '@coinbase/wallet-sdk';
import { ethers } from 'ethers';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { siteConfig } from '@/constant/config';

interface WalletContextType {
  address: string | null;
  provider: ethers.BrowserProvider | null;
  connectWallet: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | null>(null);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);

  const initializeWallet = async () => {
    const sdk = createCoinbaseWalletSDK({
      appName: siteConfig  .title,
      appChainIds: [siteConfig.defaultChain.id]

    });

    const web3Provider = sdk.getProvider();
    const ethersProvider = new ethers.BrowserProvider(web3Provider);
    setProvider(ethersProvider);
    return { web3Provider, ethersProvider };
  };

  const connectWallet = async () => {
    try {
      const { web3Provider, ethersProvider } = await initializeWallet();
      const accounts = await web3Provider.request({ method: "eth_requestAccounts" }) as any
      setAddress(accounts[0]);
      setProvider(ethersProvider);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  useEffect(() => {
    if (provider) {
      provider.on('accountsChanged', (accounts: string[]) => {
        setAddress(accounts[0] || null);
      });
    }
    return () => {
      if (provider && provider.removeListener) {
        provider.removeListener('accountsChanged', () => {
          console.log('Removed account changed listener');
        });
      }
    };
  }, [provider]);

  return (
    <WalletContext.Provider value={{ address, provider, connectWallet }}>
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
