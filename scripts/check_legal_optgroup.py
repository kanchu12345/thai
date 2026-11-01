import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('admin/index.html', 'r', encoding='utf-8') as f:
    c = f.read()

pos = c.find('Legal & Policies')
print("Position of Legal & Policies:", pos)
print(c[pos-50:pos+400])
