import re, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('index.html', 'r', encoding='utf-8') as f:
    c = f.read()

m = re.search(r'<section[^>]*id=["\']news["\'].*?</section>', c, re.DOTALL)
if m:
    print(m.group(0))
