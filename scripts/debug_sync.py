from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch(channel='chrome', headless=True)
    page = browser.new_page()
    page.goto('http://127.0.0.1:8089/admin/index.html', wait_until='load')
    page.fill('#loginEmail', 'admin@lotusceylon.com')
    page.fill('#loginPassword', 'LotusCeylon@2026')
    page.click('#loginBtn')
    page.wait_for_selector('#adminApp', state='visible')

    sections = ['dashboard', 'inquiries', 'packages', 'categories', 'destinations', 'reviews', 'media', 'users', 'settings', 'team', 'page-editor', 'forms-editor', 'blog-posts']
    for s in sections:
        page.evaluate(f"AdminApp.switchSection('{s}')")
        time.sleep(0.1)

    page.evaluate("AdminApp.openCategoryModal()")
    time.sleep(0.5)
    page.fill('#catTitle', 'Sacred Ceylon Pilgrimages')
    page.fill('#catSlug', 'sacred-ceylon-pilgrimages')

    vals = page.evaluate("() => ({ title: document.getElementById('catTitle').value, slug: document.getElementById('catSlug').value, id: document.getElementById('catId').value })")
    print('DOM input values:', vals)

    print('Calling AdminApp.saveCategory()...')
    save_result = page.evaluate("""async () => {
        try {
            await AdminApp.saveCategory();
            return { ok: true, categoriesCount: AdminApp.categories.length, hasSlug: AdminApp.categories.some(c => c.slug === 'sacred-ceylon-pilgrimages') };
        } catch(e) {
            return { ok: false, error: e.toString(), stack: e.stack };
        }
    }""")
    print('Save result:', save_result)

    payload = page.evaluate("() => localStorage.getItem('lotus_data_payload')")
    print('lotus_data_payload has sacred-ceylon-pilgrimages:', 'sacred-ceylon-pilgrimages' in (payload or ""))

    browser.close()
