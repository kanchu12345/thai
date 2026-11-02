import os, sys
from PIL import Image, ImageDraw, ImageFont

sys.stdout.reconfigure(encoding='utf-8')

scenes = [
    ("c00_lotus.jpg", "0: Lotus Blossom Sanctuaries"),
    ("c01_anu_lake.jpg", "1: Anuradhapura & Nuwara Wewa Lake"),
    ("c02_jetavana.jpg", "2: Jetavanaramaya Stupa"),
    ("c03_sigiriya.jpg", "3: Sigiriya Ancient Rock Citadel"),
    ("c04_dambulla.jpg", "4: Dambulla Cave Temple"),
    ("c05_diyaluma.jpg", "5: Diyaluma Cascading Waterfall"),
    ("c06_ambuluwawa.jpg", "6: Ambuluwawa Tower Gampola"),
    ("c07_nine_arch.jpg", "7: Nine Arch Demodara Bridge"),
    ("c08_kandy.jpg", "8: Kandy Sacred Hill Capital"),
    ("c09_tea_lake.jpg", "9: Maskeliya & Nuwara Eliya Valleys"),
    ("c10_ramboda.jpg", "10: Ramboda Highland Falls"),
    ("c11_elephants.jpg", "11: Kaudulla & Minneriya Elephants"),
    ("c12_yala.jpg", "12: Yala National Park"),
    ("c13_bentota.jpg", "13: Bentota Beach"),
    ("c14_weligama.jpg", "14: Weligama & Mirissa Bay"),
    ("c15_dondra.jpg", "15: Dondra Head Lighthouse")
]

# Create a 4x4 grid of thumbnails
cols, rows = 4, 4
thumb_w, thumb_h = 480, 270
grid = Image.new('RGB', (cols * thumb_w, rows * thumb_h + rows * 30), (20, 20, 20))
draw = ImageDraw.Draw(grid)

for idx, (fn, title) in enumerate(scenes):
    r = idx // cols
    c = idx % cols
    fp = os.path.join("scratch/clip_frames", fn)
    if os.path.exists(fp):
        im = Image.open(fp).resize((thumb_w, thumb_h), Image.Resampling.LANCZOS)
        x = c * thumb_w
        y = r * (thumb_h + 30)
        grid.paste(im, (x, y))
        draw.rectangle([(x, y + thumb_h), (x + thumb_w, y + thumb_h + 30)], fill=(0, 0, 0))
        draw.text((x + 10, y + thumb_h + 8), title, fill=(255, 215, 0))

out_path = "scratch/all_16_clips_grid.jpg"
grid.save(out_path, quality=90)
print(f"Saved contact grid to {out_path}")

# Also copy to artifacts so we can link it
artifact_dir = r"C:\Users\kanch\.gemini\antigravity\brain\6a298d6d-6ff0-456a-818c-0f520d14ffcc"
grid.save(os.path.join(artifact_dir, "all_16_clips_grid.jpg"), quality=90)
print("Copied to artifacts!")
