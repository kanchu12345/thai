import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('blog/sacred-footsteps-unlocking-sri-lankas-ancient-buddhist-kingdoms/index.html', 'r', encoding='utf-8') as f:
    c = f.read()

lines = c.splitlines()
for i, l in enumerate(lines[120:250]):
    print(f"{i+121}: {l[:100]}")
