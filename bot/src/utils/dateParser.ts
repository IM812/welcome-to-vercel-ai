/**
 * dateParser.ts
 *
 * Centralised date parsing for listing publication dates.
 * Understands Russian relative phrases ("3 минуты назад", "сегодня в 18:45", …)
 * as well as ISO timestamps and common absolute formats.
 *
 * TIMEZONE:
 *   Avito (and other RU marketplaces) render wall-clock times in Moscow time
 *   (MSK = UTC+3, no DST since 2014). The bot server usually runs in UTC.
 *   Naively building a Date from wall-clock components would therefore be off
 *   by the offset. Every ABSOLUTE / "сегодня" / "вчера" time is treated as MSK
 *   and converted to a correct UTC instant via `mskWallClockToDate`.
 *   Relative phrases ("X минут назад", "только что") are timezone-independent.
 *
 * All functions accept an optional `now` parameter so they are fully testable
 * without mocking the system clock.
 */

/** Moscow offset in hours. Override with LISTING_TIMEZONE_OFFSET_HOURS. */
const TZ_OFFSET_HOURS = Number(process.env.LISTING_TIMEZONE_OFFSET_HOURS ?? 3);

const MONTHS: Record<string, number> = {
  // short
  янв: 0, фев: 1, февр: 1, мар: 2, апр: 3,
  май: 4, мая: 4, июн: 5, июл: 6, авг: 7,
  сен: 8, окт: 9, ноя: 10, дек: 11,
  // long
  января: 0, февраля: 1, марта: 2, апреля: 3, июня: 5,
  июля: 6, августа: 7, сентября: 8, октября: 9, ноября: 10, декабря: 11,
};

/**
 * Convert wall-clock components expressed in MSK into a correct UTC Date.
 * MSK = UTC + TZ_OFFSET_HOURS, so UTC = MSK - TZ_OFFSET_HOURS.
 */
function mskWallClockToDate(
  year: number,
  month: number,
  day: number,
  hours: number,
  mins: number,
): Date {
  return new Date(Date.UTC(year, month, day, hours - TZ_OFFSET_HOURS, mins, 0, 0));
}

/** Return the calendar Y/M/D of `now` as seen in MSK. */
function mskCalendarParts(now: Date): { year: number; month: number; day: number } {
  const msk = new Date(now.getTime() + TZ_OFFSET_HOURS * 3_600_000);
  return {
    year: msk.getUTCFullYear(),
    month: msk.getUTCMonth(),
    day: msk.getUTCDate(),
  };
}

/**
 * Parse a raw date string from a listing page into a Date (UTC instant).
 *
 * Supports:
 *   - "только что" / "сейчас"
 *   - "1 минуту назад" / "2 минуты назад" / "5 минут назад"
 *   - "час назад" / "1 час назад" / "2 часа назад"
 *   - "сегодня в 18:45"                    (MSK)
 *   - "вчера в 23:10"                      (MSK)
 *   - "9 июля в 20:55" / "9 июля 20:55"    (MSK)
 *   - "09.07.2026 20:55" / "09.07.2026"    (MSK)
 *   - ISO strings: "2026-07-09T18:45:00Z", "2026-07-09T18:45:00+03:00"
 *
 * Returns null when the string cannot be understood.
 */
