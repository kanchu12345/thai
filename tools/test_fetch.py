from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch(channel='msedge', headless=True)
    page = browser.new_page()
    console_msgs = []
    page.on('console', lambda m: console_msgs.append(f'[{m.type}] {m.text}'))
    page.on('pageerror', lambda e: console_msgs.append(f'[ERR] {e}'))

    page.goto('http://localhost:8089/admin/index.html', wait_until='networkidle')
    time.sleep(2)

    page.evaluate('() => window.AdminApp.showApp()')
    time.sleep(1)

    print('Calling AdminApp.fetchFromFirebase()...')
    res = page.evaluate('''async () => {
        try {
            await window.AdminApp.fetchFromFirebase();
            return { success: true };
        } catch(e) {
            return { success: false, err: e.message };
        }
    }''')
    print('Result:', res)
    time.sleep(2)
    toasts = page.evaluate("() => Array.from(document.querySelectorAll('.toast')).map(t => t.innerText)")
    print('Toasts:', toasts)
    print('Console logs:')
    for msg in console_msgs[-10:]:
        print(' ', msg)
    browser.close()
