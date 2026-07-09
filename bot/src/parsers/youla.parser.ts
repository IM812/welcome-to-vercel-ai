import * as cheerio from 'cheerio';
import { BaseParser } from './base.parser';
import type { ParsedListing } from '../types/index';
import { hashListing } from '../utils/hash';

export class YoulaParser extends BaseParser {
  async parse(url: string): Promise<ParsedListing[]> {
    const html = await this.fetchHtml(url);
    const $ = cheerio.load(html);
    const listings: ParsedListing[] = [];

    // Try GraphQL state embedded in page
    const stateScript = $('script').filter((_, el) => {
      return $(el).html()?.includes('__YOULA_STATE__') ?? false;
    }).first().html();

    if (stateScript) {
      try {
        const match = stateScript.match(/window\.__YOULA_STATE__\s*=\s*({.+?});?\s*<\/script>/s);
        if (match?.[1]) {
          const parsed = JSON.parse(match[1]) as Record<string, unknown>;
          const items = extractYoulaItems(parsed);
          if (items.length > 0) return items;
        }
      } catch {
        this.safeLog('Failed to parse Youla state JSON');
      }
    }

    // Fallback HTML scraping
    $('[class*="ProductCard"], [class*="product-card"], article').each((_, el) => {
      try {
        const $el = $(el);
        const linkEl = $el.find('a[href*="/product/"]').first();
        const href = linkEl.attr('href');
        if (!href) return;
        const fullUrl = href.startsWith('http') ? href : `https://youla.ru${href}`;

        const idMatch = href.match(/\/product\/([a-f0-9]+)/i);
        const externalId = idMatch?.[1] ?? null;

        const title = $el.find('[class*="title"], [class*="name"], h3').first().text().trim();
        if (!title) return;

        const price = $el.find('[class*="price"]').first().text().trim() || undefined;
        const location = $el.find('[class*="location"], [class*="city"]').first().text().trim() || undefined;
        const imageEl = $el.find('img').first();
        const imageUrl = imageEl.attr('src') ?? imageEl.attr('data-src') ?? undefined;

        listings.push({
          externalId: externalId ?? hashListing(title, price, fullUrl),
          title,
          price,
          location,
          imageUrl,
          url: fullUrl,
        });
      } catch (err) {
        this.safeLog('Failed to parse Youla item', err);
      }
    });

    return listings;
  }
}

interface YoulaProduct {
  id?: string;
  name?: string;
  price?: number;
  city?: { name?: string };
  images?: Array<{ url?: string }>;
  url?: string;
  dateCreated?: string;
}

function extractYoulaItems(state: Record<string, unknown>): ParsedListing[] {
  const results: ParsedListing[] = [];
  try {
    const products = findDeepArray<YoulaProduct>(state, 'products');
    for (const p of products) {
      if (!p.name) continue;
      const url = p.url ? (p.url.startsWith('http') ? p.url : `https://youla.ru${p.url}`) : '';
      if (!url) continue;
      results.push({
        externalId: p.id ?? hashListing(p.name, String(p.price ?? ''), url),
        title: p.name,
        price: p.price ? `${p.price.toLocaleString('ru-RU')} ₽` : undefined,
        location: p.city?.name,
        imageUrl: p.images?.[0]?.url,
        url,
        publishedAt: p.dateCreated ? new Date(p.dateCreated) : undefined,
      });
    }
  } catch {
    /* ignore */
  }
  return results;
}

function findDeepArray<T>(obj: Record<string, unknown>, key: string): T[] {
  if (Array.isArray(obj[key])) return obj[key] as T[];
  for (const val of Object.values(obj)) {
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      const found = findDeepArray<T>(val as Record<string, unknown>, key);
      if (found.length > 0) return found;
    }
  }
  return [];
}
