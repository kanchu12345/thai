import sys
sys.stdout.reconfigure(encoding='utf-8')
with open('admin/index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()
for j in range(1593, 1625):
    print(f'{j+1}: {lines[j]}', end='')
