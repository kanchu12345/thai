import os
from PIL import Image, ImageDraw

out_dir = "vendor/leaflet/images"
os.makedirs(out_dir, exist_ok=True)

# 1. layers.png (26x26)
img1 = Image.new('RGBA', (26, 26), (0, 0, 0, 0))
d1 = ImageDraw.Draw(img1)
# Draw stacked layer rhombuses
d1.polygon([(13, 3), (23, 8), (13, 13), (3, 8)], outline=(60, 60, 60, 255), fill=(255, 255, 255, 220))
d1.line([(3, 12), (13, 17), (23, 12)], fill=(60, 60, 60, 255), width=1)
d1.line([(3, 16), (13, 21), (23, 16)], fill=(60, 60, 60, 255), width=1)
img1.save(os.path.join(out_dir, 'layers.png'), 'PNG')

# 2. layers-2x.png (52x52)
img2 = Image.new('RGBA', (52, 52), (0, 0, 0, 0))
d2 = ImageDraw.Draw(img2)
d2.polygon([(26, 6), (46, 16), (26, 26), (6, 16)], outline=(60, 60, 60, 255), fill=(255, 255, 255, 220))
d2.line([(6, 24), (26, 34), (46, 24)], fill=(60, 60, 60, 255), width=2)
d2.line([(6, 32), (26, 42), (46, 32)], fill=(60, 60, 60, 255), width=2)
img2.save(os.path.join(out_dir, 'layers-2x.png'), 'PNG')

print("Created layers.png and layers-2x.png successfully!")
