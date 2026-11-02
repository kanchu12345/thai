import subprocess, os, sys, imageio_ffmpeg

sys.stdout.reconfigure(encoding='utf-8')
ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()

out_dir = r"scratch\norm18"
os.makedirs(out_dir, exist_ok=True)

# 18 clips specification:
# (out_filename, src_path, start_time, duration, filter_type)
clips_spec = [
    # 00: Lotus Tower Close Orbit, Colombo (Nelum Kuluna)
    ("c00_lotus_tower_orbit.mp4", "scratch/lotus_tower_1080p.mp4", "00:01:14.0", 4.2, "lotus"),
    
    # 01: Colombo Skyline & Beira Lake Panorama
    ("c01_colombo_skyline.mp4", "scratch/lotus_tower_1080p.mp4", "00:02:52.0", 4.2, "lotus"),
    
    # 02: Sacred Anuradhapura & Nuwara Wewa Lake (Zero people)
    ("c02_anu_lake.mp4", "scratch/hd_clips/anu_lake_clean.mp4", "00:00:00.5", 4.2, "standard"),
    
    # 03: Colossal Jetavanaramaya Stupa (Zero people)
    ("c03_jetavana.mp4", "scratch/hd_clips/anu_jetavana.mp4", "00:00:01.0", 4.2, "standard"),
    
    # 04: Sigiriya Ancient Rock Citadel
    ("c04_sigiriya.mp4", "scratch/hd_clips/sl_sigiriya.mp4", "00:00:00.5", 4.2, "standard"),
    
    # 05: Sigiriya Lion's Paw Terrace
    ("c05_sigiriya_paws.mp4", "scratch/hd_clips/sl_sigiriya_paws.mp4", "00:00:01.0", 4.2, "standard"),
    
    # 06: Dambulla Golden Cave Temple Mountain
    ("c06_dambulla.mp4", "scratch/hd_clips/sl_dambulla.mp4", "00:00:00.5", 4.2, "standard"),
    
    # 07: Nine Arch Demodara Bridge Ella
    ("c07_nine_arch.mp4", "scratch/hd_clips/sl_nine_arch.mp4", "00:00:01.0", 4.2, "standard"),
    
    # 08: Diyaluma Cascading Mountain Waterfall
    ("c08_diyaluma.mp4", "scratch/hd_clips/sl_diyaluma.mp4", "00:00:00.0", 4.2, "standard"),
    
    # 09: Ambuluwawa Biodiversity Tower Spire
    ("c09_ambuluwawa.mp4", "scratch/hd_clips/sl_ambuluwawa.mp4", "00:00:00.5", 4.2, "standard"),
    
    # 10: Kandy Sacred Hill Capital & City Valley
    ("c10_kandy_city.mp4", "scratch/hd_clips/sl_kandy_true.mp4", "00:00:01.0", 4.2, "standard"),
    
    # 11: Ramboda Highland Falls
    ("c11_ramboda_falls.mp4", "scratch/hd_clips/sl_ramboda_true.mp4", "00:00:01.0", 4.2, "standard"),
    
    # 12: Maskeliya & Nuwara Eliya Tea Country
    ("c12_tea_lake.mp4", "scratch/hd_clips/sl_tea_lake.mp4", "00:00:00.5", 4.2, "standard"),
    
    # 13: Wild Elephant Gathering Kaudulla
    ("c13_elephants.mp4", "scratch/hd_clips/sl_elephants.mp4", "00:00:00.0", 4.2, "standard"),
    
    # 14: Yala National Park Savanna Wildlife
    ("c14_yala.mp4", "scratch/hd_clips/sl_yala_wildlife.mp4", "00:00:00.5", 4.2, "standard"),
    
    # 15: Galle Dutch Fort Ocean Ramparts
    ("c15_galle_fort.mp4", "scratch/hd_clips/sl_galle_fort.mp4", "00:00:01.0", 4.2, "standard"),
    
    # 16: Bentota Beach & Golden Coast
    ("c16_bentota.mp4", "scratch/hd_clips/sl_beach.mp4", "00:00:00.5", 4.2, "standard"),
    
    # 17: Dondra Head Lighthouse Ocean Cliff
    ("c17_dondra_light.mp4", "scratch/hd_clips/sl_dondra_true.mp4", "00:00:01.0", 4.2, "standard"),
]

# Filters:
# Standard: crop bottom 12% to remove burned-in blurry text + logos, Lanczos scale to 1080p, 30fps, vibrant color
vf_standard = "crop=iw*0.88:ih*0.88:iw*0.06:ih*0.02,scale=1920:1080:flags=lanczos,fps=30,eq=contrast=1.04:saturation=1.06:brightness=0.01"
# Lotus: crop 10% to eliminate corner watermark, scale to 1080p, 30fps
vf_lotus = "crop=iw*0.90:ih*0.90:iw*0.05:ih*0.05,scale=1920:1080:flags=lanczos,fps=30,eq=contrast=1.04:saturation=1.06:brightness=0.01"

print(f"Normalizing {len(clips_spec)} clips...")
for idx, (out_fn, src, ss, dur, ftype) in enumerate(clips_spec):
    out_path = os.path.join(out_dir, out_fn)
    vf = vf_lotus if ftype == "lotus" else vf_standard
    cmd = [
        ffmpeg_exe, '-y',
        '-ss', ss,
        '-t', str(dur),
        '-i', src,
        '-vf', vf,
        '-c:v', 'libx264',
        '-preset', 'fast',
        '-crf', '19',
        '-an',
        out_path
    ]
    res = subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE, text=True)
    if res.returncode != 0:
        print(f"Error on {out_fn}: {res.stderr[-500:]}")
    else:
        # Extract verification frame at 2.0s
        vf_frame = os.path.join(out_dir, f"vf_{idx:02d}_{out_fn.replace('.mp4', '.jpg')}")
        subprocess.run([
            ffmpeg_exe, '-y', '-ss', '00:00:02.0', '-i', out_path,
            '-vframes', '1', '-q:v', '2', vf_frame
        ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        print(f"Done [{idx+1}/{len(clips_spec)}]: {out_fn}")

print("All 18 normalized clips generated successfully!")
