"""
avito_fetch.py — subprocess HTTP helper for the Node.js Avito bot.
Integrated with Duff89/parser_avito HttpClient logic (v3.2.16).

Called by base.parser.ts via child_process.spawn:
  python3 scripts/avito_fetch.py <url> [proxy] [cookies_path]

Environment variables (set by base.parser.ts):
  AVITO_SPFA_KEY         — spfa.ru API key for automatic cookie supply
  AVITO_PROXY_CHANGE_URL — mobile proxy "change IP" URL (rotates IP on block)

Returns JSON on stdout:
  {"ok": true,  "html": "..."}
  {"ok": false, "error": "...", "status": 403}
"""
import sys
import json
import random
import time
import os
import warnings
import html as html_lib

warnings.filterwarnings("ignore")

try:
    from curl_cffi import requests
    HAS_CURL_CFFI = True
except ImportError:
    print(json.dumps({"ok": False, "error": "curl_cffi not installed. Run: pip3 install curl_cffi"}))
    sys.exit(1)

try:
    from bs4 import BeautifulSoup
    HAS_BS4 = True
except ImportError:
    HAS_BS4 = False

# Optional spfa.ru cookie provider
try:
    from spfa_cookies import SpfaCookiesProvider
    HAS_SPFA = True
except ImportError:
    HAS_SPFA = False

SPFA_KEY = os.environ.get("AVITO_SPFA_KEY", "").strip()
PROXY_CHANGE_URL = os.environ.get("AVITO_PROXY_CHANGE_URL", "").strip()

MAX_RETRIES = 3
RETRY_DELAY = 3
# Refresh cookies on the FIRST 403, not after 3 in a row.
# Hammering Avito with 5 retries on a block only deepens the ban and wastes
# spfa balance by triggering multiple handle_block() calls.
BLOCK_THRESHOLD = 1

# Headers from Duff89/parser_avito common_data.py (v3.2.16)
HEADERS = {
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,fi;q=0.6,nb;q=0.5,is;q=0.4,pt;q=0.3,ro;q=0.2,it;q=0.1,de;q=0.1',
    'cache-control': 'no-cache',
    'pragma': 'no-cache',
    'priority': 'u=0, i',
    'sec-ch-ua': '"Chromium";v="140", "Not=A?Brand";v="24", "Google Chrome";v="140"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'none',
    'sec-fetch-user': '?1',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
}


def rotate_ip():
    if not PROXY_CHANGE_URL:
        return
    try:
        with requests.Session(impersonate="chrome") as s:
            s.get(PROXY_CHANGE_URL, timeout=10)
        time.sleep(2)
    except Exception:
        pass


def _build_session(proxy=None):
    """Build curl_cffi session with a STABLE fingerprint.

    CRITICAL: spfa cookies are tied to a browser fingerprint. Randomizing
    impersonation (chrome/edge/firefox/safari) and the Chrome version on every
    request made the TLS fingerprint contradict the UA header — Avito detected
    the mismatch and invalidated fresh cookies within seconds. Everything must
    stay consistent: chrome impersonation + Chrome/140 UA matching HEADERS.
    """
    session = requests.Session(impersonate="chrome")
    session.headers.update(HEADERS)

    if proxy:
        proxy = _normalize_proxy(proxy)
        session.proxies = {"http": proxy, "https": proxy}

    return session


def _normalize_proxy(proxy):
    if not proxy:
        return None
    if proxy.startswith(("http://", "https://", "socks5://")):
        return proxy
    return f"http://{proxy}"


def load_cookies(cookies_path):
    if not cookies_path or not os.path.exists(cookies_path):
        return {}
    try:
        with open(cookies_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        return data.get("cookies", {})
    except Exception:
        return {}


def save_cookies(cookies_path, cookies):
    if not cookies_path:
        return
    try:
        os.makedirs(os.path.dirname(os.path.abspath(cookies_path)), exist_ok=True)
        with open(cookies_path, "w", encoding="utf-8") as f:
            json.dump({"cookies": cookies}, f, ensure_ascii=False, indent=2)
    except Exception:
        pass


def find_json_on_page(html_code):
    """
    Extract JSON data from Avito page — ported from Duff89/parser_avito find_json_on_page().
    Looks for <script type="mime/invalid" data-mfe-state="true"> tag.
    """
    if not HAS_BS4:
        # Fallback: regex-based extraction
        import re
        pattern = r'<script[^>]+type=["\']mime/invalid["\'][^>]+data-mfe-state=["\']true["\'][^>]*>(.*?)</script>'
        matches = re.findall(pattern, html_code, re.DOTALL)
        for match in matches:
            if 'sandbox' in match:
                continue
            try:
                text = html_lib.unescape(match)
                data = json.loads(text)
                if data.get('i18n', {}).get('hasMessages'):
                    return data.get('loaderData', {}).get('data', {})
            except Exception:
                continue
        return {}

    soup = BeautifulSoup(html_code, "html.parser")
    try:
        for script in soup.select('script'):
            if (script.get('type') == 'mime/invalid'
                    and script.get('data-mfe-state') == 'true'
                    and 'sandbox' not in script.text):
                data = json.loads(html_lib.unescape(script.text))
                if data.get('i18n', {}).get('hasMessages'):
                    return data.get('loaderData', {}).get('data', {})
    except Exception:
        pass
    return {}


def fetch(url, proxy=None, cookies_path=None):
    # Setup cookie provider
    spfa = None
    if SPFA_KEY and HAS_SPFA:
        try:
            spfa = SpfaCookiesProvider(SPFA_KEY, cookies_path or "storage/cookies_external.json")
            cookies = spfa.get()
        except Exception as e:
            return {"ok": False, "error": f"spfa init error: {e}", "status": 0}
    else:
        cookies = load_cookies(cookies_path)

    block_count = 0
    # spfa handle_block() may PURCHASE new cookies. When the IP itself is
    # flagged, fresh cookies die instantly — repeated purchases just burn
    # balance. Allow at most ONE handle_block per fetch() call.
    spfa_refreshed = False

    for attempt in range(1, MAX_RETRIES + 1):
        try:
            session = _build_session(proxy)

            with session:
                resp = session.get(
                    url,
                    cookies=cookies or None,
                    timeout=20,
                    allow_redirects=True,
                )

            # Update cookies from response
            if spfa:
                spfa.record_status(resp.status_code)
            elif cookies_path and resp.cookies:
                cookies.update(dict(resp.cookies))
                save_cookies(cookies_path, cookies)

            # On 403/429: refresh cookies via spfa (free unblock first, buy
            # only if needed) and retry with the SAME fingerprint.
            if resp.status_code in (401, 403, 429):
                block_count += 1
                if block_count >= BLOCK_THRESHOLD:
                    if spfa and not spfa_refreshed:
                        try:
                            spfa.handle_block()
                            cookies = spfa.get()
                            spfa_refreshed = True
                        except Exception:
                            pass
                    rotate_ip()
                    block_count = 0

                if attempt < MAX_RETRIES:
                    time.sleep(RETRY_DELAY)
                    continue

                return {"ok": False, "error": f"HTTP {resp.status_code}", "status": resp.status_code}

            if not resp.ok:
                return {"ok": False, "error": f"HTTP {resp.status_code}", "status": resp.status_code}

            # Return full HTML for Node.js parser
            return {"ok": True, "html": resp.text, "status": resp.status_code}

        except Exception as e:
            if attempt < MAX_RETRIES:
                time.sleep(RETRY_DELAY)
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
