from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(channel="msedge", headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 800})
    page.goto("http://localhost:8089/inquiry-detailed.html", wait_until="domcontentloaded")
    page.wait_for_timeout(500)

    header_info = page.evaluate("""() => {
        const header = document.querySelector('.site-header-walkers, #siteHeader');
        if (!header) return null;
        const rect = header.getBoundingClientRect();
        const topRow = header.querySelector('.header-top-row');
        const topRowRect = topRow ? topRow.getBoundingClientRect() : null;
        const nav = header.querySelector('.walkers-nav');
        const navRect = nav ? nav.getBoundingClientRect() : null;
        const tools = header.querySelector('.header-tools');
        const toolsRect = tools ? tools.getBoundingClientRect() : null;
        return {
            headerHeight: rect.height,
            topRowHeight: topRowRect ? topRowRect.height : null,
            topRowFlexWrap: topRow ? window.getComputedStyle(topRow).flexWrap : null,
            navRect: navRect,
            toolsRect: toolsRect
        };
    }""")

    print("Header info at 1280px on inquiry-detailed.html:")
    print(header_info)
    browser.close()
