from PIL import Image
import numpy as np

raw = Image.open('assets/images/blog/raw_crop.png').convert('RGB')
arr = np.array(raw)

# The white circular buttons have very bright pixels (> 245)
bright_mask = (arr[:, :, 0] > 240) & (arr[:, :, 1] > 240) & (arr[:, :, 2] > 240)

# Print bounding box of bright pixels in top region (y < 120)
top_bright = np.where(bright_mask[:120, :])
print("Top bright y min/max:", top_bright[0].min(), top_bright[0].max())
print("Top bright x min/max:", top_bright[1].min(), top_bright[1].max())

# Print bounding box of bright pixels in bottom region (y > 350)
bot_bright = np.where(bright_mask[350:, :])
print("Bottom bright y min/max in raw:", 350 + bot_bright[0].min(), 350 + bot_bright[0].max())
print("Bottom bright x min/max in raw:", bot_bright[1].min(), bot_bright[1].max())
