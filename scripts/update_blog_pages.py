import sys
sys.stdout.reconfigure(encoding='utf-8')

# 1. Update blog.html
with open('blog.html', 'r', encoding='utf-8') as f:
    blog_content = f.read()

card_html = """  <article class="blog-card" style="background: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #E2E8F0; box-shadow: 0 2px 10px rgba(0,0,0,0.04); display: flex; flex-direction: column;">
    <a href="blog/ella-hands-on-tea-making-experience/" style="display: block; overflow: hidden; height: 220px;">
      <img src="assets/images/blog/ella-tea-making-experience.webp" alt="Ella: Hands-On Tea Making Experience with Tasting" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.35s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" data-cms-img="blog.card_ella_img">
    </a>
    <div style="padding: 1.5rem; display: flex; flex-direction: column; flex-grow: 1;">
      <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 8px;">
        <span style="background: rgba(46,125,50,0.15); color: #2E7D32; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; padding: 2px 8px; border-radius: 4px;" data-cms="blog.card_ella_badge">
          Hill Country &amp; Tea
        </span>
        <span style="color: #64748B; font-size: 0.8rem;" data-cms="blog.card_ella_read">6 min read</span>
      </div>
      <h3 style="font-size: 1.25rem; font-weight: 700; color: #002B49; margin: 0 0 0.75rem; line-height: 1.35;" data-cms="blog.card_ella_title">
        <a href="blog/ella-hands-on-tea-making-experience/" style="color: inherit; text-decoration: none;">
          Ella: Hands-On Tea Making Experience with Tasting
        </a>
      </h3>
      <p style="color: #64748B; font-size: 0.9rem; line-height: 1.6; margin: 0 0 1.25rem; flex-grow: 1;" data-cms="blog.card_ella_desc">
        Discover the heart of Sri Lanka’s tea culture with an authentic hands-on tea making experience in Ella. Learn the art of tea making, from plucking leaves to brewing the perfect cup.
      </p>
      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #F1F5F9; padding-top: 1rem;">
        <span style="color: #94A3B8; font-size: 0.8rem;" data-cms="blog.card_ella_date">November 2026</span>
        <a href="blog/ella-hands-on-tea-making-experience/" style="color: #002B49; font-weight: 600; font-size: 0.85rem; text-decoration: none; display: flex; align-items: center; gap: 4px;" data-cms="blog.card_ella_link">
          Read Story &rarr;
        </a>
      </div>
    </div>
  </article>

"""

if 'blog/ella-hands-on-tea-making-experience/' not in blog_content:
    target = '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 2rem;">'
    if target in blog_content:
        blog_content = blog_content.replace(target, target + '\n' + card_html)
        with open('blog.html', 'w', encoding='utf-8') as f:
            f.write(blog_content)
        print("Updated blog.html with Ella Tea card!")
    else:
        print("Target grid not found in blog.html!")
else:
    print("blog.html already contains Ella Tea card!")

# 2. Update index.html
with open('index.html', 'r', encoding='utf-8') as f:
    idx_content = f.read()

index_side_item = """<a class="news-side-item" href="blog/ella-hands-on-tea-making-experience/" style="text-decoration: none; display: flex; gap: 1.25rem; align-items: center; background: #FFFFFF; padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid #EAF0F4; transition: var(--transition);">
<img alt="Ella Hands-On Tea Making Experience with Tasting" src="./assets/images/blog/ella-tea-making-thumb.webp" style="width: 105px; height: 85px; object-fit: cover; border-radius: var(--radius-sm); flex-shrink: 0;" loading="lazy" decoding="async" data-cms-img="home.img_ella_tea">
<div class="news-side-item-content">
<span class="news-date" style="color: var(--color-gold); font-size: 0.75rem; font-weight: 700; text-transform: uppercase;" data-cms="home.span_ella_tag">Hill Country &amp; Tea</span>
<h4 class="news-side-title" style="font-size: 1.02rem; font-weight: 600; color: var(--color-dark-blue); margin-top: 0.25rem; line-height: 1.4;" data-cms="home.heading_ella_tea">Ella: Hands-On Tea Making Experience with Tasting</h4>
</div>
</a>
"""

if 'blog/ella-hands-on-tea-making-experience/' not in idx_content:
    side_list_target = '<div class="news-side-list">'
    if side_list_target in idx_content:
        idx_content = idx_content.replace(side_list_target, side_list_target + '\n' + index_side_item)
        with open('index.html', 'w', encoding='utf-8') as f:
            f.write(idx_content)
        print("Updated index.html with Ella Tea news item!")
    else:
        print("side_list_target not found in index.html!")
else:
    print("index.html already contains Ella Tea news item!")
