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
const SPFA_SCRIPT = path.resolve(_dir, '../../scripts/spfa_cookies.py');

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
  // Direct mode: on a Russian host Avito is reachable without a proxy, so
  // AVITO_DIRECT=1 hard-disables proxy resolution. This makes the no-proxy
  // setup immune to a stale storage/avito_proxy.txt or AVITO_PROXY env that
  // would otherwise route traffic through a dead proxy.
  if (/^(1|true|yes)$/i.test(process.env.AVITO_DIRECT ?? '')) return null;

  try {
    if (fs.existsSync(PROXY_PATH)) {
      const v = fs.readFileSync(PROXY_PATH, 'utf-8').trim();
      if (v) return v;
    }
  } catch { /* ignore */ }
  return process.env.AVITO_PROXY ?? null;
}

// spfa.ru API key — auto cookie supply service. File-first, then env.
export const SPFA_KEY_PATH =
  process.env.AVITO_SPFA_KEY_PATH ??
  path.resolve(_dir, '../../storage/avito_spfa_key.txt');

function resolveSpfaKey(): string {
  try {
    if (fs.existsSync(SPFA_KEY_PATH)) {
      const v = fs.readFileSync(SPFA_KEY_PATH, 'utf-8').trim();
      if (v) return v;
    }
  } catch { /* ignore */ }
  return process.env.AVITO_SPFA_KEY ?? '';
}

// Mobile-proxy "change IP" URL. File-first, then env.
export const PROXY_CHANGE_URL_PATH =
  process.env.AVITO_PROXY_CHANGE_URL_PATH ??
  path.resolve(_dir, '../../storage/avito_proxy_change_url.txt');

function resolveProxyChangeUrl(): string {
  try {
    if (fs.existsSync(PROXY_CHANGE_URL_PATH)) {
      const v = fs.readFileSync(PROXY_CHANGE_URL_PATH, 'utf-8').trim();
      if (v) return v;
    }
  } catch { /* ignore */ }
  return process.env.AVITO_PROXY_CHANGE_URL ?? '';
}

// Build the env passed to Python subprocesses (spfa key + IP rotation URL).
function pythonEnv(): NodeJS.ProcessEnv {
  return {
    ...process.env,
    AVITO_SPFA_KEY: resolveSpfaKey(),
    AVITO_PROXY_CHANGE_URL: resolveProxyChangeUrl(),
  };
}

// Serialize cookie refreshes so a burst of 403s doesn't launch N Python
// processes and burn spfa balance. Two guards:
//   1. in-flight mutex  — checked FIRST so any concurrent 403 caller piggy-
//      backs on the already-running refresh instead of spawning its own.
//   2. post-refresh cooldown — prevents a fresh re-trigger while cookies are
//      genuinely valid. 5 min (was 60 s) stops the "4 purchases in 2 min"
//      pattern when the network is flaky or a proxy was dying.
let cookieRefreshInFlight: Promise<boolean> | null = null;
let lastCookieRefresh = 0;
const COOKIE_REFRESH_COOLDOWN_MS = 2 * 60_000; // 2 minutes

/**
 * Obtain fresh Avito cookies via spfa.ru (or Playwright fallback).
 * Returns true if new cookies were written successfully.
 */
