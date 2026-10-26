import os
import re
from bs4 import BeautifulSoup
from urllib.parse import urlparse

ROOT_DIR = "."
PROD_DOMAIN = "https://lotusceylon.com"

html_files = []
for root, dirs, files in os.walk(ROOT_DIR):
    if "node_modules" in root or ".git" in root or "brain" in root:
        continue
    for file in files:
        if file.endswith(".html"):
            html_files.append(os.path.normpath(os.path.join(root, file)))

print(f"Total HTML files found: {len(html_files)}")

audit_results = {
    "missing_title": [],
    "short_title": [],
    "missing_desc": [],
    "short_desc": [],
    "heading_issues": [],
    "missing_canonical": [],
    "relative_canonical": [],
    "github_io_canonical": [],
    "missing_og": [],
    "missing_twitter": [],
    "missing_jsonld": [],
    "missing_lang": [],
    "images_without_alt": [],
    "buttons_without_accessible_name": [],
    "inputs_without_label": [],
    "broken_internal_links": [],
    "content_quality_issues": []
}

titles_seen = {}

for path in html_files:
    # Skip admin panel from public SEO requirements
    is_admin = "admin" in path
    
    with open(path, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    soup = BeautifulSoup(content, "html.parser")

    # 1. HTML lang attribute
    html_tag = soup.find("html")
    if not html_tag or not html_tag.get("lang"):
        audit_results["missing_lang"].append(path)

    # If admin, skip SEO specific audits
    if is_admin:
        continue

    # 2. Title
    title_tag = soup.find("title")
    if not title_tag or not title_tag.string or not title_tag.string.strip():
        audit_results["missing_title"].append(path)
    else:
        title_text = title_tag.string.strip()
        if len(title_text) < 15:
            audit_results["short_title"].append((path, title_text))
        if title_text in titles_seen:
            titles_seen[title_text].append(path)
        else:
            titles_seen[title_text] = [path]

    # 3. Meta Description
    desc_tag = soup.find("meta", attrs={"name": re.compile(r"^description$", re.I)})
    if not desc_tag or not desc_tag.get("content") or not desc_tag.get("content").strip():
        audit_results["missing_desc"].append(path)
    else:
        desc_text = desc_tag.get("content").strip()
        if len(desc_text) < 50:
            audit_results["short_desc"].append((path, desc_text))

    # 4. Heading Hierarchy
    h1_tags = soup.find_all("h1")
    if len(h1_tags) == 0:
        audit_results["heading_issues"].append((path, "No <h1> found"))
    elif len(h1_tags) > 1:
        # Check if secondary h1 is in hidden template or off-canvas
        audit_results["heading_issues"].append((path, f"Multiple <h1> found ({len(h1_tags)})"))

    # 5. Canonical
    canonical_tag = soup.find("link", attrs={"rel": "canonical"})
    if not canonical_tag or not canonical_tag.get("href"):
        audit_results["missing_canonical"].append(path)
    else:
        href = canonical_tag.get("href").strip()
        if href.startswith("http://") or href.startswith("https://"):
            if "kanchu12345.github.io" in href:
                audit_results["github_io_canonical"].append((path, href))
        else:
            audit_results["relative_canonical"].append((path, href))

    # 6. Open Graph
    og_title = soup.find("meta", property="og:title")
    og_desc = soup.find("meta", property="og:description")
    og_image = soup.find("meta", property="og:image")
    if not (og_title and og_desc and og_image):
        audit_results["missing_og"].append(path)

    # 7. Twitter
    tw_card = soup.find("meta", attrs={"name": "twitter:card"})
    if not tw_card:
        audit_results["missing_twitter"].append(path)

    # 8. Structured Data JSON-LD
    json_ld = soup.find("script", type="application/ld+json")
    if not json_ld:
        audit_results["missing_jsonld"].append(path)

    # 9. Images alt text
    imgs = soup.find_all("img")
    missing_alt_count = 0
    for img in imgs:
        if not img.has_attr("alt"):
            missing_alt_count += 1
    if missing_alt_count > 0:
        audit_results["images_without_alt"].append((path, missing_alt_count))

    # 10. Form Controls without label
    inputs = soup.find_all(["input", "select", "textarea"])
    unlabeled = 0
    for inp in inputs:
        inp_type = inp.get("type", "").lower()
        if inp_type in ["hidden", "submit", "button", "reset"]:
            continue
        inp_id = inp.get("id")
        has_label = False
        if inp_id and soup.find("label", attrs={"for": inp_id}):
            has_label = True
        elif inp.find_parent("label"):
            has_label = True
        elif inp.get("aria-label") or inp.get("aria-labelledby") or inp.get("title"):
            has_label = True
        if not has_label:
            unlabeled += 1
    if unlabeled > 0:
        audit_results["inputs_without_label"].append((path, unlabeled))

    # 11. Buttons without accessible names
    buttons = soup.find_all("button")
    unnamed_btn = 0
    for btn in buttons:
        text = btn.get_text(strip=True)
        if not text and not btn.get("aria-label") and not btn.get("title"):
            unnamed_btn += 1
    if unnamed_btn > 0:
        audit_results["buttons_without_accessible_name"].append((path, unnamed_btn))

    # 12. Broken Internal Links
    links = soup.find_all("a", href=True)
    for a in links:
        href = a["href"].strip()
        if href.startswith("#") or href.startswith("mailto:") or href.startswith("tel:") or href.startswith("javascript:") or href.startswith("whatsapp:") or href.startswith("weixin:") or href.startswith("http"):
            continue
        # Clean query strings and anchors
        clean_href = href.split("?")[0].split("#")[0]
        if not clean_href:
            continue
        # Resolve target path relative to current file
        file_dir = os.path.dirname(path)
        target_path = os.path.normpath(os.path.join(file_dir, clean_href))
        # If directory, check for index.html
        if os.path.isdir(target_path):
            target_path = os.path.join(target_path, "index.html")
        elif not os.path.splitext(target_path)[1]:
            # Maybe a directory without trailing slash
            if os.path.isdir(target_path):
                target_path = os.path.join(target_path, "index.html")
            elif os.path.exists(target_path + ".html"):
                target_path = target_path + ".html"

        if not os.path.exists(target_path):
            audit_results["broken_internal_links"].append((path, href, target_path))

    # 13. Content quality (placeholders, lorem ipsum, unfinished text)
    low_content = content.lower()
    for pattern in ["lorem ipsum", "todo:", "placeholder", "tbd", "xxx", "sample text"]:
        if pattern in low_content and "admin" not in path:
            audit_results["content_quality_issues"].append((path, pattern))

print("\n=== AUDIT SUMMARY ===")
for k, v in audit_results.items():
    print(f"{k}: {len(v)}")

# Print duplicate titles
duplicate_titles = {t: paths for t, paths in titles_seen.items() if len(paths) > 1}
print(f"\nDuplicate titles: {len(duplicate_titles)}")
for t, paths in list(duplicate_titles.items())[:5]:
    print(f"  Title '{t}' on {len(paths)} pages: {paths[:2]}")

if audit_results["broken_internal_links"]:
    print(f"\nBroken Internal Links Sample ({len(audit_results['broken_internal_links'])} total):")
    for src, href, tgt in audit_results["broken_internal_links"][:10]:
        print(f"  {src} -> '{href}' (Target not found: {tgt})")

if audit_results["missing_canonical"]:
    print(f"\nMissing Canonical Sample ({len(audit_results['missing_canonical'])} total):")
    for p in audit_results["missing_canonical"][:10]:
        print(f"  {p}")

if audit_results["relative_canonical"]:
    print(f"\nRelative Canonical Sample ({len(audit_results['relative_canonical'])} total):")
    for p, h in audit_results["relative_canonical"][:10]:
        print(f"  {p} -> {h}")

if audit_results["heading_issues"]:
    print(f"\nHeading Issues Sample ({len(audit_results['heading_issues'])} total):")
    for p, issue in audit_results["heading_issues"][:10]:
        print(f"  {p}: {issue}")
