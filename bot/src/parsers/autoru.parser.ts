import * as cheerio from 'cheerio';
import { BaseParser } from './base.parser';
import type { ParsedListing } from '../types/index';
import { hashListing } from '../utils/hash';

export class AutoRuParser extends BaseParser {
  async parse(url: string): Promise<ParsedListing[]> {
    const html = await this.fetchHtml(url);
    const $ = cheerio.load(html);
    const listings: ParsedListing[] = [];

    // Auto.ru embeds offer data in window.__INITIAL_STATE__
    $('script').each((_, el) => {
      const content = $(el).html() ?? '';
      if (!content.includes('__INITIAL_STATE__')) return;
      const match = content.match(/window\.__INITIAL_STATE__\s*=\s*({[\s\S]+?});?\s*(?:window\.|<\/script>)/);
      if (!match?.[1]) return;
      try {
        const state = JSON.parse(match[1]) as Record<string, unknown>;
        const items = extractAutoRuListings(state);
        listings.push(...items);
      } catch {
        /* ignore parse errors */
      }
    });

    if (listings.length > 0) return listings;

    // Fallback HTML scraping
    $('[class*="ListingItem"], [class*="listing-item"]').each((_, el) => {
      try {
        const $el = $(el);
        const linkEl = $el.find('a[href*="auto.ru"]').first();
        const href = linkEl.attr('href');
        if (!href) return;
        const fullUrl = href.startsWith('http') ? href : `https://auto.ru${href}`;

        const idMatch = href.match(/\/(\d+)-/);
        const externalId = idMatch?.[1] ?? null;

        const title = $el.find('[class*="title"], [class*="name"], h3').first().text().trim();
        if (!title) return;

        const price = $el.find('[class*="price"]').first().text().trim() || undefined;
        const location = $el.find('[class*="location"]').first().text().trim() || undefined;
        const imageEl = $el.find('img').first();
        const imageUrl = imageEl.attr('src') ?? imageEl.attr('data-src') ?? undefined;

        listings.push({
          externalId: externalId ?? hashListing(title, price, fullUrl),
          title,
          price,
          location,
          imageUrl: imageUrl && !imageUrl.includes('placeholder') ? imageUrl : undefined,
          url: fullUrl,
        });
      } catch (err) {
        this.safeLog('Failed to parse Auto.ru item', err);
      }
    });

    return listings;
  }
}

interface AutoRuOffer {
  id?: string;
  vehicle_info?: {
    mark_info?: { name?: string };
    model_info?: { name?: string };
    tech_param?: { year?: number };
  };
  price_info?: { price?: number };
  seller?: { location?: { region_info?: { name?: string } } };
  main_photo?: { sizes?: Record<string, string> };
  url?: string;
  created?: number;
}

function extractAutoRuListings(state: Record<string, unknown>): ParsedListing[] {
  const results: ParsedListing[] = [];
  try {
    const listing = (state['listing'] ?? state['search']) as Record<string, unknown> | undefined;
    const listingData = (listing?.['data'] as Record<string, unknown> | undefined);
    const offers = (listingData?.['offers'] ?? listing?.['offers']) as AutoRuOffer[] | undefined;

    if (!Array.isArray(offers)) return results;

    for (const offer of offers) {
      const mark = offer.vehicle_info?.mark_info?.name ?? '';
      const model = offer.vehicle_info?.model_info?.name ?? '';
      const year = offer.vehicle_info?.tech_param?.year;
      const title = [mark, model, year ? String(year) : ''].filter(Boolean).join(' ');
      if (!title) continue;

      const price = offer.price_info?.price
        ? `${offer.price_info.price.toLocaleString('ru-RU')} ₽`
        : undefined;
      const location = offer.seller?.location?.region_info?.name;
      const photo = offer.main_photo?.sizes?.['460x345'] ?? offer.main_photo?.sizes?.['small'];
      const url = offer.url ?? '';
      const publishedAt = offer.created ? new Date(offer.created * 1000) : undefined;

      results.push({
        externalId: offer.id ?? hashListing(title, price, url),
        title,
        price,
        location,
        imageUrl: photo,
        url,
        publishedAt,
      });
    }
  } catch {
    /* ignore */
  }
  return results;
}
