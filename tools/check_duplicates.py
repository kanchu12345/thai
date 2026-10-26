import os
import re

html_files = []
for root, dirs, files in os.walk('.'):
    if '.git' in root: continue
    for f in files:
        if f.endswith('.html'):
            html_files.append(os.path.normpath(os.path.join(root, f)))

duplicates = []
for h in html_files:
    with open(h, 'r', encoding='utf-8', errors='ignore') as f:
        text = f.read()
    fabs = len(re.findall(r'class=["\'][^"\']*unified-fab-group', text))
    float_wa = len(re.findall(r'class=["\'][^"\']*floating-whatsapp', text))
    if fabs > 0 and float_wa > 0:
        duplicates.append((h, f"BOTH unified-fab-group ({fabs}) AND floating-whatsapp ({float_wa})"))
    elif fabs > 1:
        duplicates.append((h, f"Multiple unified-fab-group ({fabs})"))
    elif float_wa > 1:
        duplicates.append((h, f"Multiple floating-whatsapp ({float_wa})"))

print(f"Total HTML files with duplicate floating button structures: {len(duplicates)}")
for item in duplicates[:20]:
    print(f"  {item[0]}: {item[1]}")
