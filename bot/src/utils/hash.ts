import { createHash } from 'crypto';

export function hashListing(title: string, price: string | undefined, url: string): string {
  const raw = `${title}|${price ?? ''}|${url}`;
  return createHash('sha256').update(raw).digest('hex').slice(0, 32);
}
