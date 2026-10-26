from bs4 import BeautifulSoup
import os

missing_og = []
missing_desc = []

for root, dirs, files in os.walk('.'):
    if 'node_modules' in root or '.git' in root or 'brain' in root or 'admin' in root:
        continue
    for file in files:
        if file.endswith('.html'):
            p = os.path.normpath(os.path.join(root, file))
            with open(p, 'r', encoding='utf-8', errors='ignore') as f:
                soup = BeautifulSoup(f.read(), 'html.parser')
            if not soup.find('meta', property='og:title'):
                missing_og.append(p)
            desc = soup.find('meta', attrs={'name': lambda v: v and v.lower() == 'description'})
            if not desc or not desc.get('content'):
                missing_desc.append(p)

print("Missing OG:", len(missing_og), missing_og)
print("Missing Desc:", len(missing_desc), missing_desc)
