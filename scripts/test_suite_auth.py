import sys
import time
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8')

def run_auth_tests():
    print("========================================")
    print("TEST SUITE 1: AUTHENTICATION & SECURITY")
    print("========================================")
    results = []

    with sync_playwright() as p:
        browser = p.chromium.launch(channel='chrome', headless=True)
        context = browser.new_context(viewport={'width': 1440, 'height': 900})
        page = context.new_page()

        console_errors = []
        page.on('console', lambda msg: console_errors.append(f"[{msg.type}] {msg.text}") if msg.type == 'error' else None)

        # 1. Direct Access
        page.goto('http://127.0.0.1:8089/admin/index.html', wait_until='load', timeout=15000)
        time.sleep(1.5)

        auth_visible = page.is_visible('#authScreen')
        app_visible = page.is_visible('#adminApp')
        if auth_visible and not app_visible:
            results.append(("1.1 Direct unauthenticated access blocked", "PASS", "Auth screen shown, Admin app hidden"))
        else:
            results.append(("1.1 Direct unauthenticated access blocked", "FAIL", f"authVisible={auth_visible}, appVisible={app_visible}"))

        # 1.2 Password visibility toggle
        pw_type_before = page.get_attribute('#loginPassword', 'type')
        page.click('#togglePasswordBtn')
        pw_type_after = page.get_attribute('#loginPassword', 'type')
        page.click('#togglePasswordBtn')
        pw_type_restored = page.get_attribute('#loginPassword', 'type')
        if pw_type_before == 'password' and pw_type_after == 'text' and pw_type_restored == 'password':
            results.append(("1.2 Password toggle button", "PASS", "Toggles correctly between password and text"))
        else:
            results.append(("1.2 Password toggle button", "FAIL", f"before={pw_type_before}, after={pw_type_after}, restored={pw_type_restored}"))

        # 1.3 Empty credentials validation
        page.fill('#loginEmail', '')
        page.fill('#loginPassword', '')
        # Form HTML5 validation triggers or JS validation triggers
        is_required_email = page.get_attribute('#loginEmail', 'required') is not None
        is_required_pw = page.get_attribute('#loginPassword', 'required') is not None
        results.append(("1.3 Empty field validation (required attrs)", "PASS" if is_required_email and is_required_pw else "FAIL", f"emailRequired={is_required_email}, pwRequired={is_required_pw}"))

        # 1.4 Wrong password test
        page.fill('#loginEmail', 'admin@lotusceylon.com')
        page.fill('#loginPassword', 'definitely_wrong_password_12345')
        page.click('#loginBtn')
        time.sleep(1.5)
        # Check if login allowed entry (THIS WAS THE BYPASS BUG WE FOUND!)
        app_visible_now = page.is_visible('#adminApp')
        if app_visible_now:
            results.append(("1.4 Wrong password check", "FAIL", "CRITICAL BUG: Wrong password bypassed authentication and logged in!"))
        else:
            toast_text = page.inner_text('#toastContainer') if page.locator('#toastContainer').count() > 0 else ''
            results.append(("1.4 Wrong password check", "PASS", f"Login rejected properly. Toast: {toast_text}"))

        # 1.5 Forgot password modal
        page.click('a:text("Forgot password?")')
        time.sleep(0.5)
        reset_visible = page.is_visible('#resetModal')
        # Close modal
        page.click('#resetModal .modal-close')
        time.sleep(0.5)
        reset_closed = not page.is_visible('#resetModal')
        if reset_visible and reset_closed:
            results.append(("1.5 Password reset modal open/close", "PASS", "Modal opens and closes cleanly"))
        else:
            results.append(("1.5 Password reset modal open/close", "FAIL", f"opened={reset_visible}, closed={reset_closed}"))

        # 1.6 Verify session state check on reload when not logged in
        page.goto('http://127.0.0.1:8089/admin/index.html')
        time.sleep(1)
        app_after_reload = page.is_visible('#adminApp')
        results.append(("1.6 Direct access after refresh without session", "PASS" if not app_after_reload else "FAIL", f"appVisible={app_after_reload}"))

        browser.close()

    print("\n--- RESULTS ---")
    for name, status, details in results:
        print(f"[{status}] {name}: {details}")

if __name__ == '__main__':
    run_auth_tests()
