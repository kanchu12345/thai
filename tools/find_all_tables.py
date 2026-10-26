import os
import re

html_files = []
for root, dirs, files in os.walk('.'):
    if '.git' in root: continue
    for f in files:
        if f.endswith('.html'):
            html_files.append(os.path.normpath(os.path.join(root, f)))

tables_found = []

for h in html_files:
    with open(h, 'r', encoding='utf-8', errors='ignore') as f:
        text = f.read()
    for m in re.finditer(r'(<table\b[^>]*>[\s\S]*?</table>)', text, re.IGNORECASE):
        pos = m.start()
        prefix = text[max(0, pos-250):pos]
        # Check if parent is scrollable
        is_scrollable_wrapper = any(w in prefix.lower() for w in ['overflow', 'table-responsive', 'matrix-table-wrap', 'lotus-table-responsive'])
        tables_found.append({
            "file": h,
            "wrapped": is_scrollable_wrapper,
            "prefix": prefix.strip()[-100:].encode('ascii', 'ignore').decode(),
            "table_start": m.group(0)[:80].encode('ascii', 'ignore').decode()
        })

print(f"Total tables found: {len(tables_found)}")
for t in tables_found:
    status = "WRAPPED" if t['wrapped'] else "UNWRAPPED"
    print(f"[{status}] {t['file']}: {t['table_start']}")
    if not t['wrapped']:
        print(f"    Parent: {t['prefix']}")
