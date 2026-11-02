import subprocess, os, sys, imageio_ffmpeg
from PIL import Image, ImageDraw

sys.stdout.reconfigure(encoding='utf-8')
ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()

scenes = [
    (0.0, 3.6, 1.8, "Lotus Tower Blossom Orbit", "Iconic Capital Landmark (350m)"),
    (3.6, 7.2, 5.4, "Colombo Maritime Capital", "Beira Lake & Ocean Horizon"),
    (7.2, 10.8, 9.0, "Sacred Anuradhapura & Nuwara Wewa", "Ancient Buddhist Capital (4th c. BCE)"),
    (10.8, 14.4, 12.6, "Colossal Jetavanaramaya Stupa", "UNESCO Sacred Heritage & Monasteries"),
    (14.4, 18.0, 16.2, "Sigiriya Ancient Rock Citadel", "5th Century Royal Sky Palace"),
    (18.0, 21.6, 19.8, "Sigiriya Lion's Paw Terrace", "Royal Ascent & Ancient Ramparts"),
    (21.6, 25.2, 23.4, "Dambulla Golden Rock Temple", "Sacred Cave Monastery & Murals"),
    (25.2, 28.8, 27.0, "Nine Arch Demodara Bridge", "Highland Colonial Railway, Ella"),
    (28.8, 32.4, 30.6, "Diyaluma Cascading Waterfall", "Highland Mountain Rapids, Koslanda"),
    (32.4, 36.0, 34.2, "Ambuluwawa Biodiversity Spire", "Misty 360° Mountain Summit, Gampola"),
    (36.0, 39.6, 37.8, "Kandy Sacred Hill Capital", "Last Royal Kingdom & Sacred Valley"),
    (39.6, 43.2, 41.4, "Anuradhapura Sacred Parklands", "Ancient Monasteries & Royal Gardens"),
    (43.2, 46.8, 45.0, "Maskeliya & Nuwara Eliya Valleys", "Pure Ceylon Tea Country & Lakes"),
    (46.8, 50.4, 48.6, "Wild Elephant Gathering", "Kaudulla & Minneriya Sanctuaries"),
    (50.4, 54.0, 52.2, "Yala National Park Wilderness", "Untamed Wildlife & Open Savannas"),
    (54.0, 57.6, 55.8, "Galle Dutch Fort Ramparts", "UNESCO 17th Century Living Citadel"),
    (57.6, 61.2, 59.4, "Bentota Golden Beach", "Pristine Southwest Turquoise Coast"),
    (61.2, 66.0, 63.2, "Dondra Head Lighthouse", "Southernmost Tip of Sri Lanka")
]

os.makedirs('scratch/final_movie_frames', exist_ok=True)
for idx, (st, en, mid, title, sub) in enumerate(scenes):
    out_f = f"scratch/final_movie_frames/f_{idx:02d}_{mid:.1f}s.jpg"
    subprocess.run([
        ffmpeg_exe, '-y', '-ss', str(mid), '-i', 'assets/videos/hero-banner.mp4',
        '-vframes', '1', '-q:v', '2', out_f
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print(f"Extracted [{idx+1}/{len(scenes)}] at {mid:.1f}s: {title}")

# Make contact grid
cols = 3
rows = (len(scenes) + cols - 1) // cols
tw, th = 600, 338
grid = Image.new('RGB', (cols * tw, rows * (th + 32)), (10, 10, 10))
draw = ImageDraw.Draw(grid)

for idx, (st, en, mid, title, sub) in enumerate(scenes):
    r = idx // cols
    c = idx % cols
    fp = f"scratch/final_movie_frames/f_{idx:02d}_{mid:.1f}s.jpg"
    im = Image.open(fp).resize((tw, th), Image.Resampling.LANCZOS)
    x = c * tw
    y = r * (th + 32)
    grid.paste(im, (x, y))
    draw.rectangle([(x, y + th), (x + tw, y + th + 32)], fill=(0, 0, 0))
    label = f"{idx:02d} [{st:.1f}s-{en:.1f}s]: {title}"
    draw.text((x + 12, y + th + 8), label, fill=(255, 215, 0))

out_p = r"C:\Users\kanch\.gemini\antigravity\brain\6a298d6d-6ff0-456a-818c-0f520d14ffcc\final_movie_grid.jpg"
grid.save(out_p, quality=88)
print("Saved final movie grid to", out_p)
