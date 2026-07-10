/**
 * base.parser.ts
 *
 * All HTTP fetching goes through scripts/avito_fetch.py which uses
 * curl_cffi — a Python library that mimics the TLS fingerprint of real
 * browsers (Chrome, Edge, Firefox, Safari). This is the same technique
 * used by Duff89/parser_avito to bypass Avito's JA3/TLS-based bot
 * detection. Ordinary axios/node-fetch requests expose a synthetic TLS
 * handshake that Avito detects and returns 403 for.
 *
 * Optional env vars:
 *   AVITO_PROXY        — proxy URL, e.g. http://user:pass@host:port
 *   AVITO_COOKIES_PATH — path to cookies JSON file
 *                        (default: <project>/storage/avito_cookies.json)
 */

import { spawn } from 'child_process';
import path from 'path';
import type { ParsedListing } from '../types/index';
import { logger } from '../utils/logger';

export interface Parser {
  parse(url: string): Promise<ParsedListing[]>;
}

// In CommonJS (the project's tsconfig uses "module": "CommonJS") __filename
// is a built-in global — no import.meta needed.
declare const __filename: string;
const _dir = path.dirname(__filename);

const FETCHER_SCRIPT = path.resolve(_dir, '../../scripts/avito_fetch.py');

const COOKIES_PATH =
  process.env.AVITO_COOKIES_PATH ??
  path.resolve(_dir, '../../storage/avito_cookies.json');

const PROXY = process.env.AVITO_PROXY ?? null;

/**
 * Invoke the Python curl_cffi helper and return raw HTML.
 * Throws on non-OK HTTP response or process error.
 */
export async function fetchWithCurlCffi(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const args = [FETCHER_SCRIPT, url, PROXY ?? 'null', COOKIES_PATH];

    let stdout = '';
    let stderr = '';

    const proc = spawn('python3', args, { timeout: 25_000 });

    proc.stdout.on('data', (chunk: Buffer) => { stdout += chunk.toString(); });
    proc.stderr.on('data', (chunk: Buffer) => { stderr += chunk.toString(); });

    proc.on('close', (code) => {
      if (code !== 0) {
        logger.warn(`[curl_cffi] exit=${code} stderr=${stderr.trim().slice(0, 300)}`);
        reject(new Error(`avito_fetch.py exited ${code}: ${stderr.trim().slice(0, 300)}`));
        return;
      }

      let result: { ok: boolean; html?: string; error?: string; status?: number };
      try {
        result = JSON.parse(stdout.trim());
      } catch {
        reject(new Error(`avito_fetch.py bad JSON: ${stdout.trim().slice(0, 200)}`));
        return;
      }

      if (!result.ok) {
        // Throw in the same format axios used so existing error handlers work.
        const err = new Error(`Request failed with status code ${result.status ?? 0}`) as Error & {
          response?: { status: number };
        };
        err.response = { status: result.status ?? 0 };
        reject(err);
        return;
      }

      resolve(result.html ?? '');
    });

    proc.on('error', (err) => {
      reject(new Error(`spawn avito_fetch.py failed: ${err.message}`));
    });
  });
}

export abstract class BaseParser implements Parser {
  abstract parse(url: string): Promise<ParsedListing[]>;

  protected async fetchHtml(url: string): Promise<string> {
    logger.debug(`[fetch] ${url}`);
    return fetchWithCurlCffi(url);
  }

  protected safeLog(msg: string, err?: unknown): void {
    logger.warn(`[${this.constructor.name}] ${msg}`, err);
  }
}
