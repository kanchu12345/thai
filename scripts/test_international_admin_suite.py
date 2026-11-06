import sys
import time
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8')

def run_suite():
    print("=" * 60)
    print("LOTUS CEYLON: INTERNATIONAL STANDARD ADMIN PANEL TEST SUITE")
    print("=" * 60)

    passed = 0
    failed = 0

    def record(name, condition, details=""):
        nonlocal passed, failed
        if condition:
            passed += 1
            print(f"✅ [PASS] {name} {f'({details})' if details else ''}")
        else:
            failed += 1
            print(f"❌ [FAIL] {name} {f'({details})' if details else ''}")

    with sync_playwright() as p:
        browser = p.chromium.launch(channel='chrome', headless=True)
        page = browser.new_page(viewport={'width': 1440, 'height': 900})

        console_errors = []
        page.on('console', lambda msg: console_errors.append(msg.text) if msg.type == 'error' else None)

        print("\n1. Navigating to Admin Portal...")
        page.goto('http://127.0.0.1:8089/admin/index.html', wait_until='load', timeout=15000)
        time.sleep(1)

        # Authenticate / Show App
        page.evaluate("""() => {
            if (window.AdminApp) {
                AdminApp.currentUser = { email: 'superadmin@lotusceylon.com', id: 'admin-1' };
                AdminApp.currentRole = 'super_admin';
                AdminApp.showApp();
            }
        }""")
        time.sleep(2.5)

        # -------------------------------------------------------------
        # TEST A: Topbar Command Trigger & Multi-Currency Indicator
        # -------------------------------------------------------------
        print("\n--- TEST A: Topbar Command Center & Currency ---")
        has_search_btn = page.is_visible('.topbar-search-trigger')
        record("Topbar Command Search Trigger is visible", has_search_btn)

        currencies = page.locator('.currency-tag').all_inner_texts()
        record("Multi-Currency Indicator loaded (USD, EUR, GBP, AUD)", len(currencies) >= 4, f"Found: {currencies}")

        # -------------------------------------------------------------
        # TEST B: Executive Dashboard KPI Cards & Action Dock
        # -------------------------------------------------------------
        print("\n--- TEST B: Executive Dashboard & KPIs ---")
        has_dock = page.is_visible('.dashboard-dock')
        dock_items = page.locator('.dock-item').count()
        record("Executive Quick-Action Dock loaded", has_dock and dock_items >= 5, f"{dock_items} items")

        packages_count = page.inner_text('#statPackagesCount')
        record("Packages count stat rendered", int(packages_count) > 0, f"Count: {packages_count}")

        has_sla = page.locator('.stat-badge.benchmark').count() > 0
        record("Concierge SLA benchmark badge rendered", has_sla)

        # -------------------------------------------------------------
        # TEST C: Chart.js Visual Analytics Initialization
        # -------------------------------------------------------------
        print("\n--- TEST C: Chart.js Analytics ---")
        time.sleep(1)
        has_trend_chart = page.evaluate("() => !!(window.AdminApp && window.AdminApp.inquiriesTrendsChart)")
        record("Inquiries Trends Spline Chart initialized", has_trend_chart)

        has_cat_chart = page.evaluate("() => !!(window.AdminApp && window.AdminApp.categoryShareChart)")
        record("Category Demand Doughnut Chart initialized", has_cat_chart)

        # -------------------------------------------------------------
        # TEST D: Lower Hub: System Health & Audit Trail Feed
        # -------------------------------------------------------------
        print("\n--- TEST D: System Health & Live Audit Trail ---")
        has_health = page.is_visible('.system-health-card')
        record("System Infrastructure Health Card visible", has_health)

        audit_items = page.locator('#dashboardAuditTrail .audit-item').count()
        record("Live Activity Audit Trail rendered entries", audit_items > 0, f"{audit_items} log items")

        # -------------------------------------------------------------
        # TEST E: Command Palette (Ctrl+K Keyboard Interaction)
        # -------------------------------------------------------------
        print("\n--- TEST E: Command Palette (Ctrl+K) ---")
        # Trigger open via evaluate
        page.evaluate("() => window.AdminApp.openCommandPalette()")
        time.sleep(0.4)
        palette_visible = page.is_visible('#commandPalette')
        record("Command Palette opened successfully", palette_visible)

        # Search for a package / action
        page.evaluate("() => window.AdminApp.handleCommandPaletteSearch('Tour')")
        time.sleep(0.3)
        results_count = page.locator('#commandPaletteResults .command-item').count()
        record("Command Palette instant search returns matches", results_count > 0, f"{results_count} results for 'Tour'")

        # Close palette via evaluate or ESC
        page.evaluate("() => window.AdminApp.closeCommandPalette()")
        time.sleep(0.4)
        palette_closed = not page.is_visible('#commandPalette')
        record("Command Palette closed cleanly", palette_closed)

        # -------------------------------------------------------------
        # TEST F: Inquiries CRM Pipeline Kanban View Toggle
        # -------------------------------------------------------------
        print("\n--- TEST F: Inquiries CRM Pipeline & Table Toggle ---")
        page.evaluate("() => window.AdminApp.switchSection('inquiries')")
        time.sleep(0.6)

        # Switch to CRM Pipeline view
        page.click('#btnViewModePipeline')
        time.sleep(0.5)
        pipeline_visible = page.is_visible('#inquiriesPipelineView')
        stage_columns = page.locator('.pipeline-stage-column').count()
        record("CRM Pipeline Kanban Board displays 5 stages", pipeline_visible and stage_columns == 5, f"{stage_columns} stages")

        # Switch back to Table View
        page.click('#btnViewModeTable')
        time.sleep(0.5)
        table_visible = page.is_visible('#inquiriesTableCard')
        record("Switched back to Inquiries Table View", table_visible)

        # -------------------------------------------------------------
        # TEST G: Inquiry Modal Actions (WhatsApp, Email, Print)
        # -------------------------------------------------------------
        print("\n--- TEST G: Consultation Modal Tools ---")
        has_email_btn = page.locator('#inquiryEmailBtn').count() > 0
        has_print_btn = page.locator('button[onclick*="printInquirySummary"]').count() > 0
        has_wa_btn = page.locator('#inquiryWhatsAppBtn').count() > 0
        record("Inquiry Suite has Direct Email action", has_email_btn)
        record("Inquiry Suite has Print/PDF Voucher action", has_print_btn)
        record("Inquiry Suite has WhatsApp Luxury Reply action", has_wa_btn)

        # Check console errors
        print("\n--- Console Diagnostics ---")
        if console_errors:
            print(f"⚠️ Warning: {len(console_errors)} console errors caught: {console_errors[:3]}")
        else:
            print("✨ 0 console errors detected!")

        browser.close()

    print("\n" + "=" * 60)
    print(f"TEST RESULTS: {passed} PASSED, {failed} FAILED")
    print("=" * 60)
    if failed > 0:
        sys.exit(1)

if __name__ == '__main__':
    run_suite()
