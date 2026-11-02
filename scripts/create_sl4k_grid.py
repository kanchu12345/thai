import os, sys
from PIL import Image, ImageDraw

sys.stdout.reconfigure(encoding='utf-8')

frames = sorted([f for f in os.listdir('scratch/sl4k_scenes') if f.endswith('.jpg')])
print(f"Total sampled scenes: {len(frames)}")

# Create a contact grid of the first 45 sampled frames
cols = 5
rows = (len(frames) + cols - 1) // cols
tw, th = 384, 216
grid = Image.new('RGB', (cols * tw, rows * (th + 24)), (15, 15, 15))
draw = ImageDraw.Draw(grid)

for idx, fn in enumerate(frames):
    r = idx // cols
    c = idx % cols
    im = Image.open(os.path.join('scratch/sl4k_scenes', fn)).resize((tw, th))
    x = c * tw
    y = r * (th + 24)
    grid.paste(im, (x, y))
    draw.rectangle([(x, y + th), (x + tw, y + th + 24)], fill=(0, 0, 0))
    label = fn.replace(".jpg", "").replace("t_", "")
    draw.text((x + 8, y + th + 4), label, fill=(255, 215, 0))

out_p = "scratch/sl4k_scenes_grid.jpg"
grid.save(out_p, quality=85)
print("Saved to", out_p)

# Copy to artifacts
artifact_dir = r"C:\Users\kanch\.gemini\antigravity\brain\6a298d6d-6ff0-456a-818c-0f520d14ffcc"
grid.save(os.path.join(artifact_dir, "sl4k_scenes_grid.jpg"), quality=85)
