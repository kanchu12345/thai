import os, sys
sys.stdout.reconfigure(encoding='utf-8')

for root in ['scripts', 'scratch']:
    if not os.path.exists(root):
        continue
    for f in os.listdir(root):
        fp = os.path.join(root, f)
        if os.path.isfile(fp) and (f.endswith('.py') or f.endswith('.js')):
            try:
                with open(fp, 'r', encoding='utf-8', errors='ignore') as fl:
                    c = fl.read()
                if 'hero-banner.mp4' in c or 'ffmpeg' in c:
                    print(f"Found in {fp}:")
                    for line in c.splitlines():
                        if 'hero-banner' in line or 'ffmpeg' in line or 'fade' in line or 'drawtext' in line:
                            print(f"    {line.strip()[:120]}")
            except Exception as e:
                pass
