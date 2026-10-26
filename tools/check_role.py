with open('admin/js/admin-app.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
m = re.search(r'async fetchUserRole\([^\)]*\)\s*\{([\s\S]*?)\n  \},', text)
if m:
    print(m.group(0))
else:
    print("fetchUserRole not found with regex")
