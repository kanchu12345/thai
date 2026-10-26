import os
import sys
import time
import json
from playwright.sync_api import sync_playwright

PORT = 8089
BASE_URL = f"http://localhost:{PORT}"
OUTPUT_DIR = "C:/Users/kanch/.gemini/antigravity/brain/b764be33-4f17-4a6c-973e-5b4163beb841/cross_browser_screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

DESKTOP_VIEWPORTS = [
    {"name": "1024_tablet_landscape", "width": 1024, "height": 768},
    {"name": "1280_compact_laptop", "width": 1280, "height": 800},
    {"name": "1366_standard_laptop", "width": 1366, "height": 768},
    {"name": "1440_highres_laptop", "width": 1440, "height": 900},
    {"name": "1920_full_hd_desktop", "width": 1920, "height": 1080},
    {"name": "2560_qhd_wide_desktop", "width": 2560, "height": 1440}
]

ZOOM_LEVELS = [
    {"name": "100_percent", "scale": 1.0, "width": 1440, "height": 900},
    {"name": "125_percent", "scale": 1.25, "width": 1152, "height": 720}, # 1440 / 1.25
    {"name": "150_percent", "scale": 1.50, "width": 960, "height": 600},  # 1440 / 1.50
    {"name": "200_percent", "scale": 2.00, "width": 720, "height": 450}   # 1440 / 2.00
]

TEST_PAGES = [
    ("home", "index.html"),
    ("sri_lanka_tours", "sri-lanka-tours.html"),
    ("tour_detail", "tours/cultural/three-millennia-of-living-heritage/index.html"),
    ("tours_cultural_category", "tours/cultural/index.html"),
    ("contact", "contact.html"),
    ("inquiry_detailed", "inquiry-detailed.html")
]

