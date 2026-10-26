import time
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    b = p.chromium.launch(channel="chrome", headless=True)
    page = b.new_page()

    # Intercept Formspree submission so we don't spam their live quota during testing
    route_intercepted = []
    def handle_route(route):
        if "formspree.io" in route.request.url:
            route_intercepted.append(route.request.url)
            route.fulfill(
                status=200,
                content_type="application/json",
                body='{"ok": true, "message": "Test submission received"}'
            )
        else:
            route.continue_()

    page.route("**/*", handle_route)

    page.goto("http://localhost:8089/inquiry-quick.html", wait_until="domcontentloaded")
    time.sleep(0.5)

    # Fill out required fields
    page.fill("#fullName", "Alexander Wright")
    page.fill("#emailAddress", "alexander.wright@example.com")
    
    # Select country if custom dropdown
    page.evaluate("""() => {
        const inp = document.getElementById('selectedCountry');
        if (inp) inp.value = 'United Kingdom';
        const dInp = document.getElementById('countrySearchInput');
        if (dInp) dInp.value = 'United Kingdom';
        
        // Fill dates
        const arr = document.getElementById('arrivalDate');
        if (arr) arr.value = '2026-11-15';
        const dep = document.getElementById('departureDate');
        if (dep) dep.value = '2026-11-25';
    }""")

    # Click Submit
    page.click("#submitInquiryBtn")
    time.sleep(1.0)

    # Check modal visibility
    is_modal_open = page.evaluate("() => document.getElementById('thankYouModal').classList.contains('is-open')")
    modal_ref = page.evaluate("() => document.getElementById('modalRefId').textContent")

    print("Formspree route intercepted:", len(route_intercepted) > 0)
    print("Thank You Modal Open:", is_modal_open)
    print("Generated Reference ID:", modal_ref)

    b.close()
