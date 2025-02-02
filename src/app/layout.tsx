import { Metadata } from 'next';
import * as React from 'react';

import '@/styles/colors.css';
import '@/styles/globals.css';
import '@coinbase/onchainkit/styles.css';

import { siteConfig } from '@/constant/config';

import NavBar from './components/nav-bar';
import { Providers } from './providers';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.defaultTitle,
    template: siteConfig.titleTemplate,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
  icons: siteConfig.icons,
  manifest: siteConfig.manifest,
  openGraph: {
    ...siteConfig.openGraph,
    url: siteConfig.url,
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/og.jpg`],
  },
  twitter: {
    ...siteConfig.twitter,
    images: [`${siteConfig.url}/images/og.jpg`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='bg-gray-50'>
        <Providers>
          <NavBar />
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4'>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
