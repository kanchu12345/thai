import sys
import time
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8')

def test_initial_load():
    console_logs = []
    page_errors = []

    with sync_playwright() as p:
        browser = p.chromium.launch(channel='chrome', headless=True)
        context = browser.new_context(viewport={'width': 1440, 'height': 900})
        page = context.new_page()

        page.on('console', lambda msg: console_logs.append(f"[{msg.type}] {msg.text}"))
        page.on('pageerror', lambda err: page_errors.append(str(err)))

        print("Navigating to http://127.0.0.1:8089/admin/index.html...")
        page.goto('http://127.0.0.1:8089/admin/index.html', wait_until='networkidle', timeout=20000)
        time.sleep(2)

        print(f"Page title: {page.title()}")
        print(f"Auth wrapper visible: {page.is_visible('#authScreen')}")
        print(f"Admin app visible: {page.is_visible('#adminApp')}")

        print("\n--- Console Logs ---")
        for log in console_logs:
            print(" ", log)

        print("\n--- Page Errors ---")
        for err in page_errors:
            print(" ", err)

        browser.close()

if __name__ == '__main__':
    test_initial_load()
