import os, glob

root_icons = glob.glob('icon_*.png')
print(f"Checking {len(root_icons)} root icon files...")

references = {icon: [] for icon in root_icons}

for root, dirs, files in os.walk('.'):
    if '.git' in root: continue
    for f in files:
        if f.endswith(('.html', '.css', '.js', '.json')):
            path = os.path.join(root, f)
            try:
                with open(path, 'r', encoding='utf-8', errors='ignore') as fl:
                    content = fl.read()
                    for icon in root_icons:
                        base = os.path.basename(icon)
                        if base in content:
                            references[icon].append(path)
            except Exception:
                pass

print("\nIcon References:")
unreferenced = []
for icon, refs in references.items():
    if refs:
        print(f"  {icon}: referenced in {len(refs)} files ({refs[:2]})")
    else:
        print(f"  {icon}: UNREFERENCED (0 occurrences)")
        unreferenced.append(icon)

print(f"\nTotal unreferenced root icons: {len(unreferenced)} / {len(root_icons)}")
