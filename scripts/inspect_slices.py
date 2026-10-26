from PIL import Image
import numpy as np

for page in ['index_desktop_1440', 'about_desktop_1440', 'contact_desktop_1440', 'destinations_desktop_1440', 'gallery_desktop_1440', 'inquiry-detailed_desktop_1440']:
    b = np.array(Image.open(f'rollout-screens/before/{page}.png').convert('RGB'))
    a = np.array(Image.open(f'rollout-screens/after/{page}.png').convert('RGB'))
    diff = np.abs(b.astype(int) - a.astype(int))
    row_diffs = np.any(diff > 10, axis=(1,2))
    rows = np.where(row_diffs)[0]
    print(f"{page:<32}: First diff row Y={rows[0] if len(rows) else 'None'}, Mean pixel intensity before={b.mean():.1f}, after={a.mean():.1f}")
