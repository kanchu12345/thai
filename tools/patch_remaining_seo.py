import os
import re

# 1. Patch tours/buddhist-heritage/index.html
bh_path = os.path.normpath("tours/buddhist-heritage/index.html")
with open(bh_path, "r", encoding="utf-8") as f:
    c = f.read()

bh_meta = """  <link rel="canonical" href="https://lotusceylon.com/tours/buddhist-heritage/">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Lotus Ceylon International Tours">
  <meta property="og:title" content="Buddhist Heritage & Sacred Pilgrimages | Lotus Ceylon">
  <meta property="og:description" content="Embark on transformative Buddhist pilgrimage journeys across Sri Lanka. Visit the sacred Jaya Sri Maha Bodhi, Ruwanwelisaya, Mihintale, and the Temple of the Tooth.">
  <meta property="og:url" content="https://lotusceylon.com/tours/buddhist-heritage/">
  <meta property="og:image" content="https://lotusceylon.com/assets/images/cultural/kandy-tooth-1.webp">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Buddhist Heritage & Sacred Pilgrimages | Lotus Ceylon">
  <meta name="twitter:description" content="Embark on transformative Buddhist pilgrimage journeys across Sri Lanka. Visit the sacred Jaya Sri Maha Bodhi, Ruwanwelisaya, Mihintale, and the Temple of the Tooth.">
  <meta name="twitter:image" content="https://lotusceylon.com/assets/images/cultural/kandy-tooth-1.webp">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Buddhist Heritage & Sacred Pilgrimages",
    "url": "https://lotusceylon.com/tours/buddhist-heritage/",
    "description": "Sacred Buddhist pilgrimage itineraries connecting Anuradhapura, Polonnaruwa, Dambulla, Mihintale, and Kandy.",
    "provider": {
      "@type": "TravelAgency",
      "name": "Lotus Ceylon International Tours & Services",
      "url": "https://lotusceylon.com/"
    }
  }
  </script>"""

if 'rel="canonical"' not in c:
    c = re.sub(r'(<meta\s+name=["\']description["\'][^>]*>)', r'\1\n' + bh_meta, c, count=1)
    # Add skip link
    if 'skip-to-content-link' not in c:
        c = re.sub(r'(<body[^>]*>)', r'\1\n  <a class="skip-to-content-link" href="#siteHeader">Skip to main content</a>', c, count=1)
    with open(bh_path, "w", encoding="utf-8", newline="\n") as f:
        f.write(c)
    print("SUCCESS: Patched tours/buddhist-heritage/index.html")

# 2. Patch 404.html
with open("404.html", "r", encoding="utf-8") as f:
    c_404 = f.read()

if 'name="robots"' not in c_404:
    c_404 = re.sub(r'(<head[^>]*>)', r'\1\n  <meta name="robots" content="noindex, follow">\n  <meta name="description" content="The page you requested could not be found on Lotus Ceylon. Return to our homepage to explore Sri Lanka tours and sacred journeys.">', c_404, count=1)
    with open("404.html", "w", encoding="utf-8", newline="\n") as f:
        f.write(c_404)
    print("SUCCESS: Patched 404.html with noindex and meta description")

# 3. Add meta descriptions to the 15 redirect files
redirect_files = [
    "adventure-tours.html", "ayurvedic-tours.html", "beach-tours.html", 
    "buddhist-heritage-tours.html", "category.html", "cultural-tours.html", 
    "family-tours.html", "golf-tours.html", "hill-country-tours.html", 
    "honeymoon-tours.html", "ramayana-tours.html", "wildlife-tours.html", 
    "tour-package-detail.html", "tours.html", "tours/detail.html"
]

for rf in redirect_files:
    rf_path = os.path.normpath(rf)
    if not os.path.exists(rf_path):
        continue
    with open(rf_path, "r", encoding="utf-8") as f:
        rc = f.read()
    if 'name="description"' not in rc and "name='description'" not in rc:
        name_clean = rf.replace("-tours.html", "").replace(".html", "").replace("tours/", "").replace("-", " ").title()
        desc_tag = f'  <meta name="description" content="Redirecting to {name_clean} on Lotus Ceylon. Explore curated private luxury holidays in Sri Lanka.">'
        rc = re.sub(r'(<head[^>]*>)', r'\1\n' + desc_tag, rc, count=1)
        with open(rf_path, "w", encoding="utf-8", newline="\n") as f:
            f.write(rc)

print("SUCCESS: Added meta descriptions across all redirect files.")
