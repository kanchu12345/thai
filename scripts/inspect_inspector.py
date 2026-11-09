from http.server import HTTPServer, SimpleHTTPRequestHandler
import socketserver, threading, time, json
from playwright.sync_api import sync_playwright

PORT = 8108

class ThreadingHTTPServer(socketserver.ThreadingMixIn, HTTPServer):
    daemon_threads = True

server = ThreadingHTTPServer(("", PORT), SimpleHTTPRequestHandler)
t = threading.Thread(target=server.serve_forever, daemon=True)
t.start()
time.sleep(1)

with sync_playwright() as p:
    browser = p.chromium.launch(channel='msedge', headless=True)
    page = browser.new_page()

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

    # Click h1 via iframe element inside page
    page.evaluate('''() => {
        const iframe = document.getElementById('visualCmsIframe');
        const h1 = iframe.contentDocument.querySelector('h1.tour-title-walkers');
        const evt = new MouseEvent('click', { bubbles: true, cancelable: true, view: iframe.contentWindow });
        h1.dispatchEvent(evt);
    }''')
    time.sleep(1)

    form_info = page.evaluate('''() => {
        const titleEl = document.getElementById('inspectorTitle');
        const badgeEl = document.getElementById('inspectorSectionBadge');
        const bodyEl = document.getElementById('inspectorBody');
        const inputs = Array.from(bodyEl.querySelectorAll('input, textarea, select')).map(i => ({
            id: i.id,
            type: i.type,
            value: i.value
        }));
        return {
            title: titleEl ? titleEl.innerText : null,
            badge: badgeEl ? badgeEl.innerText : null,
            inputs: inputs,
            rawBody: bodyEl.innerHTML.substring(0, 600)
        };
    }''')
    print("Inspector Form Info:")
    print(json.dumps(form_info, indent=2, ensure_ascii=True))

    browser.close()
    server.shutdown()
