import os, sys, subprocess, imageio_ffmpeg
sys.stdout.reconfigure(encoding='utf-8')

ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
norm_dir = r"scratch\norm16"
clips = sorted([f for f in os.listdir(norm_dir) if f.endswith('.mp4')])
os.makedirs("scratch/clip_frames", exist_ok=True)

# Corresponding scenes from index.html:
scenes = [
    ("c00_lotus.mp4", "Lotus Blossom Sanctuaries", "Sacred Waters of Ceylon"),
    ("c01_anu_lake.mp4", "Sacred Anuradhapura & Lake", "Ancient Kingdom & Nuwara Wewa"),
    ("c02_jetavana.mp4", "Colossal Jetavanaramaya Stupa", "UNESCO Sacred Heritage & Monasteries"),
    ("c03_sigiriya.mp4", "Sigiriya Ancient Rock Citadel", "Eighth Wonder of the World"),
    ("c04_dambulla.mp4", "Dambulla Golden Cave Temple", "Sacred Monastic Mountain, Matale"),
    ("c05_diyaluma.mp4", "Diyaluma Cascading Waterfall", "Highland Mountain Rapids, Koslanda"),
    ("c06_ambuluwawa.mp4", "Ambuluwawa Biodiversity Tower", "Misty Mountain Spire, Gampola"),
    ("c07_nine_arch.mp4", "Nine Arch Demodara Bridge", "Misty Highland Train, Ella"),
    ("c08_kandy.mp4", "Kandy Sacred Hill Capital", "Royal Lake & Historic Sanctuaries"),
    ("c09_tea_lake.mp4", "Maskeliya & Nuwara Eliya Valleys", "Emerald Tea Country & Sacred Lakes"),
    ("c10_ramboda.mp4", "Ramboda Highland Falls", "Lush Tea Hills & Cascades"),
    ("c11_elephants.mp4", "Wild Elephant Gathering", "Kaudulla & Minneriya Sanctuaries"),
    ("c12_yala.mp4", "Yala National Park Wilderness", "Untamed Wildlife & Open Savannas"),
    ("c13_bentota.mp4", "Bentota Beach & Golden Sands", "Pristine Coast & Turquoise Waters"),
    ("c14_weligama.mp4", "Weligama & Mirissa Tropical Bay", "Azure Ocean & Coconut Palms"),
    ("c15_dondra.mp4", "Dondra Head Lighthouse", "Southernmost Tip & Deep Blue Ocean")
]

for filename, title, sub in scenes:
    in_path = os.path.join(norm_dir, filename)
    out_frame = os.path.join("scratch/clip_frames", filename.replace(".mp4", ".jpg"))
    if os.path.exists(in_path):
        subprocess.run([
            ffmpeg_exe, '-y', '-ss', '00:00:02.0', '-i', in_path,
            '-vframes', '1', '-q:v', '2', out_frame
        ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        print(f"Extracted {out_frame} for {title} - {sub}")
    else:
        print(f"MISSING: {in_path}")
