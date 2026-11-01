import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('blog/sacred-footsteps-unlocking-sri-lankas-ancient-buddhist-kingdoms/index.html', 'r', encoding='utf-8') as f:
    c = f.read()

# Let's inspect head and body tags
lines = c.splitlines()
print(f"Total lines: {len(lines)}")
for i, l in enumerate(lines[:120]):
    print(f"{i+1}: {l[:90]}")
