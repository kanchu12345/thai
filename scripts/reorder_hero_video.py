import subprocess, os, sys, imageio_ffmpeg, re

sys.stdout.reconfigure(encoding='utf-8')
ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()

norm_dir = r"scratch\norm18"
output_file = r"assets\videos\hero-banner.mp4"

# New requested order:
# 1. Lotus Flower
# 2. Lotus Tower
# 3. Sigiriya Citadel
# 4. Sigiriya Lion's Paw
# 5. Anuradhapura Nuwara Wewa Lake
# 6. Colossal Jetavanaramaya Stupa
# 7. Then the rest in order (Dambulla, Nine Arch, etc.)
clips_data = [
    ("c00_lotus_flower.mp4", "Lotus Blossom Sanctuaries", "Sacred Waters of Ceylon"),
    ("c01_lotus_tower_full.mp4", "Lotus Tower and Colombo Skyline", "Iconic Capital Landmark (350m)"),
    ("c04_sigiriya.mp4", "Sigiriya Ancient Rock Citadel", "5th Century Royal Sky Palace"),
    ("c05_sigiriya_paws.mp4", "Sigiriya Lion's Paw Terrace", "Royal Ascent and Ancient Ramparts"),
    ("c02_anu_lake.mp4", "Sacred Anuradhapura and Nuwara Wewa", "Ancient Buddhist Capital (4th c. BCE)"),
    ("c03_jetavana.mp4", "Colossal Jetavanaramaya Stupa", "UNESCO Sacred Heritage and Monasteries"),
    ("c06_dambulla.mp4", "Dambulla Golden Rock Temple", "Sacred Cave Monastery and Murals"),
    ("c07_nine_arch.mp4", "Nine Arch Demodara Bridge", "Highland Colonial Railway, Ella"),
    ("c08_diyaluma.mp4", "Diyaluma Cascading Waterfall", "Highland Mountain Rapids, Koslanda"),
    ("c09_ambuluwawa.mp4", "Ambuluwawa Biodiversity Spire", "Misty 360° Mountain Summit, Gampola"),
    ("c10_kandy_city.mp4", "Kandy Sacred Hill Capital", "Last Royal Kingdom and Sacred Valley"),
    ("c11_ramboda_falls.mp4", "Ramboda Highland Falls", "Mist-Shrouded Tea Valley Cascades"),
    ("c12_tea_lake.mp4", "Maskeliya and Nuwara Eliya Valleys", "Pure Ceylon Tea Country and Lakes"),
    ("c13_elephants.mp4", "Wild Elephant Gathering", "Kaudulla and Minneriya Sanctuaries"),
    ("c14_yala.mp4", "Yala National Park Wilderness", "Untamed Wildlife and Open Savannas"),
    ("c15_galle_fort.mp4", "Galle Dutch Fort Ramparts", "UNESCO 17th Century Living Citadel"),
    ("c16_bentota.mp4", "Bentota Golden Beach", "Pristine Southwest Turquoise Coast"),
    ("c17_dondra_light.mp4", "Dondra Head Lighthouse", "Southernmost Tip of Sri Lanka")
]

clips = [c[0] for c in clips_data]

# Get exact duration of each clip
durations = []
for c in clips:
    path = os.path.join(norm_dir, c)
    if not os.path.exists(path):
        print(f"Error: Missing clip {path}")
        sys.exit(1)
    res = subprocess.run([ffmpeg_exe, "-i", path], capture_output=True, text=True)
    dur = 4.17
    for line in res.stderr.splitlines():
        if "Duration:" in line:
            parts = line.split("Duration:")[1].split(",")[0].strip().split(":")
            dur = float(parts[0])*3600 + float(parts[1])*60 + float(parts[2])
            break
    durations.append(dur)
    print(f"Clip {c}: {dur:.2f}s")

trans_len = 0.6
cmd = [ffmpeg_exe, "-y"]
for c in clips:
    cmd.extend(["-i", os.path.join(norm_dir, c)])

# Build xfade filter chain
filter_parts = []
prev_label = "[0:v]"
current_offset = durations[0] - trans_len

scene_timestamps = []
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

print(f"\nTotal calculated duration: {current_offset:.2f}s")
print(f"Merging {len(clips)} clips to {output_file}...")
res = subprocess.run(cmd, capture_output=True, text=True)
if res.returncode != 0:
    print("FFmpeg error:", res.stderr[-1000:])
    sys.exit(1)

size_mb = os.path.getsize(output_file) / (1024 * 1024)
print(f"Merge SUCCESS! Output size: {size_mb:.2f} MB")

# Build scenes array string for index.html
scenes_code = "  var scenes = [\n"
for idx, ((st, en), (_, title, sub)) in enumerate(zip(scene_timestamps, clips_data)):
    comma = "," if idx < len(clips_data) - 1 else ""
    escaped_title = title.replace("'", "\\'")
    escaped_sub = sub.replace("'", "\\'")
    scenes_code += f"    {{ start: {st:.1f}, end: {en:.1f}, title: '{escaped_title}', sub: '{escaped_sub}' }}{comma}\n"
scenes_code += "  ];"

print("\n--- UPDATED SCENES JS ---")
print(scenes_code)

# Update index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

pattern = r'  var scenes = \[\s*\{ start: 0\.0.*?\}\s*\];'
if re.search(pattern, html, re.DOTALL):
    html = re.sub(pattern, scenes_code, html, flags=re.DOTALL)
    print("\nUpdated scenes array in index.html")
else:
    print("\nWarning: Could not find scenes array in index.html via regex!")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Successfully written changes to index.html")
