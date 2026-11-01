from PIL import Image

im = Image.open('assets/images/blog/clean_landscape_crop.webp')
# Save the bottom right 100x100 corner to inspect
w, h = im.size
corner = im.crop((w-100, h-80, w, h))
corner.save('assets/images/blog/test_corner.png')

# Let's inspect where badge 22 actually is in raw_crop.png
raw = Image.open('assets/images/blog/raw_crop.png')
rw, rh = raw.size
# Badge in raw_crop:
# y was 385 to 440. Since clean crop cut at y=398, let's see if top of badge was at 385!
raw_corner = raw.crop((rw-120, 360, rw, 450))
raw_corner.save('assets/images/blog/test_raw_corner.png')
print("Corner saved, checking pixels...")
