import subprocess, os, imageio_ffmpeg
ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()

# Sample every 2 seconds from 01:06 (66s) to 01:24 (84s)
for s in range(66, 85, 2):
    out = f"scratch/lotus_frames/orbit_{s:03d}s.jpg"
    subprocess.run([
        ffmpeg_exe, '-y', '-ss', str(s), '-i', 'scratch/lotus_tower_1080p.mp4',
        '-vframes', '1', '-q:v', '2', out
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

# Sample wide view 02:48 (168s) to 03:04 (184s)
for s in range(168, 186, 2):
    out = f"scratch/lotus_frames/wide_{s:03d}s.jpg"
    subprocess.run([
        ffmpeg_exe, '-y', '-ss', str(s), '-i', 'scratch/lotus_tower_1080p.mp4',
        '-vframes', '1', '-q:v', '2', out
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

print("Extracted detailed lotus frames!")
