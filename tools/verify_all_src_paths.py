import os
import glob
import re
from bs4 import BeautifulSoup

ROOT_DIR = os.getcwd()
html_files = glob.glob(os.path.join(ROOT_DIR, '**/*.html'), recursive=True)
html_files = [f for f in html_files if '.git' not in f and 'node_modules' not in f]

broken_src = []

for hf in html_files:
    rel_path = os.path.relpath(hf, ROOT_DIR)
    dir_name = os.path.dirname(hf)
    with open(hf, 'r', encoding='utf-8', errors='ignore') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')

    for tag in soup.find_all(['img', 'script', 'source', 'video']):
        src = tag.get('src')
        if not src:
            continue
        if src.startswith(('http://', 'https://', '//', 'data:', 'blob:')):
            continue
        if '${' in src: # skip template literals
            continue
            
        clean_src = src.split('?')[0].split('#')[0]
        if clean_src.startswith('/'):
            target = os.path.normpath(os.path.join(ROOT_DIR, clean_src.lstrip('/')))
        else:
            target = os.path.normpath(os.path.join(dir_name, clean_src))

        if not os.path.exists(target):
            broken_src.append((rel_path, tag.name, src, target))

print(f"Total broken local src references: {len(broken_src)}")
for hf, tag, src, target in broken_src:
    print(f"  [{hf}] <{tag} src='{src}'> -> Missing: {target}")
