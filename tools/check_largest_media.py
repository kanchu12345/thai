import os

imgs = []
for root, dirs, files in os.walk("assets"):
    for f in files:
        if f.lower().endswith((".jpg", ".jpeg", ".png", ".webp", ".gif", ".mp4")):
            p = os.path.join(root, f)
            imgs.append((p, os.path.getsize(p)))

imgs.sort(key=lambda x: x[1], reverse=True)
print("Top 20 largest media files in assets:")
for p, s in imgs[:20]:
    print(f"  {s/1024/1024:.2f} MB ({s/1024:.1f} KB): {p}")
