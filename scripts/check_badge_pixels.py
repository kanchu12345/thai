from PIL import Image
import numpy as np

im = Image.open('assets/images/blog/test_corner.png').convert('RGB')
arr = np.array(im)
# Find any bright pixels > 240
bright = np.where(arr > 240)
print("Bright pixels count in corner:", len(bright[0]))

raw_c = Image.open('assets/images/blog/test_raw_corner.png').convert('RGB')
raw_arr = np.array(raw_c)
print("Bright pixels count in raw_corner:", len(np.where(raw_arr > 240)[0]))
