import * as cheerio from 'cheerio';
import { BaseParser } from './base.parser';
import type { ParsedListing } from '../types/index';
import { hashListing } from '../utils/hash';

export class AvitoParser extends BaseParser {
  async parse(url: string): Promise<ParsedListing[]> {
    const html = await this.fetchHtml(url);
    const $ = cheerio.load(html);
    const listings: ParsedListing[] = [];

    $('[data-marker="item"]').each((_, el) => {
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

        const dateEl = $el.find('[data-marker="item-date"]').first();
        // Prefer ISO datetime attribute; fall back to Russian relative text.
        // Also try data-time and title attributes some Avito layouts use.
        const dateIso =
          dateEl.attr('datetime') ??
          dateEl.attr('data-time') ??
          dateEl.find('time').attr('datetime') ??
          $el.find('time').attr('datetime');
        const dateText = dateEl.text().trim() || $el.find('time').text().trim();
        // rawPublishedAt is the original string, exactly as scraped — used for dateParser.ts
        const rawPublishedAt: string | undefined = dateIso ?? dateText ?? undefined;
        const publishedAt = parseAvitoDate(rawPublishedAt);

        const finalExternalId = externalId ?? hashListing(title, price, fullUrl);

        listings.push({
          externalId: finalExternalId,
          title,
          price,
          location,
          imageUrl: imageUrl && !imageUrl.includes('data:') ? imageUrl : undefined,
          url: fullUrl,
          rawPublishedAt,
          publishedAt,
        });
      } catch (err) {
        this.safeLog('Failed to parse Avito item', err);
      }
    });

    return listings;
  }
}

function parseAvitoDate(str: string | undefined): Date | undefined {
  if (!str) return undefined;
  try {
    // Try ISO / RFC2822 first (datetime attribute)
    const iso = new Date(str);
    if (!isNaN(iso.getTime())) return iso;

    const now = new Date();
    const s = str.toLowerCase().trim();

    // "сегодня в 14:30" or "today at 14:30"
    const todayMatch = s.match(/сегодня.*?(\d{1,2}):(\d{2})/);
    if (todayMatch) {
      const d = new Date(now);
      d.setHours(Number(todayMatch[1]), Number(todayMatch[2]), 0, 0);
      return d;
    }

    // "вчера в 14:30"
    const yesterdayMatch = s.match(/вчера.*?(\d{1,2}):(\d{2})/);
    if (yesterdayMatch) {
      const d = new Date(now);
      d.setDate(d.getDate() - 1);
      d.setHours(Number(yesterdayMatch[1]), Number(yesterdayMatch[2]), 0, 0);
      return d;
    }

    // "X минут назад" / "X минуту назад"
    const minutesMatch = s.match(/(\d+)\s*мин/);
    if (minutesMatch) {
      return new Date(now.getTime() - Number(minutesMatch[1]) * 60_000);
    }

    // "X часов назад" / "X час назад"
    const hoursMatch = s.match(/(\d+)\s*час/);
    if (hoursMatch) {
      return new Date(now.getTime() - Number(hoursMatch[1]) * 3_600_000);
    }

    // "X дней назад"
    const daysMatch = s.match(/(\d+)\s*дн/);
    if (daysMatch) {
      return new Date(now.getTime() - Number(daysMatch[1]) * 86_400_000);
    }

    // Absolute dates: "15 апр", "15 апр 21:00", "3 мая 2026", "12 апреля", "1 янв 2025"
    // Note: Avito often appends a time "DD мес HH:MM" — we parse day+month and optionally time.
    const MONTHS: Record<string, number> = {
      янв: 0, февр: 1, фев: 1, мар: 2, апр: 3, май: 4, мая: 4, июн: 5,
      июл: 6, авг: 7, сен: 8, окт: 9, ноя: 10, дек: 11,
      января: 0, февраля: 1, марта: 2, апреля: 3, июня: 5,
      июля: 6, августа: 7, сентября: 8, октября: 9, ноября: 10, декабря: 11,
    };
    // Pattern: "27 апр 21:00" or "27 апреля" or "27 апр 2025" or "27 апр 2025 21:00"
    const absMatch = s.match(/(\d{1,2})\s+([а-яё]+)(?:\s+(\d{4}))?(?:\s+(\d{1,2}):(\d{2}))?/);
    if (absMatch) {
      const day = Number(absMatch[1]);
      const monthNum = Object.entries(MONTHS).find(([k]) => absMatch[2].startsWith(k))?.[1];
      if (monthNum !== undefined) {
        const year = absMatch[3] ? Number(absMatch[3]) : now.getFullYear();
        const hours = absMatch[4] ? Number(absMatch[4]) : 0;
        const minutes = absMatch[5] ? Number(absMatch[5]) : 0;
        const d = new Date(year, monthNum, day, hours, minutes, 0, 0);
        // If resulting date is in the future, it belongs to the previous year
        if (d > now) d.setFullYear(d.getFullYear() - 1);
        return d;
      }
    }

    return undefined;
  } catch {
    return undefined;
  }
}
