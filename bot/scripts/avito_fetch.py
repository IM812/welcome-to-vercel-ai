"""
avito_fetch.py — subprocess HTTP helper for the Node.js Avito bot.

Called by base.parser.ts via child_process.spawn:
  python3 scripts/avito_fetch.py <url> [proxy] [cookies_path]

Environment variables (set by base.parser.ts):
  AVITO_SPFA_KEY        — spfa.ru API key for automatic cookie supply
  AVITO_PROXY_CHANGE_URL — mobile proxy "change IP" URL (rotates IP on block)

Returns JSON on stdout:
  {"ok": true,  "html": "..."}
  {"ok": false, "error": "...", "status": 403}

Antiblock stack:
  1. curl_cffi impersonate — mimics a real browser's TLS/JA3 fingerprint
  2. spfa.ru cookie service — auto-supplies & unblocks working Avito cookies
  3. mobile proxy IP rotation — changes IP via proxy_change_url on 403/429
"""
import sys
import json
import random
import time
import os
import warnings

# Suppress all SSL warnings
warnings.filterwarnings("ignore")

try:
    from curl_cffi import requests as cffi_requests
    _USE_CURL_CFFI = True
except ImportError:
    _USE_CURL_CFFI = False
    try:
        import requests as cffi_requests
    except ImportError:
        print(json.dumps({"ok": False, "error": "curl_cffi not installed"}))
        sys.exit(1)

# Optional spfa.ru cookie provider (auto cookies).
try:
    from spfa_cookies import SpfaCookiesProvider
except ImportError:
    SpfaCookiesProvider = None

# Plain requests for the IP-rotation call.
try:
    from curl_cffi import requests as plain_requests
except ImportError:
    try:
        import requests as plain_requests
    except ImportError:
        plain_requests = None

IMPERSONATE_OPTIONS = ["chrome120", "chrome124", "chrome131", "edge101", "safari17_0"]
MAX_RETRIES = 4
RETRY_DELAY = 3  # seconds

SPFA_KEY = os.environ.get("AVITO_SPFA_KEY", "").strip()
PROXY_CHANGE_URL = os.environ.get("AVITO_PROXY_CHANGE_URL", "").strip()


def rotate_ip():
    """Ask a mobile proxy to switch its exit IP."""
    if not PROXY_CHANGE_URL or not plain_requests:
        return
    try:
        r = plain_requests.get(PROXY_CHANGE_URL, params={"format": "json"}, timeout=10)
        if r.status_code == 200:
            time.sleep(2)
    except Exception:
        pass


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
    if not os.path.exists(cookies_path):
        return {}
    try:
        with open(cookies_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        return data.get("cookies", {})
    except Exception:
        return {}


def save_cookies(cookies_path: str, cookies: dict):
    try:
        os.makedirs(os.path.dirname(cookies_path), exist_ok=True)
        with open(cookies_path, "w", encoding="utf-8") as f:
            json.dump({"cookies": cookies}, f, ensure_ascii=False, indent=2)
    except Exception:
        pass


def _normalize_proxy(proxy):
    if not proxy:
        return None
    if proxy.startswith("http://") or proxy.startswith("https://"):
        return proxy
    if "@" in proxy:
        hostport, creds = proxy.split("@", 1)
        return f"http://{creds}@{hostport}"
    return f"http://{proxy}"


def fetch(url, proxy=None, cookies_path=None):
    proxy = _normalize_proxy(proxy)

    spfa = None
    if SPFA_KEY and SpfaCookiesProvider is not None:
        try:
            spfa = SpfaCookiesProvider(SPFA_KEY, cookies_path or "storage/cookies_external.json")
            cookies = spfa.get()
        except Exception as e:
            return {"ok": False, "error": f"spfa error: {e}", "status": 0}
    else:
        cookies = load_cookies(cookies_path) if cookies_path else {}

    for attempt in range(1, MAX_RETRIES + 1):
        impersonate = random.choice(IMPERSONATE_OPTIONS)

        try:
            if _USE_CURL_CFFI:
                session_kwargs = {"impersonate": impersonate}
                if proxy:
                    session_kwargs["proxies"] = {"http": proxy, "https": proxy}

                with cffi_requests.Session(**session_kwargs) as session:
                    resp = session.get(
                        url,
                        headers=HEADERS,
                        cookies=cookies or None,
                        timeout=20,
                        allow_redirects=True,
                    )
            else:
                with cffi_requests.Session() as session:
                    req_kwargs = {
                        "headers": HEADERS,
                        "cookies": cookies or None,
                        "timeout": 20,
                        "allow_redirects": True,
                        "verify": False,
                    }
                    if proxy:
                        req_kwargs["proxies"] = {"http": proxy, "https": proxy}
                    resp = session.get(url, **req_kwargs)

            if spfa:
                spfa.record_status(resp.status_code)

            if not spfa and cookies_path and resp.cookies:
                cookies.update(dict(resp.cookies))
                save_cookies(cookies_path, cookies)

            if resp.status_code in (403, 429, 401):
                if attempt < MAX_RETRIES:
                    if spfa:
                        try:
                            spfa.handle_block()
                            cookies = spfa.get()
                        except Exception:
                            pass
                    rotate_ip()
                    time.sleep(RETRY_DELAY * attempt + random.uniform(1, 3))
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
