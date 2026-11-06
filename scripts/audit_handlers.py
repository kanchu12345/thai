import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('admin/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

with open('admin/js/admin-app.js', 'r', encoding='utf-8') as f:
    app_js = f.read()

with open('admin/js/page-editor.js', 'r', encoding='utf-8') as f:
    pe_js = f.read()

print("=== 1. SCANNING FOR CORRUPTED CHARACTERS & '??' ===")
corrupt_lines = []
for i, line in enumerate(html.splitlines()):
    if '\ufffd' in line or '??' in line or '?' in line:
        # Check if intentional (like regex or ternary or URL query)
        stripped = line.strip()
        if '<h3>??' in stripped or 'onclick="AdminApp.closeBlogModal()">?' in stripped or '\ufffd' in stripped:
            print(f"Line {i+1}: {stripped}")
            corrupt_lines.append((i+1, stripped))

print("\n=== 2. SCANNING ONCLICK HANDLERS IN ADMIN/INDEX.HTML ===")
onclicks = re.findall(r'onclick="([^"]+)"', html)
print(f"Total onclick handlers: {len(onclicks)}")
missing_handlers = []
for oc in set(onclicks):
    # E.g. AdminApp.switchSection('dashboard') or PageEditor.openPage(...)
    # Extract object and method
    m = re.match(r'^(AdminApp|PageEditor)\.([a-zA-Z0-9_$]+)\(', oc)
    if m:
        obj, func = m.group(1), m.group(2)
        js_to_check = app_js if obj == 'AdminApp' else pe_js
        # Look for func declaration
        if not re.search(r'\b' + func + r'\s*[\(:]', js_to_check):
            print(f"MISSING METHOD: {obj}.{func} called by onclick='{oc}'")
            missing_handlers.append((obj, func, oc))

print(f"Total missing handlers: {len(missing_handlers)}")

print("\n=== 3. CHECKING ALL FORM ONSUBMIT HANDLERS ===")
onsubmits = re.findall(r'onsubmit="([^"]+)"', html)
for osb in set(onsubmits):
    print(f"onsubmit: {osb}")
    m = re.match(r'^(AdminApp|PageEditor)\.([a-zA-Z0-9_$]+)\(', osb)
    if m:
        obj, func = m.group(1), m.group(2)
        js_to_check = app_js if obj == 'AdminApp' else pe_js
        if not re.search(r'\b' + func + r'\s*[\(:]', js_to_check):
            print(f"MISSING FORM SUBMIT HANDLER: {obj}.{func} called in onsubmit='{osb}'")
