import subprocess, os, sys, imageio_ffmpeg
sys.stdout.reconfigure(encoding='utf-8')

ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
os.makedirs("scratch/sl4k_scenes", exist_ok=True)

# Sample every 15 seconds across srilanka4k_360p.mp4 (duration is ~15-16 minutes = 900-960s)
# Let's extract bottom crop from second 0 to 900
print("Extracting scene frames from scratch/srilanka4k_360p.mp4...")
for s in range(0, 930, 20):
    mm = s // 60
    ss = s % 60
    ts = f"{mm:02d}:{ss:02d}"
    out_f = f"scratch/sl4k_scenes/t_{s:04d}_{mm:02d}m{ss:02d}s.jpg"
    cmd = [
        ffmpeg_exe, '-y', '-ss', str(s), '-i', 'scratch/srilanka4k_360p.mp4',
        '-vframes', '1', '-q:v', '2', out_f
    ]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

print("Extracted sampled frames!")
