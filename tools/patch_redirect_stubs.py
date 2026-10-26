import os
import re

redirect_files = [
    "adventure-tours.html", "ayurvedic-tours.html", "beach-tours.html", 
    "buddhist-heritage-tours.html", "category.html", "cultural-tours.html", 
    "family-tours.html", "golf-tours.html", "hill-country-tours.html", 
    "honeymoon-tours.html", "ramayana-tours.html", "wildlife-tours.html", 
    "tour-package-detail.html", "tours.html", "tours/detail.html"
]

target_map = {
    "adventure-tours.html": "tours/adventure/",
    "ayurvedic-tours.html": "tours/ayurvedic/",
    "beach-tours.html": "tours/beach/",
    "buddhist-heritage-tours.html": "tours/buddhist-heritage/",
    "category.html": "tours/cultural/",
    "cultural-tours.html": "tours/cultural/",
    "family-tours.html": "tours/family/",
    "golf-tours.html": "tours/golf/",
    "hill-country-tours.html": "tours/hill-country/",
    "honeymoon-tours.html": "tours/honeymoon/",
    "ramayana-tours.html": "tours/ramayana/",
    "wildlife-tours.html": "tours/wildlife/",
    "tour-package-detail.html": "tours/cultural/the-sacred-lotus-triangle/",
    "tours.html": "sri-lanka-tours.html",
    "tours/detail.html": "tours/cultural/the-sacred-lotus-triangle/"
}

updated_count = 0
for file_rel in redirect_files:
    file_path = os.path.normpath(file_rel)
    if not os.path.exists(file_path):
        continue

    with open(file_path, "r", encoding="utf-8") as f:
        c = f.read()

    target_subpath = target_map.get(file_rel, "tours/")
    canonical_url = f"https://lotusceylon.com/{target_subpath}"

    # 1. Ensure robots noindex, follow
    if 'name="robots"' not in c and "name='robots'" not in c:
        c = re.sub(r'(<head[^>]*>)', r'\1\n  <meta name="robots" content="noindex, follow">', c, count=1, flags=re.I)

    # 2. Update canonical to absolute URL
    if '<link rel="canonical"' in c:
        c = re.sub(r'<link\s+rel=["\']canonical["\']\s+href=["\'][^"\']+["\']\s*/?>',
                   f'<link rel="canonical" href="{canonical_url}">', c, count=1)
    else:
        c = re.sub(r'(<head[^>]*>)', r'\1\n  <link rel="canonical" href="' + canonical_url + '">', c, count=1, flags=re.I)

    # 3. Ensure h1 heading exists instead of lone h2
    c = re.sub(r'<h2([^>]*)>Redirecting to Lotus Ceylon</h2>', r'<h1\1>Redirecting to Lotus Ceylon</h1>', c)
    if '<h1' not in c:
        c = re.sub(r'(<body[^>]*>\s*<div[^>]*>)', r'\1\n    <h1 style="color: #7E1442; margin-bottom: 0.5rem; font-size: 1.5rem;">Redirecting to Lotus Ceylon</h1>', c, count=1)

    with open(file_path, "w", encoding="utf-8", newline="\n") as f:
        f.write(c)
    updated_count += 1

print(f"SUCCESS: Patched {updated_count} redirect stub pages with absolute canonicals, robots noindex, and h1 headings.")
