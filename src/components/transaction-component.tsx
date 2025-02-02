import { Avatar, Name } from '@coinbase/onchainkit/identity';
import type { LifecycleStatus } from '@coinbase/onchainkit/transaction';
import {
  Transaction,
  TransactionButton,
  TransactionSponsor,
  TransactionStatus,
  TransactionStatusAction,
  TransactionStatusLabel,
} from '@coinbase/onchainkit'
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { useCallback } from 'react';
import { useAccount } from 'wagmi';

import { siteConfig } from '@/constant/config';

export default function TransactionComponents() {
  const { address } = useAccount();

  const handleOnStatus = useCallback((status: LifecycleStatus) => {
    console.log('LifecycleStatus', status);
  }, []);

  return address ? (
    <Transaction
      chainId={siteConfig.defaultChain.id}
      calls={calls}
      onStatus={handleOnStatus}
    >
      <TransactionButton />
      <TransactionSponsor />
      <TransactionStatus>
        <TransactionStatusLabel />
        <TransactionStatusAction />
      </TransactionStatus>
    </Transaction>
  ) : (
    <Wallet>
      <ConnectWallet>
        <Avatar className='h-6 w-6' />
        <Name />
      </ConnectWallet>
    </Wallet>
  );
}
