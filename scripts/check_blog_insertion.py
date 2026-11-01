import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('blog.html', 'r', encoding='utf-8') as f:
    c = f.read()

target = '<article class="blog-card"'
pos = c.find(target)
print("Position:", pos)
print(c[pos-100:pos+250])
