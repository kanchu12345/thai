from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(channel="msedge", headless=True)
    page = browser.new_page(viewport={"width": 320, "height": 568})
    page.goto("http://localhost:8089/about.html", wait_until="domcontentloaded")
    page.wait_for_timeout(500)

    info = page.evaluate("""() => {
        const els = Array.from(document.querySelectorAll('*')).filter(el => {
            if (el.closest('.mobile-nav-fullscreen')) return false;
            return el.getBoundingClientRect().right > 321;
        });
        return els.map(el => ({
            tag: el.tagName,
            class: el.className,
            html: el.outerHTML.slice(0, 150),
            parent: el.parentElement ? el.parentElement.className : null
        }));
    }""")

    for item in info:
        print(item)
    browser.close()
