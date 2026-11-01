import re, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('admin/index.html', 'r', encoding='utf-8') as f:
    admin_html = f.read()

m = re.search(r'<select[^>]*id=["\']visualPageDropdown["\'][^>]*>(.*?)</select>', admin_html, re.DOTALL)
if m:
    opts = re.findall(r'<option[^>]*value=["\']([^"\']*)["\'][^>]*>(.*?)</option>', m.group(1))
    print(f"Total options in visualPageDropdown: {len(opts)}")
    for val, text in opts:
        if 'blog' in val.lower() or 'blog' in text.lower():
            print(f"  {val} -> {text.strip()}")
