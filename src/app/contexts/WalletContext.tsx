'use client';

import {
  createCoinbaseWalletSDK,
  ProviderInterface,
} from '@coinbase/wallet-sdk';
import { BrowserProvider, ethers } from 'ethers';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { siteConfig } from '@/constant/config';

interface WalletContextType {
  address: string | null;
  provider: BrowserProvider | null;
  connectWallet: () => Promise<void>;
  signOut: () => void;
}

const WalletContext = createContext<WalletContextType>({
  address: null,
  provider: null,
  connectWallet: async () => {
    console.warn('connectWallet method not implemented');
  },
  signOut: () => {
    console.warn('signOut method not implemented');
  },
});

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [coinbaseWallet, setCoinbaseWallet] = useState<any>(null);

  useEffect(() => {
    // Initialize Coinbase Wallet SDK
    const coinbaseWallet = createCoinbaseWalletSDK({
      appName: siteConfig.title,
      appChainIds: [siteConfig.defaultChain.id],
    });

    setCoinbaseWallet(coinbaseWallet);
  }, []);

  useEffect(() => {
    if (coinbaseWallet) {
      connectWallet();
    }
  }, [coinbaseWallet]);

  const connectWallet = async () => {
    if (!coinbaseWallet) {
      console.error('Coinbase Wallet SDK not initialized');
      return;
    }

    try {
      // Initialize the Coinbase Wallet ethereum provider
      const ethereumProvider = new ethers.BrowserProvider(
        coinbaseWallet.getProvider(),
      );
      // Get user accounts
      const accounts = await ethereumProvider.send('eth_requestAccounts', []);

      if (accounts.length > 0) {
        setAddress(accounts[0]);
        setProvider(ethereumProvider);
      }
    } catch (err) {
      console.error('Error connecting to Coinbase Wallet:', err);
    }
  };

  const signOut = async () => {
    if (!coinbaseWallet) {
      console.error('Coinbase Wallet SDK not initialized');
      return;
    }

    try {
      setAddress(null);
      setProvider(null);
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  return (
    <WalletContext.Provider
      value={{ address, provider, connectWallet, signOut }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => useContext(WalletContext);
