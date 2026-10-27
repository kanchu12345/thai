from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(channel="chrome", headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto("http://127.0.0.1:8089/tours/wildlife/", wait_until="domcontentloaded")
    page.wait_for_timeout(1000)
    
    grid_info = page.evaluate('''() => {
        const grid = document.querySelector('.beach-grid-cards');
        const style = window.getComputedStyle(grid);
        const cards = Array.from(grid.children).map(c => {
            const r = c.getBoundingClientRect();
            return { width: r.width, height: r.height, top: r.top, left: r.left };
        });
        return {
            gridTemplateColumns: style.gridTemplateColumns,
            cards: cards
        };
    }''')
    print("Desktop (1440px):", grid_info)
    page.screenshot(path="artifacts/desktop_after_wildlife_1440.png")
    browser.close()
