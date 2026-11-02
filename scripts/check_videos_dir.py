import os, sys
sys.stdout.reconfigure(encoding='utf-8')

print("assets/videos:")
if os.path.exists('assets/videos'):
    for f in os.listdir('assets/videos'):
        fp = os.path.join('assets/videos', f)
        print(f"  {f} ({os.path.getsize(fp)} bytes)")

print("\nscratch:")
if os.path.exists('scratch'):
    for f in os.listdir('scratch'):
        print(f"  {f}")
