import re

with open('inquiry-detailed.html', 'r', encoding='utf-8') as f:
    c = f.read()

grids = set(re.findall(r'class="([^"]*grid[^"]*)"', c))
print('Grids in inquiry-detailed.html:')
for g in sorted(grids):
    print(' ', g)

# Also check contact.html
with open('contact.html', 'r', encoding='utf-8') as f:
    c2 = f.read()

grids2 = set(re.findall(r'class="([^"]*grid[^"]*)"', c2))
print('Grids in contact.html:')
for g in sorted(grids2):
    print(' ', g)
