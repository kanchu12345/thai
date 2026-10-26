from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(channel="msedge", headless=True)
    page = browser.new_page()
    failed = []
    page.on("response", lambda resp: failed.append((resp.status, resp.url)) if resp.status >= 400 else None)
    page.goto("http://localhost:8089/contact.html", wait_until="domcontentloaded")
    page.wait_for_timeout(2000)
    print("Failed responses on contact.html:")
    for status, url in failed:
        print(f"  HTTP {status}: {url}")
    browser.close()
