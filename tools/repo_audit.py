import os
import re
import json
from urllib.parse import urlparse

def run_static_audit():
    print("=== STARTING REPOSITORY-WIDE STATIC AUDIT ===")
    
    # 1. Collect all HTML files
    html_files = []
    for root, dirs, files in os.walk('.'):
        if '.git' in root or 'node_modules' in root:
            continue
        for f in files:
            if f.endswith('.html'):
                html_files.append(os.path.normpath(os.path.join(root, f)))
    print(f"Total HTML files: {len(html_files)}")

    # 2. Collect all CSS and JS files
    css_files = []
    js_files = []
    for root, dirs, files in os.walk('.'):
        if '.git' in root: continue
        for f in files:
            p = os.path.normpath(os.path.join(root, f))
            if f.endswith('.css'): css_files.append(p)
            elif f.endswith('.js'): js_files.append(p)
    print(f"Total CSS files: {len(css_files)}")
    print(f"Total JS files: {len(js_files)}")

    # 3. Audit Canonical, SEO, base paths in HTML
    findings = []
    broken_links = []
    missing_assets = []
    form_findings = []
    security_findings = []
    
    for h in html_files:
        with open(h, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()

        # Check title
        title_m = re.search(r'<title>(.*?)</title>', content, re.IGNORECASE | re.DOTALL)
        if not title_m or not title_m.group(1).strip():
            findings.append({
                "id": "SEO-NO-TITLE",
                "severity": "Medium",
                "file": h,
                "detail": "Missing or empty <title> tag"
            })

        # Check description
        desc_m = re.search(r'<meta[^>]*name=["\']description["\'][^>]*content=["\'](.*?)["\']', content, re.IGNORECASE)
        if not desc_m or not desc_m.group(1).strip():
            findings.append({
                "id": "SEO-NO-DESC",
                "severity": "Low",
                "file": h,
                "detail": "Missing or empty meta description"
            })

        # Check canonical
        canon_m = re.search(r'<link[^>]*rel=["\']canonical["\'][^>]*href=["\'](.*?)["\']', content, re.IGNORECASE)
        if canon_m:
            canon_url = canon_m.group(1)
            # check domain vs kanchu12345.github.io/thai/
            if "lotusceylon.com" in canon_url:
                findings.append({
                    "id": "SEO-CANONICAL-DOMAIN",
                    "severity": "High",
                    "file": h,
                    "detail": f"Canonical points to '{canon_url}' but live site is 'https://kanchu12345.github.io/thai/' without CNAME"
                })
        else:
            if not h.startswith("admin"):
                findings.append({
                    "id": "SEO-NO-CANONICAL",
                    "severity": "Medium",
                    "file": h,
                    "detail": "Missing rel='canonical' tag"
                })

        # Check viewport
        vp_m = re.search(r'<meta[^>]*name=["\']viewport["\']', content, re.IGNORECASE)
        if not vp_m:
            findings.append({
                "id": "RESP-NO-VIEWPORT",
                "severity": "Critical",
                "file": h,
                "detail": "Missing viewport meta tag"
            })

        # Check for unescaped absolute paths starting with / instead of ./ or relative or /thai/
        # Check href and src
        for attr, tag in [("href", "a"), ("href", "link"), ("src", "script"), ("src", "img"), ("src", "source")]:
            matches = re.finditer(r'<' + tag + r'[^>]*\s+' + attr + r'=["\']([^"\']+)["\']', content, re.IGNORECASE)
            for m in matches:
                val = m.group(1).strip()
                if not val or val.startswith(('#', 'mailto:', 'tel:', 'javascript:', 'data:', 'http://', 'https://')):
                    continue
                # If root-relative e.g. /assets/... on GitHub pages /thai/
                if val.startswith('/') and not val.startswith('/thai/'):
                    findings.append({
                        "id": "ROUTING-BASE-PATH",
                        "severity": "Critical",
                        "file": h,
                        "detail": f"Root-relative path '{val}' will 404 on GitHub Pages ('/thai/') subdirectory unless base tag or domain is set"
                    })
                
                # Check if local file exists
                # Clean query strings and hashes
                clean_val = val.split('?')[0].split('#')[0]
                if clean_val.startswith('/thai/'):
                    rel_path = clean_val[6:] # remove /thai/
                    target_file = os.path.normpath(os.path.join('.', rel_path))
                elif clean_val.startswith('/'):
                    target_file = os.path.normpath(os.path.join('.', clean_val[1:]))
                else:
                    target_file = os.path.normpath(os.path.join(os.path.dirname(h), clean_val))

                # Check existence
                if target_file and not os.path.exists(target_file) and not os.path.exists(os.path.join(target_file, 'index.html')):
                    # If target has no extension, maybe it's directory
                    if not (os.path.isdir(target_file) and os.path.exists(os.path.join(target_file, 'index.html'))):
                        if tag == 'a':
                            broken_links.append((h, val, target_file))
                        else:
                            missing_assets.append((h, tag, val, target_file))

        # Check forms
        forms = re.finditer(r'<form([^>]*)>([\s\S]*?)</form>', content, re.IGNORECASE)
        for fm in forms:
            form_attrs = fm.group(1)
            action_m = re.search(r'action=["\']([^"\']*)["\']', form_attrs, re.IGNORECASE)
            method_m = re.search(r'method=["\']([^"\']*)["\']', form_attrs, re.IGNORECASE)
            id_m = re.search(r'id=["\']([^"\']*)["\']', form_attrs, re.IGNORECASE)
            form_id = id_m.group(1) if id_m else "unnamed"
            action = action_m.group(1) if action_m else ""
            method = method_m.group(1) if method_m else "GET"
            form_findings.append({
                "file": h,
                "id": form_id,
                "action": action,
                "method": method
            })

    print(f"Total Canonical/Base path findings: {len(findings)}")
    print(f"Total Broken internal links found: {len(broken_links)}")
    print(f"Total Missing asset references found: {len(missing_assets)}")
    print(f"Total Forms identified: {len(form_findings)}")

    with open('tools/audit_static_summary.json', 'w', encoding='utf-8') as out:
        json.dump({
            "findings": findings[:100],
            "broken_links": broken_links[:100],
            "missing_assets": missing_assets[:100],
            "forms": form_findings
        }, out, indent=2)

    print("Wrote summary to tools/audit_static_summary.json")

run_static_audit()
