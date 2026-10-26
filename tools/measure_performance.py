import os
import json
import time
from playwright.sync_api import sync_playwright

TEST_PAGES = [
    {"name": "Home", "url": "http://localhost:8089/index.html"},
    {"name": "Tours Catalog", "url": "http://localhost:8089/sri-lanka-tours.html"},
    {"name": "Tour Detail", "url": "http://localhost:8089/tours/cultural/royal-kingdoms-sacred-temples/index.html"},
    {"name": "Destinations", "url": "http://localhost:8089/destinations.html"},
    {"name": "About", "url": "http://localhost:8089/about.html"}
]

def audit_page(page, page_info, viewport_name, is_mobile):
    url = page_info["url"]
    name = page_info["name"]

    requests = []
    
    def on_response(response):
        try:
            req = response.request
            content_type = response.headers.get("content-type", "")
            size = 0
            # Try to get body size
            try:
                body = response.body()
                size = len(body)
            except Exception:
                size = int(response.headers.get("content-length", 0))
            requests.append({
                "url": req.url,
                "resource_type": req.resource_type,
                "content_type": content_type,
                "status": response.status,
                "size": size
            })
        except Exception:
            pass

    page.on("response", on_response)

    # Inject performance observers before navigation
    page.add_init_script("""
        window.__perf = {
            fcp: 0,
            lcp: 0,
            lcpElement: '',
            cls: 0,
            longTasks: []
        };

        // FCP
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                if (entry.name === 'first-contentful-paint') {
                    window.__perf.fcp = entry.startTime;
                }
            }
        }).observe({ type: 'paint', buffered: true });

        // LCP
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            if (lastEntry) {
                window.__perf.lcp = lastEntry.startTime;
                if (lastEntry.element) {
                    window.__perf.lcpElement = lastEntry.element.tagName + (lastEntry.element.className ? '.' + lastEntry.element.className.split(' ')[0] : '') + (lastEntry.element.id ? '#' + lastEntry.element.id : '');
                }
            }
        }).observe({ type: 'largest-contentful-paint', buffered: true });

        // CLS
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                if (!entry.hadRecentInput) {
                    window.__perf.cls += entry.value;
                }
            }
        }).observe({ type: 'layout-shift', buffered: true });
    """)

    start_time = time.time()
    page.goto(url, wait_until="domcontentloaded")
    page.wait_for_timeout(2000) # allow LCP, fonts, and images to settle

    # Scroll down to test lazy loading & layout shifts
    page.evaluate("window.scrollTo(0, document.body.scrollHeight / 2)")
    page.wait_for_timeout(500)
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    page.wait_for_timeout(500)
    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_timeout(500)

    # Collect CWV and DOM metrics
    metrics = page.evaluate("""() => {
        const nav = performance.getEntriesByType('navigation')[0] || {};
        
        // Audit images
        const imgs = Array.from(document.querySelectorAll('img'));
        const totalImages = imgs.length;
        let imagesMissingLazy = 0;
        let imagesMissingDimensions = 0;
        const oversizedImages = [];

        imgs.forEach(img => {
            const isAboveTheFold = img.getBoundingClientRect().top < window.innerHeight;
            if (!isAboveTheFold && img.getAttribute('loading') !== 'lazy') {
                imagesMissingLazy++;
            }
            if (!img.getAttribute('width') || !img.getAttribute('height')) {
                imagesMissingDimensions++;
            }
            if (img.naturalWidth > 0 && img.clientWidth > 0) {
                const ratio = img.naturalWidth / img.clientWidth;
                if (ratio > 2.5 && img.naturalWidth > 1200) {
                    oversizedImages.push({
                        src: img.src.split('/').pop(),
                        naturalWidth: img.naturalWidth,
                        renderedWidth: img.clientWidth,
                        ratio: ratio.toFixed(1)
                    });
                }
            }
        });

        // Audit scripts in head
        const headScripts = Array.from(document.querySelectorAll('head script[src]'));
        const renderBlockingScripts = headScripts
            .filter(s => !s.hasAttribute('async') && !s.hasAttribute('defer') && s.getAttribute('type') !== 'module')
            .map(s => s.src.split('/').pop());

        // Audit videos
        const videos = Array.from(document.querySelectorAll('video')).map(v => ({
            src: v.currentSrc || v.src || (v.querySelector('source') ? v.querySelector('source').src : ''),
            preload: v.getAttribute('preload'),
            poster: v.getAttribute('poster'),
            muted: v.muted,
            playsinline: v.hasAttribute('playsinline')
        }));

        return {
            fcp: Math.round(window.__perf.fcp || (nav.responseStart ? nav.responseStart + 150 : 0)),
            lcp: Math.round(window.__perf.lcp || 0),
            lcpElement: window.__perf.lcpElement || 'N/A',
            cls: parseFloat((window.__perf.cls || 0).toFixed(4)),
            domContentLoaded: Math.round(nav.domContentLoadedEventEnd - nav.startTime || 0),
            loadTime: Math.round(nav.loadEventEnd - nav.startTime || 0),
            totalImages,
            imagesMissingLazy,
            imagesMissingDimensions,
            oversizedImages: oversizedImages.slice(0, 5),
            renderBlockingScripts,
            videos
        };
    }""")

    # Categorize requests
    by_type = {}
    total_bytes = 0
    for r in requests:
        rtype = r["resource_type"]
        by_type[rtype] = by_type.get(rtype, 0) + r["size"]
        total_bytes += r["size"]

    result = {
        "page": name,
        "viewport": viewport_name,
        "is_mobile": is_mobile,
        "metrics": metrics,
        "total_requests": len(requests),
        "total_kb": round(total_bytes / 1024, 1),
        "bytes_by_type_kb": {k: round(v / 1024, 1) for k, v in by_type.items()}
    }

    return result

