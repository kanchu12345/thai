import asyncio
from playwright.async_api import async_playwright

async def inspect_requests(url):
    print(f"\nRequests for: {url}")
    async with async_playwright() as p:
        browser = await p.chromium.launch(channel='chrome', headless=True)
        page = await browser.new_page()

        reqs = []
        page.on('response', lambda res: reqs.append({
            'url': res.url,
            'status': res.status,
            'type': res.request.resource_type,
            'size': int(res.headers.get('content-length', 0))
        }))

        await page.goto(url, wait_until='networkidle')
        await browser.close()

        # Sort by size descending
        reqs.sort(key=lambda x: x['size'], reverse=True)
        total_kb = sum(r['size'] for r in reqs) / 1024
        print(f"Total Requests: {len(reqs)} | Total Size: {total_kb:.1f} KB")
        print("Top 10 largest requests:")
        for r in reqs[:10]:
            print(f"  {r['size']/1024:6.1f} KB | {r['type']:<10} | {r['url']}")

async def main():
    await inspect_requests('http://127.0.0.1:8089/main-benchmark/index.html')
    await inspect_requests('http://127.0.0.1:8089/index.html')

if __name__ == '__main__':
    asyncio.run(main())
