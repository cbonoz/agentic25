import { baseSepolia } from 'wagmi/chains';
export const siteConfig = {
  title: 'StampX',
  titleTemplate: '%s | StampX',
  defaultTitle: 'StampX - Web3 Loyalty Rewards',
  defaultChain: baseSepolia,
  description:
    'A Web3 QR code system for loyalty rewards, powered by Coinbase Developer Platform',
  url: 'https://www.github.com/cbonoz/agentic25',
  contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? '0x0',
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
    logo: '/images/stampx-logo.png', // Add this line
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
  },
  slogan: 'AI-Powered Loyalty Rewards for Web3 Business',
  businessDescription:
    'Launch an instant AI checkout assistant that can accept digital payments and track your customer loyalty right at point of sale.',
  createBusinessHeading: 'Your AI Loyalty Assistant',
  formTooltips: {
    businessName: 'The name of your business that customers will see',
    businessContext:
      'Detailed instructions for your AI assistant about your business, menu items, and how to interact with customers',
    rewardThreshold:
      'Minimum number of paying visits required for customers to earn a reward',
    rewardAmount:
      'Discount in USD that customers receive as a reward when reaching the threshold',
    paymentAddress:
      'Ethereum address where you want to receive customer payments',
  },
};
