import os
import glob
import time
from playwright.sync_api import sync_playwright

PORT = 8089
BASE_URL = f"http://localhost:{PORT}"

PAGES_TO_TEST = [
    "index.html",
    "about.html",
    "sri-lanka-tours.html",
    "destinations.html",
    "experiences.html",
    "gallery.html",
    "blog.html",
    "reviews.html",
    "contact.html",
    "inquiry-quick.html",
    "inquiry-detailed.html",
    "beach-tours.html",
    "buddhist-heritage-tours.html",
    "terms-conditions.html",
    "privacy-policy.html",
    "cookie-policy.html",
    "cancellation-policy.html",
    "tours/index.html",
    "tours/cultural/index.html",
    "tours/cultural/three-millennia-of-living-heritage/index.html",
    "tours/wildlife/index.html",
    "tours/beach/index.html",
    "tours/hill-country/index.html",
    "admin/index.html"
]

all_errors = {}

with sync_playwright() as p:
    browser = p.chromium.launch(channel="chrome", headless=True)
    page = browser.new_page()

    for p_path in PAGES_TO_TEST:
        page_errors = []
        console_errors = []
        failed_requests = []

        def on_page_err(err):
            page_errors.append(str(err))

        def on_console(msg):
            if msg.type in ['error']:
                # Filter harmless external analytics or font notices if any
                console_errors.append(msg.text)

        def on_response(res):
            if res.status >= 400 and not res.url.endswith('favicon.ico'):
                failed_requests.append(f"{res.status} {res.url}")

        page.on('pageerror', on_page_err)
        page.on('console', on_console)
        page.on('response', on_response)

        try:
            url = f"{BASE_URL}/{p_path}"
            page.goto(url, wait_until="domcontentloaded", timeout=15000)
            time.sleep(0.3)
        except Exception as e:
            page_errors.append(f"Navigation error: {e}")

        # Remove listeners
        page.remove_listener('pageerror', on_page_err)
        page.remove_listener('console', on_console)
        page.remove_listener('response', on_response)

        if page_errors or console_errors or failed_requests:
            all_errors[p_path] = {
                "page_errors": page_errors,
                "console_errors": console_errors,
                "failed_requests": failed_requests
            }

    browser.close()

print(f"\nPages tested: {len(PAGES_TO_TEST)}")
print(f"Pages with errors: {len(all_errors)}")
for p, errs in all_errors.items():
    print(f"\n[{p}]")
    if errs['page_errors']:
        print("  Page Errors:", errs['page_errors'])
    if errs['console_errors']:
        print("  Console Errors:", errs['console_errors'])
    if errs['failed_requests']:
        print("  Failed Requests:", errs['failed_requests'])
