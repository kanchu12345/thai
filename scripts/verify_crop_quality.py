from PIL import Image
import numpy as np

im = Image.open('assets/images/blog/clean_landscape_crop.webp').convert('RGB')
arr = np.array(im)
w, h = im.size

# Check top left (where back button was)
print("Top left corner (0:30, 0:50) mean luminance:", arr[0:30, 0:50].mean())
# Check top right (where heart/share were)
print("Top right corner (0:30, -50:):", arr[0:30, -50:].mean())
# Check bottom right (where 22 badge was)
print("Bottom right corner (-30:, -50:):", arr[-30:, -50:].mean())
# Check bottom center (where dots were)
print("Bottom center (-20:, 180:240):", arr[-20:, 180:240].mean())
