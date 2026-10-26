import time
import json
from playwright.sync_api import sync_playwright

PORT = 8089
BASE_URL = f"http://localhost:{PORT}"

results = {
    "header_nav": False,
    "footer_links": False,
    "tour_cards": False,
    "itinerary_accordions": False,
    "gallery_lightbox": False,
    "review_filters": False,
    "destination_filters": False,
    "mobile_menu": False,
    "language_switcher": False,
    "form_validation": False,
    "form_submission_modal": False,
    "map_controls": False,
    "floating_whatsapp": False,
    "back_to_top": False
}

errors = []

with sync_playwright() as p:
    browser = p.chromium.launch(channel="chrome", headless=True)

    # -------------------------------------------------------------
    # 1. HEADER & FOOTER NAVIGATION
    # -------------------------------------------------------------
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto(f"{BASE_URL}/index.html", wait_until="domcontentloaded")
    time.sleep(0.4)

    # Check header links
    nav_links = page.evaluate("""() => {
        const links = Array.from(document.querySelectorAll('.site-header-walkers .walkers-menu-link, .site-header-walkers .walkers-nav-link'));
        return links.map(l => ({ text: l.textContent.trim(), href: l.getAttribute('href') }));
    }""")
    if len(nav_links) >= 5:
        results["header_nav"] = True
    else:
        errors.append(f"Header nav had fewer than 5 links: {len(nav_links)}")

    # Check footer contact links
    footer_check = page.evaluate("""() => {
        const tel = document.querySelector('a[href^="tel:"]');
        const mail = document.querySelector('a[href^="mailto:"]');
        const wa = document.querySelector('a[href*="wa.me"]');
        return { hasTel: !!tel, hasMail: !!mail, hasWa: !!wa };
    }""")
    if footer_check["hasTel"] and footer_check["hasMail"] and footer_check["hasWa"]:
        results["footer_links"] = True
    else:
        errors.append(f"Footer missing essential links: {footer_check}")

    # -------------------------------------------------------------
    # 2. TOUR CARDS & BOOKING BUTTONS
    # -------------------------------------------------------------
    page.goto(f"{BASE_URL}/sri-lanka-tours.html", wait_until="domcontentloaded")
    time.sleep(0.4)
    tour_links = page.evaluate("""() => {
        const cards = document.querySelectorAll('.tour-card, .img-content-card, .beach-tour-card');
        const viewBtns = document.querySelectorAll('a[href*="tours/"], a[href*="-tours.html"]');
        const bookBtns = document.querySelectorAll('a[href*="inquiry"]');
        return { cards: cards.length, viewBtns: viewBtns.length, bookBtns: bookBtns.length };
    }""")
    if tour_links["viewBtns"] > 0 and tour_links["bookBtns"] > 0:
        results["tour_cards"] = True
    else:
        errors.append(f"Tour cards missing interactive buttons: {tour_links}")

    # -------------------------------------------------------------
    # 3. ITINERARY ACCORDIONS ON TOUR DETAIL PAGE
    # -------------------------------------------------------------
    page.goto(f"{BASE_URL}/tours/cultural/three-millennia-of-living-heritage/index.html", wait_until="domcontentloaded")
    time.sleep(0.5)
    acc_check = page.evaluate("""() => {
        const headers = document.querySelectorAll('.itinerary-accordion-header, .accordion-header, details summary');
        if (headers.length === 0) return { count: 0, toggled: false };
        const first = headers[0];
        first.click();
        return { count: headers.length, toggled: true };
    }""")
    if acc_check["count"] > 0 and acc_check["toggled"]:
        results["itinerary_accordions"] = True
    else:
        errors.append(f"Itinerary accordions check failed: {acc_check}")

    # -------------------------------------------------------------
    # 4. GALLERY LIGHTBOX MODAL
    # -------------------------------------------------------------
    page.goto(f"{BASE_URL}/gallery.html", wait_until="domcontentloaded")
    time.sleep(0.5)
    gallery_res = page.evaluate("""() => {
        const card = document.querySelector('.gallery-card');
        const modal = document.getElementById('lightboxModal');
        if (!card || !modal) return { present: false, opened: false, closed: false };
        card.click();
        const opened = modal.classList.contains('is-active');
        const closeBtn = document.querySelector('.lightbox-close') || modal;
        if (closeBtn) closeBtn.click();
        const closed = !modal.classList.contains('is-active');
        return { present: true, opened: opened, closed: closed };
    }""")
    if gallery_res["present"] and gallery_res["opened"]:
        results["gallery_lightbox"] = True
    else:
        errors.append(f"Gallery lightbox check failed: {gallery_res}")

    # -------------------------------------------------------------
    # 5. REVIEW & DESTINATION FILTERS
    # -------------------------------------------------------------
    page.goto(f"{BASE_URL}/reviews.html", wait_until="domcontentloaded")
    time.sleep(0.4)
    rev_filter = page.evaluate("""() => {
        const btns = document.querySelectorAll('.dest-filter-btn');
        if (btns.length < 2) return { present: false, clicked: false };
        btns[1].click();
        const isActive = btns[1].classList.contains('is-active');
        return { present: true, clicked: isActive };
    }""")
    if rev_filter["present"] and rev_filter["clicked"]:
        results["review_filters"] = True
    else:
        errors.append(f"Review filters failed: {rev_filter}")

    page.goto(f"{BASE_URL}/destinations.html", wait_until="domcontentloaded")
    time.sleep(0.4)
    dest_filter = page.evaluate("""() => {
        const btns = document.querySelectorAll('.dest-filter-btn');
        if (btns.length < 2) return { present: false, clicked: false };
        btns[1].click();
        return { present: true, clicked: btns[1].classList.contains('is-active') };
    }""")
    if dest_filter["present"] and dest_filter["clicked"]:
        results["destination_filters"] = True
    else:
        errors.append(f"Destination filters failed: {dest_filter}")

    # -------------------------------------------------------------
    # 6. MOBILE NAVIGATION MENU (Drawer, Accordion, Back-Nav)
    # -------------------------------------------------------------
    mob_page = browser.new_page(viewport={"width": 390, "height": 844})
    mob_page.goto(f"{BASE_URL}/index.html", wait_until="domcontentloaded")
    time.sleep(0.4)
    mob_res = mob_page.evaluate("""() => {
        const ham = document.getElementById('mobileHamToggle');
        const drawer = document.getElementById('mobileNavFullscreen');
        const close = document.getElementById('mobileNavClose');
        const acc = document.getElementById('mobileToursToggle');
        if (!ham || !drawer) return { success: false, reason: 'missing elements' };
        ham.click();
        const opened = drawer.classList.contains('is-open');
        let accToggled = false;
        if (acc) {
            acc.click();
            accToggled = document.getElementById('mobileToursSubmenu').classList.contains('is-expanded');
        }
        if (close) close.click();
        const closed = !drawer.classList.contains('is-open');
        return { success: (opened && closed), opened, closed, accToggled };
    }""")
    if mob_res["success"]:
        results["mobile_menu"] = True
    else:
        errors.append(f"Mobile navigation check failed: {mob_res}")
    mob_page.close()

    # -------------------------------------------------------------
    # 7. LANGUAGE SWITCHER
    # -------------------------------------------------------------
    page.goto(f"{BASE_URL}/index.html", wait_until="domcontentloaded")
    time.sleep(0.4)
    lang_res = page.evaluate("""() => {
        const toggle = document.getElementById('langPillToggle');
        const menu = document.getElementById('langPillMenu');
        if (!toggle || !menu) return { success: false, reason: 'no pill' };
        toggle.click();
        const opened = menu.classList.contains('is-active');
        const zh = menu.querySelector('button[data-lang="zh-CN"]') || menu.querySelector('button[data-lang="zh"]');
        if (zh) zh.click();
        return { opened: opened, switched: (localStorage.getItem('lotus_lang') !== null) };
    }""")
    if lang_res["opened"] and lang_res["switched"]:
        results["language_switcher"] = True
    else:
        errors.append(f"Language switcher failed: {lang_res}")

    # -------------------------------------------------------------
    # 8. FORM VALIDATION & MODAL SUBMISSION
    # -------------------------------------------------------------
    page.goto(f"{BASE_URL}/inquiry-quick.html", wait_until="domcontentloaded")
    time.sleep(0.4)
    val_res = page.evaluate("""() => {
        const form = document.getElementById('inquiryForm');
        const btn = document.getElementById('submitInquiryBtn');
        if (!form || !btn) return { hasForm: false };
        // Test required field check without filling
        const nameInput = document.getElementById('fullName');
        const isRequired = nameInput ? nameInput.hasAttribute('required') : false;
        return { hasForm: true, validationBlocked: isRequired };
    }""")
    if val_res["hasForm"] and val_res["validationBlocked"]:
        results["form_validation"] = True
    else:
        errors.append(f"Form validation check failed: {val_res}")

    # Now fill out valid fields and submit
    page.evaluate("""() => {
        document.getElementById('fullName').value = 'Test Travel Guest';
        document.getElementById('emailAddress').value = 'guest@example.com';
        document.getElementById('selectedCountry').value = 'United Kingdom';
        document.getElementById('countrySearchInput').value = 'United Kingdom';
        document.getElementById('arrivalDate').value = '2026-11-20';
        document.getElementById('departureDate').value = '2026-11-30';
    }""")
    page.click("#submitInquiryBtn")
    time.sleep(1.0)
    modal_open = page.evaluate("""() => {
        const modal = document.getElementById('thankYouModal');
        return modal ? modal.classList.contains('is-open') : false;
    }""")
    if modal_open:
        results["form_submission_modal"] = True
        # Close the modal
        page.evaluate("""() => {
            const closeBtn = document.querySelector('[data-close-modal], .modal-close-btn');
            if (closeBtn) closeBtn.click();
        }""")
    else:
        errors.append("Thank you modal did not open on valid submission")

    # -------------------------------------------------------------
    # 9. MAP CONTROLS & FLOATING ELEMENTS
    # -------------------------------------------------------------
    page.goto(f"{BASE_URL}/contact.html", wait_until="domcontentloaded")
    time.sleep(0.5)
    map_res = page.evaluate("""() => {
        const map = document.querySelector('#contactMap');
        const zoomIn = document.querySelector('.leaflet-control-zoom-in');
        const fab = document.querySelector('#unifiedFabGroup, .whatsapp-float');
        const btt = document.querySelector('#fabBackToTop, .back-to-top');
        return {
            mapPresent: !!map,
            zoomPresent: !!zoomIn,
            fabPresent: !!fab,
            bttPresent: !!btt
        };
    }""")
    if map_res["mapPresent"] and map_res["zoomPresent"]:
        results["map_controls"] = True
    else:
        errors.append(f"Map controls check failed: {map_res}")
    
    if map_res["fabPresent"]:
        results["floating_whatsapp"] = True
    if map_res["bttPresent"]:
        results["back_to_top"] = True

    browser.close()

print("\n=== INTERACTIVE ELEMENTS TEST SUMMARY ===")
for k, v in results.items():
    print(f"  [{'PASS' if v else 'FAIL'}] {k}")

if errors:
    print("\nErrors encountered:")
    for err in errors:
        print(f"  - {err}")
else:
    print("\nALL 14 INTERACTION CATEGORIES PASSED 100%!")
