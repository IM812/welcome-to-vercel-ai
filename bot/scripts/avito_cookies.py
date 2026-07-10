#!/usr/bin/env python3
"""
Automatic Avito cookie fetcher (ported from Duff89/parser_avito get_cookies.py).

Launches a stealth headless Chromium, visits a random avito.ru URL, and waits
for the JavaScript-set `ft` cookie to appear. Saves all cookies to a JSON file
that avito_fetch.py reads on every request.

This removes the need for users to manually paste cookies — the browser solves
the JS challenge itself.

Usage:
    python3 avito_cookies.py <output_path> [proxy]

Output (stdout, JSON):
    {"ok": true, "count": 12, "has_ft": true, "user_agent": "..."}
    {"ok": false, "error": "..."}
"""
import asyncio
import json
import random
import sys

OUTPUT_PATH = sys.argv[1] if len(sys.argv) > 1 else "storage/avito_cookies.json"
PROXY = sys.argv[2] if len(sys.argv) > 2 and sys.argv[2] not in ("null", "") else None

USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36"
)

STEALTH_JS = """
Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
Object.defineProperty(navigator, 'platform', { get: () => 'Win32' });
Object.defineProperty(navigator, 'vendor', { get: () => 'Google Inc.' });
window.chrome = { runtime: {} };
Object.defineProperty(navigator, 'plugins', { get: () => [1, 2, 3] });
Object.defineProperty(navigator, 'languages', { get: () => ['ru-RU', 'ru', 'en-US', 'en'] });
"""


def parse_proxy(proxy_string):
    """Parse ip:port@user:pass or ip:port:user:pass into Playwright proxy dict."""
    if not proxy_string:
        return None
    s = proxy_string.split("//")[-1]
    try:
        if "@" in s:
            ip_port, user_pass = s.split("@")
            if "." in user_pass:  # order reversed
                ip_port, user_pass = user_pass, ip_port
            login, password = user_pass.split(":")
        else:
            parts = s.split(":")
            login, password, ip, port = parts
            if "." in login:
                login, password, ip, port = ip, port, login, password
            ip_port = f"{ip}:{port}"
        server = ip_port if ip_port.startswith("http") else f"http://{ip_port}"
        return {"server": server, "username": login, "password": password}
    except Exception:
        return None


async def fetch_cookies():
    from playwright.async_api import async_playwright

    proxy = parse_proxy(PROXY)

    async with async_playwright() as p:
        launch_args = {
            "headless": True,
            "chromium_sandbox": False,
            "args": [
                "--disable-blink-features=AutomationControlled",
                "--no-sandbox",
                "--disable-dev-shm-usage",
                "--disable-gpu",
                "--window-size=1920,1080",
            ],
        }
        browser = await p.chromium.launch(**launch_args)

        context_args = {
            "user_agent": USER_AGENT,
            "viewport": {"width": 1920, "height": 1080},
            "locale": "ru-RU",
            "is_mobile": False,
            "has_touch": False,
        }
        if proxy:
            context_args["proxy"] = proxy

        context = await browser.new_context(**context_args)
        page = await context.new_page()
        await page.add_init_script(STEALTH_JS)

        # Random item URL — same trick Duff89 uses to trigger cookie set.
        ads_id = str(random.randint(1111111111, 9999999999))
        url = f"https://www.avito.ru/{ads_id}"

        try:
            await page.goto(url, timeout=60_000, wait_until="domcontentloaded")
        except Exception as e:
            await browser.close()
            return {"ok": False, "error": f"goto failed: {e}"}

        cookie_dict = {}
        for _ in range(12):
            title = (await page.title()).lower()
            if "проблема с ip" in title:
                await context.clear_cookies()
                await page.reload(timeout=60_000)
                await asyncio.sleep(3)
                continue

            raw = await page.evaluate("() => document.cookie")
            cookie_dict = dict(
                pair.split("=", 1) for pair in raw.split("; ") if "=" in pair
            )
            if cookie_dict.get("ft"):
                break
            await asyncio.sleep(5)

        # Also grab HttpOnly cookies from the context (document.cookie misses them).
        for c in await context.cookies():
            cookie_dict[c["name"]] = c["value"]

        await browser.close()

        if not cookie_dict.get("ft"):
            return {"ok": False, "error": "ft cookie not obtained", "count": len(cookie_dict)}

        with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
            json.dump(
                {"cookies": cookie_dict, "user_agent": USER_AGENT},
                f, ensure_ascii=False, indent=2,
            )

        return {
            "ok": True,
            "count": len(cookie_dict),
            "has_ft": True,
            "user_agent": USER_AGENT,
        }


def main():
    try:
        result = asyncio.run(fetch_cookies())
    except Exception as e:
        result = {"ok": False, "error": str(e)}
    sys.stdout.write(json.dumps(result))


if __name__ == "__main__":
    main()
