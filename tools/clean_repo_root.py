import os
import shutil
import glob

ROOT_DIR = os.getcwd()
archive_dir = os.path.join(ROOT_DIR, "archive")
os.makedirs(archive_dir, exist_ok=True)

# 1. Move wildlife-tours.zip
zip_path = os.path.join(ROOT_DIR, "wildlife-tours.zip")
if os.path.exists(zip_path):
    dest_zip = os.path.join(archive_dir, "wildlife-tours.zip")
    if os.path.exists(dest_zip):
        os.remove(dest_zip)
    shutil.move(zip_path, archive_dir)
    print("Moved wildlife-tours.zip to archive/")

# 2. Move 16 root icon_*.png
icons = glob.glob(os.path.join(ROOT_DIR, "icon_*.png"))
for ic in icons:
    dest_ic = os.path.join(archive_dir, os.path.basename(ic))
    if os.path.exists(dest_ic):
        os.remove(dest_ic)
    shutil.move(ic, archive_dir)
    print(f"Moved {os.path.basename(ic)} to archive/")

# 3. Update .gitignore
gitignore_path = os.path.join(ROOT_DIR, ".gitignore")
with open(gitignore_path, 'r', encoding='utf-8') as f:
    gi_content = f.read()

rules_to_add = ["archive/", "*.zip", "tools/*_results.json"]
for r in rules_to_add:
    if r not in gi_content:
        gi_content += f"\n{r}"

with open(gitignore_path, 'w', encoding='utf-8') as f:
    f.write(gi_content.strip() + "\n")
print("Updated .gitignore with archive/ and *.zip rules.")
