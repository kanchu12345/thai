import os
import sys
import time
import shutil
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8')

ARTIFACT_DIR = r"C:\Users\kanch\.gemini\antigravity\brain\b764be33-4f17-4a6c-973e-5b4163beb841"

def save_and_copy_screenshot(page, name):
    local_path = os.path.join("artifacts", name)
    os.makedirs("artifacts", exist_ok=True)
    page.screenshot(path=local_path)
    
    if os.path.isdir(ARTIFACT_DIR):
        artifact_path = os.path.join(ARTIFACT_DIR, name)
        shutil.copy2(local_path, artifact_path)
        print(f"Saved & copied to artifact dir: {name}")
    else:
        print(f"Saved local screenshot: {name}")

def test_admin_phase3():
    console_errors = []
    
    with sync_playwright() as p:
        browser = p.chromium.launch(channel='chrome', headless=True)
        context = browser.new_context(viewport={'width': 1440, 'height': 900})
        page = context.new_page()

        def handle_console(msg):
            if msg.type == 'error':
                text = msg.text
                if 'favicon' not in text and 'firebase' not in text.lower():
                    console_errors.append(text)

        page.on('console', handle_console)
        
        print("1. Navigating to http://127.0.0.1:8089/admin/index.html...")
        page.goto('http://127.0.0.1:8089/admin/index.html', wait_until='load', timeout=15000)
        time.sleep(1.5)

        # 1. Bypass auth screen to enter test admin session
        print("2. Bypassing auth screen with AdminApp.showApp()...")
        page.evaluate("""() => {
            if (window.AdminApp) {
                AdminApp.showLogin = () => {};
                AdminApp.currentUser = { email: 'superadmin@lotusceylon.com', id: 'admin-root' };
                AdminApp.currentRole = 'super_admin';
                AdminApp.showApp();
            }
        }""")
        time.sleep(1)

        # 2. Test opening Home Page in Page Editor
        print("3. Opening Home Page in Page Editor...")
        page.click('a[data-page-doc="siteContent/home"]')
        time.sleep(1.5)

        page_editor_sec = page.locator('#section-page-editor')
        assert page_editor_sec.is_visible(), "Page Editor section is not visible!"
        
        editor_title = page.locator('#pageEditorTitle').text_content()
        print(f"   Editor Title: {editor_title}")
        assert 'Home Page' in editor_title, f"Unexpected editor title: {editor_title}"

        field_count = page.locator('#pageEditorFieldCount').text_content()
        print(f"   Field count badge: {field_count}")

        # Check accordions
        accordions = page.locator('.cms-accordion-card').count()
        print(f"   Number of accordions generated: {accordions}")
        assert accordions > 0, "No accordions rendered!"

        # Screenshot 1: Home Page Editor
        save_and_copy_screenshot(page, 'admin_page_editor_home.png')

        # 3. Test Search Filter
        print("4. Testing search filter...")
        page.fill('#pageEditorSearch', 'hero')
        time.sleep(0.5)
        visible_fields = page.locator('.cms-field-wrap:visible').count()
        print(f"   Visible fields matching 'hero': {visible_fields}")
        assert visible_fields > 0, "No fields matched search 'hero'!"
        page.fill('#pageEditorSearch', '') # clear
        time.sleep(0.5)

        # 4. Test 10-Language Tabs
        print("5. Testing 10-language tabs...")
        zh_pill = page.locator('.cms-lang-tab-pill[data-lang="zh-CN"]').first
        if zh_pill.is_visible():
            zh_pill.click()
            time.sleep(0.3)
            print("   Switched to zh-CN tab successfully.")

        # Test RTL tab (ar)
        ar_pill = page.locator('.cms-lang-tab-pill[data-lang="ar"]').first
        if ar_pill.is_visible():
            ar_pill.click()
            time.sleep(0.3)
            ar_pane = page.locator('.cms-lang-field-pane[id*="_ar"]:visible').first
            dir_attr = ar_pane.locator('input, textarea').first.get_attribute('dir')
            print(f"   Arabic input dir attribute: {dir_attr}")
            assert dir_attr == 'rtl', f"Expected dir='rtl', got {dir_attr}"

        # Screenshot 2: Language Tabs in Page Editor
        save_and_copy_screenshot(page, 'admin_page_editor_langs.png')

        # 5. Test Extended Tour Package Editor Modal
        print("6. Testing Tour Package modal extensions...")
        page.click('a[data-section="packages"]')
        time.sleep(0.8)
        page.click('#section-packages button:has-text("+ Add Tour Package")')
        time.sleep(1.0)

        modal = page.locator('#packageModal')
        assert modal.is_visible(), "Package modal did not open!"
        
        route_input = page.locator('#pkgRoute')
        assert route_input.is_visible(), "pkgRoute input is missing!"
        route_input.fill("Colombo → Sigiriya → Kandy → Nuwara Eliya → Yala → Galle")

        promo_video = page.locator('#pkgPromoVideo')
        assert promo_video.is_visible(), "pkgPromoVideo input is missing!"
        promo_video.fill("assets/videos/sigiriya-aerial.mp4")

        # Test FAQ repeater
        print("   Testing FAQ repeater in Package Modal...")
        page.click('button:has-text("+ Add FAQ")')
        time.sleep(0.3)
        faq_items = page.locator('.faq-repeater-item').count()
        print(f"   FAQ items count: {faq_items}")
        assert faq_items > 0, "FAQ repeater item was not added!"

        # Screenshot 3: Extended Package Modal
        save_and_copy_screenshot(page, 'admin_package_modal_extended.png')

        page.click('#packageModal .modal-close')
        time.sleep(0.5)

        # 6. Test Form Configurations Editor
        print("7. Testing Form Configurations section...")
        page.click('a[data-section="forms-editor"]')
        time.sleep(0.8)
        forms_sec = page.locator('#section-forms-editor')
        assert forms_sec.is_visible(), "Forms Editor section is not visible!"

        form_title = page.locator('#formEditorActiveTitle').text_content()
        print(f"   Form Editor Active Title: {form_title}")

        # Screenshot 4: Forms Editor
        save_and_copy_screenshot(page, 'admin_forms_editor.png')

        # 7. Test Blog Posts Management
        print("8. Testing Blog Posts section...")
        page.click('a[data-section="blog-posts"]')
        time.sleep(0.8)
        blog_sec = page.locator('#section-blog-posts')
        assert blog_sec.is_visible(), "Blog section is not visible!"

        blog_rows = page.locator('#blogPostsTableBody tr').count()
        print(f"   Blog posts count in table: {blog_rows}")
        assert blog_rows > 0, "No blog post rows found!"

        # Test New Blog Post Modal
        page.click('#section-blog-posts button:has-text("+ New Blog Post")')
        time.sleep(0.8)
        blog_modal = page.locator('#blogPostModal')
        assert blog_modal.is_visible(), "Blog Post modal did not open!"

        # Screenshot 5: Blog Posts Modal
        save_and_copy_screenshot(page, 'admin_blog_modal.png')

        page.click('#blogPostModal .modal-close')
        time.sleep(0.5)

        # 8. Check console errors
        print(f"9. Checking recorded console errors: {len(console_errors)}")
        if console_errors:
            for err in console_errors:
                print(f"  - Console Error: {err}")
        assert len(console_errors) == 0, f"Found {len(console_errors)} JavaScript errors!"

        browser.close()
        print("\n=======================================================")
        print("ALL PHASE 3 AUTOMATED TESTS PASSED WITH 100% SUCCESS!")
        print("=======================================================")

if __name__ == '__main__':
    test_admin_phase3()
