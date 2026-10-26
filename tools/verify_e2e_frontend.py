import time
import os
from playwright.sync_api import sync_playwright

PORT = 8089
OUTPUT_DIR = "C:/Users/kanch/.gemini/antigravity/brain/b764be33-4f17-4a6c-973e-5b4163beb841/e2e_screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(channel="msedge", headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 900})
    
    console_logs = []
    page.on("console", lambda msg: console_logs.append(f"[{msg.type}] {msg.text}"))
    page.on("pageerror", lambda err: console_logs.append(f"[PAGE_ERROR] {err}"))

    print("1. Loading Home Page...")
    page.goto(f"http://localhost:{PORT}/index.html", wait_until="networkidle")
    time.sleep(2)

    # Check LotusCMS initialized
    cms_status = page.evaluate("""() => {
        return {
            hasCMS: typeof window.LotusCMS !== 'undefined',
            initialized: window.LotusCMS?.initialized,
            currentLang: window.LotusCMS?.currentLang,
            packagesCount: window.LotusCMS?.data?.packages?.length || window.LotusCMS?.data?.tours?.length,
            categoriesCount: window.LotusCMS?.data?.categories?.length,
            destinationsCount: window.LotusCMS?.data?.destinations?.length
        };
    }""")
    print("LotusCMS Status on Home Page:", cms_status)

    # Check package cards hydration
    cards_info = page.evaluate("""() => {
        const cards = Array.from(document.querySelectorAll('[data-tour-slug]'));
        return cards.slice(0, 3).map(c => ({
            slug: c.getAttribute('data-tour-slug'),
            title: c.querySelector('.heading--24, .tour-card-title')?.textContent?.trim(),
            days: c.querySelector('.paragraph--18, [data-cms="tour-days"]')?.textContent?.trim(),
            imgSrc: c.querySelector('img.slider-img.active, img')?.src
        }));
    }""")
    print("Hydrated Tour Cards (EN):", cards_info)

    # Take screenshot of EN home page
    en_shot = os.path.join(OUTPUT_DIR, "Public_Home_EN_Hydrated.png")
    page.screenshot(path=en_shot)
    print(f"Saved EN Home screenshot to {en_shot}")

    # Switch language to Chinese (zh)
    print("2. Switching language to Chinese...")
    page.evaluate("""() => {
        document.documentElement.lang = 'zh';
        window.LotusCMS.setLanguage('zh');
    }""")
    time.sleep(1)

    cards_info_zh = page.evaluate("""() => {
        const cards = Array.from(document.querySelectorAll('[data-tour-slug]'));
        return cards.slice(0, 3).map(c => ({
            slug: c.getAttribute('data-tour-slug'),
            title: c.querySelector('.heading--24, .tour-card-title')?.textContent?.trim(),
            desc: c.querySelector('.paragraph--14, .tour-card-desc')?.textContent?.trim()
        }));
    }""")
    print("Hydrated Tour Cards (ZH):", cards_info_zh)

    zh_shot = os.path.join(OUTPUT_DIR, "Public_Home_ZH_Hydrated.png")
    page.screenshot(path=zh_shot)
    print(f"Saved ZH Home screenshot to {zh_shot}")

    # Test Tour Detail Page
    print("3. Testing Tour Detail Page...")
    page.goto(f"http://localhost:{PORT}/tours/cultural/three-millennia-of-living-heritage/index.html", wait_until="networkidle")
    time.sleep(2)

    detail_info = page.evaluate("""() => {
        return {
            hasCMS: typeof window.LotusCMS !== 'undefined',
            title: document.querySelector('.hero-title-main')?.textContent?.trim(),
            tagline: document.querySelector('.tour-hero-tagline')?.textContent?.trim(),
            badge: document.querySelector('.tour-badge-gold')?.textContent?.trim(),
            phoneLink: document.querySelector('a[href^="tel:"]')?.href,
            emailLink: document.querySelector('a[href^="mailto:"]')?.href
        };
    }""")
    print("Tour Detail Page Info:", detail_info)

    detail_shot = os.path.join(OUTPUT_DIR, "Public_Tour_Detail_Hydrated.png")
    page.screenshot(path=detail_shot)
    print(f"Saved Tour Detail screenshot to {detail_shot}")

    print("Console errors count:", len([l for l in console_logs if "error" in l.lower()]))
    if any("error" in l.lower() for l in console_logs):
        for log in console_logs:
            if "error" in log.lower():
                print("  ", log)

    browser.close()

print("E2E Verification Complete!")
