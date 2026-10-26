import time
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    b = p.chromium.launch(channel="chrome", headless=True)
    page = b.new_page()

    # 1. Test inquiry prefill via query string
    url = "http://localhost:8089/inquiry-quick.html?tour=Southern%20Sands%20Voyage&pax=4"
    page.goto(url, wait_until="domcontentloaded")
    time.sleep(0.5)

    prefill_val = page.evaluate("() => { const el = document.getElementById('prefillContext'); return el ? el.value : ''; }")
    pax_val = page.evaluate("() => { const el = document.getElementById('noPaxSelect'); return el ? el.value : ''; }")
    print("Inquiry Query Prefill Context:", prefill_val)
    print("Inquiry Pax Select:", pax_val)

    # 2. Test routing to tour detail from sri-lanka-tours
    page.goto("http://localhost:8089/sri-lanka-tours.html", wait_until="domcontentloaded")
    time.sleep(0.5)
    links = page.evaluate("() => Array.from(document.querySelectorAll('a[href*=\"tours/\"]')).map(a => a.getAttribute('href'))")
    print("Found tour links on catalog page:", len(links))

    b.close()