def audit_page(page, url, browser_name, label):
    page.goto(url, wait_until="domcontentloaded", timeout=20000)
    time.sleep(0.4)

    # Hover over menu item to test megamenu if present
    menu_item = page.query_selector('.walkers-menu-item:has(.walkers-megamenu)')
    if menu_item:
        try:
            menu_item.hover(timeout=1000)
            time.sleep(0.2)
        except Exception:
            pass

    metrics = page.evaluate("""() => {
        const cW = document.documentElement.clientWidth;
        const sW = document.documentElement.scrollWidth;
        const bSW = document.body ? document.body.scrollWidth : 0;
        
        // 1. Horizontal Scroll Check
        window.scrollTo(100, 0);
        const scrollX = window.scrollX;
        window.scrollTo(0, 0);

        // 2. Max Width & Container Discipline
        const containers = document.querySelectorAll('.site-container, .wrapper--80, .container, .main-container');
        let widestContainer = 0;
        containers.forEach(c => {
            const w = c.getBoundingClientRect().width;
            if (w > widestContainer) widestContainer = w;
        });

        // 3. Line length check (paragraphs exceeding 1300px width)
        let excessivelyWideParagraphs = 0;
        let widestParagraph = 0;
        document.querySelectorAll('p').forEach(p => {
            const r = p.getBoundingClientRect();
            if (r.width > widestParagraph) widestParagraph = r.width;
            if (r.width > 1300) excessivelyWideParagraphs++;
        });

        // 4. Header & Sticky Nav Check
        const header = document.querySelector('.site-header-walkers, #siteHeader');
        let headerHeight = 0;
        let stickyWorks = false;
        let headerOverlapsContent = false;
        if (header) {
            headerHeight = header.getBoundingClientRect().height;
            // Scroll to test sticky
            window.scrollTo(0, 500);
            const rectScrolled = header.getBoundingClientRect();
            stickyWorks = (rectScrolled.top === 0 && (rectScrolled.height <= 95));
            window.scrollTo(0, 0);
        }

        // 5. Megamenu Clipping Check
        let megamenuClipping = false;
        let megamenuRect = null;
        const megamenu = document.querySelector('.walkers-megamenu');
        if (megamenu && window.getComputedStyle(megamenu).display !== 'none') {
            const mRect = megamenu.getBoundingClientRect();
            megamenuRect = { left: mRect.left, right: mRect.right, width: mRect.width };
            // Check if it clips past viewport left or right
            if (mRect.right > (cW + 2) || mRect.left < -2) {
                megamenuClipping = true;
            }
        }

        // 6. Floating FAB Check
        const fab = document.querySelector('#unifiedFabGroup, .whatsapp-float');
        let fabStatus = "none";
        let fabClipping = false;
        if (fab) {
            const fRect = fab.getBoundingClientRect();
            fabStatus = "present";
            if (fRect.right > (cW + 5) || fRect.bottom > (window.innerHeight + 5)) {
                fabClipping = true;
            }
        }

        // 7. Footer columns layout
        const footerGrid = document.querySelector('.site-footer-walkers .footer-grid, .footer-top-grid');
        let footerCols = 0;
        if (footerGrid) {
            const children = Array.from(footerGrid.children).filter(ch => ch.offsetHeight > 0);
            footerCols = children.length;
        }

        // 8. Interactive Map Check
        const mapEl = document.querySelector('#contactMap, #tourMap, .leaflet-container');
        let mapStatus = mapEl ? "present" : "none";
        let brokenMapTiles = 0;
        if (mapEl) {
            const imgs = mapEl.querySelectorAll('img.leaflet-tile');
            imgs.forEach(img => {
                if (!img.complete || img.naturalWidth === 0) brokenMapTiles++;
            });
        }

        // 9. Card Grid Layouts (check if cards collapse to 0 width or break out)
        const cards = document.querySelectorAll('.tour-card, .category-card, .destination-card, .card');
        let brokenCardCount = 0;
        cards.forEach(card => {
            const cr = card.getBoundingClientRect();
            if (cr.width < 100 || cr.width > cW) brokenCardCount++;
        });

        return {
            clientWidth: cW,
            scrollWidth: sW,
            bodyScrollWidth: bSW,
            scrollX: scrollX,
            hasOverflow: (sW > cW || bSW > cW || scrollX > 0),
            widestContainer: widestContainer,
            widestParagraph: widestParagraph,
            excessivelyWideParagraphs: excessivelyWideParagraphs,
            headerHeight: headerHeight,
            stickyWorks: stickyWorks,
            megamenuClipping: megamenuClipping,
            megamenuRect: megamenuRect,
            fabStatus: fabStatus,
            fabClipping: fabClipping,
            footerCols: footerCols,
            mapStatus: mapStatus,
            brokenMapTiles: brokenMapTiles,
            brokenCardCount: brokenCardCount
        };
    }""")

    return metrics

