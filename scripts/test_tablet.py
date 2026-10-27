from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(channel="chrome", headless=True)
    page = browser.new_page(viewport={"width": 768, "height": 1024})
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
    print("Tablet (768px):", grid_info)
    browser.close()
