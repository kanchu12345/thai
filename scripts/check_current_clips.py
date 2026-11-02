import os, sys, subprocess
sys.stdout.reconfigure(encoding='utf-8')

norm_dir = r"scratch\norm16"
clips = sorted([f for f in os.listdir(norm_dir) if f.endswith('.mp4')])

print(f"Total clips in {norm_dir}: {len(clips)}")
for c in clips:
    path = os.path.join(norm_dir, c)
    # Check duration using ffprobe
    res = subprocess.run([
        'ffprobe', '-v', 'error', '-show_entries', 'format=duration',
        '-of', 'default=noprint_wrappers=1:nokey=1', path
    ], capture_output=True, text=True)
    dur = res.stdout.strip()
    print(f"  {c}: duration = {dur}s")
