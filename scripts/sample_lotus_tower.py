import os, sys, subprocess, imageio_ffmpeg
from PIL import Image, ImageDraw

sys.stdout.reconfigure(encoding='utf-8')
ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()

os.makedirs('scratch/lotus_frames', exist_ok=True)
vid = 'scratch/lotus_tower_1080p.mp4'

# Extract frames every 8 seconds (from 0 to 220s)
for s in range(2, 224, 8):
    mm = s // 60
    ss = s % 60
    out_f = f"scratch/lotus_frames/lt_{s:03d}_{mm:02d}m{ss:02d}s.jpg"
    subprocess.run([
        ffmpeg_exe, '-y', '-ss', str(s), '-i', vid,
        '-vframes', '1', '-q:v', '2', out_f
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

frames = sorted([f for f in os.listdir('scratch/lotus_frames') if f.endswith('.jpg')])
print(f"Extracted {len(frames)} frames from lotus_tower_1080p.mp4")

# Build a grid
cols = 4
rows = (len(frames) + cols - 1) // cols
tw, th = 400, 225
grid = Image.new('RGB', (cols * tw, rows * (th + 24)), (15, 15, 15))
draw = ImageDraw.Draw(grid)

for idx, fn in enumerate(frames):
    r = idx // cols
    c = idx % cols
    im = Image.open(os.path.join('scratch/lotus_frames', fn)).resize((tw, th))
    x = c * tw
    y = r * (th + 24)
    grid.paste(im, (x, y))
    draw.rectangle([(x, y + th), (x + tw, y + th + 24)], fill=(0, 0, 0))
    draw.text((x + 8, y + th + 4), fn.replace(".jpg", ""), fill=(255, 215, 0))

grid_path = "scratch/lotus_tower_grid.jpg"
grid.save(grid_path, quality=88)
print("Saved grid to", grid_path)

# Copy to artifacts so we can read it
artifact_dir = r"C:\Users\kanch\.gemini\antigravity\brain\6a298d6d-6ff0-456a-818c-0f520d14ffcc"
grid.save(os.path.join(artifact_dir, "lotus_tower_grid.jpg"), quality=88)
