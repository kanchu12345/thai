import json
import os

with open('tools/raw_inventory.json', encoding='utf-8') as f:
    inv = json.load(f)

# 1. Blog images
print("=== BLOG IMAGES ===")
blog_items = [item for item in inv if item['page'].startswith('blog') or item['page'] == 'blog.html']
for it in blog_items:
    if it['element'] in ['img', 'inline-bg-style']:
        print(f"Page: {it['page']:45} | Src: {it['raw_src']:45} | Alt: {it['alt']}")

# 2. Homepage images
print("\n=== INDEX.HTML IMAGES ===")
home_items = [item for item in inv if item['page'] == 'index.html']
for it in home_items:
    if it['element'] in ['img', 'inline-bg-style', 'video', 'source']:
        print(f"Sec: {it['section']:30} | Src: {it['raw_src']:45} | Alt: {it['alt']}")
