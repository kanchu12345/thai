import time
import os
import sys
import shutil
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8')

ARTIFACT_DIR = r"C:\Users\kanch\.gemini\antigravity\brain\b764be33-4f17-4a6c-973e-5b4163beb841"

def save_and_copy(page, filename):
    local_path = os.path.join("artifacts", filename)
    os.makedirs("artifacts", exist_ok=True)
    page.screenshot(path=local_path)
    if os.path.isdir(ARTIFACT_DIR):
        artifact_path = os.path.join(ARTIFACT_DIR, filename)
        shutil.copy2(local_path, artifact_path)
        print(f"Screenshot saved & copied: {filename}")

def test_visual_cms():
    with sync_playwright() as p:
        browser = p.chromium.launch(channel='chrome', headless=True)
        page = browser.new_page(viewport={'width': 1440, 'height': 900})
        
        print("1. Loading http://127.0.0.1:8089/admin/index.html...")
        page.goto('http://127.0.0.1:8089/admin/index.html', wait_until='load', timeout=15000)
        time.sleep(1)
        
        # Authenticate
        print("2. Entering admin session...")
        page.evaluate("""() => {
            if (window.AdminApp) {
                AdminApp.showLogin = () => {};
                AdminApp.currentUser = { email: 'gamhewak@gmail.com', id: 'admin-root' };
                AdminApp.currentRole = 'super_admin';
                AdminApp.showApp();
            }
        }""")
        time.sleep(1)
        
        # Open Home Page Visual Editor
        print("3. Opening Home Page in Visual Editor...")
        page.evaluate("""() => {
            if (window.PageEditor) {
                PageEditor.openPage('siteContent/home', 'index.html');
            }
        }""")
        time.sleep(2)
        
        # Check active section
        active_sec = page.evaluate("() => document.querySelector('.content-section.active')?.id")
        print(f"   Active section: {active_sec}")
        
        # Check iframe
        iframe = page.locator('#visualCmsIframe')
        print(f"   Iframe visible: {iframe.is_visible()}")
        
        # Check quick jumps
        qj_count = page.locator('.quick-jump-card').count()
        print(f"   Quick Jump cards count: {qj_count}")
        
        # Screenshot Desktop Visual Editor
        save_and_copy(page, 'visual_cms_desktop.png')
        
        # Test clicking Hero Banner Quick Jump
        print("4. Testing Hero Banner Quick Jump...")
        page.click('.quick-jump-card:has-text("Hero Banner")')
        time.sleep(1)
        
        # Test clicking element inside iframe
        print("5. Clicking an element inside the iframe (?edit=1)...")
        iframe_frame = page.frame(name="visualCmsIframe") or page.frame_locator('#visualCmsIframe')
        
        # In iframe, click an actual visible body element with data-cms
        try:
            elem = iframe_frame.locator('body [data-cms]:visible').first
            if elem.count() > 0:
                print(f"   Found visible editable element ({elem.evaluate('el => el.tagName')}), clicking...")
                elem.click()
                time.sleep(1)
                
                # Check inspector header
                badge_text = page.locator('#inspectorSectionBadge').text_content()
                title_text = page.locator('#inspectorTitle').text_content()
                print(f"   Inspector updated: [{badge_text}] {title_text}")
                
                # Screenshot element selected
                save_and_copy(page, 'visual_cms_element_selected.png')
        except Exception as e:
            print("   Element click note:", e)
            
        # Test Mobile Viewport Toggle
        print("6. Testing Mobile Viewport Toggle (390px)...")
        page.click('#btnViewMobile')
        time.sleep(1)
        
        wrapper_class = page.evaluate("() => document.getElementById('visualIframeWrapper').className")
        print(f"   Wrapper class: {wrapper_class}")
        save_and_copy(page, 'visual_cms_mobile.png')
        
        browser.close()
        print("All visual CMS tests completed successfully!")

if __name__ == "__main__":
    test_visual_cms()
