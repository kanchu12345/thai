import os
import glob
import json
import time
from playwright.sync_api import sync_playwright

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(BASE_DIR)

all_html = glob.glob('**/*.html', recursive=True)
public_pages = [
    f.replace('\\', '/') for f in all_html 
    if not f.startswith('admin') and not f.startswith('node_modules') 
    and not f.startswith('.') and not f.startswith('artifacts')
]
public_pages.sort()

VIEWPORTS = [
    {"name": "360x640", "width": 360, "height": 640},
    {"name": "390x844", "width": 390, "height": 844},
    {"name": "412x915", "width": 412, "height": 915}
]

KEY_SCREENSHOT_PAGES = [
    "index.html",
    "tours/index.html",
    "tours/wildlife/index.html",
    "tours/wildlife/wild-ceylon-predator-elephant-trail/index.html"
]

os.makedirs("artifacts", exist_ok=True)

results = []
summary = {
    "totalPagesTested": len(public_pages),
    "totalRuns": len(public_pages) * len(VIEWPORTS),
    "passedRuns": 0,
    "failedRuns": 0,
    "overflowCount": 0,
    "largeFixedCount": 0,
    "brokenImagesCount": 0,
    "narrowTextCount": 0,
    "consoleErrorsCount": 0
}

print(f"Starting Mobile QA on {len(public_pages)} pages across 3 viewports ({len(public_pages) * 3} tests)...")

with sync_playwright() as p:
    browser = p.chromium.launch(channel="chrome", headless=True)
    
    for page_idx, page_path in enumerate(public_pages, 1):
        target_url = f"http://127.0.0.1:8089/{page_path}"
        
        for vp in VIEWPORTS:
            context = browser.new_context(
                viewport={"width": vp["width"], "height": vp["height"]},
                user_agent="Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
            )
            page = context.new_page()
            
            console_errors = []
            page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
            
            try:
                page.goto(target_url, wait_until="domcontentloaded", timeout=12000)
                page.wait_for_timeout(600)
                
                # Capture screenshots for key pages at 390px
                if page_path in KEY_SCREENSHOT_PAGES and vp["width"] == 390:
                    clean_slug = page_path.replace('/', '_').replace('.html', '')
                    shot_path = f"artifacts/qa_screenshot_{clean_slug}_390.png"
                    page.screenshot(path=shot_path, full_page=False)
                    if clean_slug == "tours_wildlife_index":
                        # Full page screenshot for the final gate review
                        page.screenshot(path="artifacts/mobile_wildlife_full_390.png", full_page=True)

                eval_data = page.evaluate('''() => {
                    const scrollWidth = document.documentElement.scrollWidth;
                    const clientWidth = document.documentElement.clientWidth;
                    const hasHorizontalOverflow = scrollWidth > (clientWidth + 1);

                    // Large fixed elements > 25% of viewport height
                    let largeFixed = [];
                    document.querySelectorAll('*').forEach(el => {
                        const style = window.getComputedStyle(el);
                        if (style.position === 'fixed' && style.display !== 'none' && style.visibility !== 'hidden') {
                            const r = el.getBoundingClientRect();
                            if (r.height > (window.innerHeight * 0.25) && r.width > 60) {
                                // Exclude mobile navigation drawers that are closed/offscreen
                                if (r.left >= 0 && r.top >= 0 && r.bottom > 0) {
                                    largeFixed.push({
                                        tag: el.tagName,
                                        id: el.id,
                                        className: el.className,
                                        height: Math.round(r.height),
                                        heightPercent: Math.round((r.height / window.innerHeight) * 100)
                                    });
                                }
                            }
                        }
                    });

                    // Broken images
                    let brokenImgs = [];
                    document.querySelectorAll('img').forEach(img => {
                        if (img.complete && img.naturalWidth === 0 && img.offsetParent !== null) {
                            brokenImgs.push(img.src);
                        }
                    });

                    // Abnormally narrow text blocks (< 140px)
                    let narrowBlocks = [];
                    document.querySelectorAll('.beach-card-body, .package-card, .dest-card-body, p.paragraph--20, p.paragraph--18').forEach(el => {
                        if (el.offsetParent !== null) {
                            const r = el.getBoundingClientRect();
                            if (r.width < 140 && r.height > 20) {
                                narrowBlocks.push({
                                    className: el.className,
                                    width: Math.round(r.width)
                                });
                            }
                        }
                    });

                    return {
                        scrollWidth,
                        clientWidth,
                        hasHorizontalOverflow,
                        largeFixed,
                        brokenImgs,
                        narrowBlocks
                    };
                }''')

                has_overflow = eval_data["hasHorizontalOverflow"]
                large_fixed = eval_data["largeFixed"]
                broken_imgs = eval_data["brokenImgs"]
                narrow_blocks = eval_data["narrowBlocks"]
                
                passed = (not has_overflow) and (len(large_fixed) == 0) and (len(broken_imgs) == 0) and (len(narrow_blocks) == 0)
                
                if passed:
                    summary["passedRuns"] += 1
                else:
                    summary["failedRuns"] += 1
                    if has_overflow: summary["overflowCount"] += 1
                    if len(large_fixed) > 0: summary["largeFixedCount"] += 1
                    if len(broken_imgs) > 0: summary["brokenImagesCount"] += len(broken_imgs)
                    if len(narrow_blocks) > 0: summary["narrowTextCount"] += len(narrow_blocks)

                results.append({
                    "page": page_path,
                    "viewport": vp["name"],
                    "passed": passed,
                    "hasOverflow": has_overflow,
                    "scrollWidth": eval_data["scrollWidth"],
                    "clientWidth": eval_data["clientWidth"],
                    "largeFixed": large_fixed,
                    "brokenImages": broken_imgs,
                    "narrowBlocks": narrow_blocks,
                    "consoleErrors": console_errors
                })

            except Exception as e:
                summary["failedRuns"] += 1
                results.append({
                    "page": page_path,
                    "viewport": vp["name"],
                    "passed": False,
                    "error": str(e)
                })

            context.close()
        
        if page_idx % 15 == 0 or page_idx == len(public_pages):
            print(f"Progress: {page_idx}/{len(public_pages)} pages tested...")

    browser.close()

with open("artifacts/mobile_qa_results.json", "w", encoding="utf-8") as f:
    json.dump({"summary": summary, "results": results}, f, indent=2)

print("Mobile QA Suite Run Completed.")
print(f"Summary: {summary['passedRuns']} passed, {summary['failedRuns']} failed out of {summary['totalRuns']} total checks.")
