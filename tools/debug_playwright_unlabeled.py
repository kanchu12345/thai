from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(channel="chrome", headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto("http://localhost:8089/inquiry-quick.html", wait_until="domcontentloaded")
    page.wait_for_timeout(800)

    unlabeled = page.evaluate("""() => {
        const inputs = document.querySelectorAll('input:not([type="hidden"]), select, textarea');
        const list = [];
        inputs.forEach((inp, idx) => {
            const id = inp.id;
            let hasLabel = false;
            if (id && document.querySelector(`label[for="${id}"]`)) hasLabel = true;
            if (inp.closest('label')) hasLabel = true;
            if (inp.getAttribute('aria-label') || inp.getAttribute('aria-labelledby') || inp.getAttribute('title')) hasLabel = true;
            if (!hasLabel) {
                list.push({
                    idx,
                    tag: inp.tagName,
                    id: inp.id,
                    name: inp.name,
                    className: inp.className,
                    placeholder: inp.placeholder,
                    type: inp.type,
                    parentClass: inp.parentElement ? inp.parentElement.className : ''
                });
            }
        });
        return list;
    }""")

    print(f"Unlabeled inputs count: {len(unlabeled)}")
    for item in unlabeled:
        print(item)

    browser.close()
