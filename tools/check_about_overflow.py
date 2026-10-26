from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(channel="msedge", headless=True)
    page = browser.new_page(viewport={"width": 320, "height": 568})
    page.goto("http://localhost:8089/about.html", wait_until="domcontentloaded")
    page.wait_for_timeout(500)

    overflowing = page.evaluate("""() => {
        const results = [];
        const w = 320;
        document.querySelectorAll('*').forEach(el => {
            if (el.closest('.mobile-nav-fullscreen')) return;
            const rect = el.getBoundingClientRect();
            if (rect.right > w + 1 || el.scrollWidth > w + 1) {
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
    }""")

    print(f"Overflowing elements on about.html at 320px (count={len(overflowing)}):")
    for item in overflowing[:10]:
        print(f"  <{item['tag']} class='{item['className']}' id='{item['id']}'>: right={item['right']}, width={item['width']}, scrollWidth={item['scrollWidth']}")

    browser.close()
