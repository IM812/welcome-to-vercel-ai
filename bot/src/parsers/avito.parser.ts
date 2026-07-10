import * as cheerio from 'cheerio';
import { BaseParser } from './base.parser';
import type { ParsedListing } from '../types/index';
import { hashListing } from '../utils/hash';
import { logger } from '../utils/logger';
import { fetchWithCurlCffi } from './base.parser';

/**
 * How many listings to collect from a category/search page per check.
 * Override via AVITO_MAX_LISTINGS_PER_CHECK env var.
 */
const MAX_LISTINGS = Number(process.env.AVITO_MAX_LISTINGS_PER_CHECK ?? 30);

/**
 * Force sort-by-date on any Avito search URL.
 * s=104 = "по дате" (newest first). Without this Avito returns relevance-
 * sorted results where freshly posted items are buried under promoted/old
 * listings — causing the parser to find nothing newer than 1 час назад.
 */
function withDateSort(rawUrl: string): string {
  try {
    const u = new URL(rawUrl);
    u.searchParams.set('s', '104');
    return u.toString();
  } catch {
    // If the URL is malformed just use it as-is.
    return rawUrl;
  }
}

export class AvitoParser extends BaseParser {
  /**
   * Main entry point used by SearchService.
   *
   * Phase 1 — scrape the category/search page and collect up to MAX_LISTINGS
   * candidate items (externalId, title, price, url, imageUrl).
   * rawPublishedAt is intentionally left undefined here — it will be filled
   * by fetchListingDate() in the service, but ONLY for new externalIds that
   * are not yet in the database (to avoid unnecessary HTTP requests).
   */
  async parse(url: string): Promise<ParsedListing[]> {
    const html = await this.fetchHtml(withDateSort(url));
    const $ = cheerio.load(html);
    const listings: ParsedListing[] = [];

    $('[data-marker="item"]').each((_, el) => {
      if (listings.length >= MAX_LISTINGS) return; // stop iterating

      try {
        const $el = $(el);

        const externalId =
          $el.attr('data-item-id') ??
          $el.find('[data-item-id]').first().attr('data-item-id') ??
          null;

        const titleEl = $el.find('[itemprop="name"], [data-marker="item-title"]').first();
        const title = titleEl.text().trim();
        if (!title) return;

        const priceEl = $el.find('[data-marker="item-price"] meta[itemprop="price"]');
        const price = priceEl.attr('content')
          ? `${priceEl.attr('content')} ₽`
          : $el.find('[data-marker="item-price"]').first().text().trim() || undefined;

        const locationEl = $el
          .find('[data-marker="item-address"] span, [class*="geo-address"]')
          .first();
        const location = locationEl.text().trim() || undefined;

        const imageEl = $el.find('img[itemprop="image"], img[data-src]').first();
        const imageUrl =
          imageEl.attr('src') ??
          imageEl.attr('data-src') ??
          undefined;

        const linkEl = $el.find('a[itemprop="url"], a[data-marker="item-title"]').first();
        const href = linkEl.attr('href');
        if (!href) return;
        const fullUrl = href.startsWith('http') ? href : `https://www.avito.ru${href}`;

        // Extract the date DIRECTLY from the search-result card — no extra
        // HTTP request. Prefer an ISO datetime attribute, then relative text
        // ("N минут назад" / "3 июля в 23:26"). Only if the card has no date
        // does SearchService fall back to fetchListingDate() (detail page).
        const dateEl = $el.find('[data-marker="item-date"]').first();
        const dateIso =
          dateEl.attr('datetime') ??
          dateEl.attr('data-time') ??
          dateEl.find('time').attr('datetime') ??
          $el.find('time').attr('datetime');
        const dateText = dateEl.text().trim() || $el.find('time').text().trim();
        const rawPublishedAt: string | undefined =
          (dateIso ?? dateText)?.trim() || undefined;

        const finalExternalId = externalId ?? hashListing(title, price, fullUrl);

        // Seller info (best-effort): profile link is the stable key for
        // per-user seller blocking; name is for display.
        const sellerLinkEl = $el
          .find('a[href*="/user/"], a[href*="/brands/"], a[data-marker*="seller"]')
          .first();
        const sellerHref = sellerLinkEl.attr('href');
        const sellerUrl = sellerHref
          ? (sellerHref.startsWith('http') ? sellerHref : `https://www.avito.ru${sellerHref}`).split('?')[0]
          : undefined;
        const sellerName =
          sellerLinkEl.text().trim() ||
          $el.find('[class*="sellerInfo"] p, [data-marker="item-line"] [class*="title"]').first().text().trim() ||
          undefined;

        listings.push({
          externalId: finalExternalId,
          title,
          price,
          location,
          imageUrl: imageUrl && !imageUrl.includes('data:') ? imageUrl : undefined,
          url: fullUrl,
          // From the card when available; SearchService fetches the detail page
          // only when this is undefined (minimises requests & 403 risk).
          rawPublishedAt,
          sellerName,
          sellerUrl,
        });
      } catch (err) {
        this.safeLog('Failed to parse Avito category item', err);
      }
    });

    logger.debug(`[avito-category] found=${listings.length}`);
    return listings;
  }

