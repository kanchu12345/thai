import re, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('admin/index.html', 'r', encoding='utf-8') as f:
    c = f.read()

m = re.search(r'<select[^>]*id=["\']visualPageDropdown["\'][^>]*>(.*?)</select>', c, re.DOTALL)
if m:
    groups = re.findall(r'<optgroup[^>]*label=["\']([^"\']+)["\']>(.*?)</optgroup>', m.group(1), re.DOTALL)
    print("Found optgroups:", len(groups))
    for label, inner in groups:
        opts = re.findall(r'<option[^>]*value=["\']([^"\']*)["\']', inner)
        print(f" - {label} ({len(opts)} options)")
