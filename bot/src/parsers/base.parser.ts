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
import fs from 'fs';
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
const COOKIES_SCRIPT = path.resolve(_dir, '../../scripts/avito_cookies.py');

const COOKIES_PATH =
  process.env.AVITO_COOKIES_PATH ??
  path.resolve(_dir, '../../storage/avito_cookies.json');

// Proxy can be set two ways (checked in this order):
//   1. storage/avito_proxy.txt  — written at runtime by the /setproxy command
//   2. AVITO_PROXY env var
// Reading a file each call lets admins change the proxy from Telegram (mobile
// friendly) without restarting the bot.
export const PROXY_PATH =
  process.env.AVITO_PROXY_PATH ??
  path.resolve(_dir, '../../storage/avito_proxy.txt');

function resolveProxy(): string | null {
  try {
    if (fs.existsSync(PROXY_PATH)) {
      const v = fs.readFileSync(PROXY_PATH, 'utf-8').trim();
      if (v) return v;
    }
  } catch { /* ignore */ }
  return process.env.AVITO_PROXY ?? null;
}

// Serialize cookie refreshes so a burst of 403s doesn't launch N browsers.
let cookieRefreshInFlight: Promise<boolean> | null = null;
let lastCookieRefresh = 0;
const COOKIE_REFRESH_COOLDOWN_MS = 60_000;

/**
 * Launch the Playwright stealth helper to obtain fresh Avito cookies
 * (solves the JS challenge automatically). Ported from Duff89/get_cookies.py.
 * Returns true if the `ft` cookie was obtained.
 */
export async function refreshAvitoCookies(): Promise<boolean> {
  // Cooldown: don't hammer the browser launcher.
  if (Date.now() - lastCookieRefresh < COOKIE_REFRESH_COOLDOWN_MS && lastCookieRefresh !== 0) {
    logger.debug('[cookies] refresh skipped (cooldown)');
    return false;
  }
  if (cookieRefreshInFlight) return cookieRefreshInFlight;

  cookieRefreshInFlight = new Promise<boolean>((resolve) => {
    logger.info('[cookies] launching browser to fetch fresh cookies…');
    const args = [COOKIES_SCRIPT, COOKIES_PATH, resolveProxy() ?? 'null'];
    let stdout = '';
    let stderr = '';
    const proc = spawn('python3', args, { timeout: 150_000 });

    proc.stdout.on('data', (c: Buffer) => { stdout += c.toString(); });
    proc.stderr.on('data', (c: Buffer) => { stderr += c.toString(); });

    proc.on('close', () => {
      lastCookieRefresh = Date.now();
      cookieRefreshInFlight = null;
      try {
        const r = JSON.parse(stdout.trim()) as { ok: boolean; has_ft?: boolean; error?: string };
        if (r.ok) {
          logger.info('[cookies] fresh cookies obtained');
          resolve(true);
        } else {
          logger.warn(`[cookies] refresh failed: ${r.error ?? 'unknown'} ${stderr.trim().slice(0, 200)}`);
          resolve(false);
        }
      } catch {
        logger.warn(`[cookies] refresh bad output: ${stdout.trim().slice(0, 150)} ${stderr.trim().slice(0, 150)}`);
        resolve(false);
      }
    });

    proc.on('error', (err) => {
      lastCookieRefresh = Date.now();
      cookieRefreshInFlight = null;
      logger.warn(`[cookies] spawn failed: ${err.message}`);
      resolve(false);
    });
  });

  return cookieRefreshInFlight;
}

/**
 * Invoke the Python curl_cffi helper and return raw HTML.
 * Throws on non-OK HTTP response or process error.
 */
export async function fetchWithCurlCffi(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const args = [FETCHER_SCRIPT, url, resolveProxy() ?? 'null', COOKIES_PATH];

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
    try {
      return await fetchWithCurlCffi(url);
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } })?.response?.status;
      // 403 = cookies missing/expired or IP blocked. Try to auto-refresh
      // cookies via the stealth browser, then retry the request once.
      if (status === 403) {
        logger.warn('[fetch] 403 — attempting automatic cookie refresh');
        const ok = await refreshAvitoCookies();
        if (ok) {
          return await fetchWithCurlCffi(url);
        }
      }
      throw err;
    }
  }

  protected safeLog(msg: string, err?: unknown): void {
    logger.warn(`[${this.constructor.name}] ${msg}`, err);
  }
}