  /**
   * Phase 2 — open a single listing detail page and extract the raw
   * publication date from the meta line:
   *   "№ 8132962928 · 3 июля в 23:26 · 10093 просмотра"
   *
   * Returns the raw date string (e.g. "3 июля в 23:26") or null if it
   * cannot be found.
   *
   * Called by SearchService only for externalIds that are NOT yet in the DB.
   */
  async fetchListingDate(itemUrl: string): Promise<string | null> {
    try {
      const html = await fetchWithCurlCffi(itemUrl);
      const $ = cheerio.load(html);

      // Avito detail page: look for the meta info line that contains the
      // listing number, publication date and view count.
      // Common selectors across Avito layouts:
      const candidateSelectors = [
        '[data-marker="item-view/item-params"] span',
        '[data-marker="item-view/item-params"]',
        '.item-params span',
        '.styles-module-params_list span',
        // JSON-LD fallback
      ];

      for (const sel of candidateSelectors) {
        const text = $(sel).text();
        const raw = extractDateFromMetaLine(text);
        if (raw) return raw;
      }

      // Walk all text nodes looking for the "· DD месяц в HH:MM ·" pattern
      let found: string | null = null;
      $('*').each((_, el) => {
        if (found) return;
        const text = $(el).text();
        const raw = extractDateFromMetaLine(text);
        if (raw) { found = raw; }
      });
      if (found) return found;

      // JSON-LD fallback: some layouts embed datePosted in structured data
      $('script[type="application/ld+json"]').each((_, el) => {
        if (found) return;
        try {
          const data = JSON.parse($(el).html() ?? '{}');
          const datePosted: string | undefined =
            data?.datePosted ?? data?.offers?.priceValidUntil;
          if (datePosted) { found = datePosted; }
        } catch { /* ignore malformed JSON */ }
      });

      return found;
    } catch (err) {
      this.safeLog(`fetchListingDate failed for ${itemUrl}`, err);
      return null;
    }
  }
}

/**
 * Scans a text blob for the Avito publication-date pattern:
 *   "· 3 июля в 23:26 ·"   →  "3 июля в 23:26"
 *   "· сегодня в 14:00 ·"  →  "сегодня в 14:00"
 *   "· вчера в 08:30 ·"    →  "вчера в 08:30"
 *   "· 2 минуты назад ·"   →  "2 минуты назад"
 *   "· только что ·"       →  "только что"
 *
 * Returns the trimmed raw string, or null if nothing matched.
 */
function extractDateFromMetaLine(text: string): string | null {
  if (!text) return null;

  const s = text.toLowerCase();

  // "только что" / "сейчас"
  if (/только что|сейчас/.test(s)) {
    return /только что/.test(s) ? 'только что' : 'сейчас';
  }

  // "X минут(у/ы) назад"
  const minMatch = s.match(/(\d+)\s*мин[а-я]*\s*назад/);
  if (minMatch) return minMatch[0].trim();

  // "X час(а/ов) назад"
  const hourRelMatch = s.match(/(\d+\s*)?час[а-я]*\s*назад/);
  if (hourRelMatch) return hourRelMatch[0].trim();

  // "сегодня в HH:MM" — keep as-is; dateParser converts to absolute MSK timestamp
  const todayMatch = s.match(/сегодня\s+в\s+(\d{1,2}:\d{2})/);
  if (todayMatch) return `сегодня в ${todayMatch[1]}`;

  // "вчера в HH:MM"
  const yesterdayMatch = s.match(/вчера\s+в\s+(\d{1,2}:\d{2})/);
  if (yesterdayMatch) return `вчера в ${yesterdayMatch[1]}`;

  // "D месяц в HH:MM"  e.g. "3 июля в 23:26"
  const absMatch = s.match(/\d{1,2}\s+[а-яё]+\s+в\s+\d{1,2}:\d{2}/);
  if (absMatch) return absMatch[0].trim();

  // "D месяц"  e.g. "3 июля" (without time)
  const absNoTimeMatch = s.match(/\d{1,2}\s+[а-яё]{3,}/);
  if (absNoTimeMatch) return absNoTimeMatch[0].trim();

  return null;
}
