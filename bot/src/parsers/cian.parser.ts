import * as cheerio from 'cheerio';
import { BaseParser } from './base.parser';
import type { ParsedListing } from '../types/index';
import { hashListing } from '../utils/hash';

export class CianParser extends BaseParser {
  async parse(url: string): Promise<ParsedListing[]> {
    const html = await this.fetchHtml(url);
    const $ = cheerio.load(html);
    const listings: ParsedListing[] = [];

    // Cian renders JSON in a __NEXT_DATA__ script tag
    const nextDataScript = $('#__NEXT_DATA__').html();
    if (nextDataScript) {
      try {
        const json = JSON.parse(nextDataScript) as Record<string, unknown>;
        const offers = extractCianOffers(json);
        return offers;
      } catch {
        this.safeLog('Failed to parse Cian __NEXT_DATA__');
      }
    }

    // Fallback: HTML scraping
    $('[data-name="Offers"] article, [class*="offer-container"]').each((_, el) => {
      try {
        const $el = $(el);
        const externalId = $el.attr('data-id') ?? null;

        const title = $el.find('[data-name="TitleComponent"], h3').first().text().trim();
        if (!title) return;

        const price = $el.find('[data-name="PriceInfo"]').first().text().trim() || undefined;
        const location = $el
          .find('[data-name="AddressContainer"], [class*="address"]')
          .first()
          .text()
          .trim() || undefined;

        const imageEl = $el.find('img').first();
        const imageUrl = imageEl.attr('src') ?? imageEl.attr('data-src') ?? undefined;

        const linkEl = $el.find('a').first();
        const href = linkEl.attr('href');
        if (!href) return;
        const fullUrl = href.startsWith('http') ? href : `https://cian.ru${href}`;

        listings.push({
          externalId: externalId ?? hashListing(title, price, fullUrl),
          title,
          price,
          location,
          imageUrl,
          url: fullUrl,
        });
      } catch (err) {
        this.safeLog('Failed to parse Cian item', err);
      }
    });

    return listings;
  }
}

interface CianOffer {
  id?: number;
  title?: string;
  fullUrl?: string;
  priceRur?: number;
  address?: string;
  photos?: Array<{ thumbnailUrl?: string }>;
  publishedUsermtime?: string;
}

function extractCianOffers(json: Record<string, unknown>): ParsedListing[] {
  const results: ParsedListing[] = [];
  try {
    const props = json['props'] as Record<string, unknown> | undefined;
    const pageProps = props?.['pageProps'] as Record<string, unknown> | undefined;
    const initialState = pageProps?.['initialState'] as Record<string, unknown> | undefined;
    const offers = (initialState?.['results'] as Record<string, unknown> | undefined)
      ?.['offers'] as CianOffer[] | undefined;

    if (!Array.isArray(offers)) return results;

    for (const offer of offers) {
      if (!offer.title || !offer.fullUrl) continue;
      results.push({
        externalId: offer.id ? String(offer.id) : hashListing(offer.title, String(offer.priceRur ?? ''), offer.fullUrl),
        title: offer.title,
        price: offer.priceRur ? `${offer.priceRur.toLocaleString('ru-RU')} ₽` : undefined,
        location: offer.address,
        imageUrl: offer.photos?.[0]?.thumbnailUrl,
        url: offer.fullUrl,
        publishedAt: offer.publishedUsermtime ? new Date(offer.publishedUsermtime) : undefined,
      });
    }
  } catch {
    /* ignore */
  }
  return results;
}