export function parseListingDate(
  rawDate: string | null | undefined,
  now: Date = new Date(),
): Date | null {
  if (!rawDate) return null;

  const raw = rawDate.trim();
  if (!raw) return null;

  const s = raw.toLowerCase();

  // ── "только что" / "сейчас" ─────────────────────────────────────────────────
  if (/^(только что|сейчас)$/.test(s)) return new Date(now);

  // ── "X минут(у/ы) назад" ────────────────────────────────────────────────────
  const minMatch = s.match(/^(\d+)\s*мин/);
  if (minMatch) {
    return new Date(now.getTime() - Number(minMatch[1]) * 60_000);
  }

  // ── "час назад" / "1 час назад" / "2 часа назад" ───────────────────────────
  const hourMatch = s.match(/^(\d+)?\s*час/);
  if (hourMatch) {
    const h = hourMatch[1] ? Number(hourMatch[1]) : 1;
    return new Date(now.getTime() - h * 3_600_000);
  }

  // ── "сегодня в HH:MM" (MSK) ─────────────────────────────────────────────────
  const todayMatch = s.match(/сегодня.*?(\d{1,2}):(\d{2})/);
  if (todayMatch) {
    const { year, month, day } = mskCalendarParts(now);
    return mskWallClockToDate(year, month, day, Number(todayMatch[1]), Number(todayMatch[2]));
  }

  // ── "вчера в HH:MM" (MSK) ───────────────────────────────────────────────────
  const yesterdayMatch = s.match(/вчера.*?(\d{1,2}):(\d{2})/);
  if (yesterdayMatch) {
    const { year, month, day } = mskCalendarParts(now);
    return mskWallClockToDate(
      year, month, day - 1,
      Number(yesterdayMatch[1]), Number(yesterdayMatch[2]),
    );
  }

  // ── ISO / RFC2822 (has explicit tz or is unambiguous) ───────────────────────
  // Only trust this when the string actually looks like an ISO timestamp,
  // otherwise Date() may silently mis-parse RU wall-clock strings.
  if (/^\d{4}-\d{2}-\d{2}[t ]/i.test(raw) || /^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    const iso = new Date(raw);
    if (!isNaN(iso.getTime())) return iso;
  }

  // ── "DD.MM.YYYY HH:MM" or "DD.MM.YYYY" (MSK) ───────────────────────────────
  const dotDateMatch = s.match(/^(\d{2})\.(\d{2})\.(\d{4})(?:\s+(\d{1,2}):(\d{2}))?/);
  if (dotDateMatch) {
    const day = Number(dotDateMatch[1]);
    const month = Number(dotDateMatch[2]) - 1;
    const year = Number(dotDateMatch[3]);
    const hours = dotDateMatch[4] ? Number(dotDateMatch[4]) : 0;
    const mins = dotDateMatch[5] ? Number(dotDateMatch[5]) : 0;
    const d = mskWallClockToDate(year, month, day, hours, mins);
    if (!isNaN(d.getTime())) return d;
  }

  // ── "D месяц [в] [YYYY] [HH:MM]" (MSK) ─────────────────────────────────────
  // Covers: "3 июля в 23:26", "9 июля 20:55", "27 апреля 2026 21:00", "3 июля"
  // The optional literal "в" between month/year and time is matched inline.
  // NOTE: JS \b is ASCII-only, so we must NOT rely on word boundaries for
  // the Cyrillic "в" — it is consumed by the "(?:\s+в)?" group below.
  const absMatch = s.match(
    /(\d{1,2})\s+([а-яё]+)(?:\s+(\d{4}))?(?:\s+в)?(?:\s+(\d{1,2}):(\d{2}))?/,
  );
  if (absMatch) {
    const day = Number(absMatch[1]);
    const monthKey = Object.keys(MONTHS).find((k) => absMatch[2].startsWith(k));
    if (monthKey !== undefined) {
      const monthNum = MONTHS[monthKey];
      const year = absMatch[3] ? Number(absMatch[3]) : mskCalendarParts(now).year;
      const hours = absMatch[4] ? Number(absMatch[4]) : 0;
      const mins = absMatch[5] ? Number(absMatch[5]) : 0;
      const d = mskWallClockToDate(year, monthNum, day, hours, mins);
      if (!isNaN(d.getTime())) {
        // If the resulting date is more than 1 day in the future, assume previous year.
        if (d.getTime() > now.getTime() + 86_400_000) {
          d.setUTCFullYear(d.getUTCFullYear() - 1);
        }
        return d;
      }
    }
  }

  return null;
}

/**
 * Returns how many minutes ago `publishedAt` was relative to `now`.
 * Positive = in the past, negative = in the future.
 */
export function getListingAgeMinutes(
  publishedAt: Date,
  now: Date = new Date(),
): number {
  return (now.getTime() - publishedAt.getTime()) / 60_000;
}

/**
 * Returns true only if the listing is "fresh" enough to notify the user.
 *
 * Rules:
 *   - null publishedAt → false
 *   - more than 2 minutes in the future → false (clock skew guard)
 *   - 0–2 minutes in the future → true  (minor clock skew allowed)
 *   - 0–maxAgeMinutes in the past → true
 *   - older than maxAgeMinutes → false
 */
export function isFreshListing(
  publishedAt: Date | null | undefined,
  maxAgeMinutes: number = 5,
  now: Date = new Date(),
): boolean {
  if (!publishedAt) return false;

  const ageMinutes = getListingAgeMinutes(publishedAt, now);

  // Future by more than 2 minutes — likely bad data
  if (ageMinutes < -2) return false;

  // Slightly in the future (clock skew ≤2 min) or within the allowed window
  return ageMinutes <= maxAgeMinutes;
}
