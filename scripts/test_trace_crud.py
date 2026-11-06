import sys
import time
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8')

with sync_playwright() as p:
    browser = p.chromium.launch(channel='chrome', headless=True)
    page = browser.new_page()

    page.goto('http://127.0.0.1:8089/admin/index.html', wait_until='load')
    page.wait_for_selector('#loginEmail')
    page.fill('#loginEmail', 'admin@lotusceylon.com')
    page.fill('#loginPassword', 'LotusCeylon@2026')
    page.click('#loginBtn')
    page.wait_for_selector('#adminApp', state='visible', timeout=10000)

    # 1. Category
    page.evaluate("AdminApp.switchSection('categories')")
    time.sleep(0.3)
    page.evaluate("AdminApp.openCategoryModal()")
    time.sleep(0.3)
    page.fill('#catTitle', 'Sacred Ceylon Pilgrimages')
    page.fill('#catSlug', 'sacred-ceylon-pilgrimages')
    page.fill('#catTagline', 'Spiritual sanctuaries')
    cat_res = page.evaluate("""async () => {
        try {
            await AdminApp.saveCategory();
            return { ok: true };
        } catch(e) {
            return { ok: false, error: e.message };
        }
    }""")
    print("Category save:", cat_res)
    cat_ok = page.evaluate("() => { const c = JSON.parse(localStorage.getItem('lotus_data_payload') || '{}'); return (c.categories || []).some(x => x.slug === 'sacred-ceylon-pilgrimages'); }")
    print("Category in cache:", cat_ok)

    # 2. Destination
    page.evaluate("AdminApp.switchSection('destinations')")
    time.sleep(0.3)
    page.evaluate("AdminApp.openDestinationModal()")
    time.sleep(0.3)
    page.fill('#destTitle', 'Jaffna Peninsula')
    page.fill('#destSlug', 'jaffna-peninsula')
    page.fill('#destDescription', 'Northern gateway rich in sacred temples.')
    dest_res = page.evaluate("""async () => {
        try {
            await AdminApp.saveDestination();
            return { ok: true };
        } catch(e) {
            return { ok: false, error: e.message };
        }
    }""")
    print("Destination save:", dest_res)
    dest_ok = page.evaluate("() => { const c = JSON.parse(localStorage.getItem('lotus_data_payload') || '{}'); return (c.destinations || []).some(x => x.slug === 'jaffna-peninsula'); }")
    print("Destination in cache:", dest_ok)

    # 3. Review
    page.evaluate("AdminApp.switchSection('reviews')")
    time.sleep(0.3)
    page.evaluate("AdminApp.openReviewModal()")
    time.sleep(0.3)
    page.fill('#revGuestName', 'Dr. Alistair')
    page.fill('#revCountry', 'United Kingdom')
    page.fill('#revTourTaken', 'Sacred Footsteps')
    page.fill('#revText', 'Extraordinary private pilgrimage experience.')
    rev_res = page.evaluate("""async () => {
        try {
            await AdminApp.saveReview();
            return { ok: true };
        } catch(e) {
            return { ok: false, error: e.message };
        }
    }""")
    print("Review save:", rev_res)
    rev_ok = page.evaluate("() => { const c = JSON.parse(localStorage.getItem('lotus_data_payload') || '{}'); return (c.reviews || []).some(x => x.guest_name && x.guest_name.includes('Alistair')); }")
    print("Review in cache:", rev_ok)

    # 4. Team
    page.evaluate("AdminApp.switchSection('team')")
    time.sleep(0.3)
    page.evaluate("AdminApp.openTeamModal()")
    time.sleep(0.3)
    page.fill('#teamName', 'Venerable W. Ananda Thero')
    page.fill('#teamRole', 'Chief Cultural Advisor')
    page.fill('#teamCountry', 'Sri Lanka')
    team_res = page.evaluate("""async () => {
        try {
            await AdminApp.saveTeamMember();
            return { ok: true };
        } catch(e) {
            return { ok: false, error: e.message };
        }
    }""")
    print("Team save:", team_res)
    team_ok = page.evaluate("() => { const c = JSON.parse(localStorage.getItem('lotus_data_payload') || '{}'); return (c.team || []).some(x => x.name && x.name.includes('Ananda')); }")
    print("Team in cache:", team_ok)

    # 5. PageEditor Footer and Contact Inspectors
    page.evaluate("AdminApp.switchSection('page-editor')")
    time.sleep(0.5)
    page.evaluate("PageEditor.openGlobalDoc('siteGlobal/footer', 'Footer & Legal')")
    time.sleep(0.5)
    footer_text = page.inner_text('#inspectorBody')
    print("Footer inspector has 'Global Footer & Legal':", 'Global Footer & Legal' in footer_text)
    print("Footer inspector raw snippet:", repr(footer_text[:80]))

    page.evaluate("PageEditor.openGlobalDoc('siteGlobal/contact', 'Concierge & Direct')")
    time.sleep(0.5)
    contact_text = page.inner_text('#inspectorBody')
    print("Contact inspector has 'Concierge & Direct':", 'Concierge & Direct' in contact_text)
    print("Contact inspector raw snippet:", repr(contact_text[:80]))

    browser.close()
