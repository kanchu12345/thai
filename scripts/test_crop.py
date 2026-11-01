import sys, os
from PIL import Image
sys.stdout.reconfigure(encoding='utf-8')

src_path = r'C:/Users/kanch/.gemini/antigravity/brain/6a298d6d-6ff0-456a-818c-0f520d14ffcc/.user_uploaded/media_1793553267950_97207282.png'
im = Image.open(src_path)
print("Source mode:", im.mode, "size:", im.size)

# Ensure assets/images/blog directory exists
os.makedirs('assets/images/blog', exist_ok=True)

# Raw photo is approximately (0, 48, 460, 508)
raw_photo = im.crop((0, 48, 460, 508))
raw_photo.save('assets/images/blog/raw_crop.png')
print("Saved raw crop (0, 48, 460, 508)")
