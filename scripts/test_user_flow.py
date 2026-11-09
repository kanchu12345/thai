from http.server import HTTPServer, SimpleHTTPRequestHandler
import socketserver, threading, time, json
from playwright.sync_api import sync_playwright

PORT = 8110

class ThreadingHTTPServer(socketserver.ThreadingMixIn, HTTPServer):
    daemon_threads = True

server = ThreadingHTTPServer(("", PORT), SimpleHTTPRequestHandler)
t = threading.Thread(target=server.serve_forever, daemon=True)
t.start()
time.sleep(1)

with sync_playwright() as p:
    browser = p.chromium.launch(channel='msedge', headless=True)
    page = browser.new_page(viewport={'width': 1400, 'height': 900})

    errors = []
    page.on("pageerror", lambda err: errors.append(str(err)))
    page.on("console", lambda msg: print(f"[{msg.type}] {msg.text}"))

    # Set user session as gamhewak@gmail.com like in user's screenshot
    page.add_init_script("""
        localStorage.setItem('lotus_admin_active', '1');
        localStorage.setItem('lotus_admin_user', 'gamhewak@gmail.com');
    """)

    page.goto(f'http://localhost:{PORT}/admin/index.html', wait_until='domcontentloaded')
    time.sleep(2)

    page.evaluate('''() => {
        window.AdminApp.currentUser = { email: 'gamhewak@gmail.com', id: 'admin_master_session' };
        window.AdminApp.currentRole = 'super_admin';
        window.AdminApp.showApp();
    }''')
    time.sleep(1)

    # Click Tours on sidebar, then Packages
    print("Navigating to Tours > Packages...")
    page.evaluate("() => window.AdminApp.navigateToTab('tours', 'packages')")
    time.sleep(1)

    # Now find the first Live Edit button and click it with playwright
    print("Finding Live Edit button...")
    live_edit_btn = page.locator("#packagesTableBody button:has-text('Live Edit')").first
    print("Button visible?", live_edit_btn.is_visible())
    
    # Click it!
    live_edit_btn.click()
    time.sleep(3)

    # Check state
    state = page.evaluate('''() => {
        const activeSec = document.querySelector('.content-section.active');
        const iframe = document.getElementById('visualCmsIframe');
        return {
            activeSectionId: activeSec ? activeSec.id : null,
            iframeSrc: iframe ? iframe.src : null,
            toasts: Array.from(document.querySelectorAll('.toast')).map(t => t.innerText)
        };
    }''')
    print("State after click:", json.dumps(state, indent=2))
    print("Page errors encountered:", errors)

    shot = "C:/Users/kanch/.gemini/antigravity/brain/a90087bd-323d-4453-87b1-eab45b7ca16f/after_live_edit_click.png"
    page.screenshot(path=shot)
    print("Screenshot saved to", shot)

    browser.close()
    server.shutdown()
