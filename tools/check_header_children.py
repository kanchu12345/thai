from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(channel="msedge", headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 800})
    page.goto("http://localhost:8089/inquiry-detailed.html", wait_until="domcontentloaded")
    page.wait_for_timeout(500)

    children = page.evaluate("""() => {
        const topRow = document.querySelector('.header-top-row');
        return Array.from(topRow.children).map(ch => ({
            tag: ch.tagName,
            class: ch.className,
            rect: ch.getBoundingClientRect(),
            computedStyle: {
                display: window.getComputedStyle(ch).display,
                height: window.getComputedStyle(ch).height,
                margin: window.getComputedStyle(ch).margin,
                padding: window.getComputedStyle(ch).padding
            }
        }));
    }""")

    for ch in children:
        print(ch)
    browser.close()