export async function refreshAvitoCookies(): Promise<boolean> {
  // 1. Mutex first — piggyback on an in-flight refresh rather than spawning a
  //    second Python process. This is the fix for burst-403 double-spend.
  if (cookieRefreshInFlight) {
    logger.debug('[cookies] refresh already in-flight — awaiting result');
    return cookieRefreshInFlight;
  }
  // 2. Cooldown — skip if cookies were refreshed recently.
  if (lastCookieRefresh !== 0 && Date.now() - lastCookieRefresh < COOKIE_REFRESH_COOLDOWN_MS) {
    const remaining = Math.round((COOKIE_REFRESH_COOLDOWN_MS - (Date.now() - lastCookieRefresh)) / 1000);
    logger.debug(`[cookies] refresh skipped (cooldown, ${remaining}s remaining)`);
    return false;
  }

  // Prefer spfa.ru (pure HTTP, works headless on any VPS). The Playwright
  // browser path is only a fallback for local machines without an spfa key.
  const useSpfa = resolveSpfaKey() !== '';

  cookieRefreshInFlight = new Promise<boolean>((resolve) => {
    logger.info(useSpfa
      ? '[cookies] refreshing via spfa.ru (unblock/buy)…'
      : '[cookies] launching browser to fetch fresh cookies…');
    const args = useSpfa
      ? [SPFA_SCRIPT, COOKIES_PATH]
      : [COOKIES_SCRIPT, COOKIES_PATH, resolveProxy() ?? 'null'];
    let stdout = '';
    let stderr = '';
    const proc = spawn('python3', args, { timeout: 150_000, env: pythonEnv() });

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

    // 90s: avito_fetch.py retries up to 3 times with sleeps between attempts
    // (plus optional spfa cookie purchase). A 30s timeout was killing the
    // process mid-retry (exit=null), silently dropping most check ticks.
    const proc = spawn('python3', args, { timeout: 90_000, env: pythonEnv() });

    proc.stdout.on('data', (chunk: Buffer) => { stdout += chunk.toString(); });
    proc.stderr.on('data', (chunk: Buffer) => { stderr += chunk.toString(); });

    proc.on('close', (code) => {
      if (code !== 0) {
        logger.warn(`[curl_cffi] exit=${code} stderr=${stderr.trim().slice(0, 300)}`);
        reject(new Error(`avito_fetch.py exited ${code}: ${stderr.trim().slice(0, 300)}`));
        return;
      }

      let result: {
        ok: boolean;
        html?: string;
        error?: string;
        status?: number;
        /** True when avito_fetch.py already called spfa handle_block() internally.
         *  Node must NOT trigger a second refreshAvitoCookies() in that case. */
        cookies_refreshed?: boolean;
      };
      try {
        result = JSON.parse(stdout.trim());
      } catch {
        reject(new Error(`avito_fetch.py bad JSON: ${stdout.trim().slice(0, 200)}`));
        return;
      }

      if (!result.ok) {
        // Include the Python-side detail so status 0 failures are diagnosable.
        const detail = result.error ? ` (${result.error.slice(0, 160)})` : '';
        const err = new Error(`Request failed with status code ${result.status ?? 0}${detail}`) as Error & {
          response?: { status: number };
          cookiesAlreadyRefreshed?: boolean;
        };
        err.response = { status: result.status ?? 0 };
        // Flag so fetchHtml() does not trigger a redundant spfa purchase.
        err.cookiesAlreadyRefreshed = result.cookies_refreshed === true;
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

// ---------------------------------------------------------------------------
// Global 403 circuit breaker.
// When the IP is flagged, every retry deepens the ban: each 403 spawned more
// retries (Python x3 + Node x1 + next tick in 10s) = up to ~36 req/min while
// blocked — a ban spiral. The breaker OPENS after 3 consecutive 403s and
// pauses ALL Avito fetches for 3 minutes so the IP-level block can expire.
// Any successful fetch closes it again.
// ---------------------------------------------------------------------------
let consecutive403 = 0;
let breakerOpenUntil = 0;
const BREAKER_THRESHOLD = 3;
const BREAKER_PAUSE_MS = 3 * 60_000;

export abstract class BaseParser implements Parser {
  abstract parse(url: string): Promise<ParsedListing[]>;

  protected async fetchHtml(url: string): Promise<string> {
    // Circuit breaker: while open, fail fast without touching Avito at all.
    if (Date.now() < breakerOpenUntil) {
      const waitSec = Math.round((breakerOpenUntil - Date.now()) / 1000);
      throw new Error(`Avito cooldown active — ${waitSec}s until retry (IP flagged, letting the block expire)`);
    }

    logger.debug(`[fetch] ${url}`);
    try {
      const html = await fetchWithCurlCffi(url);
      consecutive403 = 0; // success closes the breaker
      return html;
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } })?.response?.status;
      // 403 = cookies missing/expired or IP blocked. Try to auto-refresh
      // cookies via spfa.ru, then retry the request once.
      if (status === 403) {
        consecutive403++;
        if (consecutive403 >= BREAKER_THRESHOLD) {
          breakerOpenUntil = Date.now() + BREAKER_PAUSE_MS;
          consecutive403 = 0;
          logger.warn(`[breaker] ${BREAKER_THRESHOLD} consecutive 403s — pausing ALL Avito requests for ${BREAKER_PAUSE_MS / 60_000}min to let the IP block expire`);
          throw err;
        }
        logger.warn('[fetch] 403 — attempting automatic cookie refresh');
        const ok = await refreshAvitoCookies();
        if (ok) {
          const html = await fetchWithCurlCffi(url);
          consecutive403 = 0;
          return html;
        }
        throw err;
      }

      // status 0 / undefined = no HTTP response at all: a transient network
      // blip (timeout, connection reset, DNS, proxy hiccup) — NOT a block.
      // Refreshing cookies would be pointless (and wastes spfa balance), so
      // just wait briefly and retry once. This keeps a single blip from
      // counting toward the 3-error "проверьте ссылку" threshold.
      if (!status) {
        logger.warn('[fetch] network error (no response) — retrying once in 1.5s');
        await new Promise((r) => setTimeout(r, 1_500));
        return await fetchWithCurlCffi(url);
      }

      throw err;
    }
  }

  protected safeLog(msg: string, err?: unknown): void {
    logger.warn(`[${this.constructor.name}] ${msg}`, err);
  }
}
