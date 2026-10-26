import os
import glob
import re
from bs4 import BeautifulSoup

ROOT_DIR = os.getcwd()
html_files = glob.glob(os.path.join(ROOT_DIR, '**/*.html'), recursive=True)
html_files = [f for f in html_files if '.git' not in f and 'node_modules' not in f]

dupes = []

for hf in html_files:
    rel_path = os.path.relpath(hf, ROOT_DIR)
    with open(hf, 'r', encoding='utf-8', errors='ignore') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')

    scripts = soup.find_all('script')
    top_consts = []
    for s in scripts:
        if s.get('src') or not s.string:
            continue
        # Find const/let at start of line or outside functions
        matches = re.findall(r'^\s*(?:const|let)\s+([a-zA-Z0-9_$]+)\s*=', s.string, re.MULTILINE)
        top_consts.extend(matches)

    seen = set()
    file_dupes = set()
    for c in top_consts:
        if c in seen:
            file_dupes.add(c)
        seen.add(c)

    if file_dupes:
        dupes.append((rel_path, list(file_dupes)))

print(f"Files with duplicate top-level const/let declarations: {len(dupes)}")
for f, d in dupes:
    print(f"  {f}: {d}")
