import json, sys
sys.stdout.reconfigure(encoding='utf-8')

try:
    with open('scratch/new_video_info.json', 'r', encoding='utf-16') as f:
        info = json.load(f)
except Exception:
    with open('scratch/new_video_info.json', 'r', encoding='utf-8', errors='ignore') as f:
        info = json.load(f)

print("Title:", info.get('title'))
print("Duration:", info.get('duration'), "seconds")
print("Channel:", info.get('uploader'))
print("Description:\n", info.get('description', '')[:1000])