def run_cross_browser_audit():
    results = {}
    print("=== STARTING CROSS-BROWSER & DESKTOP AUDIT ===", flush=True)

    with sync_playwright() as p:
        # Determine available browsers
        browsers_to_test = []

        # Microsoft Edge
        try:
            b_edge = p.chromium.launch(channel="msedge", headless=True)
            browsers_to_test.append(("Edge (Chromium)", b_edge, {}))
            print("  [OK] Edge launcher initialized", flush=True)
        except Exception as e:
            print(f"  [SKIP] Edge: {e}", flush=True)

        # Google Chrome
        try:
            b_chrome = p.chromium.launch(channel="chrome", headless=True)
            browsers_to_test.append(("Chrome (Blink)", b_chrome, {}))
            print("  [OK] Chrome launcher initialized", flush=True)
        except Exception as e:
            print(f"  [SKIP] Chrome: {e}", flush=True)

        # Firefox (Gecko)
        try:
            b_ff = p.firefox.launch(headless=True)
            browsers_to_test.append(("Firefox (Gecko)", b_ff, {}))
            print("  [OK] Firefox launcher initialized", flush=True)
        except Exception as e:
            clean_msg = str(e).encode('ascii', 'ignore').decode()
            print(f"  [SKIP] Firefox: {clean_msg[:120]}", flush=True)

        # WebKit / Safari (WebKit Engine)
        try:
            b_webkit = p.webkit.launch(headless=True)
            safari_opts = {
                "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15"
            }
            browsers_to_test.append(("Safari (WebKit)", b_webkit, safari_opts))
            print("  [OK] Safari (WebKit) initialized", flush=True)
        except Exception as e:
            clean_msg = str(e).encode('ascii', 'ignore').decode()
            print(f"  [SKIP] Safari (WebKit): {clean_msg[:120]}", flush=True)

        print(f"\nTotal Browsers in Test Matrix: {len(browsers_to_test)}", flush=True)

        for b_name, browser_instance, extra_opts in browsers_to_test:
            results[b_name] = {"viewports": {}, "zooms": {}}
            print(f"\n==========================================", flush=True)
            print(f"TESTING BROWSER: {b_name}", flush=True)
            print(f"==========================================", flush=True)

            # 1. Test Desktop Viewports (1024, 1280, 1366, 1440, 1920, 2560px)
            for vp in DESKTOP_VIEWPORTS:
                vp_name = vp["name"]
                w, h = vp["width"], vp["height"]
                print(f"\n  --- Viewport {vp_name} ({w}x{h}) ---", flush=True)
                results[b_name]["viewports"][vp_name] = {}

                opts = {"viewport": {"width": w, "height": h}}
                opts.update(extra_opts)
                context = browser_instance.new_context(**opts)
                page = context.new_page()

                for p_key, p_rel in TEST_PAGES:
                    url = f"{BASE_URL}/{p_rel}"
                    metrics = audit_page(page, url, b_name, f"{vp_name}_{p_key}")
                    results[b_name]["viewports"][vp_name][p_key] = metrics

                    status = "FAIL" if (metrics["hasOverflow"] or metrics["megamenuClipping"]) else "PASS"
                    print(f"    [{status}] {p_key}: sW={metrics['scrollWidth']}, cW={metrics['clientWidth']}, maxContainer={metrics['widestContainer']}px, sticky={metrics['stickyWorks']}, menuClip={metrics['megamenuClipping']}", flush=True)

                # Capture representative screenshot for key pages
                if vp_name in ["1440_highres_laptop", "1920_full_hd_desktop", "2560_qhd_wide_desktop"]:
                    clean_b = b_name.split()[0].lower()
                    shot_path = os.path.join(OUTPUT_DIR, f"{clean_b}_{vp_name}_home.png")
                    page.goto(f"{BASE_URL}/index.html", wait_until="domcontentloaded")
                    page.screenshot(path=shot_path, full_page=False)

                context.close()

            # 2. Test Zoom Levels (100%, 125%, 150%, 200%)
            print(f"\n  --- TESTING ZOOM BEHAVIOR (100%, 125%, 150%, 200%) ---", flush=True)
            for zm in ZOOM_LEVELS:
                zm_name = zm["name"]
                scale = zm["scale"]
                w, h = zm["width"], zm["height"]
                results[b_name]["zooms"][zm_name] = {}

                opts = {
                    "viewport": {"width": w, "height": h},
                    "device_scale_factor": scale
                }
                opts.update(extra_opts)
                context = browser_instance.new_context(**opts)
                page = context.new_page()

                for p_key, p_rel in TEST_PAGES[:3]:
                    url = f"{BASE_URL}/{p_rel}"
                    metrics = audit_page(page, url, b_name, f"{zm_name}_{p_key}")
                    results[b_name]["zooms"][zm_name][p_key] = metrics

                    status = "FAIL" if metrics["hasOverflow"] else "PASS"
                    print(f"    [{status}] Zoom {zm_name} on {p_key}: sW={metrics['scrollWidth']}, cW={metrics['clientWidth']}, scrollX={metrics['scrollX']}, headerHeight={metrics['headerHeight']}", flush=True)

                context.close()

            browser_instance.close()

    with open('tools/cross_browser_audit_results.json', 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2)

    print("\nCross-browser audit completed. Saved to tools/cross_browser_audit_results.json", flush=True)

if __name__ == "__main__":
    run_cross_browser_audit()
