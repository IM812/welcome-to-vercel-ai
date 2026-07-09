import { describe, it, expect } from 'vitest';
import { parseListingDate, isFreshListing, getListingAgeMinutes } from '../utils/dateParser';

/**
 * Fixed reference point: 2026-07-09 18:00:00 UTC
 * All tests use this as `now` so results are deterministic.
 */
const NOW = new Date('2026-07-09T18:00:00.000Z');
const MAX_AGE = 5;

function fresh(raw: string | null): boolean {
  const parsed = parseListingDate(raw, NOW);
  return isFreshListing(parsed, MAX_AGE, NOW);
}

// ---------------------------------------------------------------------------
// parseListingDate
// ---------------------------------------------------------------------------
describe('parseListingDate', () => {
  it('returns null for null input', () => {
    expect(parseListingDate(null, NOW)).toBeNull();
  });

  it('returns null for empty string', () => {
    expect(parseListingDate('', NOW)).toBeNull();
  });

  it('returns null for unrecognised string', () => {
    expect(parseListingDate('some random text 123', NOW)).toBeNull();
  });

  it('"только что" returns now', () => {
    const d = parseListingDate('только что', NOW);
    expect(d).not.toBeNull();
    expect(d!.getTime()).toBe(NOW.getTime());
  });

  it('"сейчас" returns now', () => {
    const d = parseListingDate('сейчас', NOW);
    expect(d!.getTime()).toBe(NOW.getTime());
  });

  it('"1 минуту назад" returns 1 minute before now', () => {
    const d = parseListingDate('1 минуту назад', NOW);
    expect(d!.getTime()).toBe(NOW.getTime() - 60_000);
  });

  it('"3 минуты назад" returns 3 minutes before now', () => {
    const d = parseListingDate('3 минуты назад', NOW);
    expect(d!.getTime()).toBe(NOW.getTime() - 3 * 60_000);
  });

  it('"5 минут назад" returns 5 minutes before now', () => {
    const d = parseListingDate('5 минут назад', NOW);
    expect(d!.getTime()).toBe(NOW.getTime() - 5 * 60_000);
  });

  it('"10 минут назад" returns 10 minutes before now', () => {
    const d = parseListingDate('10 минут назад', NOW);
    expect(d!.getTime()).toBe(NOW.getTime() - 10 * 60_000);
  });

  it('"час назад" returns 1 hour before now', () => {
    const d = parseListingDate('час назад', NOW);
    expect(d!.getTime()).toBe(NOW.getTime() - 3_600_000);
  });

  it('"1 час назад" returns 1 hour before now', () => {
    const d = parseListingDate('1 час назад', NOW);
    expect(d!.getTime()).toBe(NOW.getTime() - 3_600_000);
  });

  it('"2 часа назад" returns 2 hours before now', () => {
    const d = parseListingDate('2 часа назад', NOW);
    expect(d!.getTime()).toBe(NOW.getTime() - 2 * 3_600_000);
  });

  it('"сегодня в 18:45" sets hours/minutes on today', () => {
    const d = parseListingDate('сегодня в 18:45', NOW);
    expect(d).not.toBeNull();
    expect(d!.getHours()).toBe(18);
    expect(d!.getMinutes()).toBe(45);
    // Same date as NOW
    expect(d!.getDate()).toBe(NOW.getDate());
  });

  it('"вчера в 23:10" sets hours/minutes on yesterday', () => {
    const d = parseListingDate('вчера в 23:10', NOW);
    expect(d).not.toBeNull();
    expect(d!.getHours()).toBe(23);
    expect(d!.getMinutes()).toBe(10);
    expect(d!.getDate()).toBe(NOW.getDate() - 1);
  });

  it('"9 июля в 20:55" returns correct date', () => {
    const d = parseListingDate('9 июля в 20:55', NOW);
    expect(d).not.toBeNull();
    expect(d!.getDate()).toBe(9);
    expect(d!.getMonth()).toBe(6); // July = 6
    expect(d!.getHours()).toBe(20);
    expect(d!.getMinutes()).toBe(55);
  });

  it('"09.07.2026 20:55" parses dot-separated date with time', () => {
    const d = parseListingDate('09.07.2026 20:55', NOW);
    expect(d).not.toBeNull();
    expect(d!.getFullYear()).toBe(2026);
    expect(d!.getMonth()).toBe(6);
    expect(d!.getDate()).toBe(9);
    expect(d!.getHours()).toBe(20);
    expect(d!.getMinutes()).toBe(55);
  });

  it('ISO string "2026-07-09T18:45:00Z" parses correctly', () => {
    const d = parseListingDate('2026-07-09T18:45:00Z', NOW);
    expect(d).not.toBeNull();
    expect(d!.toISOString()).toBe('2026-07-09T18:45:00.000Z');
  });
});

