from playwright.sync_api import sync_playwright
import time
import sys
sys.stdout.reconfigure(encoding='utf-8')

BASE_URL = "http://127.0.0.1:8089"

with sync_playwright() as p:
    browser = p.chromium.launch(channel='chrome', headless=True)
    page = browser.new_page()
    page.goto(f"{BASE_URL}/admin/index.html", wait_until='load')
    time.sleep(1)
    page.fill('#loginEmail', 'admin@lotusceylon.com')
    page.fill('#loginPassword', 'LotusCeylon@2026')
    page.click('#loginBtn')
    page.wait_for_selector('#adminApp', state='visible', timeout=10000)

    # Destination
    page.evaluate("AdminApp.openDestinationModal()")
    time.sleep(0.5)
    page.fill('#destTitle', 'Jaffna Peninsula & Nainativu')
    page.fill('#destSlug', 'jaffna-peninsula')
    page.fill('#destDescription', 'Northern gateway rich in sacred temples.')
    page.evaluate("async () => await AdminApp.saveDestination()")
    time.sleep(1)
    res_dest = page.evaluate("() => { const c = JSON.parse(localStorage.getItem('lotus_data_payload') || '{}'); return { count: (c.destinations||[]).length, match: (c.destinations || []).some(x => x.slug === 'jaffna-peninsula') }; }")
    print("Destination check:", res_dest)

    # Review
    page.evaluate("AdminApp.openReviewModal()")
    time.sleep(0.5)
    page.fill('#revGuestName', 'Dr. Alistair & Elena Vance')
    page.fill('#revCountry', 'United Kingdom')
    page.fill('#revText', 'An extraordinary, life-enriching pilgrimage.')
    page.evaluate("async () => await AdminApp.saveReview()")
    time.sleep(1)
    res_rev = page.evaluate("() => { const c = JSON.parse(localStorage.getItem('lotus_data_payload') || '{}'); return { count: (c.reviews||[]).length, match: (c.reviews || []).some(x => x.guest_name && x.guest_name.includes('Alistair')) }; }")
    print("Review check:", res_rev)

    # Team
    page.evaluate("AdminApp.openTeamModal()")
    time.sleep(0.5)
    page.fill('#teamName', 'Venerable W. Ananda Thero')
    page.fill('#teamRole', 'Chief Cultural Advisor')
    page.fill('#teamCountry', 'Sri Lanka')
    page.evaluate("async () => await AdminApp.saveTeamMember()")
    time.sleep(1)
    res_team = page.evaluate("() => { const c = JSON.parse(localStorage.getItem('lotus_data_payload') || '{}'); return { count: (c.team||[]).length, match: (c.team || []).some(x => x.name && x.name.includes('Ananda')) }; }")
    print("Team check:", res_team)

    # Blog
    page.evaluate("AdminApp.openBlogModal()")
    time.sleep(0.5)
    page.fill('#blogTitle', 'Unveiling the Hidden Cave Temples of Dambulla')
    page.fill('#blogSlug', 'hidden-cave-temples-dambulla')
    page.evaluate("async () => await AdminApp.saveBlogModal()")
    time.sleep(1)
    res_blog = page.evaluate("() => { const c = JSON.parse(localStorage.getItem('lotus_data_payload') || '{}'); return { count: (c.blogPosts||[]).length, match: (c.blogPosts || []).some(x => x.slug === 'hidden-cave-temples-dambulla') }; }")
    print("Blog check:", res_blog)

    browser.close()
