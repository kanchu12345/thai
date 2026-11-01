import re, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('admin/index.html', 'r', encoding='utf-8') as f:
    admin_html = f.read()

selects = re.findall(r'<select[^>]*id=["\']([^"\']+)["\']', admin_html)
print("Select IDs in admin/index.html:", selects)

for s in selects:
    if 'page' in s.lower():
        print("Page select match:", s)
