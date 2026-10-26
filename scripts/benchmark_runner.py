import asyncio
import statistics
import sys
from playwright.async_api import async_playwright

TEST_PAGES = [
    {
        'name': 'index.html (Home)',
        'main_url': 'http://127.0.0.1:8089/main-benchmark/index.html',
        'phase1_url': 'http://127.0.0.1:8089/index.html'
    },
    {
        'name': 'tours/beach/ (Category)',
        'main_url': 'http://127.0.0.1:8089/main-benchmark/tours/beach/index.html',
        'phase1_url': 'http://127.0.0.1:8089/tours/beach/index.html'
    },
    {
        'name': 'tours/beach/southern-sands-serenade/ (Package)',
        'main_url': 'http://127.0.0.1:8089/main-benchmark/tours/beach/southern-sands-serenade/index.html',
        'phase1_url': 'http://127.0.0.1:8089/tours/beach/southern-sands-serenade/index.html'
    }
]

async def run_single_benchmark(browser, url):
    context = await browser.new_context(
        viewport={'width': 390, 'height': 844},
        user_agent='Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'
    )
    page = await context.new_page()

    cdp = await context.new_cdp_session(page)
    await cdp.send('Network.enable')
    await cdp.send('Network.emulateNetworkConditions', {
        'offline': False,
        'latency': 150,
        'downloadThroughput': int(1.6 * 1024 * 1024 / 8),
        'uploadThroughput': int(750 * 1024 / 8),
        'connectionType': 'cellular4g'
    })
    await cdp.send('Emulation.setCPUThrottlingRate', {'rate': 4})

    transferred_bytes = 0
    def on_response(response):
        nonlocal transferred_bytes
        try:
            cl = response.headers.get('content-length')
            if cl:
                transferred_bytes += int(cl)
        except Exception:
            pass

    page.on('response', on_response)

    await page.goto(url, wait_until='load', timeout=15000)
    await page.wait_for_timeout(800)

    metrics = await page.evaluate('''() => {
        return new Promise((resolve) => {
            let fcp = 0;
            let lcp = 0;
            let cls = 0;

            const paintEntries = performance.getEntriesByType('paint');
            const fcpEntry = paintEntries.find(e => e.name === 'first-contentful-paint');
            if (fcpEntry) fcp = fcpEntry.startTime;

            const observerCls = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (!entry.hadRecentInput) {
                        cls += entry.value;
                    }
                }
            });
            try { observerCls.observe({ type: 'layout-shift', buffered: true }); } catch(e){}

            const observerLcp = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const last = entries[entries.length - 1];
                if (last) lcp = last.startTime;
            });
            try { observerLcp.observe({ type: 'largest-contentful-paint', buffered: true }); } catch(e){}

            setTimeout(() => {
                resolve({
                    fcp: Math.round(fcp),
                    lcp: Math.round(lcp || fcp),
                    cls: Number(cls.toFixed(4)),
                    tbt: 0
                });
            }, 500);
        });
    }''')

    metrics['transferred_kb'] = round(transferred_bytes / 1024, 1)
    await context.close()
    return metrics

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(channel='chrome', headless=True)
        results = []

        for page_info in TEST_PAGES:
            name = page_info['name']
            print(f"Benchmarking {name}...", flush=True)

            main_runs = []
            for r in range(3):
                res = await run_single_benchmark(browser, page_info['main_url'])
                main_runs.append(res)
                print(f"  [main] Run {r+1}: FCP={res['fcp']}ms LCP={res['lcp']}ms CLS={res['cls']} KB={res['transferred_kb']}", flush=True)

            p1_runs = []
            for r in range(3):
                res = await run_single_benchmark(browser, page_info['phase1_url'])
                p1_runs.append(res)
                print(f"  [phase1] Run {r+1}: FCP={res['fcp']}ms LCP={res['lcp']}ms CLS={res['cls']} KB={res['transferred_kb']}", flush=True)

            def get_median(runs):
                return {
                    'fcp': statistics.median([r['fcp'] for r in runs]),
                    'lcp': statistics.median([r['lcp'] for r in runs]),
                    'cls': statistics.median([r['cls'] for r in runs]),
                    'tbt': statistics.median([r['tbt'] for r in runs]),
                    'transferred_kb': statistics.median([r['transferred_kb'] for r in runs])
                }

            results.append({
                'name': name,
                'main': get_median(main_runs),
                'phase1': get_median(p1_runs)
            })

        await browser.close()

        print("\n" + "=" * 90, flush=True)
        print("PERFORMANCE BENCHMARK: main vs cms-phase1 (Mobile 4G Throttled, Median of 3 Runs)", flush=True)
        print("=" * 90, flush=True)
        print(f"{'Page':<35} | {'Branch':<10} | {'FCP (ms)':<9} | {'LCP (ms)':<9} | {'CLS':<7} | {'KB':<8}", flush=True)
        print("-" * 90, flush=True)

        for res in results:
            m = res['main']
            p1 = res['phase1']
            print(f"{res['name']:<35} | {'main':<10} | {int(m['fcp']):<9} | {int(m['lcp']):<9} | {m['cls']:<7} | {m['transferred_kb']:<8}", flush=True)
            print(f"{'':<35} | {'cms-phase1':<10} | {int(p1['fcp']):<9} | {int(p1['lcp']):<9} | {p1['cls']:<7} | {p1['transferred_kb']:<8}", flush=True)
            print("-" * 90, flush=True)

if __name__ == '__main__':
    asyncio.run(main())
