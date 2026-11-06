import sys
import time
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8')
BASE_URL = "http://127.0.0.1:8089"

with sync_playwright() as p:
    browser = p.chromium.launch(channel='chrome', headless=True)
    page = browser.new_page()
    page.on('console', lambda m: print(f"CONSOLE [{m.type}]: {m.text}"))
    page.goto(f"{BASE_URL}/admin/index.html", wait_until='load')
    time.sleep(1)

    # Login
    page.fill('#loginEmail', 'admin@lotusceylon.com')
    page.fill('#loginPassword', 'LotusCeylon@2026')
    page.click('#loginBtn')
    page.wait_for_selector('#adminApp', state='visible', timeout=10000)

    # Test Destination
    print("Testing Destination...")
    page.evaluate("AdminApp.openDestinationModal()")
    time.sleep(0.5)
    page.fill('#destTitle', 'Jaffna Peninsula & Nainativu')
    page.fill('#destSlug', 'jaffna-peninsula')
    page.fill('#destDescription', 'Northern gateway rich in sacred temples.')
    res_dest = page.evaluate("""async () => {
        try {
            await AdminApp.saveDestination();
            return { success: true, count: AdminApp.destinations.length };
        } catch(e) {
            return { error: e.message, stack: e.stack };
        }
    }""")
    print("Destination save result:", res_dest)

    # Test Review
    print("Testing Review...")
    page.evaluate("AdminApp.openReviewModal()")
    time.sleep(0.5)
    page.fill('#revGuestName', 'Dr. Alistair Vance')
    page.fill('#revCountry', 'United Kingdom')
    page.fill('#revText', 'Superb journey.')
    res_rev = page.evaluate("""async () => {
        try {
            await AdminApp.saveReview();
            return { success: true, count: AdminApp.reviews.length };
        } catch(e) {
            return { error: e.message, stack: e.stack };
        }
    }""")
    print("Review save result:", res_rev)

    # Test Team
    print("Testing Team...")
    page.evaluate("AdminApp.openTeamModal()")
    time.sleep(0.5)
    page.fill('#teamName', 'Venerable W. Ananda Thero')
    page.fill('#teamRole', 'Chief Cultural Advisor')
    page.fill('#teamCountry', 'Sri Lanka')
    res_team = page.evaluate("""async () => {
        try {
            await AdminApp.saveTeamMember();
            return { success: true, count: AdminApp.team.length };
        } catch(e) {
            return { error: e.message, stack: e.stack };
        }
    }""")
    print("Team save result:", res_team)

    # Test Blog
    print("Testing Blog...")
    page.evaluate("AdminApp.openBlogModal()")
    time.sleep(0.5)
    page.fill('#blogTitle', 'Hidden Cave Temples of Dambulla')
    page.fill('#blogSlug', 'hidden-cave-temples-dambulla')
    res_blog = page.evaluate("""async () => {
        try {
            await AdminApp.saveBlogModal();
            return { success: true, count: AdminApp.blogPosts.length };
        } catch(e) {
            return { error: e.message, stack: e.stack };
        }
    }""")
    print("Blog save result:", res_blog)

    browser.close()
