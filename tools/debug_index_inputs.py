from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(channel="chrome", headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto("http://localhost:8089/index.html", wait_until="domcontentloaded")
    page.wait_for_timeout(800)

    unlabeled = page.evaluate("""() => {
        const inputs = document.querySelectorAll('input:not([type="hidden"]), select, textarea');
        const list = [];
        inputs.forEach((inp, idx) => {
            const id = inp.id;
            let hasLabel = false;
            if (id && document.querySelector(`label[for="${id}"]`)) hasLabel = true;
            if (inp.closest('label')) hasLabel = true;
            if (inp.getAttribute('aria-label') || inp.getAttribute('aria-labelledby')) hasLabel = true;
            if (!hasLabel) {
                list.push({
                    idx,
                    tag: inp.tagName,
                    id: inp.id,
                    name: inp.name,
                    title: inp.getAttribute('title'),
                    className: inp.className,
                    type: inp.type,
                    outerHTML: inp.outerHTML
                });
            }
        });
        return list;
    }""")

    print(f"Index.html unlabeled inputs count: {len(unlabeled)}")
    for item in unlabeled:
        print(item)

    browser.close()
