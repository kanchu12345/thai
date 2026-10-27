import os
import json
from playwright.sync_api import sync_playwright

VIEWPORTS = [
    {"name": "360x640", "width": 360, "height": 640},
    {"name": "390x844", "width": 390, "height": 844},
    {"name": "412x915", "width": 412, "height": 915}
]

PAGES = [
    {"url": "http://127.0.0.1:8089/tours/wildlife/", "slug": "wildlife"},
    {"url": "http://127.0.0.1:8089/tours/", "slug": "tours_index"},
    {"url": "http://127.0.0.1:8089/index.html", "slug": "home"}
]

os.makedirs("artifacts", exist_ok=True)

results = {}

with sync_playwright() as p:
    browser = p.chromium.launch(channel="chrome", headless=True)
    
    for page_info in PAGES:
        slug = page_info["slug"]
        results[slug] = {}
        
        for vp in VIEWPORTS:
            vp_name = vp["name"]
            context = browser.new_context(
                viewport={"width": vp["width"], "height": vp["height"]},
                user_agent="Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
            )
            page = context.new_page()
            
            console_errors = []
            page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
            
            page.goto(page_info["url"], wait_until="domcontentloaded", timeout=15000)
            page.wait_for_timeout(1500)
            
            # Screenshot
            screenshot_path = f"artifacts/mobile_before_{slug}_{vp['width']}.png"
            page.screenshot(path=screenshot_path, full_page=False)
            
            # Diagnostic evaluation in DOM
            eval_data = page.evaluate('''() => {
                const data = {
                    scrollWidth: document.documentElement.scrollWidth,
                    clientWidth: document.documentElement.clientWidth,
                    hasHorizontalScroll: document.documentElement.scrollWidth > document.documentElement.clientWidth,
                    cards: [],
                    stickyBar: null,
                    fabGroup: null,
                    pinkElements: []
                };

                // Check cards in grid
                const cardGrid = document.querySelector('.beach-grid-cards, .category-card-grid, .package-cards-grid');
                if (cardGrid) {
                    const gridStyle = window.getComputedStyle(cardGrid);
                    data.cardGrid = {
                        className: cardGrid.className,
                        gridTemplateColumns: gridStyle.gridTemplateColumns,
                        inlineStyle: cardGrid.getAttribute('style') || '',
                        width: cardGrid.getBoundingClientRect().width,
                        childCount: cardGrid.children.length
                    };
                    
                    for (let i = 0; i < cardGrid.children.length; i++) {
                        const card = cardGrid.children[i];
                        const rect = card.getBoundingClientRect();
                        const titleEl = card.querySelector('.beach-card-title, .hover-box__details, h3, h4');
                        const bodyEl = card.querySelector('.beach-card-body');
                        const badgeEl = card.querySelector('.beach-tag-badge');
                        const pillEl = card.querySelector('.beach-duration-pill');
                        const imgEl = card.querySelector('img');
                        
                        let badgeRect = badgeEl ? badgeEl.getBoundingClientRect() : null;
                        let pillRect = pillEl ? pillEl.getBoundingClientRect() : null;
                        let overlap = false;
                        if (badgeRect && pillRect) {
                            overlap = !(badgeRect.right < pillRect.left || 
                                        badgeRect.left > pillRect.right || 
                                        badgeRect.bottom < pillRect.top || 
                                        badgeRect.top > pillRect.bottom);
                        }
                        
                        data.cards.push({
                            index: i + 1,
                            width: rect.width,
                            height: rect.height,
                            left: rect.left,
                            top: rect.top,
                            titleText: titleEl ? titleEl.textContent.trim().slice(0, 40) : '',
                            titleWordBreak: titleEl ? window.getComputedStyle(titleEl).wordBreak : '',
                            titleFontSize: titleEl ? window.getComputedStyle(titleEl).fontSize : '',
                            bodyPadding: bodyEl ? window.getComputedStyle(bodyEl).padding : '',
                            badgeText: badgeEl ? badgeEl.textContent.trim() : '',
                            pillText: pillEl ? pillEl.textContent.trim() : '',
                            badgePillOverlap: overlap,
                            imgSrc: imgEl ? imgEl.src : '',
                            naturalWidth: imgEl ? imgEl.naturalWidth : 0
                        });
                    }
                }

                // Check Mobile Sticky Bar
                const stickyBar = document.getElementById('lotusMobileStickyBar') || document.querySelector('.lotus-mobile-sticky-bar');
                if (stickyBar) {
                    const rect = stickyBar.getBoundingClientRect();
                    const style = window.getComputedStyle(stickyBar);
                    data.stickyBar = {
                        id: stickyBar.id,
                        display: style.display,
                        position: style.position,
                        background: style.background,
                        width: rect.width,
                        height: rect.height,
                        top: rect.top,
                        bottom: rect.bottom,
                        heightPercentOfViewport: (rect.height / window.innerHeight) * 100,
                        text: stickyBar.textContent.trim().replace(/\\s+/g, ' ').slice(0, 150)
                    };
                }

                // Check FAB group
                const fab = document.getElementById('unifiedFabGroup') || document.querySelector('.unified-fab-group');
                if (fab) {
                    const rect = fab.getBoundingClientRect();
                    const style = window.getComputedStyle(fab);
                    data.fabGroup = {
                        display: style.display,
                        position: style.position,
                        width: rect.width,
                        height: rect.height,
                        top: rect.top,
                        right: style.right,
                        bottom: style.bottom
                    };
                }

                // Find elements with pinkish background
                document.querySelectorAll('*').forEach(el => {
                    const bg = window.getComputedStyle(el).background;
                    const bgColor = window.getComputedStyle(el).backgroundColor;
                    if (bg.includes('253, 236, 239') || bg.includes('250, 240, 243') || bg.includes('249, 229, 234') || 
                        bgColor.includes('253, 236, 239') || (el.getAttribute('style') && el.getAttribute('style').includes('FDECEF'))) {
                        data.pinkElements.push({
                            tag: el.tagName,
                            id: el.id,
                            className: el.className,
                            inlineStyle: el.getAttribute('style')
                        });
                    }
                });

                return data;
            }''')
            
            eval_data["consoleErrors"] = console_errors
            eval_data["screenshot"] = screenshot_path
            results[slug][vp_name] = eval_data
            context.close()
            
    browser.close()

with open("artifacts/mobile_diag_raw.json", "w", encoding="utf-8") as f:
    json.dump(results, f, indent=2)

print("Diagnostic completed successfully.")
