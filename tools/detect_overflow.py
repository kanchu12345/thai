from playwright.sync_api import sync_playwright
import json

PORT = 8089
PAGES = [
    ('home', f'http://localhost:{PORT}/index.html'),
    ('tours_index', f'http://localhost:{PORT}/tours/index.html'),
    ('tour_detail', f'http://localhost:{PORT}/tours/cultural/three-millennia-of-living-heritage/index.html'),
    ('contact', f'http://localhost:{PORT}/contact.html'),
    ('inquiry_quick', f'http://localhost:{PORT}/inquiry-quick.html')
]

with sync_playwright() as p:
    browser = p.chromium.launch(channel='msedge', headless=True)
    
    for name, url in PAGES:
        page = browser.new_page(viewport={'width': 360, 'height': 800})
        page.goto(url, wait_until='networkidle')
        
        info = page.evaluate('''() => {
            const clientWidth = document.documentElement.clientWidth;
            const scrollWidth = document.documentElement.scrollWidth;
            const bodyScrollWidth = document.body.scrollWidth;
            
            const overflowingElements = [];
            const allElements = document.querySelectorAll('*');
            
            for (const el of allElements) {
                // Ignore script, style, head, meta
                if (['SCRIPT', 'STYLE', 'HEAD', 'META', 'TITLE', 'LINK'].includes(el.tagName)) continue;
                
                const rect = el.getBoundingClientRect();
                const style = window.getComputedStyle(el);
                
                // Check if element extends beyond right edge of clientWidth
                if (rect.right > clientWidth + 1 || rect.width > clientWidth + 1) {
                    // Check if element is displayed
                    if (style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0) {
                        overflowingElements.push({
                            tag: el.tagName,
                            id: el.id,
                            className: el.className ? String(el.className).slice(0, 50) : '',
                            width: Math.round(rect.width),
                            right: Math.round(rect.right),
                            left: Math.round(rect.left),
                            overflow: style.overflow,
                            position: style.position,
                            textSnippet: (el.textContent || '').trim().slice(0, 30)
                        });
                    }
                }
            }
            
            return {
                clientWidth,
                scrollWidth,
                bodyScrollWidth,
                overflowingElements
            };
        }''')
        
        print(f"\n==========================================")
        print(f"Page: {name} (URL: {url})")
        print(f"clientWidth: {info['clientWidth']}, scrollWidth: {info['scrollWidth']}, bodyScrollWidth: {info['bodyScrollWidth']}")
        print(f"Overflowing elements count: {len(info['overflowingElements'])}")
        
        for item in info['overflowingElements'][:15]: # Show top 15
            print(f"  [{item['tag']}] id='{item['id']}' class='{item['className']}' width={item['width']} right={item['right']} left={item['left']}")
            if item['textSnippet']:
                print(f"     text: {repr(item['textSnippet'])}")
                
        page.close()
    browser.close()
