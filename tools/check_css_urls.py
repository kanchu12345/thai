import os
import re

css_files = []
for root, dirs, files in os.walk('.'):
    if '.git' in root: continue
    for f in files:
        if f.endswith('.css'):
            css_files.append(os.path.normpath(os.path.join(root, f)).replace('\\', '/'))

missing_css_assets = []
for c in css_files:
    with open(c, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    # find all url(...)
    matches = re.finditer(r'url\s*\(\s*[\'"]?([^\'")]+)[\'"]?\s*\)', content, re.IGNORECASE)
    for m in matches:
        val = m.group(1).strip()
        if val.startswith(('http://', 'https://', 'data:')): continue
        clean_val = val.split('?')[0].split('#')[0]
        # target relative to the css file
        target = os.path.normpath(os.path.join(os.path.dirname(c), clean_val)).replace('\\', '/')
        if not os.path.exists(target):
            missing_css_assets.append((c, val, target))

print(f"Total CSS url() references checked across {len(css_files)} files.")
print(f"Missing assets from CSS files: {len(missing_css_assets)}")
for c, val, t in missing_css_assets:
    print(f"  In {c}: url('{val}') -> target '{t}' NOT FOUND")
