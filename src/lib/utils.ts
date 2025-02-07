import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function abbreviateAddress(address: string, chars = 4): string {
  if (!address) return '';
  return `${address.substring(0, chars)}...${address.substring(address.length - chars)}`;
}

export function getExplorerUrl(address: string): string {
  // Using Base Sepolia explorer - adjust if using different network
  return `https://sepolia.basescan.org/address/${address}`;
}

export function createQrUrl(businessId: string): string {
  return `${window.location.origin}/qr/${businessId}`;
}
export function createCheckoutUrl(businessId: string): string {
  return `${window.location.origin}/checkout/${businessId}`;
}
