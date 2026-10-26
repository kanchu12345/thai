import os
import glob
import re

# Hotlink mappings to local WebP assets
HOTLINK_MAP = {
    # Walkers Tours hotlinks
    "https://walkerstours.eme-devops.com/2025/09/Culture-04-scaled.jpg?w=800&h=600&fit=crop&crop=center&auto=format,compress,enhance&q=85": "assets/images/cultural/sigiriya-1.webp",
    "https://walkerstours.eme-devops.com/2025/09/Sigiriya-01.jpg?w=800&h=600&fit=crop&crop=center&auto=format,compress,enhance&q=85": "assets/images/cultural/sigiriya-1.webp",
    "https://walkerstours.eme-devops.com/2025/09/Kandy-2.jpg?w=800&h=600&fit=crop&crop=center&auto=format,compress,enhance&q=85": "assets/images/cultural/kandy-temple-of-tooth-4.webp",

    # Unsplash image IDs to topic-specific WebP images
    "photo-1500648767791-00dcc994a43e": "assets/images/about/hospitality-scenes-1.webp",
    "photo-1507003211169-0a1dd7228f2d": "assets/images/about/hospitality-scenes-1.webp",
    "photo-1586861635167-e5223aadc9fe": "assets/images/about/hospitality-scenes-1.webp",
    "photo-1544735716-392fe2489ffa": "assets/images/contact/colombo-negombo-lagoon-1.webp",
    "photo-1546708973-b339540b5162": "assets/images/cultural/galle-fort-5.webp",
    "photo-1588598198321-9735fd52455b": "assets/images/cultural/sigiriya-1.webp",
    "photo-1507525428034-b723cf961d3e": "assets/images/beach/mirissa-1.webp",
    "photo-1512343879784-a960bf40e7f2": "assets/images/beach/unawatuna-2.webp",
    "photo-1510414842594-a61c69b5ae57": "assets/images/beach/bentota-3.webp",
    "photo-1534567153574-2b12153a87f0": "assets/images/wildlife/yala-leopard-1.webp",
    "photo-1535131749006-b7f58c99034b": "assets/images/wildlife/minneriya-elephant-gathering-2.webp",
    "photo-1502086223501-7ea6ecd79368": "assets/images/hill-country/nuwara-eliya-tea-2.webp",
    "photo-1540555700478-4be289fbecef": "assets/images/ayurveda/herbal-treatment-1.webp",
    "photo-1578328819058-b69f3a3b0f6b": "assets/images/honeymoon/seaside-villa-1.webp",
    "photo-1518531933037-91b2f5f229cc": "assets/images/family/kosgoda-turtle-hatchery-1.webp",
    "photo-1544717305-2782549b5136": "assets/images/family/scenic-train-ride-2.webp",
    "photo-1600100397608-f010e423b971": "assets/images/adventure/kitulgala-rafting-1.webp",
    "photo-1506744038136-46273834b3fb": "assets/images/adventure/adams-peak-2.webp",
    "photo-1578632767115-351597cf2477": "assets/images/home/hero-sigiriya-aerial-1.webp",
    "photo-1557050543-4d5f4e07ef46": "assets/images/buddhist-heritage/ruwanwelisaya-2.webp",
}

def get_rel_prefix(filepath):
    normalized = filepath.replace("\\", "/")
    depth = normalized.count("/")
    return "../" * depth if depth > 0 else "./"

def get_active_tab(filepath):
    path = filepath.replace("\\", "/").lower()
    if "index.html" in path and "/" not in path:
        return "home"
    if "tour" in path:
        return "tours"
    if "destination" in path:
        return "destinations"
    if "experience" in path:
        return "experiences"
    if "about" in path:
        return "about"
    if "gallery" in path:
        return "gallery"
    if "review" in path:
        return "reviews"
    if "blog" in path:
        return "blog"
    if "contact" in path:
        return "contact"
    return "home"

def make_redirect_page(canonical_url, page_title):
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0; url={canonical_url}">
  <link rel="canonical" href="{canonical_url}">
  <title>Redirecting to {page_title} | Lotus Ceylon</title>
  <script>window.location.replace("{canonical_url}");</script>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #FBF7F0; color: #1C1B1F;">
  <div style="text-align: center; padding: 2rem;">
    <h2 style="color: #7E1442; margin-bottom: 0.5rem;">Redirecting to Lotus Ceylon</h2>
    <p>Please wait, redirecting to <a href="{canonical_url}" style="color: #D9822B; font-weight: 700;">{page_title}</a>...</p>
  </div>
</body>
</html>'''

REDIRECTS = {
    "tours.html": ("sri-lanka-tours.html", "Sri Lanka Tour Packages"),
    "beach-tours.html": ("tours/beach/", "Pristine Beaches of Ceylon"),
    "cultural-tours.html": ("tours/cultural/", "Living Cultural Heritage"),
    "wildlife-tours.html": ("tours/wildlife/", "Untamed Biosphere Wildlife"),
    "hill-country-tours.html": ("tours/hill-country/", "Highlands & Tea Country"),
    "ayurvedic-tours.html": ("tours/ayurvedic/", "Ayurvedic Healing & Wellness"),
    "honeymoon-tours.html": ("tours/honeymoon/", "Honeymoon Sanctuaries"),
    "family-tours.html": ("tours/family/", "Family Discovery Journeys"),
    "adventure-tours.html": ("tours/adventure/", "Active Island Adventure"),
    "ramayana-tours.html": ("tours/ramayana/", "Sacred Ramayana Heritage"),
    "golf-tours.html": ("tours/golf/", "Championship Fairways & Links"),
    "tour-package-detail.html": ("tours/cultural/the-sacred-lotus-triangle/", "The Sacred Lotus Triangle"),
    "tours/detail.html": ("cultural/the-sacred-lotus-triangle/", "The Sacred Lotus Triangle"),
    "category.html": ("tours/cultural/", "Living Cultural Heritage"),
}

def replace_hotlinks_in_content(content, rel_prefix):
    # Walkers Tours exact URLs
    for hotlink, local_webp in HOTLINK_MAP.items():
        if hotlink.startswith("http"):
            content = content.replace(hotlink, rel_prefix + local_webp)
    
    # Unsplash photo patterns
    for photo_id, local_webp in HOTLINK_MAP.items():
        if not photo_id.startswith("http"):
            # Match any unsplash url containing this photo id
            pattern = rf'https://images\.unsplash\.com/[^"\'\s)]*{re.escape(photo_id)}[^"\'\s)]*'
            content = re.sub(pattern, rel_prefix + local_webp, content)
            
    return content

print("Setup helper functions complete.")
