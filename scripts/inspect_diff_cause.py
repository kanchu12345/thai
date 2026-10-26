import os
from PIL import Image
import numpy as np

fname = 'index_desktop_1440.png'
img_b = Image.open(f'rollout-screens/before/{fname}').convert('RGB')
img_a = Image.open(f'rollout-screens/after/{fname}').convert('RGB')

print("Before size:", img_b.size)
print("After size:", img_a.size)

# Sample some pixel colors across both
arr_b = np.array(img_b)
arr_a = np.array(img_a)

print("Before top-left 10x10 mean RGB:", arr_b[:10, :10].mean(axis=(0,1)))
print("After top-left 10x10 mean RGB:", arr_a[:10, :10].mean(axis=(0,1)))

# Let's see where differences start
diff = np.abs(arr_b.astype(int) - arr_a.astype(int))
row_diffs = np.any(diff > 10, axis=(1,2))
diff_rows = np.where(row_diffs)[0]
if len(diff_rows) > 0:
    print(f"Diff starts at row Y={diff_rows[0]} and ends at row Y={diff_rows[-1]}")
    # Crop a 400px tall slice around where diff starts and save
    y_start = max(0, diff_rows[0] - 20)
    y_end = min(img_b.height, y_start + 400)
    slice_b = img_b.crop((0, y_start, img_b.width, y_end))
    slice_a = img_a.crop((0, y_start, img_a.width, y_end))
    slice_b.save('rollout-screens/diff/slice_before_index.png')
    slice_a.save('rollout-screens/diff/slice_after_index.png')
    print("Saved slice_before_index.png and slice_after_index.png")
