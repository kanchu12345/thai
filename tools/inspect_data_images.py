import json
import os
import re

data_imgs = {}
for dfile in ['data/packages.json', 'data/seed-catalog.json', 'data/blog.json', 'data/homepage-blogs.json', 'data/success-stories.json', 'data/team.json', 'data/media-manifest.json']:
    if not os.path.exists(dfile):
        continue
    content = open(dfile, encoding='utf-8').read()
    matches = re.findall(r'["\']([^"\']+\.(?:webp|jpg|jpeg|png|svg|mp4))["\']', content, re.I)
    for m in matches:
        if m.startswith('http://') or m.startswith('https://') or m.startswith('data:'):
            continue
        data_imgs.setdefault(m, []).append(dfile)

print(f"Total image paths in data/*.json: {len(data_imgs)}")
for p, sources in sorted(data_imgs.items()):
    disk_path = p.lstrip('./').lstrip('/')
    exists = os.path.exists(disk_path)
    print(f"[{'EXISTS' if exists else 'MISSING'}] {p}  <-- {', '.join(set(sources))}")
