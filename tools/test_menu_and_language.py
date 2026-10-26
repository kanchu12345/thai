import time
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    b = p.chromium.launch(channel="chrome", headless=True)
    # Test on mobile viewport for hamburger menu
    page = b.new_page(viewport={"width": 390, "height": 844})
    page.goto("http://localhost:8089/index.html", wait_until="domcontentloaded")
    time.sleep(0.5)

    # 1. Test Mobile Hamburger Open
    ham_btn = page.query_selector("#mobileHamToggle")
    drawer = page.query_selector("#mobileNavFullscreen")
    
    print("Hamburger button present:", ham_btn is not None)
    if ham_btn:
        ham_btn.click()
        time.sleep(0.4)
        is_open = page.evaluate("() => document.getElementById('mobileNavFullscreen').classList.contains('is-open')")
        aria_exp = page.evaluate("() => document.getElementById('mobileHamToggle').getAttribute('aria-expanded')")
        print("Menu opened successfully:", is_open)
        print("Aria expanded:", aria_exp)

        # 2. Test Accordion expansion
        acc_toggle = page.query_selector("#mobileToursToggle")
        if acc_toggle:
            acc_toggle.click()
            time.sleep(0.3)
            submenu_open = page.evaluate("() => document.getElementById('mobileToursSubmenu').classList.contains('is-expanded')")
            print("Tours accordion expanded:", submenu_open)

        # 3. Test Close button
        close_btn = page.query_selector("#mobileNavClose")
        if close_btn:
            close_btn.click()
            time.sleep(0.4)
            is_closed = page.evaluate("() => !document.getElementById('mobileNavFullscreen').classList.contains('is-open')")
            print("Menu closed successfully:", is_closed)

    # 4. Test Desktop Language Switching
    page_desktop = b.new_page(viewport={"width": 1440, "height": 900})
    page_desktop.goto("http://localhost:8089/index.html", wait_until="domcontentloaded")
    time.sleep(0.5)

    # Click Language pill toggle
    lang_toggle = page_desktop.query_selector("#langPillToggle")
    if lang_toggle:
        lang_toggle.click()
        time.sleep(0.3)
        menu_active = page_desktop.evaluate("() => document.getElementById('langPillMenu').classList.contains('is-active')")
        print("Language menu toggle opened:", menu_active)

        # Click Chinese language button (data-lang="zh-CN" or "zh-TW")
        zh_btn = page_desktop.query_selector("#langPillMenu button[data-lang='zh-CN']") or page_desktop.query_selector("#langPillMenu button[data-lang='zh']")
        if zh_btn:
            zh_btn.click()
            time.sleep(0.5)
            stored_lang = page_desktop.evaluate("() => localStorage.getItem('lotus_lang')")
            doc_lang = page_desktop.evaluate("() => document.documentElement.lang")
            print("Language switched successfully to:", stored_lang, "(HTML lang:", doc_lang, ")")

    b.close()
