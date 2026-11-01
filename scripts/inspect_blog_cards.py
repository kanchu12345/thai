import re, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('blog.html', 'r', encoding='utf-8') as f:
    blog_html = f.read()

print('--- BLOG.HTML CARDS ---')
cards = re.findall(r'<article[^>]*>.*?</article>', blog_html, re.DOTALL)
if not cards:
    cards = re.findall(r'<div class="news-card[^"]*"[^>]*>.*?</div>\s*</div>', blog_html, re.DOTALL)
if not cards:
    # let's look for href="blog/..."
    cards = re.findall(r'<a[^>]*href=["\']blog/[^"\']+["\'][^>]*>.*?</a>', blog_html, re.DOTALL)

print(f'Found {len(cards)} cards/links in blog.html')
for c in cards:
    print('--- CARD ---')
    print(c[:400])
