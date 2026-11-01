import os, glob

keep = {
    'ella-tea-making-experience.webp',
    'ella-tea-making-banner.webp',
    'ella-tea-making-thumb.webp'
}

for f in glob.glob('assets/images/blog/*'):
    bn = os.path.basename(f)
    if bn not in keep:
        os.remove(f)
        print("Removed temp file:", bn)

print("Remaining assets in assets/images/blog/:", os.listdir('assets/images/blog'))
