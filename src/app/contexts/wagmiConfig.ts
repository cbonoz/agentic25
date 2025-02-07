import { siteConfig } from '@/constant/config';
import { coinbaseWallet } from '@wagmi/connectors';
import { baseSepolia } from 'viem/chains';
import { createConfig, http } from 'wagmi';

export const coinbaseConnector = coinbaseWallet({
  appName: siteConfig.title,
});

export const config = createConfig({
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(),
  },
  connectors: [coinbaseConnector],
});
