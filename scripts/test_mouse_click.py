from http.server import HTTPServer, SimpleHTTPRequestHandler
import socketserver, threading, time, json
from playwright.sync_api import sync_playwright

PORT = 8109

class ThreadingHTTPServer(socketserver.ThreadingMixIn, HTTPServer):
    daemon_threads = True

server = ThreadingHTTPServer(("", PORT), SimpleHTTPRequestHandler)
t = threading.Thread(target=server.serve_forever, daemon=True)
t.start()
time.sleep(1)

with sync_playwright() as p:
    browser = p.chromium.launch(channel='msedge', headless=True)
    page = browser.new_page(viewport={'width': 1400, 'height': 900})

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

    print("Opening Southern Sands Serenade in PageEditor...")
    page.evaluate("() => PageEditor.openTourDetailPage('southern-sands-serenade')")
    time.sleep(4)

    # Use frame locator to click h1 with actual mouse
    print("Clicking h1 with user mouse click...")
    frame = page.frame_locator("#visualCmsIframe")
    h1_loc = frame.locator("h1.tour-title-walkers")
    h1_loc.click()
    time.sleep(2)

    res = page.evaluate('''() => {
        const titleEl = document.getElementById('inspectorTitle');
        const badgeEl = document.getElementById('inspectorSectionBadge');
        const inputEl = document.querySelector('#inspectorBody input[type="text"], #inspectorBody textarea');
        return {
            selectedElement: window.PageEditor?.selectedElement,
            title: titleEl ? titleEl.innerText : null,
            badge: badgeEl ? badgeEl.innerText : null,
            inputVal: inputEl ? inputEl.value : null
        };
    }''')
    print("Result after user mouse click:", json.dumps(res, indent=2, ensure_ascii=True))

    shot_path = "C:/Users/kanch/.gemini/antigravity/brain/a90087bd-323d-4453-87b1-eab45b7ca16f/real_mouse_click.png"
    page.screenshot(path=shot_path)
    print("Saved screenshot to", shot_path)

    browser.close()
    server.shutdown()
