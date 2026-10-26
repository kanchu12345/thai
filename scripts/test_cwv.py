import asyncio
from playwright.async_api import async_playwright

async def measure():
    async with async_playwright() as p:
        browser = await p.chromium.launch(channel='chrome', headless=True)
        # Mobile viewport emulation (iPhone / Pixel: 390x844)
        context = await browser.new_context(
            viewport={'width': 390, 'height': 844},
            user_agent='Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'
        )
        page = await context.new_page()

        # Connect CDP session for network & CPU throttling (Simulated Mobile 4G)
        cdp = await context.new_cdp_session(page)
        await cdp.send('Network.enable')
        # Fast/Regular 4G: 150ms RTT, 1.6 Mbps down, 750 Kbps up
        await cdp.send('Network.emulateNetworkConditions', {
            'offline': False,
            'latency': 150,
            'downloadThroughput': int(1.6 * 1024 * 1024 / 8),
            'uploadThroughput': int(750 * 1024 / 8),
            'connectionType': 'cellular4g'
        })
        # 4x CPU slowdown (mobile simulation)
        await cdp.send('Emulation.setCPUThrottlingRate', {'rate': 4})

        transferred_bytes = 0
        def on_response(response):
            nonlocal transferred_bytes
            try:
                # Approximate byte tracking
                headers = response.headers
                length = headers.get('content-length')
                if length:
                    transferred_bytes += int(length)
            except Exception:
                pass

        page.on('response', on_response)

        await page.goto('http://127.0.0.1:8089/index.html', wait_until='networkidle')

        metrics = await page.evaluate('''() => {
            return new Promise((resolve) => {
                let fcp = 0;
                let lcp = 0;
                let lcpElement = '';
                let cls = 0;
                let tbt = 0;

                // FCP
                const paintEntries = performance.getEntriesByType('paint');
                const fcpEntry = paintEntries.find(e => e.name === 'first-contentful-paint');
                if (fcpEntry) fcp = fcpEntry.startTime;

                // CLS
                const observerCls = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (!entry.hadRecentInput) {
                            cls += entry.value;
                        }
                    }
                });
                try { observerCls.observe({ type: 'layout-shift', buffered: true }); } catch(e){}

                // LCP
                const observerLcp = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    if (lastEntry) {
                        lcp = lastEntry.startTime;
                        lcpElement = lastEntry.element ? (lastEntry.element.outerHTML.slice(0, 100)) : (lastEntry.id || 'unknown');
                    }
                });
                try { observerLcp.observe({ type: 'largest-contentful-paint', buffered: true }); } catch(e){}

                setTimeout(() => {
                    resolve({
                        fcp: Math.round(fcp),
                        lcp: Math.round(lcp || fcp),
                        lcpElement: lcpElement,
                        cls: Number(cls.toFixed(4)),
                        tbt: Math.round(tbt)
                    });
                }, 1000);
            });
        }''')

        metrics['transferred_kb'] = round(transferred_bytes / 1024, 1)
        print("Metrics:", metrics)
        await browser.close()

asyncio.run(measure())
