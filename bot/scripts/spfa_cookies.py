"""
spfa_cookies.py — port of Duff89/parser_avito parser/cookies/external_api.py

Talks to the spfa.ru cookie service, which supplies working Avito cookies
automatically (~12 RUB per cookie set, lasts ~12h). This is what makes the
parser run unattended on a server: on a 403/429 the service either unblocks
the current cookies or buys a fresh set.

API endpoints (https://spfa.ru/api):
  POST /cookies/   {api_key}            -> buy a new cookie set
  POST /unblock/   {id, api_key}        -> ask service to unblock a set

Storage file (JSON):
  {"id": "...", "cookies": {...}, "saved_at": 123, "status_history": [...],
   "last_purchase_at": 123}
"""
import json
import time
import os

try:
    import requests
except ImportError:
    requests = None

API_URL = "https://spfa.ru/api"

MAX_STATUS_HISTORY = 20
PURCHASE_COOLDOWN = 600      # 10 min between purchases
UNBLOCK_TIMEOUT = 300        # 5 min max wait for unblock
PAUSE_FOR_ERROR = 120
NOT_BALANCE = 300
WAIT_FIRST_FOR_UNBLOCK = 5
WAIT_FOR_NEW = 3
WAIT_FOR_UNBLOCK = 10

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0.0.0 Safari/537.36"
    ),
    "Accept": "application/json",
    "Content-Type": "application/json",
}


class SpfaCookiesProvider:
    def __init__(self, api_key: str, storage_path: str = "storage/cookies_external.json"):
        self.api_key = api_key
        self.storage_path = storage_path
        self.last_id = None
        self.last_cookies = None
        self.status_history = []
        self.last_purchase_at = None
        self.unblock_started_at = None
        self._load_from_disk()

    # ---- public API ----

    def get(self) -> dict:
        """Return current cookies, buying a set if we have none."""
        if self.last_cookies:
            return self.last_cookies
        return self._get_new_cookies()

    def record_status(self, code: int):
        """Record an HTTP status code from a parser request."""
        if code is None:
            return
        last = self.status_history[-1] if self.status_history else None
        self.status_history.append(code)
        if len(self.status_history) > MAX_STATUS_HISTORY:
            self.status_history.pop(0)
        if code != last or code in (403, 429) or last is None:
            self._save_to_disk()

    def handle_block(self):
        """Try to unblock current cookies; buy new ones if needed."""
        now = time.time()

        if not self.last_id:
            self._get_new_cookies()
            return

        # If all recent codes are bad and cooldown passed -> buy new
        if self.last_purchase_at and (now - self.last_purchase_at) < PURCHASE_COOLDOWN:
            pass  # too soon to buy, go to unblock
        elif (
            len(self.status_history) >= MAX_STATUS_HISTORY
            and all(c in (403, 429) for c in self.status_history[-MAX_STATUS_HISTORY:])
        ):
            self._get_new_cookies()
            return

        if self.unblock_started_at:
            elapsed = now - self.unblock_started_at
            if elapsed < UNBLOCK_TIMEOUT:
                return
            self.unblock_started_at = None

        try:
            res = requests.post(
                f"{API_URL}/unblock/",
                json={"id": self.last_id, "api_key": self.api_key},
                headers=HEADERS,
                timeout=15,
            )
        except Exception:
            self._get_new_cookies()
            return

        if res.status_code in (200, 202):
            self.unblock_started_at = now
            time.sleep(WAIT_FIRST_FOR_UNBLOCK)
            return
        if res.status_code == 409:
            self.unblock_started_at = self.unblock_started_at or now
            time.sleep(WAIT_FOR_UNBLOCK)
            return
        if res.status_code == 503:
            time.sleep(PAUSE_FOR_ERROR)
            return

        # 410 expired / 403 no balance / 404 not found -> buy new
        self.unblock_started_at = None
        self._get_new_cookies()

    # ---- internal ----

    def _get_new_cookies(self) -> dict:
        res = requests.post(
            f"{API_URL}/cookies/",
            json={"api_key": self.api_key},
            headers=HEADERS,
            timeout=15,
        )
        if not res.ok:
            time.sleep(PAUSE_FOR_ERROR)
            res.raise_for_status()

        data = res.json().get("results", {})
        self.last_id = data.get("id")
        self.last_cookies = data.get("cookies")
        if not self.last_id or not self.last_cookies:
            raise RuntimeError("spfa returned incomplete cookies")

        self.last_purchase_at = time.time()
        self.status_history.clear()
        self._save_to_disk()
        time.sleep(WAIT_FOR_NEW)
        return self.last_cookies

    def _save_to_disk(self):
        try:
            os.makedirs(os.path.dirname(self.storage_path), exist_ok=True)
            with open(self.storage_path, "w", encoding="utf-8") as f:
                json.dump({
                    "id": self.last_id,
                    "cookies": self.last_cookies,
                    "saved_at": time.time(),
                    "status_history": self.status_history,
                    "last_purchase_at": self.last_purchase_at,
                }, f, ensure_ascii=False, indent=2)
        except Exception:
            pass

    def _load_from_disk(self):
        if not os.path.exists(self.storage_path):
            return
        try:
            with open(self.storage_path, "r", encoding="utf-8") as f:
                data = json.load(f)
            self.last_id = data.get("id")
            self.last_cookies = data.get("cookies")
            self.status_history = data.get("status_history", [])
            self.last_purchase_at = data.get("last_purchase_at")
        except Exception:
            pass
