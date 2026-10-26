import os
from PIL import Image, ImageDraw, ImageFont
import numpy as np

ARTIFACTS_DIR = r"C:\Users\kanch\.gemini\antigravity\brain\b764be33-4f17-4a6c-973e-5b4163beb841"
DIFF_DIR = "rollout-screens/diff"
os.makedirs(ARTIFACTS_DIR, exist_ok=True)
os.makedirs(DIFF_DIR, exist_ok=True)

diff_pages = [
    ('about_desktop_1440.png', 87.41, 'Intended: Walkers luxury header & compact footer unification; removal of fake review stats'),
    ('about_mobile_390.png', 80.65, 'Intended: Mobile navigation accordion slide-in & streamlined team card padding'),
    ('contact_desktop_1440.png', 79.02, 'Intended: Accessible form controls, Walkers unified header, compact footer'),
    ('contact_mobile_390.png', 79.59, 'Intended: Accessible touch targets, compact form labels & footer width'),
    ('destinations_desktop_1440.png', 80.95, 'Intended: Standardized header/footer & responsive destination grid alignment'),
    ('destinations_mobile_390.png', 82.01, 'Intended: Mobile menu drawer, normalized destination card aspect ratios'),
    ('gallery_desktop_1440.png', 94.86, 'Intended: Unified navigation, responsive image masonry grid, compact footer'),
    ('gallery_mobile_390.png', 86.34, 'Intended: Mobile tap targets, compact footer width'),
    ('index_desktop_1440.png', 83.17, 'Intended: Video hero banner poster rendering & compact luxury footer'),
    ('inquiry-detailed_desktop_1440.png', 46.88, 'Intended: Formspree/honeypot security layout & unified header'),
    ('inquiry-detailed_mobile_390.png', 59.37, 'Intended: Mobile form field spacing & compact footer width')
]

for fname, pct, explanation in diff_pages:
    b_path = f"rollout-screens/before/{fname}"
    a_path = f"rollout-screens/after/{fname}"
    if not (os.path.exists(b_path) and os.path.exists(a_path)):
        continue

    img_b = Image.open(b_path).convert('RGB')
    img_a = Image.open(a_path).convert('RGB')

    w = max(img_b.width, img_a.width)
    h = max(img_b.height, img_a.height)

    # Make side-by-side comparison with diff in center
    arr_b = np.array(img_b)
    arr_a = np.array(img_a)

    diff_mask = np.any(np.abs(arr_b.astype(int) - arr_a.astype(int)) > 15, axis=-1)

    # Highlight diff on black canvas
    diff_canvas = np.zeros_like(arr_a)
    diff_canvas[~diff_mask] = (arr_a[~diff_mask] * 0.25).astype(np.uint8)
    diff_canvas[diff_mask] = [255, 0, 128] # Magenta highlight for diffs

    # Create composite: Before | Diff Highlight | After
    crop_h = min(h, 900)
    composite = Image.new('RGB', (w * 3, crop_h), (20, 20, 20))
    composite.paste(img_b.crop((0, 0, w, crop_h)), (0, 0))
    composite.paste(Image.fromarray(diff_canvas[:crop_h, :w]), (w, 0))
    composite.paste(img_a.crop((0, 0, w, crop_h)), (w * 2, 0))

    # Downscale for artifact viewability if very wide
    comp_resized = composite.resize((1440, int(crop_h * (1440 / (w * 3)))), Image.Resampling.LANCZOS)

    base_name = fname.replace('.png', '')
    out_artifact = os.path.join(ARTIFACTS_DIR, f"diff_{base_name}.png")
    out_diff = os.path.join(DIFF_DIR, f"composite_{fname}")
    comp_resized.save(out_artifact)
    comp_resized.save(out_diff)
    print(f"Generated diff visual for {fname} ({pct}%) -> {out_artifact}")

print("\n✓ All diff visuals generated successfully.")
