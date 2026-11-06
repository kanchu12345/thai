from playwright.sync_api import sync_playwright
import time

failed_urls = []

with sync_playwright() as p:
    browser = p.chromium.launch(channel='chrome', headless=True)
    page = browser.new_page()
    page.on('response', lambda r: failed_urls.append(r.url) if r.status == 404 else None)

    page.goto('http://127.0.0.1:8089/admin/index.html', wait_until='load')
    time.sleep(1)
    page.fill('#loginEmail', 'admin@lotusceylon.com')
    page.fill('#loginPassword', 'LotusCeylon@2026')
    page.click('#loginBtn')
    page.wait_for_selector('#adminApp', state='visible', timeout=10000)

    # Run the 13 section switches
    sections = ['dashboard', 'inquiries', 'packages', 'categories', 'destinations', 'reviews', 'media', 'users', 'settings', 'team', 'page-editor', 'forms-editor', 'blog-posts']
    for s in sections:
        page.evaluate(f"AdminApp.switchSection('{s}')")
        time.sleep(0.3)

    # Now check category save
    print("Testing category save...")
    page.evaluate("AdminApp.switchSection('categories')")
    time.sleep(0.5)
    page.evaluate("AdminApp.openCategoryModal()")
    time.sleep(0.5)
    page.fill('#catTitle', 'Sacred Ceylon Pilgrimages')
    page.fill('#catSlug', 'sacred-ceylon-pilgrimages')
    page.fill('#catTagline', 'Timeless spiritual sanctuaries')
    
    save_err = page.evaluate("""async () => {
        try {
            await AdminApp.saveCategory();
            return null;
        } catch(e) {
            return e.toString();
        }
    }""")
    print("saveCategory thrown error:", save_err)

    time.sleep(1)
    cats_in_storage = page.evaluate("() => localStorage.getItem('lotus_data_payload')")
    print("Does lotus_data_payload contain 'sacred-ceylon-pilgrimages':", 'sacred-ceylon-pilgrimages' in (cats_in_storage or ""))
    print("lotus_data_payload length:", len(cats_in_storage) if cats_in_storage else 0)

    # Check the 10 languages
    languages = ['en', 'fr', 'de', 'zh-CN', 'ja', 'ar', 'hi', 'it', 'ru', 'es']
    for lang in languages:
        page.goto(f"http://127.0.0.1:8089/index.html?lang={lang}", wait_until='load')
        time.sleep(0.2)

    page.goto("http://127.0.0.1:8089/tours/index.html", wait_until='load')
    page.goto("http://127.0.0.1:8089/tours/cultural-heritage/index.html", wait_until='load')
    page.goto("http://127.0.0.1:8089/tours/cultural-heritage/sacred-footsteps/index.html", wait_until='load')

    print("\nAll 404 URLs encountered:")
    for u in failed_urls:
        print("  404:", u)

    browser.close()
