import sys
sys.stdout.reconfigure(encoding='utf-8')

for fn in ['scratch/download_hd_clips.py', 'scratch/dl_extra_clips.py']:
    print('===', fn, '===')
    with open(fn, 'r', encoding='utf-8', errors='ignore') as f:
        print(f.read())
