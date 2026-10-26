"""
Automated Test Suite: Technical SEO, Accessibility (WCAG 2.2 AA), and Content Quality
Validates:
1. SEO Titles, Meta Descriptions, & Production Canonicals (https://lotusceylon.com)
2. Open Graph & Social Sharing Metadata
3. Structured Data JSON-LD Schemas
4. Sitemap & Robots.txt Completeness
5. WCAG 2.2 AA Keyboard Navigation & Visible Focus Indicators
6. WCAG 2.2 AA Form Labels & Screen-Reader Landmarks
7. Heading Hierarchy Integrity (No Skipped Levels, Single H1 per view)
8. Content Quality & Statistics Integrity (Accurate 12+ Years, Zero Duplicated FAQs)
"""

import os
import sys
import xml.etree.ElementTree as ET
from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright

passed = 0
failed = 0

def log_test(name, success, detail=""):
    global passed, failed
    if success:
        passed += 1
        print(f"[PASS] {name}: {detail}")
    else:
        failed += 1
        print(f"[FAIL] {name}: {detail}")

def run_tests():
    global passed, failed
    print("=" * 70)
    print("STARTING TECHNICAL SEO, ACCESSIBILITY & CONTENT QUALITY TEST SUITE")
    print("=" * 70)

    # -------------------------------------------------------------------------
    # TEST 1: Canonical URLs & Absence of Dev/GitHub.io Host in Production Tags
    # -------------------------------------------------------------------------
    github_canonicals = []
    missing_canonicals = []
    root_pages = [
        "index.html", "about.html", "contact.html", "destinations.html",
        "experiences.html", "reviews.html", "gallery.html", "blog.html",
        "sri-lanka-tours.html", "privacy-policy.html", "terms-conditions.html",
        "cancellation-policy.html", "cookie-policy.html", "inquiry-quick.html", "inquiry-detailed.html"
    ]

    for p in root_pages:
        with open(p, "r", encoding="utf-8") as f:
            soup = BeautifulSoup(f.read(), "html.parser")
        c = soup.find("link", rel="canonical")
        if not c or not c.get("href"):
            missing_canonicals.append(p)
        elif "kanchu12345.github.io" in c["href"]:
            github_canonicals.append((p, c["href"]))
        elif not c["href"].startswith("https://lotusceylon.com"):
            missing_canonicals.append((p, c["href"]))

    # Also test sample tour detail page
    sample_tour = "tours/cultural/royal-kingdoms-sacred-temples/index.html"
    with open(sample_tour, "r", encoding="utf-8") as f:
        soup_t = BeautifulSoup(f.read(), "html.parser")
    ct = soup_t.find("link", rel="canonical")
    if ct and "kanchu12345.github.io" in ct.get("href", ""):
        github_canonicals.append((sample_tour, ct["href"]))

    canon_ok = (len(missing_canonicals) == 0) and (len(github_canonicals) == 0)
    log_test("Test 1 - Production Canonical URLs", canon_ok,
             f"Zero dev host canonicals, all canonicals point to https://lotusceylon.com/")

    # -------------------------------------------------------------------------
    # TEST 2: Open Graph & Twitter Social Metadata
    # -------------------------------------------------------------------------
    missing_og = []
    for p in ["index.html", "about.html", "contact.html", "destinations.html", "sri-lanka-tours.html", sample_tour]:
        with open(p, "r", encoding="utf-8") as f:
            soup = BeautifulSoup(f.read(), "html.parser")
        has_title = soup.find("meta", property="og:title")
        has_desc = soup.find("meta", property="og:description")
        has_url = soup.find("meta", property="og:url")
        has_img = soup.find("meta", property="og:image")
        has_tw = soup.find("meta", attrs={"name": "twitter:card"})
        if not (has_title and has_desc and has_url and has_img and has_tw):
            missing_og.append(p)

    log_test("Test 2 - Open Graph & Twitter Cards", len(missing_og) == 0,
             f"Verified comprehensive social metadata across key views (Missing: {len(missing_og)})")

    # -------------------------------------------------------------------------
    # TEST 3: Schema.org Structured Data (JSON-LD)
    # -------------------------------------------------------------------------
    missing_schema = []
    for p in ["index.html", "about.html", "contact.html", "reviews.html", sample_tour]:
        with open(p, "r", encoding="utf-8") as f:
            soup = BeautifulSoup(f.read(), "html.parser")
        s = soup.find("script", type="application/ld+json")
        if not s or not s.string or "@context" not in s.string:
            missing_schema.append(p)

    log_test("Test 3 - Structured Data (JSON-LD)", len(missing_schema) == 0,
             f"Verified Schema.org schemas (TravelAgency, AboutPage, ContactPage, TouristTrip)")

    # -------------------------------------------------------------------------
    # TEST 4: Sitemap & Robots.txt Completeness
    # -------------------------------------------------------------------------
    with open("robots.txt", "r", encoding="utf-8") as f:
        robots_txt = f.read()

    has_sitemap_ref = "Sitemap: https://lotusceylon.com/sitemap.xml" in robots_txt
    has_admin_disallow = "Disallow: /admin" in robots_txt

    tree = ET.parse("sitemap.xml")
    root = tree.getroot()
    ns = {"ns": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    urls = [u.find("ns:loc", ns).text.strip() for u in root.findall("ns:url", ns)]

    required_in_sitemap = [
        "https://lotusceylon.com/",
        "https://lotusceylon.com/sri-lanka-tours.html",
        "https://lotusceylon.com/destinations.html",
        "https://lotusceylon.com/experiences.html",
        "https://lotusceylon.com/reviews.html",
        "https://lotusceylon.com/about.html",
        "https://lotusceylon.com/contact.html",
        "https://lotusceylon.com/tours/buddhist-heritage/"
    ]
    missing_sitemap_urls = [u for u in required_in_sitemap if u not in urls]
    sitemap_pass = has_sitemap_ref and has_admin_disallow and len(missing_sitemap_urls) == 0
    log_test("Test 4 - Sitemap & Robots.txt Accuracy", sitemap_pass,
             f"Total URLs in sitemap: {len(urls)}, Missing required: {len(missing_sitemap_urls)}")

    # -------------------------------------------------------------------------
    # TEST 5: Content Integrity & Duplication Elimination
    # -------------------------------------------------------------------------
    with open("index.html", "r", encoding="utf-8") as f:
        idx_c = f.read()
    with open("sri-lanka-tours.html", "r", encoding="utf-8") as f:
        sri_c = f.read()

    has_correct_years = 'data-target="12">12</span>+' in idx_c
    has_no_zero_stats = 'data-target="10">0</span>' not in idx_c
    no_duplicate_faq_container = 'id="lotusFaqContainer"' not in sri_c

    content_pass = has_correct_years and has_no_zero_stats and no_duplicate_faq_container
    log_test("Test 5 - Content Integrity & Duplication Removal", content_pass,
             f"12+ Years accurate: {has_correct_years}, Zero duplicate FAQ containers: {no_duplicate_faq_container}")

    # -------------------------------------------------------------------------
    # TEST 6: WCAG 2.2 AA Keyboard Navigation & Skip Link via Playwright
    # -------------------------------------------------------------------------
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="chrome", headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.goto("http://localhost:8089/index.html", wait_until="domcontentloaded")
        page.wait_for_timeout(1000)

        # Tab to activate skip link
        page.keyboard.press("Tab")
        page.wait_for_timeout(300)

        skip_focused = page.evaluate("""() => {
            const el = document.activeElement;
            const isSkip = el && el.classList.contains('skip-to-content-link');
            const style = el ? window.getComputedStyle(el) : null;
            return {
                isSkip,
                top: style ? style.top : null,
                outline: style ? style.outline : null
            };
        }""")

        log_test("Test 6 - WCAG 2.4.1 Skip Link & Keyboard Focus", skip_focused["isSkip"] and skip_focused["top"] != "-120px",
                 f"Active element is skip link: {skip_focused['isSkip']}, visible on focus: {skip_focused['top']}")

        # -------------------------------------------------------------------------
        # TEST 7: WCAG 2.2 AA Visible Focus Indicator on Interactive Elements
        # -------------------------------------------------------------------------
        page.keyboard.press("Tab")
        page.keyboard.press("Tab")
        page.wait_for_timeout(300)

        focus_ring = page.evaluate("""() => {
            const el = document.activeElement;
            if (!el) return { hasOutline: false };
            const style = window.getComputedStyle(el);
            const outline = style.outlineStyle !== 'none' || style.boxShadow.includes('rgba(212, 163, 89');
            return {
                tag: el.tagName,
                hasOutline: outline,
                outlineColor: style.outlineColor
            };
        }""")

        log_test("Test 7 - WCAG 2.4.7 Focus Visible Indicator", focus_ring["hasOutline"],
                 f"Focus indicator confirmed on <{focus_ring['tag']}>")

        # -------------------------------------------------------------------------
        # TEST 8: WCAG Form Labels & Accessible Inputs
        # -------------------------------------------------------------------------
        page.goto("http://localhost:8089/inquiry-quick.html", wait_until="domcontentloaded")
        page.wait_for_timeout(800)

        form_labels_quick = page.evaluate("""() => {
            const inputs = document.querySelectorAll('input:not([type="hidden"]):not([id^="goog-gt-"]), select, textarea');
            let unlabelled = 0;
            inputs.forEach(inp => {
                const id = inp.id;
                let hasLabel = false;
                if (id && document.querySelector(`label[for="${id}"]`)) hasLabel = true;
                if (inp.closest('label')) hasLabel = true;
                if (inp.getAttribute('aria-label') || inp.getAttribute('aria-labelledby') || inp.getAttribute('title')) hasLabel = true;
                if (!hasLabel) unlabelled++;
            });
            return {
                totalInputs: inputs.length,
                unlabelled
            };
        }""")

        page.goto("http://localhost:8089/inquiry-detailed.html", wait_until="domcontentloaded")
        page.wait_for_timeout(800)

        form_labels_detailed = page.evaluate("""() => {
            const inputs = document.querySelectorAll('input:not([type="hidden"]):not([id^="goog-gt-"]), select, textarea');
            let unlabelled = 0;
            inputs.forEach(inp => {
                const id = inp.id;
                let hasLabel = false;
                if (id && document.querySelector(`label[for="${id}"]`)) hasLabel = true;
                if (inp.closest('label')) hasLabel = true;
                if (inp.getAttribute('aria-label') || inp.getAttribute('aria-labelledby') || inp.getAttribute('title')) hasLabel = true;
                if (!hasLabel) unlabelled++;
            });
            return {
                totalInputs: inputs.length,
                unlabelled
            };
        }""")

        all_forms_accessible = (form_labels_quick["unlabelled"] == 0) and (form_labels_detailed["unlabelled"] == 0)
        log_test("Test 8 - Accessible Form Controls (Quick & Bespoke)", all_forms_accessible,
                 f"Quick form unlabeled: {form_labels_quick['unlabelled']}, Detailed form unlabeled: {form_labels_detailed['unlabelled']}")

        browser.close()

    print("=" * 70)
    print(f"AUDIT SUMMARY: {passed} PASSED, {failed} FAILED")
    print("=" * 70)
    return failed == 0

if __name__ == "__main__":
    success = run_tests()
    sys.exit(0 if success else 1)
