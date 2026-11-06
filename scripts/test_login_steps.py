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

    print("Submitting login...")
    page.fill('#loginEmail', 'admin@lotusceylon.com')
    page.fill('#loginPassword', 'LotusCeylon@2026')
    page.click('#loginBtn')

    for i in range(10):
        time.sleep(0.5)
        state = page.evaluate("""() => ({
            authDisplay: document.getElementById('authScreen').style.display,
            appDisplay: document.getElementById('adminApp').style.display,
            currentUser: window.AdminApp.currentUser,
            currentRole: window.AdminApp.currentRole,
            activeSection: window.AdminApp.activeSection
        })""")
        print(f"Step {i}: {state}")
        if state['appDisplay'] == 'grid':
            print("App became visible!")
            break

    browser.close()
