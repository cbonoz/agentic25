import { Metadata } from 'next';
import * as React from 'react';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import { siteConfig } from '@/constant/config';
import NavBar from './components/nav-bar';

// !STARTERCONF Change these default meta
// !STARTERCONF Look at @/constant/config to change them
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'StampX - Web3 Loyalty Rewards',
    template: `%s | StampX`,
  },
  description: 'A Web3 QR code system for loyalty rewards, powered by Coinbase Developer Platform',
  robots: { index: true, follow: true },
  // !STARTERCONF this is the default favicon, you can generate your own from https://realfavicongenerator.net/
  // ! copy to /favicon folder
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: `/favicon/site.webmanifest`,
  openGraph: {
    url: siteConfig.url,
    title: 'StampX - Web3 Loyalty Rewards',
    description: 'A Web3 QR code system for loyalty rewards, powered by Coinbase Developer Platform',
    siteName: 'StampX',
    images: [`${siteConfig.url}/images/og.jpg`],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StampX',
    description: 'Web3 Loyalty Rewards Platform',
    images: [`${siteConfig.url}/images/og.jpg`],
  },
  // authors: [
  //   {
  //     name: 'Theodorus Clarence',
  //     url: 'https://theodorusclarence.com',
  //   },
  // ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="bg-gray-50">
        <NavBar />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          {children}
        </div>
      </body>
    </html>
  );
}
