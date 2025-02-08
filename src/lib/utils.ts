import { siteConfig } from '@/constant/config';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function abbreviateAddress(address: string, chars = 4): string {
  if (!address) return '';
  return `${address.substring(0, chars)}...${address.substring(address.length - chars)}`;
}

export function getExplorerUrl(address: string, tx?: boolean): string {
  // Using Base Sepolia explorer - adjust if using different network
  const txString = tx ? 'tx' : 'address';
  const baseUrl = siteConfig.defaultChain.blockExplorers.default.url;
  return `${baseUrl}/${txString}/${address}`;
}

const getBaseUrl = (baseUrl?: string | undefined) =>
  baseUrl ||
  window?.location?.origin ||
  process.env.NEXT_PUBLIC_APP_URL ||
  'https://stampx.vercel.app';

export function createQrUrl(
  businessId: string | undefined,
  baseUrl?: string,
): string {
  return `${getBaseUrl(baseUrl)}/qr/${businessId || ''}`;
}
export function createCheckoutUrl(
  businessId: string | undefined,
  baseUrl?: string,
): string {
  return `${getBaseUrl(baseUrl)}/checkout/${businessId || ''}`;
}

export const isEmpty = (value: any): boolean => {
  return !value || (Array.isArray(value) && value.length === 0);
};
