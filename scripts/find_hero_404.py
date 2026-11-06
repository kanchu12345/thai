import os

for root, dirs, files in os.walk('.'):
    if any(p in root for p in ['.git', 'node_modules', '.gemini', '__pycache__']):
        continue
    for f in files:
        if f.endswith(('.json', '.js', '.html')):
            path = os.path.join(root, f)
            try:
                with open(path, 'r', encoding='utf-8', errors='ignore') as fp:
                    content = fp.read()
                    if 'assets/tours/buddhist-heritage/hero.jpg' in content:
                        print(f"Found in {path}")
            except:
                pass
