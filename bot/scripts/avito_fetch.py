"""
avito_fetch.py — subprocess HTTP helper for the Node.js Avito bot.

Called by base.parser.ts via child_process.spawn:
  python3 scripts/avito_fetch.py <url> [proxy]

Returns JSON on stdout:
  {"ok": true,  "html": "..."}
  {"ok": false, "error": "...", "status": 403}

Uses curl_cffi which mimics the TLS fingerprint of a real browser (same
technique as Duff89/parser_avito). This bypasses Avito's JA3/TLS-based
bot detection that blocks ordinary axios/node-fetch requests.
"""
import sys
import json
import random
import time
import os

try:
    from curl_cffi import requests as cffi_requests
except ImportError:
    print(json.dumps({"ok": False, "error": "curl_cffi not installed"}))
    sys.exit(1)

IMPERSONATE_OPTIONS = ["chrome120", "chrome124", "chrome131", "edge101", "safari17_0"]
MAX_RETRIES = 3
RETRY_DELAY = 3  # seconds

HEADERS = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
    "Accept-Encoding": "gzip, deflate, br",
    "Cache-Control": "no-cache",
    "Pragma": "no-cache",
    "DNT": "1",
    "Upgrade-Insecure-Requests": "1",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "none",
    "Sec-Fetch-User": "?1",
}

def load_cookies(cookies_path: str) -> dict:
    """Load cookies from a JSON file saved by the bot."""
    if not os.path.exists(cookies_path):
        return {}
    try:
        with open(cookies_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        return data.get("cookies", {})
    except Exception:
        return {}

def save_cookies(cookies_path: str, cookies: dict):
    """Persist updated cookies back to disk."""
    try:
        os.makedirs(os.path.dirname(cookies_path), exist_ok=True)
        with open(cookies_path, "w", encoding="utf-8") as f:
            json.dump({"cookies": cookies}, f, ensure_ascii=False, indent=2)
    except Exception:
        pass

def fetch(url: str, proxy: str | None = None, cookies_path: str | None = None) -> dict:
    cookies = load_cookies(cookies_path) if cookies_path else {}

    for attempt in range(1, MAX_RETRIES + 1):
        impersonate = random.choice(IMPERSONATE_OPTIONS)

        session_kwargs = {"impersonate": impersonate}
        if proxy:
            session_kwargs["proxies"] = {"http": proxy, "https": proxy}

        try:
            with cffi_requests.Session(**session_kwargs) as session:
                resp = session.get(
                    url,
                    headers=HEADERS,
                    cookies=cookies or None,
                    timeout=12,
                    allow_redirects=True,
                )

                # Update stored cookies from response
                if cookies_path and resp.cookies:
                    updated = dict(resp.cookies)
                    cookies.update(updated)
                    save_cookies(cookies_path, cookies)

                if resp.status_code in (403, 429, 401):
                    if attempt < MAX_RETRIES:
                        delay = RETRY_DELAY * attempt + random.uniform(1, 3)
                        time.sleep(delay)
                        continue
                    return {"ok": False, "error": f"HTTP {resp.status_code}", "status": resp.status_code}

                if not resp.ok:
                    return {"ok": False, "error": f"HTTP {resp.status_code}", "status": resp.status_code}

                return {"ok": True, "html": resp.text, "status": resp.status_code}

        except Exception as e:
            if attempt < MAX_RETRIES:
                time.sleep(RETRY_DELAY * attempt)
                continue
            return {"ok": False, "error": str(e), "status": 0}

    return {"ok": False, "error": "max retries exceeded", "status": 0}


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"ok": False, "error": "usage: avito_fetch.py <url> [proxy] [cookies_path]"}))
        sys.exit(1)

    url_arg = sys.argv[1]
    proxy_arg = sys.argv[2] if len(sys.argv) > 2 and sys.argv[2] != "null" else None
    cookies_arg = sys.argv[3] if len(sys.argv) > 3 and sys.argv[3] != "null" else None

    result = fetch(url_arg, proxy_arg, cookies_arg)
    print(json.dumps(result, ensure_ascii=False))
