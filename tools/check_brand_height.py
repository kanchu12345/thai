from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(channel="msedge", headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 800})
    page.goto("http://localhost:8089/inquiry-detailed.html", wait_until="domcontentloaded")
    page.wait_for_timeout(500)

    brand_data = page.evaluate("""() => {
        const brand = document.querySelector('.header-top-row .header-brand');
        const img = brand.querySelector('img');
        const text = brand.querySelector('.header-brand-text');
        return {
            brandRect: brand.getBoundingClientRect(),
            imgRect: img.getBoundingClientRect(),
            imgNatural: { w: img.naturalWidth, h: img.naturalHeight },
            textRect: text.getBoundingClientRect(),
            imgComputedHeight: window.getComputedStyle(img).height,
            brandDisplay: window.getComputedStyle(brand).display,
            brandFlexDirection: window.getComputedStyle(brand).flexDirection
        };
    }""")

    print(brand_data)
    browser.close()
