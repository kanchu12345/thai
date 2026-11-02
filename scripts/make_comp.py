from PIL import Image, ImageDraw

def make_comp(orig_name, clean_name, out_name):
    orig = Image.open(orig_name).resize((960, 540))
    clean = Image.open(clean_name).resize((960, 540))
    comp = Image.new('RGB', (1920, 540))
    comp.paste(orig, (0, 0))
    comp.paste(clean, (960, 0))
    draw = ImageDraw.Draw(comp)
    draw.text((20, 20), "BEFORE: Burnt-in text at bottom", fill=(255, 50, 50))
    draw.text((980, 20), "AFTER: 100% Clean, No Blurry Text", fill=(50, 255, 50))
    comp.save(out_name, quality=90)

make_comp('scratch/sl4k_scenes/t_0580_09m40s.jpg', 'scratch/clean_t_0580_09m40s.jpg', 'scratch/comp_dondra.jpg')
make_comp('scratch/sl4k_scenes/t_0040_00m40s.jpg', 'scratch/clean_t_0040_00m40s.jpg', 'scratch/comp_dambulla.jpg')
print("Comparison images generated!")
