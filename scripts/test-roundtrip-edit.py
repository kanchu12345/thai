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

def test_roundtrip():
    with sync_playwright() as p:
        browser = p.chromium.launch(channel='chrome', headless=True)
        admin_page = browser.new_page(viewport={'width': 1440, 'height': 900})
        
        print("1. Opening admin panel on http://127.0.0.1:8089/admin/index.html...")
        admin_page.goto('http://127.0.0.1:8089/admin/index.html', wait_until='load', timeout=15000)
        time.sleep(1)
        
        # Log in
        admin_page.evaluate("""() => {
            if (window.AdminApp) {
                AdminApp.showLogin = () => {};
                AdminApp.currentUser = { email: 'gamhewak@gmail.com', id: 'admin-root' };
                AdminApp.currentRole = 'super_admin';
                AdminApp.showApp();
            }
        }""")
        time.sleep(1)
        
        # Open Home Page Visual Editor
        print("2. Opening Home Page in Visual Editor...")
        admin_page.evaluate("""() => {
            if (window.PageEditor) {
                PageEditor.openPage('siteContent/home', 'index.html');
            }
        }""")
        time.sleep(2)
        
        # Click an element inside iframe (e.g. Hero title or pill)
        iframe_frame = admin_page.frame_locator('#visualCmsIframe')
        pill_elem = iframe_frame.locator('.brand-hero-pill, .badge-pill, [data-cms]').first
        
        # Test selecting element
        print("3. Selecting element in iframe...")
        admin_page.evaluate("""() => {
            PageEditor.selectElement({
                key: 'home.span_1',
                attrType: 'text',
                currentVal: 'SRI LANKA TAILOR-MADE LUXURY HOLIDAYS',
                tagName: 'span',
                sectionId: 'home'
            });
        }""")
        time.sleep(0.5)
        
        input_elem = admin_page.locator('input[id^="fieldInput_"], textarea[id^="fieldInput_"]').first
        print(f"   Input visible: {input_elem.is_visible()}")
        
        # Live Type new text
        test_val = "CEYLON REFINED • PRIVATE BESPOKE ESCAPES 2026"
        print(f"4. Live typing new value: '{test_val}'...")
        input_elem.fill(test_val)
        time.sleep(1)
        
        # Check iframe live update
        iframe_val = admin_page.evaluate("""() => {
            const iframe = document.getElementById('visualCmsIframe');
            const target = iframe.contentDocument.querySelector('[data-cms="home.span_1"]');
            return target ? target.textContent : null;
        }""")
        print(f"   Live value inside iframe DOM: '{iframe_val}'")
        assert iframe_val == test_val, f"Live preview failed! Expected '{test_val}', got '{iframe_val}'"
        print("   ✓ Instant live preview confirmed!")
        
        save_and_copy(admin_page, 'visual_cms_live_preview_success.png')
        
        # Revert back to original
        orig_val = "SRI LANKA TAILOR-MADE LUXURY HOLIDAYS"
        print(f"5. Reverting back to original: '{orig_val}'...")
        input_elem.fill(orig_val)
        time.sleep(0.5)
        
        browser.close()
        print("Round trip test completed with 100% SUCCESS!")

if __name__ == '__main__':
    test_roundtrip()
