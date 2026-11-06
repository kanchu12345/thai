import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('admin/index.html', 'r', encoding='utf-8', errors='replace') as f:
    lines = f.readlines()

print(f"Total lines in admin/index.html: {len(lines)}")
corrupted = []
for i, line in enumerate(lines):
    if '\ufffd' in line or '????' in line or '??' in line:
        corrupted.append((i+1, line.strip()))

print(f"Found {len(corrupted)} corrupted lines in admin/index.html:")
for line_no, txt in corrupted[:50]:
    print(f"  Line {line_no}: {txt[:100]}")
