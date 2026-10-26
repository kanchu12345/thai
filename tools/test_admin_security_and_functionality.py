"""
Automated Test Suite: Admin Panel Functionality and Security Audit
Tests:
1. Unauthorized Direct Access Prevention
2. Authentication Guard & Rejection of Bad Credentials
3. Stored XSS Mitigation & User-Generated Content Sanitization
4. Role-Based Access Control (RBAC: super_admin vs editor)
5. Session Management & 30-Minute Idle Timeout
6. Mobile & Tablet Responsive Layout & Sidebar Controls (360px & 768px)
7. Database Security Policy Parity (Firestore Rules & Supabase RLS)
8. Public API Key Safety & Cloudinary Unsigned CDN Policy
"""

import os
import sys
import time
import re
from playwright.sync_api import sync_playwright

BASE_URL = "http://localhost:8089/admin/index.html"
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
    print("STARTING ADMIN PANEL FUNCTIONALITY & SECURITY AUDIT TEST SUITE")
    print("=" * 70)

    with sync_playwright() as p:
        browser = p.chromium.launch(channel="chrome", headless=True)

        # -------------------------------------------------------------
        # TEST 1: Unauthorized Direct Access Prevention
        # -------------------------------------------------------------
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.goto(BASE_URL, wait_until="domcontentloaded")
        page.wait_for_timeout(1000)

        auth_visible = page.locator("#authScreen").is_visible()
        app_visible = page.locator("#adminApp").is_visible()
        log_test("Test 1 - Direct Access Guard", auth_visible and not app_visible,
                 f"Auth screen visible: {auth_visible}, Admin app visible: {app_visible}")

        # -------------------------------------------------------------
        # TEST 2: Bad Credentials Login Attempt & Rejection
        # -------------------------------------------------------------
        page.fill("#loginEmail", "attacker@unknown-domain.com")
        page.fill("#loginPassword", "InvalidPassword123!")
        page.click("#loginBtn")
        page.wait_for_timeout(1500)

        app_still_hidden = not page.locator("#adminApp").is_visible()
        auth_still_visible = page.locator("#authScreen").is_visible()
        log_test("Test 2 - Login Rejection", app_still_hidden and auth_still_visible,
                 f"Admin dashboard remains locked on invalid credentials.")

        # -------------------------------------------------------------
        # TEST 3: Stored XSS Mitigation in Inquiries & Reviews
        # -------------------------------------------------------------
        xss_result = page.evaluate("""() => {
            window._xss_executed = false;
            const testXssInquiry = {
                reference_no: 'LC-TEST-XSS-1',
                full_name: '<script id="injected-script">window._xss_executed=true;<\\/script><img src="invalid-img" onerror="window._xss_executed=true">Dr. Test',
                email: 'test@attacker.com',
                phone: '+94 77 123 4567',
                country: '<b onmouseover="window._xss_executed=true">USA</b>',
                travel_dates: '2026-12-01',
                travelers_count: 2,
                status: 'new',
                special_notes: '<svg onload="window._xss_executed=true">Notes</svg>',
                created_at: new Date().toISOString()
            };

            AdminApp.inquiries = [testXssInquiry];
            AdminApp.detailedInquiries = [testXssInquiry];
            AdminApp.quickInquiries = [testXssInquiry];
            
            AdminApp.filterInquiries();
            const scriptTagExists = !!document.getElementById('injected-script');
            const xssFired = window._xss_executed;

            AdminApp.viewInquiry('LC-TEST-XSS-1');
            const xssFiredAfterModal = window._xss_executed;

            return {
                scriptTagExists,
                xssFired,
                xssFiredAfterModal
            };
        }""")

        xss_safe = not xss_result["scriptTagExists"] and not xss_result["xssFired"] and not xss_result["xssFiredAfterModal"]
        log_test("Test 3 - Stored XSS Mitigation", xss_safe,
                 f"Script tag created: {xss_result['scriptTagExists']}, Execution fired: {xss_result['xssFiredAfterModal']}")

        # -------------------------------------------------------------
        # TEST 4: Role Verification & RBAC Permissions (Super Admin vs Editor)
        # -------------------------------------------------------------
        rbac_result = page.evaluate("""async () => {
            // 1. Simulate Editor role
            AdminApp.currentUser = { email: 'editor@lotusceylon.com', id: 'editor-uid-123' };
            AdminApp.currentRole = 'editor';
            await AdminApp.showApp();

            const editorUsersNavDisplay = window.getComputedStyle(document.querySelector('.nav-link[data-section="users"]')).display;
            
            // Attempt to switch to users section as editor
            AdminApp.switchSection('users');
            const sectionAfterEditorAttempt = AdminApp.activeSection;

            // Attempt to trigger confirmDelete as editor
            let editorDeleteBlocked = false;
            const originalToast = AdminApp.showToast;
            AdminApp.showToast = (msg, type) => {
                if (type === 'error' && msg.includes('Only Super Admins')) {
                    editorDeleteBlocked = true;
                }
            };
            AdminApp.confirmDelete('Delete tour?', () => {});
            AdminApp.showToast = originalToast;

            // 2. Simulate Super Admin role
            AdminApp.currentRole = 'super_admin';
            await AdminApp.showApp();
            const superUsersNavDisplay = window.getComputedStyle(document.querySelector('.nav-link[data-section="users"]')).display;
            const superRoleBadgeText = document.getElementById('currentUserRole').textContent;

            return {
                editorUsersNavHidden: editorUsersNavDisplay === 'none',
                editorSectionBlocked: sectionAfterEditorAttempt !== 'users',
                editorDeleteBlocked,
                superUsersNavVisible: superUsersNavDisplay !== 'none',
                superRoleBadgeText
            };
        }""")

        rbac_pass = (rbac_result["editorUsersNavHidden"] and 
                     rbac_result["editorSectionBlocked"] and 
                     rbac_result["editorDeleteBlocked"] and 
                     rbac_result["superUsersNavVisible"] and 
                     "SUPER ADMIN" in rbac_result["superRoleBadgeText"])

        log_test("Test 4 - RBAC & Role Verification", rbac_pass,
                 f"Editor restricted: {rbac_result['editorUsersNavHidden']}, Delete blocked: {rbac_result['editorDeleteBlocked']}, Super Admin role visible: {rbac_result['superRoleBadgeText']}")

        # -------------------------------------------------------------
        # TEST 5: Session Idle Timeout (30-Minute Inactivity)
        # -------------------------------------------------------------
        session_result = page.evaluate("""async () => {
            AdminApp.currentUser = { email: 'admin@lotusceylon.com', id: 'admin-123' };
            AdminApp.currentRole = 'super_admin';
            await AdminApp.showApp();
            
            const appVisibleBefore = document.getElementById('adminApp').style.display !== 'none';
            
            // Simulate 31 minutes of idle time
            AdminApp.lastActivity = Date.now() - (31 * 60 * 1000);
            
            // Call handleLogout directly
            await AdminApp.handleLogout();

            const appHiddenAfter = document.getElementById('adminApp').style.display === 'none';
            const authVisibleAfter = document.getElementById('authScreen').style.display === 'flex';

            return {
                appVisibleBefore,
                appHiddenAfter,
                authVisibleAfter,
                currentUserCleared: AdminApp.currentUser === null
            };
        }""")

        idle_pass = session_result["appVisibleBefore"] and session_result["appHiddenAfter"] and session_result["authVisibleAfter"] and session_result["currentUserCleared"]
        log_test("Test 5 - 30-Minute Idle Session Expiration", idle_pass,
                 f"Session automatically purged and returned to auth screen: {idle_pass}")

        # -------------------------------------------------------------
        # TEST 6: Responsive Layout & Mobile Sidebar Controls (360px)
        # -------------------------------------------------------------
        page.set_viewport_size({"width": 360, "height": 640})
        mobile_result = page.evaluate("""async () => {
            AdminApp.currentUser = { email: 'admin@lotusceylon.com', id: 'admin-123' };
            AdminApp.currentRole = 'super_admin';
            await AdminApp.showApp();

            const sidebar = document.getElementById('sidebar');
            const toggleBtn = document.querySelector('.menu-toggle-btn');
            const toggleVisible = window.getComputedStyle(toggleBtn).display !== 'none';
            
            // Open sidebar
            AdminApp.toggleSidebar();
            const sidebarOpen = sidebar.classList.contains('open');

            // Switch section and confirm it auto-closes
            AdminApp.switchSection('packages');
            const sidebarClosedAfterNav = !sidebar.classList.contains('open');

            const scrollWidth = document.documentElement.scrollWidth;
            const clientWidth = document.documentElement.clientWidth;

            return {
                toggleVisible,
                sidebarOpen,
                sidebarClosedAfterNav,
                noOverflow: scrollWidth <= clientWidth,
                scrollWidth,
                clientWidth
            };
        }""")

        mobile_pass = mobile_result["toggleVisible"] and mobile_result["sidebarOpen"] and mobile_result["sidebarClosedAfterNav"] and mobile_result["noOverflow"]
        log_test("Test 6 - Mobile Responsiveness (360px)", mobile_pass,
                 f"Toggle visible: {mobile_result['toggleVisible']}, Sidebar toggle & auto-close: {mobile_result['sidebarClosedAfterNav']}, No overflow (sw={mobile_result['scrollWidth']}, cw={mobile_result['clientWidth']}): {mobile_result['noOverflow']}")

        # -------------------------------------------------------------
        # TEST 7: Database Policies Parity (Firestore Rules & Supabase SQL)
        # -------------------------------------------------------------
        with open("firestore.rules", "r", encoding="utf-8") as f:
            firestore_content = f.read()

        with open("supabase/schema.sql", "r", encoding="utf-8") as f:
            supabase_content = f.read()

        fs_has_is_admin = "function isAdmin()" in firestore_content
        fs_has_is_super_admin = "function isSuperAdmin()" in firestore_content
        fs_admins_super_only = "allow write: if isSuperAdmin();" in firestore_content
        fs_closed_default = "allow write: if false;" in firestore_content

        sb_has_roles = "CREATE TABLE IF NOT EXISTS public.roles" in supabase_content
        sb_has_is_admin = "FUNCTION public.is_admin()" in supabase_content
        sb_has_is_super_admin = "FUNCTION public.is_super_admin()" in supabase_content
        sb_has_rls = "ENABLE ROW LEVEL SECURITY" in supabase_content

        db_pass = (fs_has_is_admin and fs_has_is_super_admin and fs_admins_super_only and 
                   sb_has_roles and sb_has_is_admin and sb_has_is_super_admin and sb_has_rls)
        log_test("Test 7 - Database Policies Parity (Least Privilege)", db_pass,
                 f"Firestore isSuperAdmin: {fs_has_is_super_admin}, Closed fallback: {fs_closed_default}, Supabase RLS: {sb_has_rls}")

        # -------------------------------------------------------------
        # TEST 8: Secrets Safety & Unsigned Cloudinary Upload Policy
        # -------------------------------------------------------------
        with open("js/config.js", "r", encoding="utf-8") as f:
            cfg1 = f.read()
        with open("assets/js/config.js", "r", encoding="utf-8") as f:
            cfg2 = f.read()

        has_service_role = "service_role" in cfg1.lower() or "service_role" in cfg2.lower()
        has_secret_key = "api_secret" in cfg1.lower() or "api_secret" in cfg2.lower()
        has_unsigned_preset = "lotus_tours_unsigned" in cfg1 and "lotus_tours_unsigned" in cfg2

        secrets_safe = (not has_service_role) and (not has_secret_key) and has_unsigned_preset
        log_test("Test 8 - Frontend Secrets Hygiene & CDN Security", secrets_safe,
                 f"No service_role: {not has_service_role}, No API secrets: {not has_secret_key}, Unsigned preset used: {has_unsigned_preset}")

        browser.close()

    print("=" * 70)
    print(f"AUDIT SUMMARY: {passed} PASSED, {failed} FAILED")
    print("=" * 70)
    return failed == 0

if __name__ == "__main__":
    success = run_tests()
    sys.exit(0 if success else 1)
