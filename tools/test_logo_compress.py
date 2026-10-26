from PIL import Image
import os

orig_size = os.path.getsize('logo.png')
im = Image.open('logo.png')
print(f"Original size: {orig_size/1024:.1f} KB, format: {im.format}, mode: {im.mode}, size: {im.size}")

# Test saving as optimized PNG with max compression
im.save('tools/test_logo_opt.png', 'PNG', optimize=True, compress_level=9)
opt_png_size = os.path.getsize('tools/test_logo_opt.png')
print(f"Optimized PNG: {opt_png_size/1024:.1f} KB")

# Test saving as 2x retina size for 40px display (e.g. 120x97 or 160x130)
im_retina = im.copy()
im_retina.thumbnail((160, 160), Image.Resampling.LANCZOS)
im_retina.save('tools/test_logo_retina.png', 'PNG', optimize=True)
print(f"Retina 160px PNG size: {os.path.getsize('tools/test_logo_retina.png')/1024:.1f} KB")
