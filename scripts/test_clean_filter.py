import subprocess, imageio_ffmpeg, os
ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()

for fn in ['t_0040_00m40s.jpg', 't_0580_09m40s.jpg', 't_0000_00m00s.jpg', 't_0700_11m40s.jpg']:
    src = os.path.join('scratch/sl4k_scenes', fn)
    out = os.path.join('scratch', 'clean_' + fn)
    # Gentle zoom: crop width/height by 12%, offset slightly towards top so bottom text is safely cropped out
    cmd = [
        ffmpeg_exe, '-y', '-i', src,
        '-vf', 'crop=iw*0.88:ih*0.88:iw*0.06:ih*0.02,scale=1920:1080:flags=lanczos',
        out
    ]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print("Processed:", out)
