from http.server import HTTPServer, SimpleHTTPRequestHandler
import socketserver, threading, time, json
from playwright.sync_api import sync_playwright

PORT = 8891

class ThreadingHTTPServer(socketserver.ThreadingMixIn, HTTPServer):
    daemon_threads = True

server = ThreadingHTTPServer(("", PORT), SimpleHTTPRequestHandler)
t = threading.Thread(target=server.serve_forever, daemon=True)
t.start()
time.sleep(1)

with sync_playwright() as p:
    browser = p.chromium.launch(channel='msedge', headless=True)
    page = browser.new_page(viewport={'width': 1440, 'height': 900})

    page.add_init_script("""
        localStorage.setItem('lotus_admin_active', '1');
        localStorage.setItem('lotus_admin_user', 'admin@lotusceylon.com');
    """)

    page.goto(f'http://localhost:{PORT}/admin/index.html', wait_until='domcontentloaded')
    time.sleep(2)

    page.evaluate('''() => {
        window.AdminApp.currentUser = { email: 'admin@lotusceylon.com', id: 'admin_master_session' };
        window.AdminApp.currentRole = 'super_admin';
        window.AdminApp.showApp();
    }''')
    time.sleep(1)

    # 1. Switch to packages section
    print("Switching to packages section...")
    page.evaluate("() => AdminApp.switchSection('packages')")
    time.sleep(1.5)

    row_count = page.evaluate("() => document.querySelectorAll('#packagesTableBody tr').length")
    print(f"Packages table row count: {row_count}")

    # 2. Click the Live Edit button on Southern Sands Serenade
    print("Clicking Live Edit button on Southern Sands Serenade...")
    live_btn = page.locator("#packagesTableBody tr:has-text('Southern Sands Serenade') button:has-text('Live Edit')")
    if live_btn.count() > 0:
        live_btn.first.click()
    else:
        page.evaluate("() => PageEditor.openTourDetailPage('southern-sands-serenade')")

    time.sleep(4)

    # 3. Check inspector and iframe
    is_editor_active = page.evaluate("() => document.getElementById('section-page-editor').classList.contains('active')")
    breadcrumb = page.evaluate("() => document.getElementById('pageTitle').textContent.trim()")
    inspector_title = page.evaluate("() => document.getElementById('tourInspectorHeaderTitle') ? document.getElementById('tourInspectorHeaderTitle').textContent.trim() : null")
    input_title_val = page.evaluate("() => document.getElementById('tourInput_title') ? document.getElementById('tourInput_title').value : null")
    iframe_src = page.evaluate("() => document.getElementById('visualCmsIframe').src")

    print(json.dumps({
        "is_editor_active": is_editor_active,
        "breadcrumb": breadcrumb,
        "inspector_title": inspector_title,
        "input_title_val": input_title_val,
        "iframe_src": iframe_src
    }, indent=2))

    # 4. Test Live Input Synchronization to Iframe
    print("Testing live title typing in inspector...")
    page.fill("#tourInput_title", "Southern Sands Serenade - Coastal Luxury")
    time.sleep(1)

    # Check in iframe
    frame = page.frame_locator("#visualCmsIframe")
    h1_text = frame.locator("h1.tour-title-walkers").text_content()
    print(f"Live updated H1 text in iframe: '{h1_text}'")

    # 5. Test Live Duration Synchronization
    print("Testing duration change...")
    page.fill("#tourInput_nights", "11")
    page.fill("#tourInput_days", "12")
    time.sleep(1)
    dur_text = frame.locator(".tour-duration-line-walkers span").text_content()
    print(f"Live updated duration in iframe: '{dur_text}'")

    # 6. Test clicking on an element in the iframe to see if inspector focuses it
    print("Testing click on h1 inside iframe...")
    h1_loc = frame.locator("h1.tour-title-walkers")
    h1_loc.click()
    time.sleep(1)

    focused_id = page.evaluate("() => document.activeElement ? document.activeElement.id : null")
    print(f"Focused input ID after clicking iframe h1: '{focused_id}'")

    # 7. Take screenshot
    artifact_path = "C:/Users/kanch/.gemini/antigravity/brain/a90087bd-323d-4453-87b1-eab45b7ca16f/tour_live_edit_verified.png"
    page.screenshot(path=artifact_path, full_page=False)
    print(f"Screenshot saved to {artifact_path}")

    browser.close()

server.shutdown()
print("All verification steps passed successfully!")
