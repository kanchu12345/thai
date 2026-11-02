import os, sys
from PIL import Image
import numpy as np

# Load a sample frame that has text, e.g. scratch/sl4k_scenes/t_0040_00m40s.jpg
img = Image.open('scratch/sl4k_scenes/t_0040_00m40s.jpg')
w, h = img.size
print(f"Sample frame size: {w}x{h}")

# The text is at the bottom.
# In 1080p, the text is typically within the bottom 60-80 pixels (e.g. y = 1000 to 1080).
# Let's crop from y = 0 to y = h - int(h * 0.08)
# That removes the bottom 8% completely!
# Then we scale back to 1920x1080 (or pad, or crop slightly equally).
# Cropping top 2% and bottom 7% keeps the exact 16:9 aspect ratio without any stretching!
print(f"Crop test: remove bottom 8% of {h} = {int(h * 0.08)}px")
