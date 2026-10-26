import os
import re
import glob
from bs4 import BeautifulSoup

ROOT_DIR = os.getcwd()
html_files = glob.glob(os.path.join(ROOT_DIR, '**/*.html'), recursive=True)
# Exclude node_modules or .git if any
html_files = [f for f in html_files if '.git' not in f and 'node_modules' not in f]

print(f"Total HTML files to inspect: {len(html_files)}")

# 1. Check duplicate IDs in each HTML file
duplicate_ids_found = {}
for hf in html_files:
    rel_path = os.path.relpath(hf, ROOT_DIR)
    with open(hf, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    # Use regex to find id="..."
    ids = re.findall(r'\bid=["\']([^"\']+)["\']', content)
    seen = set()
    dupes = set()
    for i in ids:
        if i in seen:
            dupes.add(i)
        seen.add(i)
    if dupes:
        duplicate_ids_found[rel_path] = list(dupes)

print(f"\nFiles with duplicate IDs: {len(duplicate_ids_found)}")
for f, d in duplicate_ids_found.items():
    print(f"  {f}: {d}")

# 2. Check broken local script and stylesheet imports
broken_assets = {}
for hf in html_files:
    rel_path = os.path.relpath(hf, ROOT_DIR)
    dir_name = os.path.dirname(hf)
    with open(hf, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    # Find src="..." and href="..."
    refs = re.findall(r'(?:src|href)=["\']([^"\']+)["\']', content)
    missing = []
    for ref in refs:
        # ignore external, hash, mailto, tel, javascript, data
        if ref.startswith(('http://', 'https://', '//', '#', 'mailto:', 'tel:', 'javascript:', 'data:')):
            continue
        # strip query and fragment
        clean_ref = ref.split('?')[0].split('#')[0]
        if not clean_ref:
            continue
        
        # Check relative to file dir or root if starts with /
        if clean_ref.startswith('/'):
            # Note: in this repo root or /thai/
            target = os.path.normpath(os.path.join(ROOT_DIR, clean_ref.lstrip('/')))
        else:
            target = os.path.normpath(os.path.join(dir_name, clean_ref))
        
        if not os.path.exists(target) and not os.path.isdir(target):
            # Also check if it's an html without extension or index.html in subfolder
            if os.path.exists(target + '.html') or os.path.exists(os.path.join(target, 'index.html')):
                continue
            missing.append((ref, clean_ref))

    if missing:
        broken_assets[rel_path] = missing

print(f"\nFiles with potentially broken local asset/link references: {len(broken_assets)}")
for f, m in list(broken_assets.items())[:15]:
    print(f"  {f}: {m[:3]}")

# 3. Check JavaScript files for potential null DOM references or errors
js_files = glob.glob(os.path.join(ROOT_DIR, '**/*.js'), recursive=True)
js_files = [f for f in js_files if '.git' not in f and 'node_modules' not in f and 'vendor' not in f]
print(f"\nTotal custom JS files to inspect: {len(js_files)}")
for jf in js_files:
    rel_path = os.path.relpath(jf, ROOT_DIR)
    with open(jf, 'r', encoding='utf-8', errors='ignore') as f:
        js_code = f.read()
    # Check for hardcoded dead endpoints or missing configs
    if "api.lotusceylon.com" in js_code:
        print(f"  [CRITICAL ENDPOINT] {rel_path} references api.lotusceylon.com")
    if "super_admin" in js_code and "Fallback" in js_code:
        print(f"  [PRIVILEGE ESCALATION] {rel_path} has fallback super_admin assignment")
