import subprocess, os, sys, imageio_ffmpeg

sys.stdout.reconfigure(encoding='utf-8')
ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()

norm_dir = r"scratch\norm18"
output_file = r"assets\videos\hero-banner.mp4"

clips = [
    "c00_lotus_tower_orbit.mp4",
    "c01_colombo_skyline.mp4",
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

for c in clips:
    path = os.path.join(norm_dir, c)
    if not os.path.exists(path):
        print(f"Error: missing clip {path}")
        sys.exit(1)

cmd = [ffmpeg_exe, "-y"]
for c in clips:
    cmd.extend(["-i", os.path.join(norm_dir, c)])

# Build xfade filter chain
filter_parts = []
prev_label = "[0:v]"
clip_len = 4.2
trans_len = 0.6
current_offset = clip_len - trans_len  # 3.6

for i in range(1, len(clips)):
    next_input = f"[{i}:v]"
    out_label = f"[v{i}]" if i < len(clips) - 1 else "[outv]"
    filter_parts.append(
        f"{prev_label}{next_input}xfade=transition=fade:duration={trans_len}:offset={current_offset:.2f}{out_label}"
    )
    prev_label = out_label
    current_offset += (clip_len - trans_len)

filter_complex = ";".join(filter_parts)

cmd.extend([
    "-filter_complex", filter_complex,
    "-map", "[outv]",
    "-c:v", "libx264",
    "-crf", "21",
    "-preset", "medium",
    "-b:v", "2600k",
    "-maxrate", "3500k",
    "-bufsize", "7000k",
    "-pix_fmt", "yuv420p",
    "-an",
    "-movflags", "+faststart",
    output_file
])

print(f"Running ffmpeg merge of {len(clips)} clips to {output_file}...")
res = subprocess.run(cmd, capture_output=True, text=True)
if res.returncode != 0:
    print("FFmpeg error:")
    print(res.stderr[-2000:])
    sys.exit(1)

size_mb = os.path.getsize(output_file) / (1024 * 1024)
print(f"Merge SUCCESS! File size: {size_mb:.2f} MB")
