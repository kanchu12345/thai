import os
import xml.etree.ElementTree as ET

tree = ET.parse("sitemap.xml")
root = tree.getroot()
namespace = {"ns": "http://www.sitemaps.org/schemas/sitemap/0.9"}
sitemap_urls = set(url.find("ns:loc", namespace).text.strip() for url in root.findall("ns:url", namespace))

# Find public HTML files
missing_from_sitemap = []
for root_dir, dirs, files in os.walk("."):
    if "node_modules" in root_dir or ".git" in root_dir or "brain" in root_dir or "admin" in root_dir:
        continue
    for file in files:
        if file.endswith(".html"):
            p = os.path.normpath(os.path.join(root_dir, file)).replace("\\", "/")
            if p.startswith("./"):
                p = p[2:]
            # Skip redirect stubs
            if p in ["adventure-tours.html", "ayurvedic-tours.html", "beach-tours.html", "buddhist-heritage-tours.html",
                     "category.html", "cultural-tours.html", "family-tours.html", "golf-tours.html", "hill-country-tours.html",
                     "honeymoon-tours.html", "ramayana-tours.html", "wildlife-tours.html", "tour-package-detail.html",
                     "tours.html", "tours/detail.html", "404.html"]:
                continue
            
            # Map file to url
            if p == "index.html":
                url = "https://lotusceylon.com/"
            elif p.endswith("/index.html"):
                url = "https://lotusceylon.com/" + p[:-len("index.html")]
            else:
                url = "https://lotusceylon.com/" + p

            if url not in sitemap_urls:
                missing_from_sitemap.append((p, url))

print(f"Missing from sitemap.xml: {len(missing_from_sitemap)}")
for p, u in missing_from_sitemap:
    print(f"  {p} -> {u}")
