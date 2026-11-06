import re
import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('admin/js/admin-app.js', 'r', encoding='utf-8') as f:
    admin_app_code = f.read()

with open('admin/js/page-editor.js', 'r', encoding='utf-8') as f:
    page_editor_code = f.read()

with open('admin/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

handlers = re.findall(r'(?:onclick|onsubmit)=["\']([^"\']+)["\']', html)
funcs = set()
for h in handlers:
    matches = re.findall(r'([A-Za-z0-9_]+\.[A-Za-z0-9_]+)\s*\(', h)
    for m in matches:
        funcs.add(m)

missing = []
for fn in sorted(funcs):
    parts = fn.split('.')
    obj, method = parts[0], parts[1]
    if obj == 'AdminApp':
        # Check if method defined in admin_app_code
        pattern = rf'\b{method}\s*[:\(]'
        if not re.search(pattern, admin_app_code):
            missing.append(fn)
    elif obj == 'PageEditor':
        pattern = rf'\b{method}\s*[:\(]'
        if not re.search(pattern, page_editor_code):
            missing.append(fn)

print(f"Total methods checked: {len(funcs)}")
if missing:
    print("MISSING METHODS:")
    for m in missing:
        print(f"  ❌ {m}")
else:
    print("✅ All methods found!")
