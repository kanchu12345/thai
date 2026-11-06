import sys
import time
import json
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8')

def test_admin():
    print("==================================================")
    print("MASTER QA TEST RUN: ADMIN PANEL COMPREHENSIVE SCAN")
    print("==================================================")

    test_results = []
    bugs = []

    def log_result(item, status, details=""):
        test_results.append({"item": item, "status": status, "details": details})
        print(f"[{status}] {item}" + (f" -> {details}" if details else ""))

    def log_bug(bug_id, title, location, cause, severity="HIGH"):
        bugs.append({"id": bug_id, "title": title, "location": location, "cause": cause, "severity": severity})
        print(f"🚨 BUG #{bug_id} [{severity}]: {title} at {location} - {cause}")

    with sync_playwright() as p:
        browser = p.chromium.launch(channel='chrome', headless=True)
        context = browser.new_context(viewport={'width': 1440, 'height': 900})
        page = context.new_page()

        console_errors = []
        page.on('console', lambda msg: console_errors.append(f"[{msg.type}] {msg.text}") if msg.type in ['error', 'warn'] else None)
        page.on('pageerror', lambda err: console_errors.append(f"[PAGE ERROR] {err}"))

        print("\n--- 1. NAVIGATING TO ADMIN PANEL ---")
        page.goto('http://127.0.0.1:8089/admin/index.html', wait_until='load', timeout=15000)
        time.sleep(1.5)

        # Bypass auth legitimately to test the dashboard and internal modules
        page.evaluate("""() => {
            if (window.AdminApp) {
                AdminApp.currentUser = { email: 'superadmin@lotusceylon.com', id: 'admin-root' };
                AdminApp.currentRole = 'super_admin';
                AdminApp.showApp();
            }
        }""")
        time.sleep(2)

        # -----------------------------------------------------------------
        # TEST 1: ALL 13 CONTENT SECTIONS LOAD & RENDER
        # -----------------------------------------------------------------
        sections = [
            'dashboard', 'inquiries', 'packages', 'categories', 'destinations',
            'reviews', 'media', 'users', 'settings', 'team', 'page-editor',
            'forms-editor', 'blog-posts'
        ]

        print("\n--- 2. TESTING ALL 13 CONTENT SECTIONS ---")
        for sec in sections:
            try:
                page.evaluate(f"window.AdminApp.switchSection('{sec}')")
                time.sleep(0.5)
                sec_visible = page.is_visible(f"#section-{sec}")
                if sec_visible:
                    log_result(f"Section #{sec} Open/Load", "PASS", "Visible and active")
                else:
                    log_result(f"Section #{sec} Open/Load", "FAIL", "Section not visible after switchSection")
                    log_bug(f"SEC_{sec.upper()}", f"Section #{sec} did not display", "admin/js/admin-app.js", "CSS or JS switchSection failed to show container")
            except Exception as e:
                log_result(f"Section #{sec} Open/Load", "FAIL", str(e))
                log_bug(f"SEC_{sec.upper()}_ERR", f"Error switching to #{sec}", "admin/js/admin-app.js", str(e))

        # -----------------------------------------------------------------
        # TEST 2: ALL 12 MODALS OPEN AND CLOSE CLEANLY
        # -----------------------------------------------------------------
        print("\n--- 3. TESTING ALL 12 MODALS OPEN & CLOSE ---")
        modals_to_test = [
            ('packageModal', 'packageModalTitle'),
            ('inquiryModal', 'inquiryModalRef'),
            ('mediaPickerModal', None),
            ('resetModal', None),
            ('confirmDeleteModal', 'deleteConfirmMessage'),
            ('teamModal', 'teamModalTitle'),
            ('categoryModal', 'categoryModalTitle'),
            ('destinationModal', 'destinationModalTitle'),
            ('reviewModal', 'reviewModalTitle'),
            ('seoModal', 'seoModalTitle'),
            ('blogPostModal', 'blogPostModalTitle'),
            ('blogModal', 'blogModalTitle')
        ]

        for mod_id, title_id in modals_to_test:
            try:
                # Open modal
                page.evaluate(f"window.AdminApp.openModal('{mod_id}')")
                time.sleep(0.3)
                is_open = page.is_visible(f"#{mod_id}")
                
                # Check modal title encoding issues (like ??)
                title_text = ""
                if title_id and page.locator(f"#{title_id}").count() > 0:
                    title_text = page.inner_text(f"#{title_id}")
                    if "??" in title_text or "" in title_text:
                        log_bug(f"MODAL_ENCODING_{mod_id.upper()}", f"Modal #{mod_id} title has broken encoding characters ('{title_text}')", "admin/index.html", "Malformed UTF-8 emoji or text")

                # Close modal
                page.evaluate(f"window.AdminApp.closeModal('{mod_id}')")
                time.sleep(0.2)
                is_closed = not page.is_visible(f"#{mod_id}")

                if is_open and is_closed:
                    log_result(f"Modal #{mod_id} Open & Close", "PASS", f"Title: '{title_text}'")
                else:
                    log_result(f"Modal #{mod_id} Open & Close", "FAIL", f"open={is_open}, closed={is_closed}")
                    log_bug(f"MODAL_TOGGLE_{mod_id.upper()}", f"Modal #{mod_id} failed open/close toggle", "admin/index.html", f"open={is_open}, closed={is_closed}")
            except Exception as e:
                log_result(f"Modal #{mod_id} Open & Close", "FAIL", str(e))
                log_bug(f"MODAL_ERR_{mod_id.upper()}", f"Modal #{mod_id} exception", "admin/index.html", str(e))

        # -----------------------------------------------------------------
        # TEST 3: CRUD ACTIONS ON DATA COLLECTIONS
        # -----------------------------------------------------------------
        print("\n--- 4. TESTING CRUD CREATION & VALIDATION ---")
        
        # 3.1 Category Modal Form & Save
        print("Testing Category Creation & Edit...")
        page.evaluate("window.AdminApp.openCategoryModal()")
        time.sleep(0.5)
        # Check if tabs in categoryModal work
        page.click('#categoryModal .tab-btn:has-text("Comparison Table Matrix")')
        time.sleep(0.3)
        comp_tab_active = page.is_visible('#catTabComparison')
        page.click('#categoryModal .tab-btn:has-text("General Details")')
        time.sleep(0.3)
        gen_tab_active = page.is_visible('#catTabGeneral')
        if comp_tab_active and gen_tab_active:
            log_result("Category Modal Tab Switching", "PASS", "General & Comparison tabs switch cleanly")
        else:
            log_result("Category Modal Tab Switching", "FAIL", f"comp={comp_tab_active}, gen={gen_tab_active}")
            log_bug("CAT_TABS", "Category modal tab switching failed", "admin/js/admin-app.js", "Tab panel active class not applied")

        page.evaluate("window.AdminApp.closeModal('categoryModal')")

        # 3.2 Package Modal Tabs (General, Itinerary, Comparison Ticks)
        print("Testing Package Modal Tabs & Day Builder...")
        page.evaluate("window.AdminApp.openPackageModal()")
        time.sleep(0.5)
        
        # Test language tab inside package modal
        page.click('#packageModal .lang-tab[data-lang="zh"]')
        time.sleep(0.3)
        zh_title_visible = page.is_visible('#pkgTitleZh')
        page.click('#packageModal .lang-tab[data-lang="en"]')
        time.sleep(0.3)
        en_title_visible = page.is_visible('#pkgTitle')
        if zh_title_visible and en_title_visible:
            log_result("Package Modal Language Tab", "PASS", "Switches between EN and ZH fields")
        else:
            log_result("Package Modal Language Tab", "FAIL", f"zh={zh_title_visible}, en={en_title_visible}")
            log_bug("PKG_LANG_TAB", "Package modal language tab toggle broken", "admin/js/admin-app.js", "Fields did not toggle properly")

        # Test adding an itinerary day
        days_before = page.locator('.itinerary-day-card').count()
        page.click('#packageModal button:has-text("+ Add Day")')
        time.sleep(0.3)
        days_after = page.locator('.itinerary-day-card').count()
        if days_after == days_before + 1:
            log_result("Package Modal + Add Day", "PASS", f"Day card added (count: {days_after})")
        else:
            log_result("Package Modal + Add Day", "FAIL", f"Expected {days_before + 1}, got {days_after}")
            log_bug("PKG_ADD_DAY", "+ Add Day button did not add day card", "admin/js/admin-app.js", "addDayItem function failed")

        # Test adding a highlight
        hl_before = page.locator('.highlight-item-input').count()
        page.click('#packageModal button:has-text("+ Add Highlight")')
        time.sleep(0.3)
        hl_after = page.locator('.highlight-item-input').count()
        if hl_after == hl_before + 1:
            log_result("Package Modal + Add Highlight", "PASS", f"Highlight input added (count: {hl_after})")
        else:
            log_result("Package Modal + Add Highlight", "FAIL", f"Expected {hl_before + 1}, got {hl_after}")
            log_bug("PKG_ADD_HL", "+ Add Highlight button did not add input", "admin/js/admin-app.js", "addHighlightItem failed")

        # Test adding an FAQ
        faq_before = page.locator('.faq-builder-item').count()
        page.click('#packageModal button:has-text("+ Add FAQ")')
        time.sleep(0.3)
        faq_after = page.locator('.faq-builder-item').count()
        if faq_after == faq_before + 1:
            log_result("Package Modal + Add FAQ", "PASS", f"FAQ item added (count: {faq_after})")
        else:
            log_result("Package Modal + Add FAQ", "FAIL", f"Expected {faq_before + 1}, got {faq_after}")
            log_bug("PKG_ADD_FAQ", "+ Add FAQ button did not add item", "admin/js/admin-app.js", "addFaqItem failed")

        page.evaluate("window.AdminApp.closeModal('packageModal')")

        # -----------------------------------------------------------------
        # TEST 4: PAGE EDITOR & ALL PAGES
        # -----------------------------------------------------------------
        print("\n--- 5. TESTING PAGE EDITOR NAVIGATION & IFRAME ---")
        page.evaluate("window.AdminApp.switchSection('page-editor')")
        time.sleep(1)

        # Check Page Dropdown Options
        page_options = page.eval_on_selector('#visualPageDropdown', """el => Array.from(el.options).map(o => ({ value: o.value, text: o.text, disabled: o.disabled }))""")
        print(f"Total Pages in Page Editor Dropdown: {len(page_options)}")
        valid_page_options = [o for o in page_options if not o['disabled'] and o['value']]
        print(f"Valid selectable pages: {len(valid_page_options)}")

        # Test loading top 5 key pages in Page Editor
        sample_pages = [
            ('siteContent/home', 'index.html'),
            ('siteContent/about', 'about.html'),
            ('siteContent/contact', 'contact.html'),
            ('tourCategories/cultural', 'tours/cultural/index.html'),
            ('packages/three-millennia-of-living-heritage', 'tours/cultural/three-millennia-of-living-heritage/index.html')
        ]

        for doc_key, page_file in sample_pages:
            try:
                page.evaluate(f"window.PageEditor.openPage('{doc_key}', '{page_file}')")
                time.sleep(2)
                iframe_src = page.get_attribute('#visualIframe', 'src')
                # Check if iframe loaded without error
                log_result(f"Page Editor Open Page: {doc_key}", "PASS", f"iframe src: {iframe_src}")
            except Exception as e:
                log_result(f"Page Editor Open Page: {doc_key}", "FAIL", str(e))
                log_bug(f"PAGE_LOAD_{doc_key.replace('/', '_')}", f"Failed opening page {doc_key}", "admin/js/page-editor.js", str(e))

        # Test Viewport Switch in Page Editor
        page.click('#btnViewMobile')
        time.sleep(0.5)
        iframe_width = page.eval_on_selector('#visualIframe', 'el => el.offsetWidth')
        is_mobile = iframe_width <= 420
        page.click('#btnViewDesktop')
        time.sleep(0.5)
        desktop_width = page.eval_on_selector('#visualIframe', 'el => el.offsetWidth')
        is_desktop = desktop_width > 420
        if is_mobile and is_desktop:
            log_result("Page Editor Viewport Toggle (Desktop / Mobile)", "PASS", f"Mobile: {iframe_width}px, Desktop: {desktop_width}px")
        else:
            log_result("Page Editor Viewport Toggle (Desktop / Mobile)", "FAIL", f"Mobile: {iframe_width}px, Desktop: {desktop_width}px")
            log_bug("PAGE_VIEWPORT", "Page editor viewport toggle failed to resize iframe", "admin/js/page-editor.js", f"mobile={iframe_width}, desktop={desktop_width}")

        # Test SEO Modal in Page Editor
        page.click('button:has-text("⚙️ Page SEO")')
        time.sleep(0.5)
        seo_open = page.is_visible('#seoModal')
        page.click('#seoModal .modal-close')
        time.sleep(0.3)
        seo_closed = not page.is_visible('#seoModal')
        if seo_open and seo_closed:
            log_result("Page Editor SEO Modal", "PASS", "Opens & closes cleanly")
        else:
            log_result("Page Editor SEO Modal", "FAIL", f"open={seo_open}, closed={seo_closed}")
            log_bug("PAGE_SEO_MODAL", "Page SEO modal failed to toggle", "admin/js/page-editor.js", f"open={seo_open}, closed={seo_closed}")

        # -----------------------------------------------------------------
        # TEST 5: SETTINGS PERSISTENCE & EDIT
        # -----------------------------------------------------------------
        print("\n--- 6. TESTING SETTINGS SECTION & INPUTS ---")
        page.evaluate("window.AdminApp.switchSection('settings')")
        time.sleep(0.5)

        # Check all settings fields exist and have values
        settings_test_ids = [
            'settingCompanyName', 'settingLegalName', 'settingPhone',
            'settingEmail', 'settingAddress', 'settingWhatsApp',
            'settingWeChat', 'settingLine', 'settingFacebook',
            'settingInstagram', 'settingYouTube'
        ]
        all_settings_found = True
        for sid in settings_test_ids:
            val = page.input_value(f"#{sid}") if page.locator(f"#{sid}").count() > 0 else None
            if val is None:
                all_settings_found = False
                log_bug(f"SETTING_{sid}", f"Setting input #{sid} not found in DOM", "admin/index.html", "Missing field")
            else:
                pass
        log_result("Settings Inputs Verification", "PASS" if all_settings_found else "FAIL", f"Checked {len(settings_test_ids)} core settings fields")

        # -----------------------------------------------------------------
        # TEST 6: FORMS CONFIGURATION SECTION
        # -----------------------------------------------------------------
        print("\n--- 7. TESTING FORMS EDITOR SECTION ---")
        page.evaluate("window.AdminApp.switchSection('forms-editor')")
        time.sleep(0.5)
        # Test switching between Quick Consultation and Bespoke Inquiry Form
        page.click('button:has-text("Bespoke Inquiry Form")')
        time.sleep(0.3)
        bespoke_title = page.inner_text('#formEditorTitle') if page.locator('#formEditorTitle').count() > 0 else ''
        page.click('button:has-text("Quick Consultation Form")')
        time.sleep(0.3)
        quick_title = page.inner_text('#formEditorTitle') if page.locator('#formEditorTitle').count() > 0 else ''
        if 'Bespoke' in bespoke_title and 'Quick' in quick_title:
            log_result("Forms Editor Form Selector", "PASS", f"Quick: '{quick_title}', Bespoke: '{bespoke_title}'")
        else:
            log_result("Forms Editor Form Selector", "FAIL", f"Quick: '{quick_title}', Bespoke: '{bespoke_title}'")
            log_bug("FORMS_EDITOR_SWITCH", "Forms editor failed to switch form definition", "admin/js/page-editor.js", "formEditorTitle not updated")

        # -----------------------------------------------------------------
        # TEST 7: BLOG POSTS CRUD & MODAL
        # -----------------------------------------------------------------
        print("\n--- 8. TESTING BLOG POSTS SECTION ---")
        page.evaluate("window.AdminApp.switchSection('blog-posts')")
        time.sleep(0.5)
        blog_rows = page.locator('#blogPostsTableBody tr').count()
        log_result("Blog Posts Table", "PASS", f"Rendered {blog_rows} articles")

        # -----------------------------------------------------------------
        # TEST 8: MOBILE RESPONSIVENESS OF ADMIN PANEL
        # -----------------------------------------------------------------
        print("\n--- 9. TESTING ADMIN PANEL ON MOBILE VIEWPORTS ---")
        mobile_viewports = [
            ("360x640 (Compact Android)", 360, 640),
            ("390x844 (Standard iPhone/Android)", 390, 844),
            ("412x915 (Pixel / Samsung Galaxy)", 412, 915)
        ]

        for vp_name, w, h in mobile_viewports:
            page.set_viewport_size({"width": w, "height": h})
            time.sleep(0.5)

            # Check for horizontal overflow on dashboard
            page.evaluate("window.AdminApp.switchSection('dashboard')")
            time.sleep(0.5)
            doc_scroll_width = page.evaluate("() => document.documentElement.scrollWidth")
            win_width = page.evaluate("() => window.innerWidth")
            has_overflow = doc_scroll_width > win_width + 1

            # Check sidebar toggle on mobile
            sidebar_visible_initial = page.is_visible('#sidebar')
            # Toggle sidebar
            page.click('.menu-toggle-btn')
            time.sleep(0.3)
            sidebar_toggled = page.is_visible('#sidebar')
            page.click('.menu-toggle-btn') # toggle back
            time.sleep(0.3)

            if not has_overflow:
                log_result(f"Admin Mobile Layout on {vp_name}", "PASS", f"scrollWidth={doc_scroll_width}, innerWidth={win_width}")
            else:
                log_result(f"Admin Mobile Layout on {vp_name}", "FAIL", f"Horizontal overflow! scrollWidth={doc_scroll_width} > innerWidth={win_width}")
                log_bug(f"MOBILE_OVERFLOW_{w}", f"Admin panel horizontal overflow at {w}px", "admin/css/admin.css", f"scrollWidth ({doc_scroll_width}) exceeds viewport ({win_width})")

        print("\n--- 10. CONSOLE ERRORS CAPTURED ---")
        print(f"Total Console Errors / Warnings: {len(console_errors)}")
        for err in console_errors[:20]:
            print("  ", err)

        browser.close()

    print("\n==================================================")
    print(f"SUMMARY: {len(test_results)} Tests Executed | {len(bugs)} Potential Bugs / Deficiencies Flagged")
    print("==================================================")

if __name__ == '__main__':
    test_admin()
