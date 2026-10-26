from playwright.sync_api import sync_playwright

PORT = 8089

with sync_playwright() as p:
    browser = p.chromium.launch(channel="msedge", headless=True)
    for width in [320, 360]:
        for url_path in ["inquiry-detailed.html", "contact.html"]:
            page = browser.new_page(viewport={"width": width, "height": 800})
            page.goto(f"http://localhost:{PORT}/{url_path}", wait_until="domcontentloaded")
            overflowing = page.evaluate("""(w) => {
                const results = [];
                document.querySelectorAll('*').forEach(el => {
                    const rect = el.getBoundingClientRect();
                    if (rect.right > w + 1) {
                        results.push({
                            tag: el.tagName,
                            id: el.id,
                            className: el.className,
                            right: rect.right,
                            width: rect.width
                        });
                    }
                });
                return results.slice(0, 10);
            }""", width)
            print(f"\n--- {url_path} @ {width}px overflowing elements (count={len(overflowing)}) ---")
            for item in overflowing:
                print(f"Tag: {item['tag']}, Class: {item['className']}, ID: {item['id']}, Right: {item['right']}, Width: {item['width']}")
            page.close()
    browser.close()
