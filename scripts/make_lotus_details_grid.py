import os
from PIL import Image, ImageDraw

files = sorted([f for f in os.listdir('scratch/lotus_frames') if f.startswith('orbit_') or f.startswith('wide_')])
cols = 4
rows = (len(files) + cols - 1) // cols
tw, th = 400, 225
grid = Image.new('RGB', (cols * tw, rows * (th + 24)), (15, 15, 15))
draw = ImageDraw.Draw(grid)

for idx, fn in enumerate(files):
    r = idx // cols
    c = idx % cols
    im = Image.open(os.path.join('scratch/lotus_frames', fn)).resize((tw, th))
    x = c * tw
    y = r * (th + 24)
    grid.paste(im, (x, y))
    draw.rectangle([(x, y + th), (x + tw, y + th + 24)], fill=(0, 0, 0))
    draw.text((x + 8, y + th + 4), fn.replace(".jpg", ""), fill=(255, 215, 0))

out_p = r"C:\Users\kanch\.gemini\antigravity\brain\6a298d6d-6ff0-456a-818c-0f520d14ffcc\lotus_details_grid.jpg"
grid.save(out_p, quality=88)
print("Saved to", out_p)
