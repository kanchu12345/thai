import os
import re
from urllib.parse import urlparse, unquote

def audit_links_and_anchors():
    html_files = []
    for root, dirs, files in os.walk('.'):
        if '.git' in root or 'node_modules' in root: continue
        for f in files:
            if f.endswith('.html'):
                html_files.append(os.path.normpath(os.path.join(root, f)).replace('\\', '/'))

    # Build map of page -> set of ids
    page_ids = {}
    for h in html_files:
        ids = set()
        try:
            with open(h, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                # Find all id="..."
                for m in re.finditer(r'\bid=["\']([^"\']+)["\']', content, re.IGNORECASE):
                    ids.add(m.group(1))
        except Exception as e:
            pass
        page_ids[h] = ids

    print(f"Mapped IDs for {len(page_ids)} pages.")

    broken_links = []
    broken_anchors = []
    empty_links = []
    basepath_issues = []

    for h in html_files:
        try:
            with open(h, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
        except Exception:
            continue

        # Find all <a> tags
        for m in re.finditer(r'<a\b([^>]*)>(.*?)</a>', content, re.IGNORECASE | re.DOTALL):
            attrs = m.group(1)
            text = m.group(2).strip()
            href_m = re.search(r'\bhref=["\']([^"\']*)["\']', attrs, re.IGNORECASE)
            if not href_m:
                empty_links.append((h, "No href attribute", text[:40]))
                continue

            raw_href = href_m.group(1).strip()
            if not raw_href or raw_href == '#':
                empty_links.append((h, f"Empty or pure '#' link: '{raw_href}'", text[:40]))
                continue

            if raw_href.startswith(('mailto:', 'tel:', 'javascript:', 'data:', 'http://', 'https://', 'weixin:')):
                continue

            # Root-relative path check for /thai/ base-path
            if raw_href.startswith('/') and not raw_href.startswith('/thai/'):
                basepath_issues.append((h, raw_href))

            # Split path and fragment
            parts = raw_href.split('#')
            path_part = parts[0]
            fragment = parts[1] if len(parts) > 1 else None

            # Resolve target page
            if not path_part: # in-page anchor e.g. #itinerary
                target_page = h
            else:
                clean_path = path_part.split('?')[0]
                if clean_path.startswith('/thai/'):
                    target_page = os.path.normpath(clean_path[6:]).replace('\\', '/')
                elif clean_path.startswith('/'):
                    target_page = os.path.normpath(clean_path[1:]).replace('\\', '/')
                else:
                    curr_dir = os.path.dirname(h)
                    target_page = os.path.normpath(os.path.join(curr_dir, clean_path)).replace('\\', '/')

            # Normalize directory index
            candidates = [target_page]
            if os.path.isdir(target_page):
                candidates.append(os.path.normpath(os.path.join(target_page, 'index.html')).replace('\\', '/'))
            if not target_page.endswith('.html'):
                candidates.append(os.path.normpath(target_page + '.html').replace('\\', '/'))
                candidates.append(os.path.normpath(os.path.join(target_page, 'index.html')).replace('\\', '/'))

            resolved_page = None
            for c in candidates:
                if c in page_ids or os.path.exists(c):
                    resolved_page = c
                    break

            if not resolved_page:
                broken_links.append((h, raw_href, target_page))
            elif fragment:
                # Check if fragment ID exists on resolved_page
                known_ids = page_ids.get(resolved_page, set())
                # also check for common standard anchors or dynamic
                if fragment not in known_ids and resolved_page in page_ids:
                    broken_anchors.append((h, raw_href, resolved_page, fragment))

    print(f"\n--- AUDIT RESULTS FOR LINKS & NAVIGATION ---")
    print(f"Empty/Placeholder '#' links: {len(empty_links)}")
    print(f"Broken internal links: {len(broken_links)}")
    print(f"Broken in-page anchors (#target not found): {len(broken_anchors)}")
    print(f"Base-path issues (starts with '/' without '/thai/'): {len(basepath_issues)}")

    with open('tools/audit_links_results.json', 'w', encoding='utf-8') as f:
        import json
        json.dump({
            "empty_links": empty_links[:50],
            "broken_links": broken_links,
            "broken_anchors": broken_anchors[:50],
            "basepath_issues": basepath_issues[:50]
        }, f, indent=2)

    print("Detailed results written to tools/audit_links_results.json")

if __name__ == "__main__":
    audit_links_and_anchors()
