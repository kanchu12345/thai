import os, sys
from PIL import Image, ImageDraw

sys.stdout.reconfigure(encoding='utf-8')

vf_files = sorted([f for f in os.listdir('scratch/norm18') if f.startswith('vf_') and f.endswith('.jpg')])
print(f"Found {len(vf_files)} verification frames.")

cols = 3
rows = (len(vf_files) + cols - 1) // cols
tw, th = 600, 338
grid = Image.new('RGB', (cols * tw, rows * (th + 32)), (10, 10, 10))
draw = ImageDraw.Draw(grid)

titles = [
    "00: Lotus Tower Blossom Orbit, Colombo",
    "01: Colombo Skyline & Beira Lake Panorama",
    "02: Sacred Anuradhapura & Nuwara Wewa Lake",
    "03: Colossal Jetavanaramaya Stupa",
    "04: Sigiriya Ancient Rock Citadel",
    "05: Sigiriya Lion's Paw Terrace",
    "06: Dambulla Golden Cave Temple Mountain",
    "07: Nine Arch Demodara Bridge, Ella",
    "08: Diyaluma Cascading Waterfall",
    "09: Ambuluwawa Biodiversity Tower",
    "10: Kandy Sacred Hill Capital",
    "11: Ramboda Highland Falls",
    "12: Maskeliya & Nuwara Eliya Valleys",
    "13: Wild Elephant Gathering, Kaudulla",
    "14: Yala National Park Savanna Wildlife",
    "15: Galle Dutch Fort Ocean Ramparts",
    "16: Bentota Beach & Golden Sands",
    "17: Dondra Head Lighthouse Ocean Cliff"
]

for idx, fn in enumerate(vf_files):
    r = idx // cols
    c = idx % cols
    fp = os.path.join('scratch/norm18', fn)
    im = Image.open(fp).resize((tw, th), Image.Resampling.LANCZOS)
    x = c * tw
    y = r * (th + 32)
    grid.paste(im, (x, y))
    draw.rectangle([(x, y + th), (x + tw, y + th + 32)], fill=(0, 0, 0))
    label = titles[idx] if idx < len(titles) else fn
    draw.text((x + 12, y + th + 8), label, fill=(255, 215, 0))

out_p = r"C:\Users\kanch\.gemini\antigravity\brain\6a298d6d-6ff0-456a-818c-0f520d14ffcc\all_18_verified_grid.jpg"
grid.save(out_p, quality=88)
print("Saved all 18 verified grid to", out_p)
