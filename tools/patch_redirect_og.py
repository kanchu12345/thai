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

for rf in redirect_files:
    rf_path = os.path.normpath(rf)
    if not os.path.exists(rf_path):
        continue
    with open(rf_path, "r", encoding="utf-8") as f:
        c = f.read()

    target_sub = target_map.get(rf, "tours/")
    canon = f"https://lotusceylon.com/{target_sub}"
    name_clean = rf.replace("-tours.html", "").replace(".html", "").replace("tours/", "").replace("-", " ").title()

    og_block = f"""  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Lotus Ceylon International Tours">
  <meta property="og:title" content="Redirecting to {name_clean} | Lotus Ceylon">
  <meta property="og:description" content="Explore {name_clean} on Lotus Ceylon. Private tailor-made luxury tours in Sri Lanka.">
  <meta property="og:url" content="{canon}">
  <meta property="og:image" content="https://lotusceylon.com/assets/images/hero/sigiriya-rock-fortress-1.webp">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="Redirecting to {name_clean} | Lotus Ceylon">
  <meta name="twitter:description" content="Explore {name_clean} on Lotus Ceylon.">"""

    if 'property="og:title"' not in c:
        c = re.sub(r'(<link\s+rel=["\']canonical["\'][^>]*>)', r'\1\n' + og_block, c)
        with open(rf_path, "w", encoding="utf-8", newline="\n") as f:
            f.write(c)

print("SUCCESS: Added Open Graph and Twitter metadata to all redirect stub files.")
