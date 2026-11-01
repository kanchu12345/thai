import cv2, numpy as np

# Load raw crop
img = cv2.imread('assets/images/blog/raw_crop.png')
h, w = img.shape[:2]

# Create inpainting mask (zeros)
mask = np.zeros((h, w), dtype=np.uint8)

# 1. Back button (top left circle)
# Approx center (54, 40), radius 26
cv2.circle(mask, (54, 40), 26, 255, -1)

# 2. Heart button (top right circle)
# Approx center (348, 40), radius 26
cv2.circle(mask, (348, 40), 26, 255, -1)

# 3. Share button (top right circle)
# Approx center (408, 40), radius 26
cv2.circle(mask, (408, 40), 26, 255, -1)

# 4. Badge 22 (bottom right pill)
# Approx x: 345 to 430, y: 395 to 442
cv2.rectangle(mask, (340, 395), (435, 445), 255, -1)

# 5. Carousel dots (bottom center)
# Approx x: 195 to 265, y: 410 to 430
cv2.rectangle(mask, (190, 410), (270, 430), 255, -1)

# Inpaint using cv2.INPAINT_TELEA
inpainted = cv2.inpaint(img, mask, inpaintRadius=5, flags=cv2.INPAINT_TELEA)

# Let's save both full inpainted and a slight crop to ensure clean edges
cv2.imwrite('assets/images/blog/inpainted_full.png', inpainted)

# Also let's check: resize to high definition (1200 x 1200 or 1200 x 800)
# The full photo aspect ratio is 460 x 460 (1:1 square)
# Many blog hero/cards prefer 16:9 or 4:3 or standard hero aspect.
# Let's produce:
# 1) Standard blog card image (4:3 / 16:9 landscape):
#    Cropped from y=20 to y=430 -> height=410, width=460.
#    Resized to 920 x 820 or 800 x 533 (1.5:1)
landscape_card = inpainted[15:435, :]
landscape_resized = cv2.resize(landscape_card, (920, 840), interpolation=cv2.INTER_LANCZOS4)
cv2.imwrite('assets/images/blog/ella-tea-making-experience.webp', landscape_resized, [cv2.IMWRITE_WEBP_QUALITY, 92])

# Standard 16:9 banner:
banner = inpainted[45:415, :]
banner_resized = cv2.resize(banner, (1200, 675), interpolation=cv2.INTER_LANCZOS4)
cv2.imwrite('assets/images/blog/ella-tea-making-banner.webp', banner_resized, [cv2.IMWRITE_WEBP_QUALITY, 92])

# Card thumbnail (600x400):
thumb = cv2.resize(inpainted[20:420, :], (600, 400), interpolation=cv2.INTER_LANCZOS4)
cv2.imwrite('assets/images/blog/ella-tea-making-thumb.webp', thumb, [cv2.IMWRITE_WEBP_QUALITY, 90])

print("Successfully inpainted and generated WebP assets:")
print(" - assets/images/blog/ella-tea-making-experience.webp (920x840)")
print(" - assets/images/blog/ella-tea-making-banner.webp (1200x675)")
print(" - assets/images/blog/ella-tea-making-thumb.webp (600x400)")
