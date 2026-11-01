from PIL import Image

raw = Image.open('assets/images/blog/raw_crop.png').convert('RGB')

# Let's inspect rows 70 to 120
crop_test = raw.crop((0, 70, 460, 390))
crop_test.save('assets/images/blog/test_no_overlay.png')
print("Saved test_no_overlay.png, size:", crop_test.size)
