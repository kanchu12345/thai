import os
import time
import json
from playwright.sync_api import sync_playwright

PORT = 8089
BASE_URL = f"http://localhost:{PORT}"
SCREENSHOT_DIR = "C:/Users/kanch/.gemini/antigravity/brain/b764be33-4f17-4a6c-973e-5b4163beb841/responsive_audit_screenshots"
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

VIEWPORTS = [
    {"name": "320_small_phone", "width": 320, "height": 568},
    {"name": "360_standard_android", "width": 360, "height": 800},
    {"name": "375_compact_phone", "width": 375, "height": 667},
    {"name": "390_iphone12", "width": 390, "height": 844},
    {"name": "412_flagship_android", "width": 412, "height": 915},
    {"name": "430_large_phone", "width": 430, "height": 932},
    {"name": "768_tablet_portrait", "width": 768, "height": 1024},
    {"name": "820_ipad_air", "width": 820, "height": 1180},
    {"name": "1024_tablet_landscape", "width": 1024, "height": 768},
    {"name": "1280_laptop", "width": 1280, "height": 800},
    {"name": "1366_desktop_laptop", "width": 1366, "height": 768},
    {"name": "1920_full_hd", "width": 1920, "height": 1080},
    # Short landscape viewports
    {"name": "800x360_landscape_android", "width": 800, "height": 360},
    {"name": "915x412_landscape_flagship", "width": 915, "height": 412}
]

KEY_PAGES = [
    ("home", "index.html"),
    ("about", "about.html"),
    ("destinations", "destinations.html"),
    ("experiences", "experiences.html"),
    ("contact", "contact.html"),
    ("inquiry_quick", "inquiry-quick.html"),
    ("inquiry_detailed", "inquiry-detailed.html"),
    ("sri_lanka_tours", "sri-lanka-tours.html"),
    ("tours_index", "tours/index.html"),
    ("tours_cultural", "tours/cultural/index.html"),
    ("tours_beach", "tours/beach/index.html"),
    ("tour_detail", "tours/cultural/three-millennia-of-living-heritage/index.html")
]

