import re
import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('admin/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

handlers = re.findall(r'(?:onclick|onsubmit)=["\']([^"\']+)["\']', content)
funcs = set()
for h in handlers:
    matches = re.findall(r'([A-Za-z0-9_]+\.[A-Za-z0-9_]+)\s*\(', h)
    for m in matches:
        funcs.add(m)

print(f"Total handlers: {len(handlers)}")
print("Unique called methods:")
for fn in sorted(funcs):
    print(" ", fn)
