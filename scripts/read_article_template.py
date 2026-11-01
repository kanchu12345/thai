import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('blog/sacred-footsteps-unlocking-sri-lankas-ancient-buddhist-kingdoms/index.html', 'r', encoding='utf-8') as f:
    c = f.read()

print("Length of article file:", len(c))
print(c[:1200])
