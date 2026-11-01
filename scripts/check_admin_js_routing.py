import re, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('admin/js/admin-app.js', 'r', encoding='utf-8') as f:
    js_code = f.read()

# Search for visualPageDropdown change handler
matches = re.findall(r'visualPageDropdown.*?\}', js_code, re.DOTALL)
print("visualPageDropdown references:", len(re.findall(r'visualPageDropdown', js_code)))

# Look for siteContent mapping
sc_matches = re.findall(r'siteContent/[a-zA-Z0-9_\-]+', js_code)
print("Unique siteContent references in js:", set(sc_matches))
