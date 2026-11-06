import sys
import time
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8')

with sync_playwright() as p:
    browser = p.chromium.launch(channel='chrome', headless=True)
    page = browser.new_page()
    page.goto('http://127.0.0.1:8089/admin/index.html', wait_until='load')
    page.fill('#loginEmail', 'admin@lotusceylon.com')
    page.fill('#loginPassword', 'LotusCeylon@2026')
    page.click('#loginBtn')
    page.wait_for_selector('#adminApp', state='visible')

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
        time.sleep(0.1)

    print("--- 1. Testing Category ---")
    page.evaluate("AdminApp.switchSection('categories')")
    time.sleep(0.3)
    page.evaluate("AdminApp.openCategoryModal()")
    time.sleep(0.3)
    page.fill('#catTitle', 'Sacred Ceylon Pilgrimages')
    page.fill('#catSlug', 'sacred-ceylon-pilgrimages')
    page.fill('#catTagline', 'Timeless spiritual sanctuaries of ancient Lanka')
    res = page.evaluate("""async () => {
        try {
            await AdminApp.saveCategory();
            return { ok: true };
        } catch(e) {
            return { ok: false, error: e.toString() };
        }
    }""")
    print("saveCategory res:", res)
    cached_cats = page.evaluate("""() => {
        const raw = localStorage.getItem('lotus_data_payload');
        if (!raw) return false;
        const c = JSON.parse(raw);
        const list = Array.isArray(c.categories) ? c.categories : Object.values(c.categories || {});
        return list.some(x => x && (x.slug === 'sacred-ceylon-pilgrimages' || x.id === 'cat-sacred-ceylon-pilgrimages'));
    }""")
    print("Category cached:", cached_cats)

    print("--- 2. Testing Destination ---")
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
    print("saveDestination res:", res_dest)
    cached_dests = page.evaluate("""() => {
        const raw = localStorage.getItem('lotus_data_payload');
        if (!raw) return false;
        const c = JSON.parse(raw);
        const list = Array.isArray(c.destinations) ? c.destinations : Object.values(c.destinations || {});
        return list.some(x => x && (x.slug === 'jaffna-peninsula' || x.id === 'dest-jaffna-peninsula'));
    }""")
    print("Destination cached:", cached_dests)

    print("--- 3. Testing Review ---")
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
    print("saveReview res:", res_rev)
    cached_revs = page.evaluate("""() => {
        const raw = localStorage.getItem('lotus_data_payload');
        if (!raw) return false;
        const c = JSON.parse(raw);
        const list = Array.isArray(c.reviews) ? c.reviews : Object.values(c.reviews || {});
        return list.some(x => x && x.guest_name && x.guest_name.includes('Alistair'));
    }""")
    print("Review cached:", cached_revs)

    print("--- 4. Testing Team ---")
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
    print("saveTeamMember res:", res_team)
    cached_team = page.evaluate("""() => {
        const raw = localStorage.getItem('lotus_data_payload');
        if (!raw) return false;
        const c = JSON.parse(raw);
        const list = Array.isArray(c.team) ? c.team : Object.values(c.team || {});
        return list.some(x => x && x.name && x.name.includes('Ananda'));
    }""")
    print("Team cached:", cached_team)

    print("--- 5. Testing Blog ---")
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
    print("saveBlogModal res:", res_blog)
    cached_blog = page.evaluate("""() => {
        const raw = localStorage.getItem('lotus_data_payload');
        if (!raw) return false;
        const c = JSON.parse(raw);
        const list = Array.isArray(c.blogPosts || c.blog) ? (c.blogPosts || c.blog) : Object.values(c.blogPosts || c.blog || {});
        return list.some(x => x && (x.slug === 'hidden-cave-temples-dambulla' || (typeof x.title === 'string' && x.title.includes('Dambulla'))));
    }""")
    print("Blog cached:", cached_blog)

    browser.close()
