import subprocess, sys
sys.stdout.reconfigure(encoding='utf-8')

dl_targets = [
    ('sl_sigiriya_paws.mp4', '*09:18-09:25'),
    ('sl_kandy_true.mp4', '*09:59-10:06'),
    ('sl_ramboda_true.mp4', '*04:18-04:25'),
    ('sl_galle_fort.mp4', '*01:39-01:46'),
]

for out_fn, sec in dl_targets:
    out_path = f"scratch/hd_clips/{out_fn}"
    cmd = [
        'yt-dlp', '--download-sections', sec,
        '-f', '137/bestvideo[height<=1080]/best',
        '-o', out_path,
        'https://youtu.be/IPpiw_LWDBA'
    ]
    print(f"Downloading {out_fn} ({sec})...")
    subprocess.run(cmd)
    print(f"Done {out_fn}!")
