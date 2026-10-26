import os
import time
from playwright.sync_api import sync_playwright

OUTPUT_DIR = "C:/Users/kanch/.gemini/antigravity/brain/b764be33-4f17-4a6c-973e-5b4163beb841/cross_browser_screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)
BASE_URL = "http://localhost:8089"

with sync_playwright() as p:
    b = p.chromium.launch(channel="chrome", headless=True)

    # 1. Megamenu Hover state (1440px)
    page = b.new_page(viewport={"width": 1440, "height": 900})
    page.goto(f"{BASE_URL}/index.html", wait_until="domcontentloaded")
    time.sleep(0.5)
    menu_item = page.query_selector('.walkers-menu-item:has(.walkers-megamenu)')
    if menu_item:
        menu_item.hover()
        time.sleep(0.4)
    page.screenshot(path=os.path.join(OUTPUT_DIR, "chrome_1440_megamenu_hover.png"), full_page=False)

    # 2. Zoom 150% (Desktop 1440 scaled)
    ctx_zoom150 = b.new_context(viewport={"width": 960, "height": 600}, device_scale_factor=1.5)
    p_z150 = ctx_zoom150.new_page()
    p_z150.goto(f"{BASE_URL}/index.html", wait_until="domcontentloaded")
    time.sleep(0.5)
    p_z150.screenshot(path=os.path.join(OUTPUT_DIR, "chrome_zoom_150pct.png"), full_page=False)
    ctx_zoom150.close()

    # 3. Zoom 200% (Desktop 1440 scaled)
    ctx_zoom200 = b.new_context(viewport={"width": 720, "height": 450}, device_scale_factor=2.0)
    p_z200 = ctx_zoom200.new_page()
    p_z200.goto(f"{BASE_URL}/index.html", wait_until="domcontentloaded")
    time.sleep(0.5)
    p_z200.screenshot(path=os.path.join(OUTPUT_DIR, "chrome_zoom_200pct.png"), full_page=False)
    ctx_zoom200.close()

    # 4. Tour Comparison & Card Grid Layout
    page.goto(f"{BASE_URL}/sri-lanka-tours.html", wait_until="domcontentloaded")
    time.sleep(0.5)
    page.screenshot(path=os.path.join(OUTPUT_DIR, "chrome_1440_tours_catalog.png"), full_page=False)

    # 5. Interactive Map & Contact Layout
    page.goto(f"{BASE_URL}/contact.html", wait_until="domcontentloaded")
    time.sleep(0.5)
    page.screenshot(path=os.path.join(OUTPUT_DIR, "chrome_1440_contact_map.png"), full_page=False)

    b.close()
    print("Additional desktop & zoom detail screenshots captured successfully!")
