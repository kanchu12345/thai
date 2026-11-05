import os
import glob
import re
import sys

sys.path.append(os.path.abspath("."))
from tools.build_site import get_header_html, get_footer_html, get_cta_band_html
from tools.apply_unification import get_rel_prefix, get_active_tab, REDIRECTS

all_html = glob.glob("**/*.html", recursive=True)
all_html = [f.replace("\\", "/") for f in all_html if not f.startswith("admin")]

updated_count = 0

for filepath in all_html:
    # Skip redirected pages
    if filepath in REDIRECTS:
        continue

    with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    rel_prefix = get_rel_prefix(filepath)
    active_tab = get_active_tab(filepath)

    # 1. Update Viewport and Theme Color Meta Tags
    if 'viewport-fit=cover' not in content:
        content = re.sub(
            r'<meta\s+name=["\']viewport["\'][^>]*>',
            '<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">\n  <meta name="theme-color" content="#16361D">',
            content,
            count=1
        )

    # 2. Ensure site.css is loaded
    css_tag = f'<link rel="stylesheet" href="{rel_prefix}assets/css/site.css">'
    if 'assets/css/site.css' not in content:
        content = content.replace('</head>', f'  <!-- Master Unified Stylesheet -->\n  {css_tag}\n</head>')

    # 3. Update Header & Mobile Nav (with max 64px mobile header and accordion drawer)
    header_html = get_header_html(rel_prefix, active_tab)
    # Remove existing mobile nav if separate
    content = re.sub(r'<div class="mobile-nav-fullscreen"[^>]*>.*?</div>\s*</div>', '', content, flags=re.DOTALL)
    # Replace header
    content = re.sub(r'<header class="site-header-walkers"[^>]*>.*?</header>', header_html, content, count=1, flags=re.DOTALL)

    # 4. Update CTA Band (for non-inquiry pages)
    if not any(x in filepath for x in ["inquiry-quick", "inquiry-detailed"]):
        cta_html = get_cta_band_html(rel_prefix)
        if '<section class="sacred-cta-banner"' in content:
            content = re.sub(r'<section class="sacred-cta-banner"[^>]*>.*?</section>', cta_html, content, count=1, flags=re.DOTALL)
        else:
            content = re.sub(r'(<footer class="site-footer-walkers")', f'{cta_html}\n\n  \\1', content, count=1)

    # 5. Update Footer & Unified Floating Action Button Cluster
    footer_html = get_footer_html(rel_prefix)
    # Remove older floating whatsapp button or older fab groups
    content = re.sub(r'<a href="https://wa\.me/[^>]*class="floating-whatsapp-btn"[^>]*>.*?</a>', '', content, flags=re.DOTALL)
    content = re.sub(r'<div class="unified-fab-group"[^>]*>.*?</div>', '', content, flags=re.DOTALL)
    # Replace footer
    content = re.sub(r'<footer class="site-footer-walkers"[^>]*>.*?</footer>', footer_html, content, count=1, flags=re.DOTALL)

    # 6. Ensure Scripts: config.js, mobile-nav.js, site-translator.js
    config_script = f'<script src="{rel_prefix}assets/js/config.js"></script>'
    mobile_nav_script = f'<script src="{rel_prefix}assets/js/mobile-nav.js"></script>'
    translator_script = f'<script src="{rel_prefix}js/site-translator.js"></script>'

    if 'assets/js/mobile-nav.js' not in content:
        content = content.replace('</body>', f'  {mobile_nav_script}\n</body>')
    if 'assets/js/config.js' not in content:
        content = content.replace('</body>', f'  {config_script}\n</body>')
    if 'js/site-translator.js' not in content:
        content = content.replace('</body>', f'  {translator_script}\n</body>')

    # 7. Specific Home Page Optimizations for index.html
    if filepath == "index.html":
        # Replace hero background with <picture> (portrait crop on mobile, video on desktop)
        hero_media_markup = f'''      <!-- Responsive Hero Background: Mobile Portrait Picture Crop & Desktop Video -->
      <picture class="hero-picture-bg">
        <source media="(max-width: 768px)" srcset="{rel_prefix}assets/images/home/hero-sigiriya-aerial-portrait.webp">
        <img src="{rel_prefix}assets/images/home/hero-sigiriya-aerial-1.webp" alt="Sigiriya Ancient Rock Citadel Aerial View" class="hero-img-bg" width="1920" height="1080" fetchpriority="high">
      </picture>
      <video class="video-banner-video desktop-only-video" autoplay muted loop playsinline webkit-playsinline preload="none" poster="{rel_prefix}assets/images/home/hero-sigiriya-aerial-1.webp">
        <source src="{rel_prefix}assets/videos/hero-banner.mp4" type="video/mp4">
      </video>'''
        
        # Replace existing video in hero
        content = re.sub(r'<!-- Full-Width Background Video -->\s*<video class="video-banner-video".*?</video>', hero_media_markup, content, flags=re.DOTALL)

        # Replace hero buttons with symmetrical mobile-stacked buttons
        hero_actions_markup = '''<div class="banner-actions">
              <a href="#packages" class="next-btn next-btn--gold" title="Explore Tour Packages">
                <span>Explore Tour Packages</span>
              </a>
              <a href="inquiry-detailed.html" class="next-btn next-btn--white" title="Plan a Bespoke Trip">
                <span>Tailor Your Journey</span>
              </a>
            </div>'''
        content = re.sub(r'<div class="banner-actions">.*?</div>\s*</div>\s*</div>\s*</div>', f'{hero_actions_markup}\n          </div>\n        </div>\n      </div>', content, flags=re.DOTALL)

    # 8. Specific Contact Page Mobile Map Improvements
    if filepath == "contact.html":
        # Add touch helper overlay for the map
        touch_helper = '''
          <div class="map-touch-helper" id="mapTouchHelper" style="position: absolute; top: 12px; right: 12px; z-index: 400; background: rgba(13, 43, 29, 0.85); color: #FFFFFF; font-size: 0.78rem; font-weight: 600; padding: 6px 14px; border-radius: 9999px; pointer-events: none; backdrop-filter: blur(4px);">
            <span>👆 Tap to interact with map</span>
          </div>'''
        if 'map-touch-helper' not in content:
            content = content.replace('<div id="contactMap"', f'{touch_helper}\n          <div id="contactMap"')

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

    updated_count += 1
    print(f"[JOB 4 APPLIED] {filepath}")

print(f"\nSuccessfully applied Job 4 Mobile-First standards to {updated_count} active pages.")
