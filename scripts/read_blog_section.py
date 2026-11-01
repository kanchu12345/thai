import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('blog.html', 'r', encoding='utf-8') as f:
    c = f.read()

start = c.find('<div class="news-grid-layout"')
if start == -1:
    start = c.find('blog-card')
print(c[start-100:start+1800])
