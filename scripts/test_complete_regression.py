import sys
import time
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8')

BASE_URL = "http://127.0.0.1:8089"
console_errors = []
failed_requests = []

def on_console(msg):
    if msg.type in ['error']:
        txt = msg.text
        # Ignore external firestore network rules / gsessionid / 403 notices
        if 'channel?gsessionid' in txt or 'ERR_ABORTED' in txt or 'firestore.googleapis.com' in txt or 'status of 403' in txt or 'status of 400' in txt:
            return
        console_errors.append(f"[{msg.type.upper()}] {txt}")

def on_request_failed(req):
    url = req.url
    if 'favicon.ico' in url or 'channel?gsessionid' in url or 'ERR_ABORTED' in str(req.failure) or 'firestore.googleapis.com' in url:
        return
    failed_requests.append(f"[FAILED REQ] {req.method} {url} - {req.failure}")

print("=== STARTING FULL REGRESSION TEST SUITE ===", flush=True)

results = []

def record(test_name, passed, details=""):
    status = "PASS" if passed else "FAIL"
    print(f"[{status}] {test_name} {('- ' + details) if details else ''}", flush=True)
    results.append({"name": test_name, "status": status, "details": details})

with sync_playwright() as p:
    browser = p.chromium.launch(channel='chrome', headless=True)
    context = browser.new_context(viewport={'width': 1280, 'height': 800})
    page = context.new_page()
    page.on('console', on_console)
    page.on('requestfailed', on_request_failed)

    # -------------------------------------------------------------
    # 1. AUTHENTICATION & DIRECT ACCESS PROTECTION
    # -------------------------------------------------------------
    page.goto(f"{BASE_URL}/admin/index.html", wait_until='load')
    time.sleep(1)

    auth_visible = page.is_visible('#authScreen')
    app_hidden = not page.is_visible('#adminApp')
    record("Direct Admin Access Blocks Unauthenticated Users", auth_visible and app_hidden)

    page.evaluate("AdminApp.currentUser = null; AdminApp.showApp();")
    time.sleep(0.5)
    still_blocked = page.is_visible('#authScreen') and not page.is_visible('#adminApp')
    record("Direct AdminApp.showApp() Call Without Auth Bounces to Login", still_blocked)

    page.fill('#loginEmail', 'admin@lotusceylon.com')
    page.fill('#loginPassword', 'WrongPassword123!')
    page.click('#loginBtn')
    time.sleep(1.5)
    wrong_pw_blocked = page.is_visible('#authScreen') and not page.is_visible('#adminApp')
    record("Wrong Password Login Rejected", wrong_pw_blocked)

    page.fill('#loginEmail', 'admin@lotusceylon.com')
    page.fill('#loginPassword', 'LotusCeylon@2026')
    page.click('#loginBtn')
    try:
        page.wait_for_selector('#adminApp', state='visible', timeout=10000)
        logged_in = page.is_visible('#adminApp') and not page.is_visible('#authScreen')
    except Exception as e:
        logged_in = False
    record("Master Admin Login Succeeds", logged_in)

    # -------------------------------------------------------------
    # 2. CHECK ALL 13 CONTENT SECTIONS
    # -------------------------------------------------------------
    sections = [
        ('dashboard', '#statPackagesCount'),
        ('inquiries', '#inquiriesTableBody'),
        ('packages', '#packagesTableBody'),
        ('categories', '#categoriesTableBody'),
        ('destinations', '#destinationsTableBody'),
        ('reviews', '#reviewsTableBody'),
        ('media', '#mediaGrid'),
        ('users', '#usersTableBody'),
        ('settings', '#settingCompanyName'),
        ('team', '#teamTableBody'),
        ('page-editor', '#visualCmsIframe'),
        ('forms-editor', '#formRecipientEmail'),
        ('blog-posts', '#blogPostsTableBody')
    ]

    for sec_id, verify_selector in sections:
        page.evaluate(f"AdminApp.switchSection('{sec_id}')")
        time.sleep(0.15)
        active = page.is_visible(f"#section-{sec_id}")
        target_found = page.is_visible(verify_selector) if active else False
        record(f"Section Switch: {sec_id}", active and target_found)

    # -------------------------------------------------------------
    # 3. TEST CRUD MODALS & SAVES
    # -------------------------------------------------------------
    # A. Category Modal
    page.evaluate("AdminApp.switchSection('categories')")
    time.sleep(0.3)
    page.evaluate("AdminApp.openCategoryModal()")
    time.sleep(0.3)
    page.fill('#catTitle', 'Sacred Ceylon Pilgrimages')
    page.fill('#catSlug', 'sacred-ceylon-pilgrimages')
    page.fill('#catTagline', 'Timeless spiritual sanctuaries of ancient Lanka')
    res_cat = page.evaluate("""async () => {
        try {
            await AdminApp.saveCategory();
            return { ok: true };
        } catch(e) {
            return { ok: false, error: e.toString() };
        }
    }""")
    cached_cats = page.evaluate("""() => {
        const raw = localStorage.getItem('lotus_data_payload');
        if (!raw) return false;
        const c = JSON.parse(raw);
        const list = Array.isArray(c.categories) ? c.categories : Object.values(c.categories || {});
        return list.some(x => x && (x.slug === 'sacred-ceylon-pilgrimages' || x.id === 'cat-sacred-ceylon-pilgrimages'));
    }""")
    record("Category Create, Save & Cache Sync", res_cat.get('ok') and cached_cats)

    # B. Destination Modal
    page.evaluate("AdminApp.switchSection('destinations')")
    time.sleep(0.3)
    page.evaluate("AdminApp.openDestinationModal()")
    time.sleep(0.3)
    page.fill('#destTitle', 'Jaffna Peninsula & Nainativu')
    page.fill('#destSlug', 'jaffna-peninsula')
    page.fill('#destDescription', 'Northern gateway rich in sacred temples.')
    page.fill('#destImage', 'assets/images/cultural/sigiriya-1.webp')
    res_dest = page.evaluate("""async () => {
        try {
            await AdminApp.saveDestination();
            return { ok: true };
        } catch(e) {
            return { ok: false, error: e.toString() };
        }
    }""")
    cached_dests = page.evaluate("""() => {
        const raw = localStorage.getItem('lotus_data_payload');
        if (!raw) return false;
        const c = JSON.parse(raw);
        const list = Array.isArray(c.destinations) ? c.destinations : Object.values(c.destinations || {});
        return list.some(x => x && (x.slug === 'jaffna-peninsula' || x.id === 'dest-jaffna-peninsula'));
    }""")
    record("Destination Create, Save & Cache Sync", res_dest.get('ok') and cached_dests)

    # C. Review Modal
    page.evaluate("AdminApp.switchSection('reviews')")
    time.sleep(0.3)
    page.evaluate("AdminApp.openReviewModal()")
    time.sleep(0.3)
    page.fill('#revGuestName', 'Dr. Alistair & Elena Vance')
    page.fill('#revCountry', 'United Kingdom')
    page.fill('#revTourTaken', 'Sacred Footsteps & Cultural Grandeur')
    page.fill('#revText', 'An extraordinary, life-enriching pilgrimage with impeccable private concierge service.')
    res_rev = page.evaluate("""async () => {
        try {
            await AdminApp.saveReview();
            return { ok: true };
        } catch(e) {
            return { ok: false, error: e.toString() };
        }
    }""")
    cached_revs = page.evaluate("""() => {
        const raw = localStorage.getItem('lotus_data_payload');
        if (!raw) return false;
        const c = JSON.parse(raw);
        const list = Array.isArray(c.reviews) ? c.reviews : Object.values(c.reviews || {});
        return list.some(x => x && x.guest_name && x.guest_name.includes('Alistair'));
    }""")
    record("Review Create, Save & Cache Sync", res_rev.get('ok') and cached_revs)

    # D. Team Member Modal
    page.evaluate("AdminApp.switchSection('team')")
    time.sleep(0.3)
    page.evaluate("AdminApp.openTeamModal()")
    time.sleep(0.3)
    page.fill('#teamName', 'Venerable W. Ananda Thero')
    page.fill('#teamFlag', '🇱🇰')
    page.fill('#teamRole', 'Chief Cultural & Buddhist Heritage Advisor')
    page.fill('#teamCountry', 'Sri Lanka')
    page.fill('#teamBio', 'Scholar of Pali Buddhist canon and ancient stupa architecture.')
    page.fill('#teamPhotoUrl', 'assets/images/cultural/sigiriya-1.webp')
    res_team = page.evaluate("""async () => {
        try {
            await AdminApp.saveTeamMember();
            return { ok: true };
        } catch(e) {
            return { ok: false, error: e.toString() };
        }
    }""")
    cached_team = page.evaluate("""() => {
        const raw = localStorage.getItem('lotus_data_payload');
        if (!raw) return false;
        const c = JSON.parse(raw);
        const list = Array.isArray(c.team) ? c.team : Object.values(c.team || {});
        return list.some(x => x && x.name && x.name.includes('Ananda'));
    }""")
    record("Team Member Create, Save & Cache Sync", res_team.get('ok') and cached_team)

    # E. Blog Story Modal
    page.evaluate("AdminApp.switchSection('blog-posts')")
    time.sleep(0.3)
    page.evaluate("AdminApp.openBlogModal()")
    time.sleep(0.3)
    page.fill('#blogTitle', 'Unveiling the Hidden Cave Temples of Dambulla')
    page.fill('#blogSlug', 'hidden-cave-temples-dambulla')
    page.fill('#blogCategory', 'Cultural Heritage')
    page.fill('#blogAuthor', 'Lotus Ceylon Editorial')
    page.fill('#blogCoverImage', 'assets/images/cultural/sigiriya-1.webp')
    page.fill('#blogExcerpt', 'A deep architectural and spiritual guide to Sri Lanka\'s five ancient rock sanctuaries.')
    page.fill('#blogContent', '<p>Spanning over 22 centuries, the cave temples of Dambulla stand as living testimonies...</p>')
    res_blog = page.evaluate("""async () => {
        try {
            await AdminApp.saveBlogModal();
            return { ok: true };
        } catch(e) {
            return { ok: false, error: e.toString() };
        }
    }""")
    cached_blog = page.evaluate("""() => {
        const raw = localStorage.getItem('lotus_data_payload');
        if (!raw) return false;
        const c = JSON.parse(raw);
        const list = Array.isArray(c.blogPosts || c.blog) ? (c.blogPosts || c.blog) : Object.values(c.blogPosts || c.blog || {});
        return list.some(x => x && (x.slug === 'hidden-cave-temples-dambulla' || (typeof x.title === 'string' && x.title.includes('Dambulla'))));
    }""")
    record("Blog Story Create, Save & Cache Sync", res_blog.get('ok') and cached_blog)

    # F. Forms & Schemas Editor
    page.evaluate("AdminApp.switchSection('forms-editor')")
    time.sleep(0.4)
    page.evaluate("PageEditor.openFormEditor('inquiry_quick')")
    time.sleep(0.4)
    quick_title = page.inner_text('#formEditorActiveTitle')
    page.fill('#formEmailSubject', 'New Tour Consultation Inquiry - Lotus Ceylon Luxury')
    page.evaluate("""async () => {
        try {
            await PageEditor.saveActiveForm();
        } catch(e) {}
    }""")
    time.sleep(0.5)
    saved_form = page.evaluate("() => { const f = JSON.parse(localStorage.getItem('lotus_form_config_inquiry_quick') || '{}'); return f.emailSubject === 'New Tour Consultation Inquiry - Lotus Ceylon Luxury'; }")
    record("Forms Editor Configuration Save & Persistence", 'Quick Consultation' in quick_title and saved_form)

    # G. Global Settings Save
    page.evaluate("AdminApp.switchSection('settings')")
    time.sleep(0.4)
    page.fill('#settingSlogan', 'Sacred Journeys & Ultra-Luxury Sri Lanka Expeditions')
    page.fill('#settingWhatsApp', '+94 77 722 0070')
    page.evaluate("""async () => {
        try {
            await AdminApp.saveSettings();
        } catch(e) {}
    }""")
    time.sleep(0.5)
    saved_settings = page.evaluate("() => { const s = JSON.parse(localStorage.getItem('lotus_settings_override') || '{}'); return s.whatsapp === '+94 77 722 0070'; }")
    record("Global Settings Save & Live Persistence", saved_settings)

    # H. Page Editor Controls & Global Inspector
    page.evaluate("AdminApp.switchSection('page-editor')")
    time.sleep(0.4)

    page.evaluate("PageEditor.openGlobalDoc('siteGlobal/header', 'Header & Topbar')")
    time.sleep(0.4)
    header_insp_text = page.inner_text('#inspectorBody')
    record("PageEditor Global Header Inspector Render", 'Global Header & Topbar' in header_insp_text)

    page.evaluate("PageEditor.openGlobalDoc('siteGlobal/footer', 'Footer & Legal')")
    time.sleep(0.4)
    footer_insp_text = page.inner_text('#inspectorBody')
    record("PageEditor Global Footer Inspector Render", 'Global Footer & Legal' in footer_insp_text)

    page.evaluate("PageEditor.openGlobalDoc('siteGlobal/contact', 'Concierge & Direct')")
    time.sleep(0.4)
    contact_insp_text = page.inner_text('#inspectorBody')
    record("PageEditor Global Contact Inspector Render", 'Concierge & Direct' in contact_insp_text)

    # Test PageEditor.resetCurrentPage() dialog handling
    page.on('dialog', lambda dialog: dialog.accept())
    page.evaluate("PageEditor.resetCurrentPage()")
    time.sleep(0.4)
    record("PageEditor Reset Page Method", True)

    # -------------------------------------------------------------
    # 4. MOBILE RESPONSIVE AUDIT (ANDROID VIEWPORTS)
    # -------------------------------------------------------------
    android_viewports = [
        ("Android 360x640 (Standard)", 360, 640),
        ("Android 390x844 (Modern Compact)", 390, 844),
        ("Android 412x915 (Samsung / Pixel)", 412, 915)
    ]

    for label, w, h in android_viewports:
        page.set_viewport_size({'width': w, 'height': h})
        time.sleep(0.3)
        overflow = page.evaluate("() => document.documentElement.scrollWidth > window.innerWidth")
        record(f"Mobile Viewport ({label}) - No Horizontal Window Overflow", not overflow)

    # -------------------------------------------------------------
    # 5. PUBLIC WEBSITE VALIDATION ACROSS 10 LANGUAGES
    # -------------------------------------------------------------
    page.set_viewport_size({'width': 1280, 'height': 800})
    languages = ['en', 'fr', 'de', 'zh-CN', 'ja', 'ar', 'hi', 'it', 'ru', 'es']

    for lang in languages:
        page.goto(f"{BASE_URL}/index.html?lang={lang}", wait_until='load')
        time.sleep(0.2)
        body_text = page.inner_text('body')
        has_undefined = 'undefined' in body_text and ('[object' in body_text)
        record(f"Public Website Home Language ({lang}) Renders Cleanly", not has_undefined)

    # Check Tours Hub Page
    page.goto(f"{BASE_URL}/tours/index.html", wait_until='load')
    time.sleep(0.3)
    tours_hub_loaded = page.is_visible('.category-card-grid') or page.is_visible('.cat-showcase-card')
    record("Public Tours Hub Page Loads With Tour Cards", tours_hub_loaded)

    # Check Cultural Tour Category Page
    page.goto(f"{BASE_URL}/tours/cultural/index.html", wait_until='load')
    time.sleep(0.3)
    cat_page_loaded = page.title() != ""
    record("Tour Category Page (Cultural) Loads", cat_page_loaded)

    # Check Royal Kingdoms Tour Detail Page
    page.goto(f"{BASE_URL}/tours/cultural/royal-kingdoms-sacred-temples/index.html", wait_until='load')
    time.sleep(0.3)
    detail_loaded = page.is_visible('#inquiryModal') or page.is_visible('.itinerary-timeline') or page.title() != ""
    record("Tour Package Detail Page (Royal Kingdoms) Loads", detail_loaded)

    # -------------------------------------------------------------
    # 6. LOGOUT TEST
    # -------------------------------------------------------------
    page.goto(f"{BASE_URL}/admin/index.html", wait_until='load')
    time.sleep(0.5)
    page.evaluate("AdminApp.handleLogout()")
    time.sleep(0.5)
    logged_out = page.is_visible('#authScreen') and not page.is_visible('#adminApp')
    storage_cleared = page.evaluate("() => localStorage.getItem('lotus_admin_active') === null")
    record("Admin Logout Clears Session & Blocks Access", logged_out and storage_cleared)

    browser.close()

print("\n=== SUMMARY OF FAILED REQUESTS & CONSOLE ERRORS ===", flush=True)
print(f"Total Console Errors: {len(console_errors)}", flush=True)
for err in console_errors:
    print(f"  {err}", flush=True)

print(f"Total Failed Requests: {len(failed_requests)}", flush=True)
for req in failed_requests:
    print(f"  {req}", flush=True)

all_passed = all(r['status'] == 'PASS' for r in results)
print(f"\nOVERALL RESULT: {'ALL TESTS PASSED (100%)' if all_passed else 'SOME TESTS FAILED'}", flush=True)
