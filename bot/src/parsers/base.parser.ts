import type { ParsedListing } from '../types/index';
import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { sleep, withTimeout } from '../utils/retry';
import { logger } from '../utils/logger';

export interface Parser {
  parse(url: string): Promise<ParsedListing[]>;
}

// Rotate through several real Chrome User-Agent strings so repeated requests
// from the same IP look like different browsers to Avito's bot detection.
const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Safari/605.1.15',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0',
];

function randomUA(): string {
  return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
}

// Random jitter between min and max ms — breaks machine-like request timing.
function jitter(minMs: number, maxMs: number): Promise<void> {
  return sleep(minMs + Math.floor(Math.random() * (maxMs - minMs)));
}

export abstract class BaseParser implements Parser {
  protected readonly http: AxiosInstance;
  protected readonly timeoutMs = 10_000;

  constructor() {
    this.http = axios.create({
      timeout: this.timeoutMs,
      headers: {
        // Start with a random UA; fetchHtml rotates it on every call.
        'User-Agent': randomUA(),
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
        'Accept-Encoding': 'gzip, deflate, br',
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Connection: 'keep-alive',
        // "none" = direct navigation (typing URL / following a bookmark).
        // "same-origin" would only be correct for navigation within avito.ru.
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1',
        DNT: '1',
      },
    });
  }

  abstract parse(url: string): Promise<ParsedListing[]>;

  protected async fetchHtml(url: string, attempt = 0): Promise<string> {
    // Rotate User-Agent on every request.
    this.http.defaults.headers['User-Agent'] = randomUA();

    // Small jitter so requests don't arrive at a robot-perfect cadence.
    if (attempt > 0) {
      await jitter(2_000, 5_000);
    }

    try {
      const response = await withTimeout(
        this.http.get<string>(url, {
          headers: {
            // The Referer for a direct category-page load should be the Avito
            // home page or empty — never the same URL (that's a page refresh).
            Referer: 'https://www.avito.ru/',
          },
        }),
        this.timeoutMs,
      );
      return response.data;
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } })?.response?.status;

      // On 403 retry up to 2 more times with increasing back-off + fresh UA.
      if (status === 403 && attempt < 2) {
        logger.warn(`[fetchHtml] 403 on attempt ${attempt + 1}, retrying with new UA…`);
        await jitter(3_000, 7_000);
        return this.fetchHtml(url, attempt + 1);
      }

      throw err;
    }
  }

  protected safeLog(msg: string, err?: unknown): void {
    logger.warn(`[${this.constructor.name}] ${msg}`, err);
  }
}
