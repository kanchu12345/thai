import os
import glob
from PIL import Image, ImageChops
import numpy as np

before_dir = 'rollout-screens/before'
after_dir = 'rollout-screens/after'
diff_dir = 'rollout-screens/diff'
os.makedirs(diff_dir, exist_ok=True)

files = sorted(os.listdir(before_dir))

print(f"{'Filename':<45} | {'Dimensions':<15} | {'Diff Pixels':<12} | {'Diff %':<8}")
print("-" * 90)

results = []

for fname in files:
    if not fname.endswith('.png'):
        continue
    b_path = os.path.join(before_dir, fname)
    a_path = os.path.join(after_dir, fname)
    if not os.path.exists(a_path):
        continue

    img_b = Image.open(b_path).convert('RGBA')
    img_a = Image.open(a_path).convert('RGBA')

    # Ensure same dimensions
    w = max(img_b.width, img_a.width)
    h = max(img_b.height, img_a.height)

    if img_b.size != (w, h):
        canvas_b = Image.new('RGBA', (w, h), (0, 0, 0, 0))
        canvas_b.paste(img_b, (0, 0))
        img_b = canvas_b

    if img_a.size != (w, h):
        canvas_a = Image.new('RGBA', (w, h), (0, 0, 0, 0))
        canvas_a.paste(img_a, (0, 0))
        img_a = canvas_a

    arr_b = np.array(img_b)
    arr_a = np.array(img_a)

    # Difference mask (RGB channels with threshold > 5 to disregard rendering subpixel anti-aliasing)
    diff_mask = np.any(np.abs(arr_b[:, :, :3].astype(int) - arr_a[:, :, :3].astype(int)) > 5, axis=-1)
    diff_count = int(np.sum(diff_mask))
    total_pixels = w * h
    diff_pct = (diff_count / total_pixels) * 100.0

    # Create visual diff image if any difference
    if diff_count > 0:
        diff_arr = np.zeros((h, w, 4), dtype=np.uint8)
        diff_arr[~diff_mask] = (arr_a[~diff_mask] * 0.35).astype(np.uint8)
        diff_arr[diff_mask] = [255, 0, 128, 255]
        Image.fromarray(diff_arr).save(os.path.join(diff_dir, f"diff_{fname}"))

    results.append({
        'file': fname,
        'dimensions': f"{w}x{h}",
        'diff_pixels': diff_count,
        'diff_pct': diff_pct
    })

    print(f"{fname:<45} | {f'{w}x{h}':<15} | {diff_count:<12} | {diff_pct:.4f}%")

avg_diff = sum(r['diff_pct'] for r in results) / len(results) if results else 0
print("-" * 90)
print(f"Total Images Compared: {len(results)} | Mean Pixel Difference: {avg_diff:.4f}%")