def run_responsive_audit():
    print(f"=== TESTING {len(KEY_PAGES)} KEY PAGES ACROSS {len(VIEWPORTS)} VIEWPORTS ===", flush=True)
    results = {}

    with sync_playwright() as p:
        browser = p.chromium.launch(channel="msedge", headless=True)

        for page_key, page_rel in KEY_PAGES:
            url = f"{BASE_URL}/{page_rel}"
            print(f"\nAuditing Page: {page_key} ({page_rel})", flush=True)
            results[page_key] = {"url": page_rel, "viewports": {}}

            page = browser.new_page(viewport={"width": 1440, "height": 900})
            try:
                page.goto(url, wait_until="domcontentloaded", timeout=20000)
                time.sleep(0.5)

                for vp in VIEWPORTS:
                    vp_name = vp["name"]
                    w = vp["width"]
                    h = vp["height"]
                    page.set_viewport_size({"width": w, "height": h})
                    time.sleep(0.15)

                    # Evaluate metrics
                    metrics = page.evaluate("""(dim) => {
                        const viewportWidth = dim.w;
                        const viewportHeight = dim.h;
                        const cW = document.documentElement.clientWidth;
                        const sW = document.documentElement.scrollWidth;
                        const bSW = document.body ? document.body.scrollWidth : 0;
                        
                        // Check sideways dragging
                        window.scrollTo(100, 0);
                        const scrollX = window.scrollX;
                        window.scrollTo(0, 0);

                        // Check Header overlap with Hero Title
                        const header = document.querySelector('.site-header-walkers, #siteHeader');
                        const heroTitle = document.querySelector('.hero-title, .hero h1, .contact-hero h1');
                        let headerOverlap = false;
                        let headerHeight = 0;
                        if (header) {
                            const hRect = header.getBoundingClientRect();
                            headerHeight = hRect.height;
                            if (heroTitle) {
                                const tRect = heroTitle.getBoundingClientRect();
                                if (tRect.top < hRect.bottom && tRect.bottom > hRect.top) {
                                    headerOverlap = true;
                                }
                            }
                        }

                        // Check Hamburger button visibility under 1024px vs above
                        const hamBtn = document.querySelector('.walkers-ham, #mobileHamToggle');
                        let hamVisible = false;
                        if (hamBtn) {
                            const style = window.getComputedStyle(hamBtn);
                            hamVisible = (style.display !== 'none' && style.visibility !== 'hidden' && hamBtn.offsetWidth > 0);
                        }

                        // Check Desktop Menu visibility
                        const desktopNav = document.querySelector('.walkers-nav, .walkers-menu');
                        let desktopNavVisible = false;
                        if (desktopNav) {
                            const style = window.getComputedStyle(desktopNav);
                            desktopNavVisible = (style.display !== 'none' && style.visibility !== 'hidden' && desktopNav.offsetWidth > 0);
                        }

                        // Check Floating WhatsApp button
                        const fab = document.querySelector('.unified-fab-group, .floating-whatsapp-btn, .fab-whatsapp');
                        let fabBottom = null;
                        let fabRight = null;
                        if (fab) {
                            const fRect = fab.getBoundingClientRect();
                            fabBottom = viewportHeight - fRect.bottom;
                            fabRight = viewportWidth - fRect.right;
                        }

                        // Check tables for mobile friendliness
                        const tables = document.querySelectorAll('table');
                        let uncontainedTables = 0;
                        tables.forEach(t => {
                            const parent = t.parentElement;
                            const pStyle = window.getComputedStyle(parent);
                            const isScrollable = (pStyle.overflowX === 'auto' || pStyle.overflowX === 'scroll');
                            if (t.scrollWidth > cW && !isScrollable) {
                                uncontainedTables++;
                            }
                        });

                        // Check card widths
                        const cards = document.querySelectorAll('.tour-card, .destination-card, .package-card, .selectable-card');
                        let overlyNarrowCards = 0;
                        let overlyWideCards = 0;
                        cards.forEach(c => {
                            const cRect = c.getBoundingClientRect();
                            if (cRect.width > 0 && cRect.width < 130) overlyNarrowCards++;
                            if (cRect.width > viewportWidth + 5) overlyWideCards++;
                        });

                        // Check text too small (< 11px)
                        const smallTexts = [];
                        document.querySelectorAll('p, a, span, button, li').forEach(el => {
                            if (!el.innerText.trim()) return;
                            const fs = parseFloat(window.getComputedStyle(el).fontSize);
                            if (fs > 0 && fs < 11 && !el.closest('svg')) {
                                smallTexts.push({ text: el.innerText.slice(0, 30), size: fs });
                            }
                        });

                        return {
                            clientWidth: cW,
                            scrollWidth: sW,
                            bodyScrollWidth: bSW,
                            scrollX: scrollX,
                            hasOverflow: (sW > cW || bSW > cW || scrollX > 0),
                            headerHeight: headerHeight,
                            headerOverlap: headerOverlap,
                            hamVisible: hamVisible,
                            desktopNavVisible: desktopNavVisible,
                            fabBottom: fabBottom,
                            fabRight: fabRight,
                            uncontainedTables: uncontainedTables,
                            overlyNarrowCards: overlyNarrowCards,
                            overlyWideCards: overlyWideCards,
                            smallTextCount: smallTexts.length,
                            sampleSmallText: smallTexts.slice(0, 2)
                        };
                    }""", {"w": w, "h": h})

                    status = "FAIL" if (metrics["hasOverflow"] or metrics["headerOverlap"]) else "PASS"
                    print(f"  [{status}] {vp_name} ({w}x{h}): sW={metrics['scrollWidth']}, cW={metrics['clientWidth']}, bSW={metrics['bodyScrollWidth']}, headerOverlap={metrics['headerOverlap']}", flush=True)

                    results[page_key]["viewports"][vp_name] = metrics

                    # Capture representative screenshots for critical viewports
                    if vp_name in ["360_standard_android", "768_tablet_portrait", "1440_desktop_laptop", "800x360_landscape_android"] and page_key in ["home", "sri_lanka_tours", "tour_detail", "inquiry_detailed"]:
                        shot_path = os.path.join(SCREENSHOT_DIR, f"{page_key}_{vp_name}.png")
                        page.screenshot(path=shot_path, full_page=False)

            except Exception as e:
                print(f"  [ERROR] Failed to load {page_key}: {e}", flush=True)
            finally:
                page.close()

        browser.close()

    with open('tools/full_responsive_audit_results.json', 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2)

    print("\nResponsive audit completed. Saved to tools/full_responsive_audit_results.json", flush=True)

if __name__ == "__main__":
    run_responsive_audit()
