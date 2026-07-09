import type { ParsedListing } from '../types/index';
import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { withTimeout } from '../utils/retry';
import { logger } from '../utils/logger';

export interface Parser {
  parse(url: string): Promise<ParsedListing[]>;
}

export abstract class BaseParser implements Parser {
  protected readonly http: AxiosInstance;
  protected readonly timeoutMs = 8_000;

  constructor() {
    this.http = axios.create({
      timeout: this.timeoutMs,
      // Headers that mimic a real Chrome browser on Windows. Avito returns 403
      // when key headers are missing (especially Referer and sec-fetch-* set).
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
        'Accept-Encoding': 'gzip, deflate, br',
        'Cache-Control': 'max-age=0',
        Connection: 'keep-alive',
        Referer: 'https://www.avito.ru/',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-User': '?1',
        'Sec-Ch-Ua': '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
      },
    });
  }

  abstract parse(url: string): Promise<ParsedListing[]>;

  protected async fetchHtml(url: string): Promise<string> {
    const response = await withTimeout(
      this.http.get<string>(url),
      this.timeoutMs,
    );
    return response.data;
  }

  protected safeLog(msg: string, err?: unknown): void {
    logger.warn(`[${this.constructor.name}] ${msg}`, err);
  }
}
