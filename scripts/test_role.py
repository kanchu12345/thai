import sys
import time
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8')
BASE_URL = "http://127.0.0.1:8089"

with sync_playwright() as p:
    browser = p.chromium.launch(channel='chrome', headless=True)
    page = browser.new_page()
    page.goto(f"{BASE_URL}/admin/index.html", wait_until='load')
    time.sleep(1)

    res = page.evaluate("""async () => {
        const u = { email: 'admin@lotusceylon.com', id: 'test_uid' };
        window.AdminApp.currentUser = u;
        const authRes = await window.AdminApp.fetchUserRole(u.id, u.email);
        return { authRes, role: window.AdminApp.currentRole };
    }""")
    print("fetchUserRole result:", res)
    browser.close()
