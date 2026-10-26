with open('sitemap.xml', 'r', encoding='utf-8') as f:
    xml = f.read().replace('\r\n', '\n')

LANGS = ["en", "ar", "de", "es", "fr", "hi", "it", "ja", "ru", "zh"]

def build_entry(loc, priority="0.85", freq="weekly"):
    lines = [
        "  <url>",
        f"    <loc>{loc}</loc>",
        "    <lastmod>2026-10-26</lastmod>",
        f"    <changefreq>{freq}</changefreq>",
        f"    <priority>{priority}</priority>"
    ]
    delim = "&amp;" if "?" in loc else "?"
    for l in LANGS:
        lines.append(f'    <xhtml:link rel="alternate" hreflang="{l}" href="{loc}{delim}lang={l}"/>')
    lines.append(f'    <xhtml:link rel="alternate" hreflang="x-default" href="{loc}"/>')
    lines.append("  </url>")
    return "\n".join(lines)

new_entries = [
    build_entry("https://lotusceylon.com/sri-lanka-tours.html", "0.95", "daily"),
    build_entry("https://lotusceylon.com/destinations.html", "0.90", "weekly"),
    build_entry("https://lotusceylon.com/experiences.html", "0.88", "weekly"),
    build_entry("https://lotusceylon.com/reviews.html", "0.85", "weekly"),
    build_entry("https://lotusceylon.com/gallery.html", "0.80", "monthly"),
    build_entry("https://lotusceylon.com/tours/buddhist-heritage/", "0.90", "weekly")
]

added_block = "\n" + "\n".join(new_entries) + "\n</urlset>"

if "</urlset>" in xml:
    xml = xml.replace("</urlset>", added_block)
    with open('sitemap.xml', 'w', encoding='utf-8', newline='\n') as f:
        f.write(xml)
    print("SUCCESS: Added 6 missing core pages to sitemap.xml with full hreflang alternates.")
else:
    print("FAILED: </urlset> not found in sitemap.xml")
