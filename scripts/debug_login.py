import sys
import time
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8')
BASE_URL = "http://127.0.0.1:8089"

with sync_playwright() as p:
    browser = p.chromium.launch(channel='chrome', headless=True)
    page = browser.new_page()
    page.on('console', lambda m: print(f"CONSOLE [{m.type}]: {m.text}"))
    page.goto(f"{BASE_URL}/admin/index.html", wait_until='load')
    time.sleep(1)

    page.fill('#loginEmail', 'admin@lotusceylon.com')
    page.fill('#loginPassword', 'LotusCeylon@2026')
    print("Clicking login...")
    page.click('#loginBtn')
    time.sleep(3)

    app_visible = page.is_visible('#adminApp')
    auth_visible = page.is_visible('#authScreen')
    current_user = page.evaluate("() => window.AdminApp ? window.AdminApp.currentUser : null")
    current_role = page.evaluate("() => window.AdminApp ? window.AdminApp.currentRole : null")
    toasts = page.inner_text('#toastContainer') if page.is_visible('#toastContainer') else "No toasts"

    print(f"app_visible: {app_visible}")
    print(f"auth_visible: {auth_visible}")
    print(f"current_user: {current_user}")
    print(f"current_role: {current_role}")
    print(f"toasts: {toasts}")

    browser.close()
