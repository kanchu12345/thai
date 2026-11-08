import re

new_nav = '''  <nav class="sidebar-nav" id="sidebarNav">

    <!-- 1. HOME -->
    <div class="nav-collapsible-group is-open" id="navGroup-home">
      <div class="nav-collapsible-header" onclick="AdminApp.toggleNavAccordion('home')">
        <div class="nav-header-left">
          <svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
          <span>Home</span>
        </div>
        <svg viewBox="0 0 24 24" class="nav-chevron"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>
      </div>
      <div class="nav-collapsible-body">
        <a class="nav-sub-link active" data-page-tab="home" data-subtab="hero" onclick="AdminApp.navigateToTab('home', 'hero')">
          <span class="sub-bullet"></span><span>Hero</span>
        </a>
        <a class="nav-sub-link" data-page-tab="home" data-subtab="why-us" onclick="AdminApp.navigateToTab('home', 'why-us')">
          <span class="sub-bullet"></span><span>Why Travel With Us</span>
        </a>
        <a class="nav-sub-link" data-page-tab="home" data-subtab="category-showcase" onclick="AdminApp.navigateToTab('home', 'category-showcase')">
          <span class="sub-bullet"></span><span>Category Showcase (linked)</span>
        </a>
        <a class="nav-sub-link" data-page-tab="home" data-subtab="featured-tours" onclick="AdminApp.navigateToTab('home', 'featured-tours')">
          <span class="sub-bullet"></span><span>Featured Tours (linked)</span>
        </a>
        <a class="nav-sub-link" data-page-tab="home" data-subtab="destinations" onclick="AdminApp.navigateToTab('home', 'destinations')">
          <span class="sub-bullet"></span><span>Destinations (linked)</span>
        </a>
        <a class="nav-sub-link" data-page-tab="home" data-subtab="experiences" onclick="AdminApp.navigateToTab('home', 'experiences')">
          <span class="sub-bullet"></span><span>Experiences (linked)</span>
        </a>
        <a class="nav-sub-link" data-page-tab="home" data-subtab="reviews" onclick="AdminApp.navigateToTab('home', 'reviews')">
          <span class="sub-bullet"></span><span>Reviews (linked)</span>
        </a>
        <a class="nav-sub-link" data-page-tab="home" data-subtab="gallery" onclick="AdminApp.navigateToTab('home', 'gallery')">
          <span class="sub-bullet"></span><span>Gallery (linked)</span>
        </a>
        <a class="nav-sub-link" data-page-tab="home" data-subtab="news-insights" onclick="AdminApp.navigateToTab('home', 'news-insights')">
          <span class="sub-bullet"></span><span>News and Insights (linked)</span>
        </a>
        <a class="nav-sub-link" data-page-tab="home" data-subtab="success-stories" onclick="AdminApp.navigateToTab('home', 'success-stories')">
          <span class="sub-bullet"></span><span>Success Stories</span>
        </a>
        <a class="nav-sub-link" data-page-tab="home" data-subtab="sustainability" onclick="AdminApp.navigateToTab('home', 'sustainability')">
          <span class="sub-bullet"></span><span>Sustainability</span>
        </a>
        <a class="nav-sub-link" data-page-tab="home" data-subtab="seo" onclick="AdminApp.navigateToTab('home', 'seo')">
          <span class="sub-bullet"></span><span>SEO</span>
        </a>
      </div>
    </div>

    <!-- 2. TOURS -->
    <div class="nav-collapsible-group" id="navGroup-tours">
      <div class="nav-collapsible-header" onclick="AdminApp.toggleNavAccordion('tours')">
        <div class="nav-header-left">
          <svg viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/></svg>
          <span>Tours</span>
        </div>
        <svg viewBox="0 0 24 24" class="nav-chevron"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>
      </div>
      <div class="nav-collapsible-body">
        <a class="nav-sub-link" data-page-tab="tours" data-subtab="page-content" onclick="AdminApp.navigateToTab('tours', 'page-content')">
          <span class="sub-bullet"></span><span>Page Content</span>
        </a>
        <a class="nav-sub-link" data-page-tab="tours" data-subtab="categories" onclick="AdminApp.navigateToTab('tours', 'categories')">
          <span class="sub-bullet"></span><span>Categories</span>
        </a>
        <a class="nav-sub-link" data-page-tab="tours" data-subtab="packages" onclick="AdminApp.navigateToTab('tours', 'packages')">
          <span class="sub-bullet"></span><span>Packages</span>
        </a>
        <a class="nav-sub-link" data-page-tab="tours" data-subtab="trip-finder" onclick="AdminApp.navigateToTab('tours', 'trip-finder')">
          <span class="sub-bullet"></span><span>Trip Finder options</span>
        </a>
        <a class="nav-sub-link" data-page-tab="tours" data-subtab="seo" onclick="AdminApp.navigateToTab('tours', 'seo')">
          <span class="sub-bullet"></span><span>SEO</span>
        </a>
      </div>
    </div>

    <!-- 3. DESTINATIONS -->
    <div class="nav-collapsible-group" id="navGroup-destinations">
      <div class="nav-collapsible-header" onclick="AdminApp.toggleNavAccordion('destinations')">
        <div class="nav-header-left">
          <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
          <span>Destinations</span>
        </div>
        <svg viewBox="0 0 24 24" class="nav-chevron"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>
      </div>
      <div class="nav-collapsible-body">
        <a class="nav-sub-link" data-page-tab="destinations" data-subtab="page-content" onclick="AdminApp.navigateToTab('destinations', 'page-content')">
          <span class="sub-bullet"></span><span>Page Content</span>
        </a>
        <a class="nav-sub-link" data-page-tab="destinations" data-subtab="destinations-list" onclick="AdminApp.navigateToTab('destinations', 'destinations-list')">
          <span class="sub-bullet"></span><span>Destinations list</span>
        </a>
        <a class="nav-sub-link" data-page-tab="destinations" data-subtab="seo" onclick="AdminApp.navigateToTab('destinations', 'seo')">
          <span class="sub-bullet"></span><span>SEO</span>
        </a>
      </div>
    </div>

    <!-- 4. EXPERIENCES -->
    <div class="nav-collapsible-group" id="navGroup-experiences">
      <div class="nav-collapsible-header" onclick="AdminApp.toggleNavAccordion('experiences')">
        <div class="nav-header-left">
          <svg viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
          <span>Experiences</span>
        </div>
        <svg viewBox="0 0 24 24" class="nav-chevron"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>
      </div>
      <div class="nav-collapsible-body">
        <a class="nav-sub-link" data-page-tab="experiences" data-subtab="page-content" onclick="AdminApp.navigateToTab('experiences', 'page-content')">
          <span class="sub-bullet"></span><span>Page Content</span>
        </a>
        <a class="nav-sub-link" data-page-tab="experiences" data-subtab="experiences-list" onclick="AdminApp.navigateToTab('experiences', 'experiences-list')">
          <span class="sub-bullet"></span><span>Experiences list</span>
        </a>
        <a class="nav-sub-link" data-page-tab="experiences" data-subtab="seo" onclick="AdminApp.navigateToTab('experiences', 'seo')">
          <span class="sub-bullet"></span><span>SEO</span>
        </a>
      </div>
    </div>

    <!-- 5. ABOUT US -->
    <div class="nav-collapsible-group" id="navGroup-about">
      <div class="nav-collapsible-header" onclick="AdminApp.toggleNavAccordion('about')">
        <div class="nav-header-left">
          <svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
          <span>About Us</span>
        </div>
        <svg viewBox="0 0 24 24" class="nav-chevron"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>
      </div>
      <div class="nav-collapsible-body">
        <a class="nav-sub-link" data-page-tab="about" data-subtab="page-content" onclick="AdminApp.navigateToTab('about', 'page-content')">
          <span class="sub-bullet"></span><span>Page Content</span>
        </a>
        <a class="nav-sub-link" data-page-tab="about" data-subtab="team" onclick="AdminApp.navigateToTab('about', 'team')">
          <span class="sub-bullet"></span><span>Team Members</span>
        </a>
        <a class="nav-sub-link" data-page-tab="about" data-subtab="seo" onclick="AdminApp.navigateToTab('about', 'seo')">
          <span class="sub-bullet"></span><span>SEO</span>
        </a>
      </div>
    </div>

    <!-- 6. GALLERY -->
    <div class="nav-collapsible-group" id="navGroup-gallery">
      <div class="nav-collapsible-header" onclick="AdminApp.toggleNavAccordion('gallery')">
        <div class="nav-header-left">
          <svg viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
          <span>Gallery</span>
        </div>
        <svg viewBox="0 0 24 24" class="nav-chevron"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>
      </div>
      <div class="nav-collapsible-body">
        <a class="nav-sub-link" data-page-tab="gallery" data-subtab="page-content" onclick="AdminApp.navigateToTab('gallery', 'page-content')">
          <span class="sub-bullet"></span><span>Page Content</span>
        </a>
        <a class="nav-sub-link" data-page-tab="gallery" data-subtab="gallery-images" onclick="AdminApp.navigateToTab('gallery', 'gallery-images')">
          <span class="sub-bullet"></span><span>Gallery Images</span>
        </a>
        <a class="nav-sub-link" data-page-tab="gallery" data-subtab="seo" onclick="AdminApp.navigateToTab('gallery', 'seo')">
          <span class="sub-bullet"></span><span>SEO</span>
        </a>
      </div>
    </div>

    <!-- 7. REVIEWS -->
    <div class="nav-collapsible-group" id="navGroup-reviews">
      <div class="nav-collapsible-header" onclick="AdminApp.toggleNavAccordion('reviews')">
        <div class="nav-header-left">
          <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z"/></svg>
          <span>Reviews</span>
        </div>
        <svg viewBox="0 0 24 24" class="nav-chevron"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>
      </div>
      <div class="nav-collapsible-body">
        <a class="nav-sub-link" data-page-tab="reviews" data-subtab="page-content" onclick="AdminApp.navigateToTab('reviews', 'page-content')">
          <span class="sub-bullet"></span><span>Page Content</span>
        </a>
        <a class="nav-sub-link" data-page-tab="reviews" data-subtab="reviews-list" onclick="AdminApp.navigateToTab('reviews', 'reviews-list')">
          <span class="sub-bullet"></span><span>Reviews list</span>
        </a>
        <a class="nav-sub-link" data-page-tab="reviews" data-subtab="seo" onclick="AdminApp.navigateToTab('reviews', 'seo')">
          <span class="sub-bullet"></span><span>SEO</span>
        </a>
      </div>
    </div>

    <!-- 8. BLOG -->
    <div class="nav-collapsible-group" id="navGroup-blog">
      <div class="nav-collapsible-header" onclick="AdminApp.toggleNavAccordion('blog')">
        <div class="nav-header-left">
          <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
          <span>Blog</span>
        </div>
        <svg viewBox="0 0 24 24" class="nav-chevron"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>
      </div>
      <div class="nav-collapsible-body">
        <a class="nav-sub-link" data-page-tab="blog" data-subtab="page-content" onclick="AdminApp.navigateToTab('blog', 'page-content')">
          <span class="sub-bullet"></span><span>Page Content</span>
        </a>
        <a class="nav-sub-link" data-page-tab="blog" data-subtab="blog-posts" onclick="AdminApp.navigateToTab('blog', 'blog-posts')">
          <span class="sub-bullet"></span><span>Blog Posts</span>
        </a>
        <a class="nav-sub-link" data-page-tab="blog" data-subtab="seo" onclick="AdminApp.navigateToTab('blog', 'seo')">
          <span class="sub-bullet"></span><span>SEO</span>
        </a>
      </div>
    </div>

    <!-- 9. CONTACT -->
    <div class="nav-collapsible-group" id="navGroup-contact">
      <div class="nav-collapsible-header" onclick="AdminApp.toggleNavAccordion('contact')">
        <div class="nav-header-left">
          <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          <span>Contact</span>
        </div>
        <div class="nav-header-right">
          <span class="nav-badge" id="unreadInquiriesBadge">0</span>
          <svg viewBox="0 0 24 24" class="nav-chevron"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>
        </div>
      </div>
      <div class="nav-collapsible-body">
        <a class="nav-sub-link" data-page-tab="contact" data-subtab="page-content" onclick="AdminApp.navigateToTab('contact', 'page-content')">
          <span class="sub-bullet"></span><span>Page Content</span>
        </a>
        <a class="nav-sub-link" data-page-tab="contact" data-subtab="details" onclick="AdminApp.navigateToTab('contact', 'details')">
          <span class="sub-bullet"></span><span>Contact Details and Social Links</span>
        </a>
        <a class="nav-sub-link" data-page-tab="contact" data-subtab="forms" onclick="AdminApp.navigateToTab('contact', 'forms')">
          <span class="sub-bullet"></span><span>Inquiry form texts</span>
        </a>
        <a class="nav-sub-link" data-page-tab="contact" data-subtab="inquiries" onclick="AdminApp.navigateToTab('contact', 'inquiries')">
          <span class="sub-bullet"></span><span>Customer Inquiries</span>
        </a>
        <a class="nav-sub-link" data-page-tab="contact" data-subtab="seo" onclick="AdminApp.navigateToTab('contact', 'seo')">
          <span class="sub-bullet"></span><span>SEO</span>
        </a>
      </div>
    </div>

    <!-- SEPARATOR -->
    <div style="margin: 18px 12px 10px; height: 1px; background: rgba(255, 255, 255, 0.12);"></div>

    <!-- SITE (GLOBAL SETTINGS & MEDIA) -->
    <div class="nav-collapsible-group" id="navGroup-site">
      <div class="nav-collapsible-header" onclick="AdminApp.toggleNavAccordion('site')">
        <div class="nav-header-left">
          <svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>
          <span>Site</span>
        </div>
        <svg viewBox="0 0 24 24" class="nav-chevron"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>
      </div>
      <div class="nav-collapsible-body">
        <a class="nav-sub-link" data-page-tab="site" data-subtab="branding" onclick="AdminApp.navigateToTab('site', 'branding')">
          <span class="sub-bullet"></span><span>Logo &amp; Branding</span>
        </a>
        <a class="nav-sub-link" data-page-tab="site" data-subtab="header-footer" onclick="AdminApp.navigateToTab('site', 'header-footer')">
          <span class="sub-bullet"></span><span>Header and Footer text</span>
        </a>
        <a class="nav-sub-link" data-page-tab="site" data-subtab="social" onclick="AdminApp.navigateToTab('site', 'social')">
          <span class="sub-bullet"></span><span>Social Links</span>
        </a>
        <a class="nav-sub-link" data-page-tab="site" data-subtab="media" onclick="AdminApp.navigateToTab('site', 'media')">
          <span class="sub-bullet"></span><span>Media Library</span>
        </a>
        <a class="nav-sub-link" data-page-tab="site" data-subtab="github" onclick="AdminApp.navigateToTab('site', 'github')">
          <span class="sub-bullet"></span><span>Publish / Export to GitHub</span>
        </a>
        <a class="nav-sub-link" data-page-tab="site" data-subtab="users" onclick="AdminApp.navigateToTab('site', 'users')">
          <span class="sub-bullet"></span><span>Admin Account &amp; Users</span>
        </a>
      </div>
    </div>

  </nav>'''

path = r'admin\index.html'
with open(path, 'r', encoding='utf-8') as f:
    html = f.read()

pattern = re.compile(r'<nav class="sidebar-nav" id="sidebarNav">.*?</nav>', re.DOTALL)
if pattern.search(html):
    html = pattern.sub(new_nav, html, count=1)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(html)
    print("SUCCESS: Replaced sidebar nav with 9 website tabs + Site group")
else:
    print("ERROR: Could not find sidebarNav in admin/index.html")
