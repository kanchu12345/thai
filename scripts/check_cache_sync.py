from playwright.sync_api import sync_playwright
import time
import sys
sys.stdout.reconfigure(encoding='utf-8')

with sync_playwright() as p:
    browser = p.chromium.launch(channel='chrome', headless=True)
    page = browser.new_page()
    page.goto('http://127.0.0.1:8089/admin/index.html', wait_until='load')
    time.sleep(1)
    page.fill('#loginEmail', 'admin@lotusceylon.com')
    page.fill('#loginPassword', 'LotusCeylon@2026')
    page.click('#loginBtn')
    page.wait_for_selector('#adminApp', state='visible', timeout=10000)
    
    page.evaluate('AdminApp.openDestinationModal()')
    time.sleep(0.5)
    page.fill('#destTitle', 'Jaffna Peninsula & Nainativu')
    page.fill('#destSlug', 'jaffna-peninsula')
    page.evaluate('async () => await AdminApp.saveDestination()')
    time.sleep(1)
    res = page.evaluate('''() => {
        const raw = localStorage.getItem("lotus_data_payload");
        const c = JSON.parse(raw || "{}");
        return {
            hasDest: (c.destinations || []).some(x => x.slug === 'jaffna-peninsula'),
            dests: (c.destinations || []).map(x => x.slug)
        };
    }''')
    print('Result:', res)
    browser.close()
