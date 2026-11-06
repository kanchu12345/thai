import sys
import time
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8')

def test_full_flow():
    console_logs = []
    
    with sync_playwright() as p:
        browser = p.chromium.launch(channel='chrome', headless=True)
        context = browser.new_context(viewport={'width': 1440, 'height': 900})
        page = context.new_page()

        page.on('console', lambda msg: console_logs.append(f"[{msg.type}] {msg.text}"))
        page.on('pageerror', lambda err: console_logs.append(f"[UNCAUGHT] {err}"))

        page.goto('http://127.0.0.1:8089/admin/index.html', wait_until='load', timeout=15000)
        time.sleep(1)

        # Login as super_admin
        page.evaluate("""() => {
            AdminApp.currentUser = { email: 'admin@lotusceylon.com', id: 'admin-root' };
            AdminApp.currentRole = 'super_admin';
            AdminApp.showApp();
        }""")
        time.sleep(2)

        # Check all sidebar links
        sidebar_links = page.eval_on_selector_all('nav.sidebar-nav a.nav-link', """els => els.map(el => ({
            text: el.innerText.trim(),
            section: el.getAttribute('data-section'),
            doc: el.getAttribute('data-page-doc'),
            onclick: el.getAttribute('onclick')
        }))""")
        print(f"Total sidebar links: {len(sidebar_links)}")

        # Test switching every section
        sections = ['dashboard', 'inquiries', 'packages', 'categories', 'destinations', 'reviews', 'media', 'users', 'settings', 'team', 'page-editor', 'forms-editor', 'blog-posts']
        for sec in sections:
            page.evaluate(f"AdminApp.switchSection('{sec}')")
            time.sleep(0.2)

        # Test package modal
        page.evaluate("AdminApp.openPackageModal()")
        time.sleep(0.3)
        page.evaluate("AdminApp.closeModal('packageModal')")

        # Test category modal
        page.evaluate("AdminApp.openCategoryModal()")
        time.sleep(0.3)
        page.evaluate("AdminApp.closeModal('categoryModal')")

        # Test destination modal
        page.evaluate("AdminApp.openDestinationModal()")
        time.sleep(0.3)
        page.evaluate("AdminApp.closeModal('destinationModal')")

        # Test review modal
        page.evaluate("AdminApp.openReviewModal()")
        time.sleep(0.3)
        page.evaluate("AdminApp.closeModal('reviewModal')")

        # Test team modal
        page.evaluate("AdminApp.openTeamModal()")
        time.sleep(0.3)
        page.evaluate("AdminApp.closeModal('teamModal')")

        # Test blog modal
        page.evaluate("AdminApp.openBlogModal()")
        time.sleep(0.3)
        page.evaluate("AdminApp.closeBlogModal()")

        # Test media picker modal
        page.evaluate("AdminApp.openImagePicker('testInput')")
        time.sleep(0.3)
        page.evaluate("AdminApp.closeModal('mediaPickerModal')")

        time.sleep(1)

        print("\n--- ALL CONSOLE LOGS ---")
        for log in console_logs:
            print(log)

        browser.close()

if __name__ == '__main__':
    test_full_flow()