// ---------------------------------------------------------------------------
// isFreshListing
// ---------------------------------------------------------------------------
describe('isFreshListing', () => {
  it('null → false', () => {
    expect(isFreshListing(null, MAX_AGE, NOW)).toBe(false);
  });

  it('"только что" → true', () => {
    expect(fresh('только что')).toBe(true);
  });

  it('"3 минуты назад" → true (within 5 min window)', () => {
    expect(fresh('3 минуты назад')).toBe(true);
  });

  it('"5 минут назад" → true (exactly at boundary)', () => {
    expect(fresh('5 минут назад')).toBe(true);
  });

  it('"6 минут назад" → false (exceeds 5 min window)', () => {
    // Build exactly 6-minute-old date so we are not at mercy of string parsing
    const sixMinAgo = new Date(NOW.getTime() - 6 * 60_000);
    expect(isFreshListing(sixMinAgo, MAX_AGE, NOW)).toBe(false);
  });

  it('"10 минут назад" → false', () => {
    expect(fresh('10 минут назад')).toBe(false);
  });

  it('"час назад" → false', () => {
    expect(fresh('час назад')).toBe(false);
  });

  it('"сегодня в текущее время" → true', () => {
    // Build a time string that matches NOW's local hours/minutes
    const h = NOW.getHours().toString().padStart(2, '0');
    const m = NOW.getMinutes().toString().padStart(2, '0');
    expect(fresh(`сегодня в ${h}:${m}`)).toBe(true);
  });

  it('"вчера в 23:10" → false (over 18 h ago)', () => {
    expect(fresh('вчера в 23:10')).toBe(false);
  });

  it('null string → false', () => {
    expect(fresh(null)).toBe(false);
  });

  it('unrecognised string → false (parseListingDate returns null)', () => {
    expect(fresh('непонятная строка 999')).toBe(false);
  });

  it('date 1 min in the future (clock skew) → true', () => {
    const futureDate = new Date(NOW.getTime() + 60_000); // +1 min
    expect(isFreshListing(futureDate, MAX_AGE, NOW)).toBe(true);
  });

  it('date 3 min in the future (excessive skew) → false', () => {
    const futureDate = new Date(NOW.getTime() + 3 * 60_000); // +3 min
    expect(isFreshListing(futureDate, MAX_AGE, NOW)).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// getListingAgeMinutes
// ---------------------------------------------------------------------------
describe('getListingAgeMinutes', () => {
  it('returns positive value for past dates', () => {
    const past = new Date(NOW.getTime() - 3 * 60_000);
    expect(getListingAgeMinutes(past, NOW)).toBeCloseTo(3, 5);
  });

  it('returns negative value for future dates', () => {
    const future = new Date(NOW.getTime() + 2 * 60_000);
    expect(getListingAgeMinutes(future, NOW)).toBeCloseTo(-2, 5);
  });

  it('returns 0 for now', () => {
    expect(getListingAgeMinutes(NOW, NOW)).toBe(0);
  });
});
