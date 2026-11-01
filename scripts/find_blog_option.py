import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('admin/index.html', 'r', encoding='utf-8') as f:
    c = f.read()

pos = c.find('siteContent/blog|blog.html')
print("Position:", pos)
print(c[pos-50:pos+300])
