import sys, os
from PIL import Image, ImageFilter
import numpy as np

sys.stdout.reconfigure(encoding='utf-8')

im = Image.open('assets/images/blog/raw_crop.png').convert('RGB')
w, h = im.size
print(f"Crop size: {w}x{h}")

# The photo has:
# - Back button circle: center approx (54, 38), radius ~24
# - Heart button circle: center approx (349, 38), radius ~24
# - Share button circle: center approx (410, 38), radius ~24
# - Badge [22] at bottom right: approx x: 345 to 430, y: 385 to 430
# - Dots at bottom center: y approx 415 to 430, x approx 195 to 265

# Let's inspect the background around the top icons:
# At y: 15 to 65, x: 20 to 80 is the wooden beam / corrugated ceiling / foliage.
# What if we crop slightly below y=65 (e.g., y=65 to 395) or clean them?
# Let's check a smart crop that focuses perfectly on the two women:
# The women are at x: 40 to 440, y: 50 to 390.
# If we crop (10, 68, 450, 400), size is 440 x 332 (ratio ~ 1.325 : 1, standard 4:3 landscape ratio!)
crop_clean = im.crop((5, 68, 455, 398))
crop_clean.save('assets/images/blog/clean_landscape_crop.webp', 'WEBP', quality=92)
print("Saved clean_landscape_crop.webp size:", crop_clean.size)

# Let's also create an upscale/high-def version resized with Lanczos
hd = crop_clean.resize((880, 660), Image.Resampling.LANCZOS)
hd.save('assets/images/blog/ella-tea-making-experience.webp', 'WEBP', quality=90)
print("Saved ella-tea-making-experience.webp size:", hd.size)

# Also create a thumbnail version for preview / cards
thumb = crop_clean.resize((440, 330), Image.Resampling.LANCZOS)
thumb.save('assets/images/blog/ella-tea-making-thumb.webp', 'WEBP', quality=88)
print("Saved ella-tea-making-thumb.webp size:", thumb.size)
