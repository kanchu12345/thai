import http.server
import socketserver
import threading
import time
import os
from playwright.sync_api import sync_playwright

PORT = 8089

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

def start_server():
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        httpd.serve_forever()

server_thread = threading.Thread(target=start_server, daemon=True)
server_thread.start()
time.sleep(1)

with sync_playwright() as p:
    browser = p.chromium.launch(channel="msedge", headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 900})
    
    # Track console messages and errors
    console_logs = []
    page.on("console", lambda msg: console_logs.append(f"[{msg.type}] {msg.text}"))
    page.on("pageerror", lambda err: console_logs.append(f"[PAGE_ERROR] {err}"))

    print(f"Navigating to http://localhost:{PORT}/admin/index.html...")
    page.goto(f"http://localhost:{PORT}/admin/index.html", wait_until="networkidle")
    time.sleep(2)

    # If login screen is showing, let's bypass by calling AdminApp.showApp() in page context
    is_login = page.evaluate("() => document.getElementById('loginScreen')?.classList.contains('active')")
    print("Is login screen visible initially:", is_login)

    # In admin app, if user is not authenticated, let's trigger showApp to inspect UI
    page.evaluate("() => { if (window.AdminApp) { window.AdminApp.showApp(); } }")
    time.sleep(1.5)

    # Check loaded counts
    counts = page.evaluate("""() => {
        return {
            packages: window.AdminApp.packages.length,
            categories: window.AdminApp.categories.length,
            destinations: window.AdminApp.destinations.length,
            reviews: window.AdminApp.reviews.length,
            team: window.AdminApp.team.length,
            mediaFiles: window.AdminApp.mediaFiles.length
        };
    }""")
    print("Loaded data stores in AdminApp:", counts)

    # Switch to Packages section
    page.evaluate("() => window.AdminApp.switchSection('packages')")
    time.sleep(1)

    # Open first package modal
    first_slug = page.evaluate("() => window.AdminApp.packages[0]?.slug")
    print(f"Opening package modal for slug: {first_slug}")
    page.evaluate(f"() => window.AdminApp.openPackageModal('{first_slug}')")
    time.sleep(1)

    # Check image preview visibility and src
    preview_info = page.evaluate("""() => {
        const card = document.getElementById('pkgHeroPreviewCard');
        const img = document.getElementById('pkgHeroImagePreview');
        const input = document.getElementById('pkgHeroImage');
        return {
            inputVal: input?.value,
            cardDisplay: card ? window.getComputedStyle(card).display : null,
            imgSrc: img?.src,
            imgNaturalWidth: img?.naturalWidth,
            imgNaturalHeight: img?.naturalHeight
        };
    }""")
    print("Package Hero Preview Info:", preview_info)

    # Take screenshot of the open modal showing the preview card!
    os.makedirs("C:/Users/kanch/.gemini/antigravity/brain/b764be33-4f17-4a6c-973e-5b4163beb841/admin_screenshots", exist_ok=True)
    shot_path = "C:/Users/kanch/.gemini/antigravity/brain/b764be33-4f17-4a6c-973e-5b4163beb841/admin_screenshots/Package_Modal_Image_Preview.png"
    page.screenshot(path=shot_path)
    print(f"Saved screenshot to {shot_path}")

    # Now close package modal, switch to settings section to see Master Seeder Banner
    page.evaluate("() => window.AdminApp.closeModal('packageModal')")
    time.sleep(0.5)
    page.evaluate("() => window.AdminApp.switchSection('settings')")
    time.sleep(1)
    shot_settings = "C:/Users/kanch/.gemini/antigravity/brain/b764be33-4f17-4a6c-973e-5b4163beb841/admin_screenshots/Settings_Master_Seeder.png"
    page.screenshot(path=shot_settings)
    print(f"Saved settings screenshot to {shot_settings}")

    # Switch to Destinations and open a destination modal to test its preview
    page.evaluate("() => window.AdminApp.switchSection('destinations')")
    time.sleep(0.5)
    page.evaluate("() => window.AdminApp.openDestinationModal('sigiriya')")
    time.sleep(0.5)
    shot_dest = "C:/Users/kanch/.gemini/antigravity/brain/b764be33-4f17-4a6c-973e-5b4163beb841/admin_screenshots/Destination_Modal_Preview.png"
    page.screenshot(path=shot_dest)
    print(f"Saved destination screenshot to {shot_dest}")

    browser.close()

print("Test complete!")
