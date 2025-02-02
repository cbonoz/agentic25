import { baseSepolia } from 'wagmi/chains';
export const siteConfig = {
  title: 'StampX',
  titleTemplate: '%s | StampX',
  defaultTitle: 'StampX - Web3 Loyalty Rewards',
  defaultChain: baseSepolia,
  description: 'A Web3 QR code system for loyalty rewards, powered by Coinbase Developer Platform',
  url: 'https://www.github.com/cbonoz/agentic25',
  contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? '0x0',
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: '/favicon/site.webmanifest',
  twitter: {
    card: 'summary_large_image',
    title: 'StampX',
    description: 'Web3 Loyalty Rewards Platform',
  },
  openGraph: {
    siteName: 'StampX',
    locale: 'en_US',
    type: 'website',
  }
};
