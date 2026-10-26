import os
import sys
import json
import time
from urllib.parse import urljoin, urlparse
from playwright.sync_api import sync_playwright

PORT = 8089
BASE_URL = f"http://localhost:{PORT}"

def get_all_html_files():
    files = []
    for root, dirs, fnames in os.walk('.'):
        if '.git' in root or 'node_modules' in root:
            continue
        for f in fnames:
            if f.endswith('.html'):
                p = os.path.normpath(os.path.join(root, f)).replace('\\', '/')
                files.append(p)
    return sorted(files)

def run_browser_audit():
    html_files = get_all_html_files()
    print(f"Loaded {len(html_files)} HTML files for browser inspection.")

    audit_results = {
        "pages_tested": len(html_files),
        "console_errors": {},
        "failed_requests": {},
        "responsive_checks": {},
        "accessibility_issues": {},
        "link_checks": {},
        "form_checks": {}
    }

    # We will test key representative pages deeply across viewports,
    # and all 70 pages for console errors, failed requests, and responsiveness.
    viewports = [
        {"name": "mobile_360", "width": 360, "height": 800},
        {"name": "mobile_412", "width": 412, "height": 915},
        {"name": "tablet_768", "width": 768, "height": 1024},
        {"name": "desktop_1440", "width": 1440, "height": 900}
    ]

    with sync_playwright() as p:
        browser = p.chromium.launch(channel="msedge", headless=True)

        for idx, file_rel in enumerate(html_files):
            page_url = f"{BASE_URL}/{file_rel}"
            print(f"[{idx+1}/{len(html_files)}] Auditing: {file_rel}")
            
            # Setup error listeners
            page_errors = []
            failed_reqs = []

            context = browser.new_context(viewport={"width": 1440, "height": 900})
            page = context.new_page()

            def on_console(msg):
                if msg.type in ['error']:
                    page_errors.append(f"{msg.type}: {msg.text}")
            
            def on_request_failed(req):
                # ignore analytics or external if any fails
                failed_reqs.append(f"{req.method} {req.url} - {req.failure}")

            page.on("console", on_console)
            page.on("requestfailed", on_request_failed)

            try:
                page.goto(page_url, wait_until="domcontentloaded", timeout=15000)
                time.sleep(0.3)

                if page_errors:
                    audit_results["console_errors"][file_rel] = page_errors
                if failed_reqs:
                    audit_results["failed_requests"][file_rel] = failed_reqs

                # Test responsiveness & overflow on mobile (360px) and desktop (1440px)
                for vp in [viewports[0], viewports[3]]:
                    page.set_viewport_size({"width": vp["width"], "height": vp["height"]})
                    time.sleep(0.15)
                    overflow = page.evaluate("""() => {
                        const cW = document.documentElement.clientWidth;
                        const sW = document.documentElement.scrollWidth;
                        const bSW = document.body ? document.body.scrollWidth : 0;
                        return {
                            clientWidth: cW,
                            scrollWidth: sW,
                            bodyScrollWidth: bSW,
                            hasOverflow: (sW > cW || bSW > cW)
                        };
                    }""")
                    if overflow["hasOverflow"]:
                        if file_rel not in audit_results["responsive_checks"]:
                            audit_results["responsive_checks"][file_rel] = []
                        audit_results["responsive_checks"][file_rel].append({
                            "viewport": vp["name"],
                            "width": vp["width"],
                            "overflow": overflow
                        })

                # Basic Accessibility checks
                a11y = page.evaluate("""() => {
                    const issues = [];
                    // Missing image alt
                    const imgs = document.querySelectorAll('img:not([alt])');
                    if (imgs.length > 0) issues.push(`Missing alt attribute on ${imgs.length} image(s)`);
                    
                    // Buttons without text or aria-label
                    const emptyBtns = [];
                    document.querySelectorAll('button').forEach(btn => {
                        const txt = btn.innerText.trim();
                        const label = btn.getAttribute('aria-label') || btn.getAttribute('title');
                        if (!txt && !label) emptyBtns.push(btn.outerHTML.slice(0, 80));
                    });
                    if (emptyBtns.length > 0) issues.push(`${emptyBtns.length} button(s) lack accessible text or aria-label: ${emptyBtns.slice(0, 3).join('; ')}`);

                    // Form inputs without label
                    const unlabelledInputs = [];
                    document.querySelectorAll('input:not([type="hidden"]), select, textarea').forEach(inp => {
                        const id = inp.id;
                        let hasLabel = false;
                        if (id && document.querySelector(`label[for="${id}"]`)) hasLabel = true;
                        if (inp.closest('label')) hasLabel = true;
                        if (inp.getAttribute('aria-label') || inp.getAttribute('aria-labelledby')) hasLabel = true;
                        if (!hasLabel) unlabelledInputs.push(inp.outerHTML.slice(0, 60));
                    });
                    if (unlabelledInputs.length > 0) issues.push(`${unlabelledInputs.length} input(s) lack associated labels: ${unlabelledInputs.slice(0, 3).join('; ')}`);

                    // Headings hierarchy check
                    const h1s = document.querySelectorAll('h1');
                    if (h1s.length === 0) issues.push('Missing H1 heading on page');
                    else if (h1s.length > 1) issues.push(`Multiple H1 headings (${h1s.length}) found`);

                    return issues;
                }""")
                if a11y:
                    audit_results["accessibility_issues"][file_rel] = a11y

            except Exception as e:
                audit_results["console_errors"][file_rel] = [f"Page load failure: {str(e)}"]

            finally:
                context.close()

        browser.close()

    with open('tools/audit_browser_results.json', 'w', encoding='utf-8') as f:
        json.dump(audit_results, f, indent=2)

    print("Browser audit completed. Saved results to tools/audit_browser_results.json")

if __name__ == "__main__":
    run_browser_audit()
