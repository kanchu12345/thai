"""
scripts/capture_screenshots.py
Captures desktop (1440x900) and mobile (390x844) screenshots of 8 representative pages.
Usage: python scripts/capture_screenshots.py before
       python scripts/capture_screenshots.py after
"""

import sys
import os
import time
from playwright.sync_api import sync_playwright

MODE = sys.argv[1] if len(sys.argv) > 1 else 'before'
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'rollout-screens', MODE)
os.makedirs(OUTPUT_DIR, exist_ok=True)

BASE_URL = 'http://localhost:8089'

PAGES = [
    ('index', '/index.html'),
    ('about', '/about.html'),
    ('contact', '/contact.html'),
    ('destinations', '/destinations.html'),
    ('gallery', '/gallery.html'),
    ('inquiry-detailed', '/inquiry-detailed.html'),
    ('category-beach', '/tours/beach/index.html'),
    ('package-southern-sands', '/tours/beach/southern-sands-serenade/index.html')
]

VIEWPORTS = [
    ('desktop_1440', 1440, 900, False),
    ('mobile_390', 390, 844, True)
]

def capture():
    print(f"Capturing {MODE.upper()} screenshots into {OUTPUT_DIR}...")
    with sync_playwright() as p:
        browser = p.chromium.launch(channel='chrome', headless=True)
        
        for vp_name, width, height, is_mobile in VIEWPORTS:
            context = browser.new_context(
                viewport={'width': width, 'height': height},
                is_mobile=is_mobile,
                device_scale_factor=2 if is_mobile else 1
            )
            page = context.new_page()
            
            for page_name, page_path in PAGES:
                url = f"{BASE_URL}{page_path}"
                out_file = os.path.join(OUTPUT_DIR, f"{page_name}_{vp_name}.png")
                try:
                    page.goto(url, wait_until='domcontentloaded', timeout=30000)
                    time.sleep(2)  # Allow fonts and styles to render
                    page.screenshot(path=out_file, full_page=False)
                    print(f"  [OK] Captured: {page_name} [{vp_name}] -> {out_file}")
                except Exception as e:
                    print(f"  [FAIL] {page_name} [{vp_name}]: {e}")
            
            context.close()
        browser.close()
    print(f"Done capturing {MODE.upper()} screenshots.")

if __name__ == '__main__':
    capture()
