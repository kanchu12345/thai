from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(channel="chrome", headless=True)
    page = browser.new_page(viewport={"width": 360, "height": 640})
    page.goto("http://localhost:8089/admin/index.html", wait_until="domcontentloaded")
    page.wait_for_timeout(1000)

    # Log in locally to test adminApp layout
    page.evaluate("""() => {
        AdminApp.currentUser = { email: 'admin@lotusceylon.com', id: 'admin-123' };
        AdminApp.currentRole = 'super_admin';
        AdminApp.showApp();
    }""")
    page.wait_for_timeout(1000)

    overflowing = page.evaluate("""() => {
        const cw = document.documentElement.clientWidth;
        const sw = document.documentElement.scrollWidth;
        const results = [];
        document.querySelectorAll('*').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.right > cw + 1) {
                results.push({
                    tag: el.tagName,
                    id: el.id,
                    className: el.className,
                    width: rect.width,
                    right: rect.right,
                    cw: cw
                });
            }
        });
        return { cw, sw, results: results.slice(0, 15) };
    }""")

    print(f"Viewport clientWidth={overflowing['cw']}, scrollWidth={overflowing['sw']}")
    for item in overflowing['results']:
        print(f"  Overflow element: <{item['tag']}> id='{item['id']}' class='{item['className']}' right={item['right']} width={item['width']}")

    browser.close()
