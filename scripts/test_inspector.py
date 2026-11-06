from playwright.sync_api import sync_playwright
import time
import sys
sys.stdout.reconfigure(encoding='utf-8')

BASE_URL = "http://127.0.0.1:8089"

with sync_playwright() as p:
    browser = p.chromium.launch(channel='chrome', headless=True)
    page = browser.new_page()
    page.goto(f"{BASE_URL}/admin/index.html", wait_until='load')
    time.sleep(1)
    page.fill('#loginEmail', 'admin@lotusceylon.com')
    page.fill('#loginPassword', 'LotusCeylon@2026')
    page.click('#loginBtn')
    page.wait_for_selector('#adminApp', state='visible', timeout=10000)

    page.evaluate("AdminApp.switchSection('page-editor')")
    time.sleep(0.5)

    # Test Header
    page.evaluate("PageEditor.openGlobalDoc('siteGlobal/header', 'Header & Topbar')")
    time.sleep(0.8)
    text = page.inner_text('#inspectorBody')
    print("Header inspector text length:", len(text))
    print("Header inspector preview:", text[:200])

    browser.close()
