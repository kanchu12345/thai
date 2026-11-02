import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('scratch/SriLanka4K_desc.txt', 'r', encoding='utf-8', errors='ignore') as f:
    print(f.read()[:2000])
