from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch(channel='chrome', headless=True)
    context = browser.new_context(viewport={'width': 1280, 'height': 800})
    page = context.new_page()

    page.on('console', lambda m: print(f"[{m.type}] {m.text}"))
    page.goto('http://127.0.0.1:8089/admin/index.html', wait_until='load')
    time.sleep(1)

    # Login
    page.fill('#loginEmail', 'admin@lotusceylon.com')
    page.fill('#loginPassword', 'LotusCeylon@2026')
    page.click('#loginBtn')
    page.wait_for_selector('#adminApp', state='visible', timeout=10000)

    # 1. Test Category Save
    print("\n--- Testing Category Save ---")
    page.evaluate("AdminApp.openCategoryModal()")
    time.sleep(0.5)
    page.fill('#catTitle', 'Sacred Ceylon Pilgrimages')
    page.fill('#catSlug', 'sacred-ceylon-pilgrimages')
    page.fill('#catTagline', 'Timeless spiritual sanctuaries of ancient Lanka')
    res = page.evaluate("""async () => {
        try {
            await AdminApp.saveCategory();
            return { ok: true };
        } catch(e) {
            return { ok: false, error: e.toString(), stack: e.stack };
        }
    }""")
    print("saveCategory result:", res)
    cat_storage = page.evaluate("localStorage.getItem('lotus_data_payload')")
    print("Has in lotus_data_payload:", 'sacred-ceylon-pilgrimages' in (cat_storage or ""))

    # 2. Test Team Member Save
    print("\n--- Testing Team Member Save ---")
    page.evaluate("AdminApp.openTeamModal()")
    time.sleep(0.5)
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
            return { ok: false, error: e.toString(), stack: e.stack };
        }
    }""")
    print("saveTeamMember result:", res_team)
    team_storage = page.evaluate("localStorage.getItem('lotus_data_payload')")
    print("Has in lotus_data_payload:", 'Ananda' in (team_storage or ""))

    # 3. Test Global Inspector Footer & Contact
    print("\n--- Testing Global Inspectors ---")
    page.evaluate("AdminApp.switchSection('page-editor')")
    time.sleep(0.5)
    page.evaluate("PageEditor.openGlobalDoc('siteGlobal/footer', 'Footer & Legal')")
    time.sleep(1)
    footer_text = page.inner_text('#inspectorBody')
    print("Footer inspector snippet:", footer_text[:150])

    page.evaluate("PageEditor.openGlobalDoc('siteGlobal/contact', 'Concierge & Direct')")
    time.sleep(1)
    contact_text = page.inner_text('#inspectorBody')
    print("Contact inspector snippet:", contact_text[:150])

    browser.close()
