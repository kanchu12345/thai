import sys
import time
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8')

def test_network_errors():
    failed_requests = []
    
    with sync_playwright() as p:
        browser = p.chromium.launch(channel='chrome', headless=True)
        context = browser.new_context(viewport={'width': 1440, 'height': 900})
        page = context.new_page()

        def handle_response(response):
            if response.status >= 400:
                failed_requests.append({
                    "url": response.url,
                    "status": response.status,
                    "statusText": response.status_text
                })

        page.on('response', handle_response)
        page.on('requestfailed', lambda req: failed_requests.append({
            "url": req.url,
            "status": "FAILED",
            "statusText": req.failure
        }))

        print("Loading admin...")
        page.goto('http://127.0.0.1:8089/admin/index.html', wait_until='load', timeout=15000)
        time.sleep(1)

        # Login
        page.evaluate("""() => {
            AdminApp.currentUser = { email: 'admin@lotusceylon.com', id: 'admin-root' };
            AdminApp.currentRole = 'super_admin';
            AdminApp.showApp();
        }""")
        time.sleep(2)

        # Visit all sections
        sections = ['dashboard', 'inquiries', 'packages', 'categories', 'destinations', 'reviews', 'media', 'users', 'settings', 'team', 'page-editor', 'forms-editor', 'blog-posts']
        for sec in sections:
            page.evaluate(f"AdminApp.switchSection('{sec}')")
            time.sleep(0.3)

        time.sleep(1)

        print("\n--- FAILED NETWORK REQUESTS (404/403/ERRORS) ---")
        for req in failed_requests:
            print(f"[{req['status']}] {req['url']}")

        browser.close()

if __name__ == '__main__':
    test_network_errors()
