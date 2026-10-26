import asyncio
from playwright.async_api import async_playwright

async def inspect_mobile_requests(url):
    print(f"\nMobile Requests for: {url}")
    async with async_playwright() as p:
        browser = await p.chromium.launch(channel='chrome', headless=True)
        context = await browser.new_context(
            viewport={'width': 390, 'height': 844},
            user_agent='Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'
        )
        page = await context.new_page()

        reqs = []
        page.on('response', lambda res: reqs.append({
            'url': res.url,
            'status': res.status,
            'type': res.request.resource_type,
            'size': int(res.headers.get('content-length', 0))
        }))

        await page.goto(url, wait_until='networkidle')
        await browser.close()

        reqs.sort(key=lambda x: x['size'], reverse=True)
        total_kb = sum(r['size'] for r in reqs) / 1024
        print(f"Total Requests: {len(reqs)} | Total Size: {total_kb:.1f} KB")
        print("Top 10 largest requests:")
        for r in reqs[:10]:
            print(f"  {r['size']/1024:6.1f} KB | {r['type']:<10} | {r['url']}")

asyncio.run(inspect_mobile_requests('http://127.0.0.1:8089/index.html'))
