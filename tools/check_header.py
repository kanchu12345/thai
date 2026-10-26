from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    b = p.chromium.launch(channel="chrome", headless=True)
    page = b.new_page(viewport={"width": 1440, "height": 900})
    page.goto("http://localhost:8089/index.html", wait_until="domcontentloaded")
    time.sleep(0.5)
    
    before = page.evaluate("""() => {
        const h = document.querySelector('#siteHeader');
        return {
            top: h.getBoundingClientRect().top,
            height: h.getBoundingClientRect().height,
            classes: Array.from(h.classList)
        };
    }""")
    
    page.evaluate("""() => {
        window.scrollTo(0, 500);
        window.dispatchEvent(new Event('scroll'));
    }""")
    time.sleep(0.5)
    
    after = page.evaluate("""() => {
        const h = document.querySelector('#siteHeader');
        return {
            top: h.getBoundingClientRect().top,
            height: h.getBoundingClientRect().height,
            classes: Array.from(h.classList)
        };
    }""")
    
    print("Before scroll:", before)
    print("After scroll 500px:", after)
    b.close()
