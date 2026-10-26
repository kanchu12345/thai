import os

def check_asset_sizes():
    assets = []
    total_size = 0
    for root, dirs, files in os.walk('.'):
        if '.git' in root: continue
        for f in files:
            p = os.path.normpath(os.path.join(root, f))
            try:
                sz = os.path.getsize(p)
                total_size += sz
                assets.append((p, sz))
            except Exception:
                pass

    assets.sort(key=lambda x: x[1], reverse=True)
    print(f"Total repo size (excluding .git): {total_size / (1024*1024):.2f} MB")
    print("\nTop 20 Largest Files:")
    for path, sz in assets[:20]:
        print(f"  {sz / (1024*1024):.2f} MB ({sz:,} bytes) - {path}")

    # Check for archive files or duplicates
    archives = [p for p, sz in assets if p.endswith(('.zip', '.tar', '.gz', '.rar', '.7z'))]
    print(f"\nArchives found: {archives}")

    # Check root images
    root_imgs = [p for p, sz in assets if os.path.dirname(p) == '.' and p.lower().endswith(('.png', '.jpg', '.jpeg', '.webp'))]
    print(f"\nRoot level images found: {root_imgs}")

check_asset_sizes()
