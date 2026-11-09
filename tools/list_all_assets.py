import os
import json
from PIL import Image

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

with open(os.path.join(REPO_ROOT, 'tools', 'raw_inventory.json'), encoding='utf-8') as f:
    raw_inv = json.load(f)

# Map disk paths to occurrences in HTML
html_usage = {}
for item in raw_inv:
    dp = item.get('disk_path')
    if dp:
        norm_dp = dp.replace('\\', '/')
        html_usage.setdefault(norm_dp, []).append(item)

# Check all files on disk
disk_assets = []
for root, dirs, files in os.walk(os.path.join(REPO_ROOT, 'assets')):
    for f in files:
        ext = os.path.splitext(f)[1].lower()
        if ext in ['.webp', '.jpg', '.jpeg', '.png', '.svg', '.mp4']:
            full_p = os.path.join(root, f)
            rel_p = os.path.relpath(full_p, REPO_ROOT).replace('\\', '/')
            size_kb = round(os.path.getsize(full_p) / 1024, 1)
            dims = ""
            fmt = ext[1:].upper()
            if ext in ['.webp', '.jpg', '.jpeg', '.png']:
                try:
                    with Image.open(full_p) as im:
                        dims = f"{im.width}x{im.height}"
                        fmt = im.format
                except Exception as e:
                    dims = "error"
            disk_assets.append({
                'rel_path': rel_p,
                'filename': f,
                'folder': os.path.dirname(rel_p),
                'format': fmt,
                'dimensions': dims,
                'size_kb': size_kb,
                'html_count': len(html_usage.get(rel_p, [])),
                'pages_used': sorted(list(set(u['page'] for u in html_usage.get(rel_p, []))))
            })

disk_assets.sort(key=lambda x: (x['folder'], x['filename']))

out_p = os.path.join(REPO_ROOT, 'tools', 'disk_assets_summary.json')
with open(out_p, 'w', encoding='utf-8') as f:
    json.dump(disk_assets, f, indent=2)

print(f"Total disk assets in assets/: {len(disk_assets)}")
print(f"Summary written to {out_p}")
