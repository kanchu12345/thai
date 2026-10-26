import os
import xml.etree.ElementTree as ET

tree = ET.parse("sitemap.xml")
root = tree.getroot()

namespace = {"ns": "http://www.sitemaps.org/schemas/sitemap/0.9"}
sitemap_urls = []
for url_tag in root.findall("ns:url", namespace):
    loc = url_tag.find("ns:loc", namespace)
    if loc is not None and loc.text:
        sitemap_urls.append(loc.text.strip())

print(f"Total URLs in sitemap.xml: {len(sitemap_urls)}")

# Verify if all URLs map to real files
broken_in_sitemap = []
for url in sitemap_urls:
    path_part = url.replace("https://lotusceylon.com/", "")
    if path_part == "" or path_part == "/":
        local_path = "index.html"
    elif path_part.endswith("/"):
        local_path = os.path.join(path_part[:-1], "index.html")
    else:
        local_path = path_part
    local_path = os.path.normpath(local_path)
    if not os.path.exists(local_path):
        broken_in_sitemap.append((url, local_path))

print(f"Broken URLs in sitemap.xml: {len(broken_in_sitemap)}")
for u, p in broken_in_sitemap[:10]:
    print(f"  {u} -> File does not exist: {p}")
