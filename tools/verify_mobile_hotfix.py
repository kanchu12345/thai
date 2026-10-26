from playwright.sync_api import sync_playwright
import os
import time

PORT = 8089
OUTPUT_DIR = "C:/Users/kanch/.gemini/antigravity/brain/b764be33-4f17-4a6c-973e-5b4163beb841/hotfix_screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

VIEWPORTS = [320, 360, 393, 412]

PAGES = [
    ("home", f"http://localhost:{PORT}/index.html"),
    ("tours_index", f"http://localhost:{PORT}/tours/index.html"),
    ("tour_detail", f"http://localhost:{PORT}/tours/cultural/three-millennia-of-living-heritage/index.html"),
    ("contact", f"http://localhost:{PORT}/contact.html"),
    ("inquiry_quick", f"http://localhost:{PORT}/inquiry-quick.html"),
    ("inquiry_detailed", f"http://localhost:{PORT}/inquiry-detailed.html")
]

results = []

with sync_playwright() as p:
    browser = p.chromium.launch(channel="msedge", headless=True)
    
    # 1. Multi-viewport scrollWidth vs clientWidth check
    print("=== MULTI-VIEWPORT OVERFLOW VALIDATION (320, 360, 393, 412px) ===")
    for width in VIEWPORTS:
        print(f"\n--- Testing at {width}px width ---")
        for page_name, url in PAGES:
            page = browser.new_page(viewport={"width": width, "height": 800})
            page.goto(url, wait_until="domcontentloaded")
            time.sleep(0.4)
            
            check = page.evaluate("""() => {
                const cW = document.documentElement.clientWidth;
                const sW = document.documentElement.scrollWidth;
                const bSW = document.body.scrollWidth;
                
                // Attempt sideways dragging
                window.scrollTo(100, 0);
                const scrolledX = window.scrollX;
                
                return {
                    clientWidth: cW,
                    scrollWidth: sW,
                    bodyScrollWidth: bSW,
                    scrolledX: scrolledX,
                    pass: (sW === cW && bSW <= cW && scrolledX === 0)
                };
            }""")
            
            status = "PASS" if check["pass"] else "FAIL"
            print(f"[{status}] {page_name} @ {width}px: cW={check['clientWidth']} sW={check['scrollWidth']} bSW={check['bodyScrollWidth']} scrollX={check['scrolledX']}")
            results.append({
                "page": page_name,
                "width": width,
                "pass": check["pass"],
                "data": check
            })
            page.close()

    # 2. Capture Verified Screenshots at 360px (Header, Open Menu, Footer)
    print("\n=== CAPTURING 360px SCREENSHOTS (HEADER, OPEN MENU, FOOTER) ===")
    
    # HOME
    page = browser.new_page(viewport={"width": 360, "height": 800})
    page.goto(f"http://localhost:{PORT}/index.html", wait_until="domcontentloaded")
    time.sleep(1)
    
    # Header screenshot
    header_el = page.locator("#siteHeader")
    header_shot = os.path.join(OUTPUT_DIR, "Home_Header_360px.png")
    header_el.screenshot(path=header_shot)
    print(f"Saved: {header_shot}")
    
    # Open mobile menu
    page.evaluate("() => { const b = document.getElementById('mobileHamToggle'); if(b) b.click(); }")
    time.sleep(0.6)
    # Expand tours accordion to show indented SVGs
    page.evaluate("() => { const t = document.getElementById('mobileToursToggle'); if(t) t.click(); }")
    time.sleep(0.4)
    menu_shot = os.path.join(OUTPUT_DIR, "Home_Mobile_Menu_Open_360px.png")
    page.screenshot(path=menu_shot)
    print(f"Saved: {menu_shot}")
    
    # Close menu and scroll to footer
    page.evaluate("() => { const c = document.getElementById('mobileNavClose'); if(c) c.click(); }")
    time.sleep(0.5)
    page.evaluate("() => window.scrollTo(0, document.body.scrollHeight)")
    time.sleep(1)
    footer_el = page.locator(".site-footer-walkers")
    footer_shot = os.path.join(OUTPUT_DIR, "Home_Footer_360px.png")
    footer_el.screenshot(path=footer_shot)
    print(f"Saved: {footer_shot}")
    page.close()

    # TOUR DETAIL
    page = browser.new_page(viewport={"width": 360, "height": 800})
    page.goto(f"http://localhost:{PORT}/tours/cultural/three-millennia-of-living-heritage/index.html", wait_until="domcontentloaded")
    time.sleep(1)
    detail_header = os.path.join(OUTPUT_DIR, "Tour_Detail_Header_360px.png")
    page.locator("#siteHeader").screenshot(path=detail_header)
    print(f"Saved: {detail_header}")
    page.evaluate("() => window.scrollTo(0, document.body.scrollHeight)")
    time.sleep(1)
    detail_footer = os.path.join(OUTPUT_DIR, "Tour_Detail_Footer_360px.png")
    page.locator(".site-footer-walkers").screenshot(path=detail_footer)
    print(f"Saved: {detail_footer}")
    page.close()

    # INQUIRY QUICK
    page = browser.new_page(viewport={"width": 360, "height": 800})
    page.goto(f"http://localhost:{PORT}/inquiry-quick.html", wait_until="domcontentloaded")
    time.sleep(1)
    inquiry_shot = os.path.join(OUTPUT_DIR, "Inquiry_Quick_Form_360px.png")
    page.screenshot(path=inquiry_shot)
    print(f"Saved: {inquiry_shot}")
    page.close()

    # CONTACT
    page = browser.new_page(viewport={"width": 360, "height": 800})
    page.goto(f"http://localhost:{PORT}/contact.html", wait_until="domcontentloaded")
    time.sleep(1)
    contact_shot = os.path.join(OUTPUT_DIR, "Contact_360px.png")
    page.screenshot(path=contact_shot)
    print(f"Saved: {contact_shot}")
    page.close()

    browser.close()

all_passed = all(r["pass"] for r in results)
print(f"\nFinal Result: {'ALL TESTS PASSED 100%' if all_passed else 'SOME TESTS FAILED'}")