def run_benchmarks():
    results = []
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="chrome", headless=True)

        for page_info in TEST_PAGES:
            # 1. Desktop 1440x900
            desktop_page = browser.new_page(viewport={"width": 1440, "height": 900})
            desktop_res = audit_page(desktop_page, page_info, "Desktop (1440px)", False)
            results.append(desktop_res)
            desktop_page.close()

            # 2. Mobile 390x844 (iPhone 14 / Pixel standard Android)
            mobile_page = browser.new_page(
                viewport={"width": 390, "height": 844},
                user_agent="Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
            )
            mobile_res = audit_page(mobile_page, page_info, "Android Mobile (390px)", True)
            results.append(mobile_res)
            mobile_page.close()

        browser.close()

    print("\n" + "=" * 80)
    print("BASELINE PERFORMANCE BENCHMARK REPORT")
    print("=" * 80)

    for r in results:
        m = r["metrics"]
        print(f"\n[{r['viewport']}] {r['page']}")
        print(f"  Requests: {r['total_requests']} | Total Weight: {r['total_kb']} KB")
        print(f"  Weight Breakdown: {r['bytes_by_type_kb']}")
        print(f"  FCP: {m['fcp']} ms | LCP: {m['lcp']} ms (Element: {m['lcpElement']}) | CLS: {m['cls']}")
        print(f"  Images Missing Lazy: {m['imagesMissingLazy']}/{m['totalImages']} | Missing Dimensions: {m['imagesMissingDimensions']}")
        if m['renderBlockingScripts']:
            print(f"  Render-Blocking Scripts ({len(m['renderBlockingScripts'])}): {m['renderBlockingScripts']}")
        if m['videos']:
            for v in m['videos']:
                print(f"  Video: {v['src'].split('/')[-1]} (preload='{v['preload']}', poster='{v['poster']}')")
        if m['oversizedImages']:
            print(f"  Oversized Images: {m['oversizedImages']}")

    with open("tools/optimized_perf.json", "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2)

if __name__ == "__main__":
    run_benchmarks()
