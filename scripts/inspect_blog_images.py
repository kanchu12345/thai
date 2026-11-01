import re, os, glob

with open('index.html', 'r', encoding='utf-8') as f:
    c = f.read()

m = re.search(r'<section[^>]*id=["\']news["\'].*?</section>', c, re.DOTALL)
if m:
    print('index.html #news images:')
    for img in re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', m.group(0)):
        print('  -', img)
    print('index.html #news titles:')
    for title in re.findall(r'<h3[^>]*>(.*?)</h3>', m.group(0)):
        print('  -', title.strip())
