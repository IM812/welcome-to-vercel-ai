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
  protected readonly timeoutMs = 15_000;

  constructor() {
    this.http = axios.create({
      timeout: this.timeoutMs,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive',
        'Cache-Control': 'no-cache',
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
