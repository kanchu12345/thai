import os
import re

tour_files = []
for root, dirs, files in os.walk("tours"):
    for file in files:
        if file.endswith(".html"):
            tour_files.append(os.path.normpath(os.path.join(root, file)))

tour_files.append("sri-lanka-tours.html")
print(f"Total tour files to patch: {len(tour_files)}")

patched_count = 0
for path in tour_files:
    with open(path, "r", encoding="utf-8") as f:
        c = f.read()

    # Replace kanchu12345.github.io/thai with lotusceylon.com
    old_c = c
    c = c.replace("https://kanchu12345.github.io/thai/", "https://lotusceylon.com/")
    c = c.replace("http://kanchu12345.github.io/thai/", "https://lotusceylon.com/")

    # Also clean up canonicals ending in /index.html to have directory trailing slash /
    # e.g. <link rel="canonical" href="https://lotusceylon.com/tours/.../index.html"> -> .../
    c = re.sub(r'(<link\s+rel=["\']canonical["\']\s+href=["\']https://lotusceylon\.com/[^"\']*)index\.html(["\'])',
               r'\1\2', c)
    c = re.sub(r'(<meta\s+property=["\']og:url["\']\s+content=["\']https://lotusceylon\.com/[^"\']*)index\.html(["\'])',
               r'\1\2', c)

    # In JSON-LD schema, update provider url and address
    c = c.replace('"url": "https://lotusceylon.com/index.html"', '"url": "https://lotusceylon.com/"')
    c = c.replace('"addressLocality": "Colombo"', '"addressLocality": "Ja-Ela"')

    if c != old_c:
        with open(path, "w", encoding="utf-8", newline="\n") as f:
            f.write(c)
        patched_count += 1

print(f"SUCCESS: Patched {patched_count} tour files with production lotusceylon.com canonicals, OG tags, and schema.")
