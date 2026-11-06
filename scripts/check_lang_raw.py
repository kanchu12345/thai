import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('admin/index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i in range(2110, 2125):
    print(f"{i+1}: {repr(lines[i])}")
