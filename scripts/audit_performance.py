"""
scripts/audit_performance.py
Step R6: Performance & Web Vitals Measurement Script using Python Playwright
"""

import json
import time
from playwright.sync_api import sync_playwright

PAGES = [
    {"name": "Home (index.html)", "url": "http://localhost:8089/index.html"},
    {"name": "About Us (about.html)", "url": "http://localhost:8089/about.html"},
    {"name": "Destinations (destinations.html)", "url": "http://localhost:8089/destinations.html"},
    {"name": "Category Beach (tours/beach/index.html)", "url": "http://localhost:8089/tours/beach/index.html"},
    {"name": "Package Southern Sands", "url": "http://localhost:8089/tours/beach/southern-sands-serenade/index.html"}
]

def main():
    print("======================================================")
    print("  WEB VITALS & CLS MEASUREMENT (STEP R6)")
    print("======================================================")

    results = []

    with sync_playwright() as p:
        browser = p.chromium.launch(channel='chrome', headless=True)
        context = browser.new_context(viewport={"width": 1440, "height": 900})

        for item in PAGES:
            page = context.new_page()

            # Observer injection
            page.add_init_script("""
                window.__cls = 0;
                window.__lcp = 0;
                new PerformanceObserver((entryList) => {
                    for (const entry of entryList.getEntries()) {
                        if (!entry.hadRecentInput) {
                            window.__cls += entry.value;
                        }
                    }
                }).observe({ type: 'layout-shift', buffered: true });

                new PerformanceObserver((entryList) => {
                    const entries = entryList.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    if (lastEntry) {
                        window.__lcp = lastEntry.renderTime || lastEntry.loadTime;
                    }
                }).observe({ type: 'largest-contentful-paint', buffered: true });
            """)

            t0 = time.time()
            page.goto(item["url"], wait_until="load")
            time.sleep(2) # Allow CMS bindings to execute

            metrics = page.evaluate("""() => {
                const nav = performance.getEntriesByType('navigation')[0] || {};
                const paint = performance.getEntriesByType('paint');
                const fcp = paint.find(p => p.name === 'first-contentful-paint');
                return {
                    fcp: fcp ? Math.round(fcp.startTime) : null,
                    domInteractive: Math.round(nav.domInteractive || 0),
                    loadEventEnd: Math.round(nav.loadEventEnd || 0),
                    cls: Number((window.__cls || 0).toFixed(4)),
                    lcp: Math.round(window.__lcp || 0)
                };
            }""")

            total_ms = round((time.time() - t0) * 1000)
            res = {
                "name": item["name"],
                "url": item["url"],
                "fcp": metrics["fcp"],
                "lcp": metrics["lcp"],
                "cls": metrics["cls"],
                "loadTime": metrics["loadEventEnd"] or total_ms
            }
            results.append(res)
            print(f"[OK] {res['name']:<42} | FCP: {res['fcp']}ms | LCP: {res['lcp']}ms | CLS: {res['cls']}")
            page.close()

        browser.close()

    print("\n------------------------------------------------------")
    print(f"{'Page':<40} {'FCP (ms)':<10} {'LCP (ms)':<10} {'CLS':<8} {'Status'}")
    print("------------------------------------------------------")
    for r in results:
        status = "EXCELLENT (<0.05)" if r["cls"] < 0.05 else ("GOOD" if r["cls"] < 0.1 else "NEEDS WORK")
        print(f"{r['name']:<40} {str(r['fcp']):<10} {str(r['lcp']):<10} {str(r['cls']):<8} {status}")

    with open("scripts/performance-results.json", "w") as f:
        json.dump(results, f, indent=2)

if __name__ == "__main__":
    main()
