from playwright.sync_api import sync_playwright

PORT = 8089

with sync_playwright() as p:
    browser = p.chromium.launch(channel="msedge", headless=True)
    for width in [320, 360]:
        for url_path in ["inquiry-detailed.html", "contact.html"]:
            page = browser.new_page(viewport={"width": width, "height": 800})
            page.goto(f"http://localhost:{PORT}/{url_path}", wait_until="domcontentloaded")
            # Hide mobile-nav-fullscreen
            page.evaluate("""() => {
                const nav = document.getElementById('mobileNavFullscreen');
                if (nav) nav.style.display = 'none';
            }""")
            
            overflowing = page.evaluate("""(w) => {
                const results = [];
                document.querySelectorAll('*').forEach(el => {
                    const rect = el.getBoundingClientRect();
                    if (rect.right > w + 0.5) {
                        results.push({
                            tag: el.tagName,
                            id: el.id,
                            className: el.className,
                            right: rect.right,
                            width: rect.width,
                            scrollWidth: el.scrollWidth
                        });
                    }
                });
                return results;
            }""", width)
            print(f"\n=== {url_path} @ {width}px without mobile menu (overflow count={len(overflowing)}) ===")
            for item in overflowing[:15]:
                print(f"Tag: {item['tag']}, Class: {item['className']}, ID: {item['id']}, Right: {item['right']}, Width: {item['width']}")
            page.close()
    browser.close()
