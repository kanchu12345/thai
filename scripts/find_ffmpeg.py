import imageio_ffmpeg, os

exe = imageio_ffmpeg.get_ffmpeg_exe()
print("imageio ffmpeg exe:", exe)
ffprobe_candidate = os.path.join(os.path.dirname(exe), 'ffprobe.exe')
print("ffprobe candidate exists:", os.path.exists(ffprobe_candidate))
