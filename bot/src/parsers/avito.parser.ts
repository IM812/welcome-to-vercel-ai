import * as cheerio from 'cheerio';
import type { Element } from 'domhandler';
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

    // Date-extraction diagnostics — enabled with AVITO_DATE_DIAG=true.
    // Collects per-card date resolution so we can prove WHERE the date lives
    // before touching any send/skip policy.
    const DIAG = (process.env.AVITO_DATE_DIAG ?? 'false') === 'true';
    const diag: Array<{ id: string; title: string; value?: string; source: string; reason?: string }> = [];

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

        // Avito lazy-loads card images: `src` is often a data: placeholder
        // while the real CDN URL lives in srcset/data-srcset. Take the last
        // (largest) srcset entry so sendPhoto gets a decent-sized image.
        const imageEl = $el.find('img[itemprop="image"], img[data-src], [class*="photo"] img, [data-marker*="image"] img').first();
        const srcset = imageEl.attr('srcset') ?? imageEl.attr('data-srcset');
        const srcsetBest = srcset
          ?.split(',')
          .map((s) => s.trim().split(/\s+/)[0])
          .filter(Boolean)
          .pop();
        const imageUrl =
          srcsetBest ??
          imageEl.attr('src') ??
          imageEl.attr('data-src') ??
          undefined;

        const linkEl = $el.find('a[itemprop="url"], a[data-marker="item-title"]').first();
        const href = linkEl.attr('href');
        if (!href) return;
        const fullUrl = href.startsWith('http') ? href : `https://www.avito.ru${href}`;

        // Extract the date DIRECTLY from the search-result card — no extra
        // HTTP request. Multi-strategy extraction (see extractCardDate) tries
        // several selectors and reports which one matched, for diagnostics.
        const dateResult = extractCardDate($el);
        const rawPublishedAt: string | undefined = dateResult.value;

        if (DIAG) {
          diag.push({
            id: String(externalId ?? '(hash)'),
            title: title.slice(0, 48),
            value: dateResult.value,
            source: dateResult.source,
            reason: dateResult.reason,
          });
        }

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

    // Feed-order diagnostics — enabled with AVITO_SORT_DIAG=true.
    // Prints the first items IN FEED ORDER with their dates. If the feed is
    // truly sorted by date (s=104), these should be the newest listings and
    // their dates should descend from top to bottom.
    if ((process.env.AVITO_SORT_DIAG ?? 'false') === 'true') {
      logger.info(`[sort-diag] first ${Math.min(5, listings.length)} listings in feed order:`);
      listings.slice(0, 5).forEach((l, i) => {
        logger.info(`[sort-diag]   #${i + 1} id=${l.externalId ?? '(hash)'} date=${l.rawPublishedAt ?? '—'} | ${l.title.slice(0, 50)}`);
      });
    }

    if (DIAG) {
      const withDate = diag.filter((d) => d.value).length;
      const withoutDate = diag.length - withDate;
      // Per-selector breakdown so we can see WHICH strategy is carrying.
      const bySource = diag.reduce<Record<string, number>>((acc, d) => {
        const key = d.value ? d.source : `none:${d.reason ?? 'unknown'}`;
        acc[key] = (acc[key] ?? 0) + 1;
        return acc;
      }, {});

      logger.info('[date-diag] ==================================================');
      logger.info(`[date-diag] cards parsed: ${diag.length}`);
      logger.info(`[date-diag] date found:   ${withDate}`);
      logger.info(`[date-diag] date missing: ${withoutDate}`);
      logger.info(`[date-diag] by source: ${JSON.stringify(bySource)}`);
      for (const d of diag) {
        logger.info(
          `[date-diag] id=${d.id} src=${d.value ? d.source : 'NONE'} ` +
          `date=${d.value ?? '—'}${d.value ? '' : ` reason=${d.reason ?? '?'}`} | ${d.title}`,
        );
      }
      logger.info('[date-diag] ==================================================');
    }

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
 * Multi-strategy date extraction from a single search-result card.
 *
 * Tries selectors in priority order and reports WHICH one matched via the
 * `source` field, so diagnostics can show where Avito actually keeps the date.
 * Does NOT change any send/skip policy — it only resolves the raw date string.
 *
 * Returns:
 *   value  — raw date string (undefined if nothing found)
 *   source — label of the strategy that matched (or 'none')
 *   reason — when not found, a hint about why (for diagnostics)
 */
function extractCardDate(
  $el: cheerio.Cheerio<Element>,
): { value?: string; source: string; reason?: string } {
  // Strategy 1: canonical data-marker="item-date" attribute (ISO/data-time)
  const markerEl = $el.find('[data-marker="item-date"]').first();
  const markerExists = markerEl.length > 0;
  const markerAttr =
    markerEl.attr('datetime') ?? markerEl.attr('data-time') ?? markerEl.find('time').attr('datetime');
  if (markerAttr?.trim()) {
    return { value: markerAttr.trim(), source: 'item-date[attr]' };
  }

  // Strategy 2: data-marker="item-date" text content
  const markerText = markerEl.text().trim();
  if (markerText) {
    return { value: markerText, source: 'item-date[text]' };
  }

  // Strategy 3: any <time datetime="..."> inside the card
  const timeAttr = $el.find('time[datetime]').first().attr('datetime');
  if (timeAttr?.trim()) {
    return { value: timeAttr.trim(), source: 'time[datetime]' };
  }

  // Strategy 4: <time> text content
  const timeText = $el.find('time').first().text().trim();
  if (timeText) {
    return { value: timeText, source: 'time[text]' };
  }

  // Strategy 5: class-based date container (Avito obfuscated class names)
  const classDateEl = $el.find('[class*="date" i], [class*="Date"]').first();
  const classDateText = classDateEl.text().trim();
  if (classDateText) {
    const parsed = extractDateFromMetaLine(classDateText);
    if (parsed) return { value: parsed, source: 'class*=date' };
  }

  // Strategy 6: last resort — scan the whole card text for a date pattern
  const cardText = $el.text();
  const scanned = extractDateFromMetaLine(cardText);
  if (scanned) {
    return { value: scanned, source: 'card-text-scan' };
  }

  // Nothing matched — explain why for diagnostics.
  const reason = markerExists
    ? 'item-date present but empty (likely JS-rendered)'
    : 'no item-date / time / date-class node in card HTML';
  return { source: 'none', reason };
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
