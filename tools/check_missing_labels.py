import os
import glob
import re
from bs4 import BeautifulSoup

ROOT_DIR = os.getcwd()
html_files = glob.glob(os.path.join(ROOT_DIR, '**/*.html'), recursive=True)
html_files = [f for f in html_files if '.git' not in f and 'node_modules' not in f]

missing_labels = []

for hf in html_files:
    rel_path = os.path.relpath(hf, ROOT_DIR)
    with open(hf, 'r', encoding='utf-8', errors='ignore') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')

    for inp in soup.find_all(['input', 'select', 'textarea']):
        # Ignore hidden inputs or submit/button inputs
        itype = inp.get('type', '').lower()
        if itype in ['hidden', 'submit', 'button', 'reset', 'image']:
            continue
        iid = inp.get('id')
        name = inp.get('name')
        aria_label = inp.get('aria-label')
        aria_labelledby = inp.get('aria-labelledby')
        title = inp.get('title')
        
        has_label = False
        if iid and soup.find('label', attrs={'for': iid}):
            has_label = True
        elif inp.find_parent('label'):
            has_label = True
        elif aria_label or aria_labelledby or title:
            has_label = True

        if not has_label:
            missing_labels.append((rel_path, inp.name, iid or name or 'unnamed', str(inp)[:60]))

    for btn in soup.find_all('button'):
        text = btn.get_text(strip=True)
        aria_label = btn.get('aria-label')
        title = btn.get('title')
        if not text and not aria_label and not title:
            missing_labels.append((rel_path, 'button', btn.get('id', 'unnamed'), str(btn)[:60]))

print(f"Total controls with missing accessible name/label: {len(missing_labels)}")
for f, tag, name, snippet in missing_labels[:20]:
    print(f"  [{f}] <{tag} name/id='{name}'>: {snippet}")
