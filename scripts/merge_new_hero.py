import subprocess, os, sys, imageio_ffmpeg

sys.stdout.reconfigure(encoding='utf-8')
ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()

norm_dir = r"scratch\norm18"
output_file = r"assets\videos\hero-banner.mp4"

clips = [
    "c00_lotus_flower.mp4",
    "c01_lotus_tower_full.mp4",
    "c02_anu_lake.mp4",
    "c03_jetavana.mp4",
    "c04_sigiriya.mp4",
    "c05_sigiriya_paws.mp4",
    "c06_dambulla.mp4",
    "c07_nine_arch.mp4",
    "c08_diyaluma.mp4",
    "c09_ambuluwawa.mp4",
    "c10_kandy_city.mp4",
    "c11_ramboda_falls.mp4",
    "c12_tea_lake.mp4",
    "c13_elephants.mp4",
    "c14_yala.mp4",
    "c15_galle_fort.mp4",
    "c16_bentota.mp4",
    "c17_dondra_light.mp4"
]

# Get exact duration of each clip
durations = []
for c in clips:
    path = os.path.join(norm_dir, c)
    res = subprocess.run([ffmpeg_exe, "-i", path], capture_output=True, text=True)
    dur = 4.2 # fallback
    for line in res.stderr.splitlines():
        if "Duration:" in line:
            # Duration: 00:00:10.00,
            parts = line.split("Duration:")[1].split(",")[0].strip().split(":")
            dur = float(parts[0])*3600 + float(parts[1])*60 + float(parts[2])
            break
    durations.append(dur)
    print(f"{c}: {dur:.2f}s")

trans_len = 0.6
cmd = [ffmpeg_exe, "-y"]
for c in clips:
    cmd.extend(["-i", os.path.join(norm_dir, c)])

# Build xfade filter chain
filter_parts = []
prev_label = "[0:v]"
current_offset = durations[0] - trans_len

scene_timestamps = []
# Scene 0
scene_timestamps.append((0.0, current_offset))

for i in range(1, len(clips)):
    next_input = f"[{i}:v]"
    out_label = f"[v{i}]" if i < len(clips) - 1 else "[outv]"
    filter_parts.append(
        f"{prev_label}{next_input}xfade=transition=fade:duration={trans_len}:offset={current_offset:.2f}{out_label}"
    )
    prev_label = out_label
    start_t = current_offset
    current_offset += (durations[i] - trans_len)
    scene_timestamps.append((start_t, current_offset))

filter_complex = ";".join(filter_parts)

cmd.extend([
    "-filter_complex", filter_complex,
    "-map", "[outv]",
    "-c:v", "libx264",
    "-preset", "medium",
    "-crf", "20",
    "-pix_fmt", "yuv420p",
    "-movflags", "+faststart",
    "-an",
    output_file
])

print(f"Total calculated duration: {current_offset:.2f}s")
print(f"Running ffmpeg merge of {len(clips)} clips to {output_file}...")
res = subprocess.run(cmd, capture_output=True, text=True)
if res.returncode != 0:
    print("FFmpeg error:", res.stderr[-500:])
    sys.exit(1)

print("Merge completed successfully!")

# Print timestamps for index.html scenes
titles_info = [
    ("Lotus Blossom Sanctuaries", "Sacred Waters of Ceylon"),
    ("Lotus Tower and Colombo Skyline", "Iconic Capital Landmark (350m)"),
    ("Sacred Anuradhapura and Nuwara Wewa", "Ancient Buddhist Capital (4th c. BCE)"),
    ("Colossal Jetavanaramaya Stupa", "UNESCO Sacred Heritage and Monasteries"),
    ("Sigiriya Ancient Rock Citadel", "5th Century Royal Sky Palace"),
    ("Sigiriya Lion's Paw Terrace", "Royal Ascent and Ancient Ramparts"),
    ("Dambulla Golden Rock Temple", "Sacred Cave Monastery and Murals"),
    ("Nine Arch Demodara Bridge", "Highland Colonial Railway, Ella"),
    ("Diyaluma Cascading Waterfall", "Highland Mountain Rapids, Koslanda"),
    ("Ambuluwawa Biodiversity Spire", "Misty 360° Mountain Summit, Gampola"),
    ("Kandy Sacred Hill Capital", "Last Royal Kingdom and Sacred Valley"),
    ("Ramboda Highland Falls", "Mist-Shrouded Tea Valley Cascades"),
    ("Maskeliya and Nuwara Eliya Valleys", "Pure Ceylon Tea Country and Lakes"),
    ("Wild Elephant Gathering", "Kaudulla and Minneriya Sanctuaries"),
    ("Yala National Park Wilderness", "Untamed Wildlife and Open Savannas"),
    ("Galle Dutch Fort Ramparts", "UNESCO 17th Century Living Citadel"),
    ("Bentota Golden Beach", "Pristine Southwest Turquoise Coast"),
    ("Dondra Head Lighthouse", "Southernmost Tip of Sri Lanka")
]

print("\n--- NEW SCENES FOR INDEX.HTML ---")
for idx, ((st, en), (title, sub)) in enumerate(zip(scene_timestamps, titles_info)):
    print(f"    {{ start: {st:.1f}, end: {en:.1f}, title: '{title}', sub: '{sub}' }},")
