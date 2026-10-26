import time
from playwright.sync_api import sync_playwright

PORT = 8089
BASE_URL = f"http://localhost:{PORT}"

with sync_playwright() as p:
    browser = p.chromium.launch(channel="chrome", headless=True)
    page = browser.new_page()

    # 1. Test Keyboard Modal Close (Escape key)
    page.goto(f"{BASE_URL}/gallery.html", wait_until="domcontentloaded")
    time.sleep(0.4)
    page.click(".gallery-card")
    time.sleep(0.3)
    modal_opened = page.evaluate("() => document.getElementById('lightboxModal').classList.contains('is-active')")
    page.keyboard.press("Escape")
    time.sleep(0.3)
    modal_closed = page.evaluate("() => !document.getElementById('lightboxModal').classList.contains('is-active')")
    print("Gallery Lightbox Keyboard Escape Close:", modal_opened and modal_closed)

    # 2. Test Tab Navigation on Inquiry Form
    page.goto(f"{BASE_URL}/inquiry-quick.html", wait_until="domcontentloaded")
    time.sleep(0.4)
    page.focus("#fullName")
    page.keyboard.type("Keyboard User")
    page.keyboard.press("Tab")
    
    # Check that focus moved to next interactive input
    active_id = page.evaluate("() => document.activeElement ? (document.activeElement.id || document.activeElement.name) : ''")
    print("Tab moved focus from fullName to:", active_id)

    # 3. Test Keyboard Escape on Country Dropdown
    page.focus("#countrySearchInput")
    time.sleep(0.2)
    wrapper_open = page.evaluate("() => document.getElementById('countryPickerWrapper').classList.contains('open')")
    page.keyboard.press("Escape")
    time.sleep(0.2)
    wrapper_closed = page.evaluate("() => !document.getElementById('countryPickerWrapper').classList.contains('open')")
    print("Country Dropdown Escape key dismiss:", wrapper_open and wrapper_closed)

    browser.close()
