import os
import re
from PIL import Image

print("1. Creating high-density retina header logo (160x130, ~30KB)...")
im = Image.open('logo.png')
im_retina = im.copy()
im_retina.thumbnail((160, 160), Image.Resampling.LANCZOS)
os.makedirs('assets/images/brand', exist_ok=True)
im_retina.save('assets/images/brand/logo-header.png', 'PNG', optimize=True)
im_retina.save('assets/images/brand/logo-header.webp', 'WEBP', quality=90)
print(f"  Created assets/images/brand/logo-header.png ({os.path.getsize('assets/images/brand/logo-header.png')/1024:.1f} KB)")
print(f"  Created assets/images/brand/logo-header.webp ({os.path.getsize('assets/images/brand/logo-header.webp')/1024:.1f} KB)")

# 2. Update assets/css/site.css:
# - Remove @import url('https://fonts.googleapis.com...')
# - Add .desktop-only-video mobile display: none
# - Add card aspect-ratio rules
print("\n2. Optimizing assets/css/site.css...")
with open('assets/css/site.css', 'r', encoding='utf-8') as f:
    site_css = f.read().replace('\r\n', '\n')

# Remove the blocking font @import
if "@import url('https://fonts.googleapis.com" in site_css:
    site_css = re.sub(r"@import url\('https://fonts\.googleapis\.com[^']*'\);\s*", "", site_css)
    print("  Removed render-blocking @import Google Fonts from site.css")

perf_css = """
/* ==============================================================================
 * PERFORMANCE OPTIMIZATION: MEDIA & LAYOUT STABILITY
 * ============================================================================== */
@media (max-width: 992px) {
  .desktop-only-video {
    display: none !important;
  }
}

/* Aspect Ratio Preservation to prevent Cumulative Layout Shifts (CLS) */
.card-img,
.tour-card-img,
.tour-card-figure img,
.gallery-card img,
.dest-card-figure img {
  aspect-ratio: 16 / 10;
  object-fit: cover;
  width: 100%;
  height: auto;
}

.avatar-img,
.testimonial-avatar img,
.team-avatar img {
  aspect-ratio: 1 / 1;
  object-fit: cover;
}

.header-brand-logo {
  aspect-ratio: 1 / 1;
  object-fit: contain;
}
"""

if "PERFORMANCE OPTIMIZATION: MEDIA & LAYOUT STABILITY" not in site_css:
    site_css += perf_css
    with open('assets/css/site.css', 'w', encoding='utf-8', newline='\n') as f:
        f.write(site_css)
    print("  Added performance & CLS prevention rules to site.css")

# 3. Optimize index.html:
# - Video data-saver on mobile
# - Preload LCP hero image
# - Defer head scripts
# - Header logo src to optimized retina logo
print("\n3. Optimizing index.html...")
with open('index.html', 'r', encoding='utf-8') as f:
    idx = f.read().replace('\r\n', '\n')

# Preload LCP image in head
lcp_preload = """  <!-- Preload Critical LCP Hero Image -->
  <link rel="preload" as="image" href="./assets/images/home/hero-sigiriya-aerial-portrait.webp" media="(max-width: 768px)" fetchpriority="high"/>
  <link rel="preload" as="image" href="./assets/images/home/hero-sigiriya-aerial-1.webp" media="(min-width: 769px)" fetchpriority="high"/>"""

if "Preload Critical LCP Hero Image" not in idx:
    idx = re.sub(r'(<meta content="#16361D" name="theme-color"/>)', r'\1\n' + lcp_preload, idx, count=1)

# Defer head scripts
idx = re.sub(r'<script src="([^"]+)"></script>', r'<script defer src="\1"></script>', idx)

# Mobile data-saver video optimization
old_video = """<video autoplay="" class="video-banner-video desktop-only-video" loop="" muted="" playsinline="" poster="./assets/images/home/hero-sigiriya-aerial-1.webp" preload="none" webkit-playsinline="">
<source src="./assets/videos/hero-banner.mp4" type="video/mp4"/>
</video>"""

new_video = """<video class="video-banner-video desktop-only-video" loop="" muted="" playsinline="" poster="./assets/images/home/hero-sigiriya-aerial-1.webp" preload="none" webkit-playsinline="">
<source media="(min-width: 993px)" src="./assets/videos/hero-banner.mp4" type="video/mp4"/>
</video>
<script>
if (window.innerWidth >= 993) {
  var v = document.querySelector('.desktop-only-video');
  if (v) { v.autoplay = true; v.play().catch(function(){}); }
}
</script>"""

if old_video in idx:
    idx = idx.replace(old_video, new_video)
    print("  Optimized index.html hero video for zero mobile data consumption")

# Use optimized header logo
idx = idx.replace('src="./logo.png?v=20261021_step1"', 'src="./assets/images/brand/logo-header.png"')

# Add loading="lazy" and decoding="async" to below-the-fold images in index.html
soup_imgs = re.findall(r'<img([^>]+)>', idx)
for img_attrs in soup_imgs:
    if 'hero-img-bg' in img_attrs or 'header-brand-logo' in img_attrs:
        continue
    new_attrs = img_attrs
    if 'loading=' not in new_attrs:
        new_attrs += ' loading="lazy"'
    if 'decoding=' not in new_attrs:
        new_attrs += ' decoding="async"'
    if new_attrs != img_attrs:
        idx = idx.replace(f'<img{img_attrs}>', f'<img{new_attrs}>')

with open('index.html', 'w', encoding='utf-8', newline='\n') as f:
    f.write(idx)
print("  Saved optimized index.html")

# 4. Apply script defer, lazy loading, and logo optimization to all other HTML pages
print("\n4. Applying script defer and lazy loading across all HTML pages...")
all_html = []
for root, dirs, files in os.walk('.'):
    if 'node_modules' in root or '.git' in root or 'brain' in root or 'admin' in root:
        continue
    for file in files:
        if file.endswith('.html') and file != 'index.html':
            all_html.append(os.path.normpath(os.path.join(root, file)))

for path in all_html:
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read().replace('\r\n', '\n')

    orig_c = c
    # Defer external script tags in head
    c = re.sub(r'<script src="((?!.*(?:translate|maps|recaptcha)).*?)"></script>', r'<script defer src="\1"></script>', c)

    # Add lazy loading and decoding async to images
    imgs = re.findall(r'<img([^>]+)>', c)
    for img_attrs in imgs:
        if 'header-brand-logo' in img_attrs or 'hero-img' in img_attrs or 'banner-img' in img_attrs:
            continue
        new_attrs = img_attrs
        if 'loading=' not in new_attrs:
            new_attrs += ' loading="lazy"'
        if 'decoding=' not in new_attrs:
            new_attrs += ' decoding="async"'
        if new_attrs != img_attrs:
            c = c.replace(f'<img{img_attrs}>', f'<img{new_attrs}>')

    if c != orig_c:
        with open(path, 'w', encoding='utf-8', newline='\n') as f:
            f.write(c)

print(f"  Processed {len(all_html)} additional HTML pages.")
print("\nAll performance optimizations successfully applied.")
