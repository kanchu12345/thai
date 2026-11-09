# -*- coding: utf-8 -*-
"""
tools/patch_admin_nav.py
Updates admin/index.html and admin/js/admin-finetune.js so the admin panel
strictly mirrors the 11 website tabs requested in Phase 3, locks the design credit UI,
and ensures seamless subtab navigation across all sections.
"""

import os
import re

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

def patch_finetune_js():
    js_path = os.path.join(ROOT_DIR, 'admin', 'js', 'admin-finetune.js')
    with open(js_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replacement for PAGE_TABS
    target_start = '  const PAGE_TABS = {'
    target_end = '  window.PAGE_TABS = PAGE_TABS;'
    
    new_page_tabs = '''  const PAGE_TABS = {
    home: {
      id: 'home',
      title: 'Home',
      docKey: 'siteContent/home',
      file: 'index.html',
      subtabs: [
        { id: 'hero', label: 'Hero & Location Highlights', isLinked: false },
        { id: 'about', label: 'About & Legacy Credentials', isLinked: false },
        { id: 'why-us', label: 'Why Travel With Us', isLinked: false },
        { id: 'category-showcase', label: 'Category Showcase (linked)', isLinked: true, sourceTab: 'tours', sourceSubtab: 'categories', sourceLabel: 'Tours > Categories' },
        { id: 'featured-tours', label: 'Featured Tours (linked)', isLinked: true, sourceTab: 'tours', sourceSubtab: 'packages', sourceLabel: 'Tours > Packages' },
        { id: 'destinations', label: 'Sacred Destinations (linked)', isLinked: true, sourceTab: 'destinations', sourceSubtab: 'destinations-list', sourceLabel: 'Destinations > Destinations list' },
        { id: 'bespoke', label: 'Tailor-Made & Bespoke Journeys', isLinked: false },
        { id: 'experiences', label: 'Immersive Experiences (linked)', isLinked: true, sourceTab: 'experiences', sourceSubtab: 'experiences-list', sourceLabel: 'Experiences > Experiences list' },
        { id: 'reviews', label: 'Traveler Reviews (linked)', isLinked: true, sourceTab: 'reviews', sourceSubtab: 'reviews-list', sourceLabel: 'Reviews > Reviews list' },
        { id: 'news-insights', label: 'News and Insights (linked)', isLinked: true, sourceTab: 'blog', sourceSubtab: 'blog-posts', sourceLabel: 'Blog > Blog Posts' },
        { id: 'sustainability', label: 'Sustainability & Conservation', isLinked: false },
        { id: 'faq', label: 'Frequently Asked Questions (FAQ)', isLinked: false },
        { id: 'seo', label: 'SEO & Social Meta', isLinked: false, sectionId: 'page-seo' }
      ]
    },
    tours: {
      id: 'tours',
      title: 'Tours',
      docKey: 'siteContent/toursIndex',
      file: 'tours/index.html',
      subtabs: [
        { id: 'page-content', label: 'Page Content & Hero', isLinked: false },
        { id: 'categories', label: 'Categories', isLinked: false, sectionId: 'categories' },
        { id: 'packages', label: 'Packages (All 29 Packages)', isLinked: false, sectionId: 'packages' },
        { id: 'trip-finder', label: 'Trip Finder options', isLinked: false, sectionId: 'trip-finder' },
        { id: 'seo', label: 'SEO & Social Meta', isLinked: false, sectionId: 'page-seo' }
      ]
    },
    destinations: {
      id: 'destinations',
      title: 'Destinations',
      docKey: 'siteContent/destinations',
      file: 'destinations.html',
      subtabs: [
        { id: 'page-content', label: 'Page Content & Hero', isLinked: false },
        { id: 'destinations-list', label: 'Destinations list (12 Curated)', isLinked: false, sectionId: 'destinations' },
        { id: 'seo', label: 'SEO & Social Meta', isLinked: false, sectionId: 'page-seo' }
      ]
    },
    experiences: {
      id: 'experiences',
      title: 'Experiences',
      docKey: 'siteContent/experiences',
      file: 'experiences.html',
      subtabs: [
        { id: 'page-content', label: 'Page Content & Hero', isLinked: false },
        { id: 'experiences-list', label: 'Experiences list', isLinked: false, sectionId: 'experiences' },
        { id: 'seo', label: 'SEO & Social Meta', isLinked: false, sectionId: 'page-seo' }
      ]
    },
    about: {
      id: 'about',
      title: 'About Us',
      docKey: 'siteContent/about',
      file: 'about.html',
      subtabs: [
        { id: 'page-content', label: 'Page Content & Story', isLinked: false },
        { id: 'team', label: 'Team Members & Leadership', isLinked: false, sectionId: 'team' },
        { id: 'seo', label: 'SEO & Social Meta', isLinked: false, sectionId: 'page-seo' }
      ]
    },
    gallery: {
      id: 'gallery',
      title: 'Gallery',
      docKey: 'siteContent/gallery',
      file: 'gallery.html',
      subtabs: [
        { id: 'page-content', label: 'Page Content & Hero', isLinked: false },
        { id: 'gallery-images', label: 'Gallery Showcase Images', isLinked: false, sectionId: 'gallery' },
        { id: 'seo', label: 'SEO & Social Meta', isLinked: false, sectionId: 'page-seo' }
      ]
    },
    reviews: {
      id: 'reviews',
      title: 'Reviews',
      docKey: 'siteContent/reviews',
      file: 'reviews.html',
      subtabs: [
        { id: 'page-content', label: 'Page Content & Hero', isLinked: false },
        { id: 'reviews-list', label: 'Verified Reviews list', isLinked: false, sectionId: 'reviews' },
        { id: 'seo', label: 'SEO & Social Meta', isLinked: false, sectionId: 'page-seo' }
      ]
    },
    blog: {
      id: 'blog',
      title: 'Blog',
      docKey: 'siteContent/blog',
      file: 'blog.html',
      subtabs: [
        { id: 'page-content', label: 'Page Content & Hero', isLinked: false },
        { id: 'blog-posts', label: 'Editorial Blog Posts', isLinked: false, sectionId: 'blog-posts' },
        { id: 'seo', label: 'SEO & Social Meta', isLinked: false, sectionId: 'page-seo' }
      ]
    },
    contact: {
      id: 'contact',
      title: 'Contact',
      docKey: 'siteContent/contact',
      file: 'contact.html',
      subtabs: [
        { id: 'page-content', label: 'Page Content & Hero', isLinked: false },
        { id: 'details', label: 'Contact Details & Direct Channels', isLinked: false, sectionId: 'contact-details' },
        { id: 'seo', label: 'SEO & Social Meta', isLinked: false, sectionId: 'page-seo' }
      ]
    },
    forms: {
      id: 'forms',
      title: 'Inquiry Forms',
      subtabs: [
        { id: 'detailed', label: 'Detailed Bespoke Inquiry Form', isLinked: false, sectionId: 'forms-editor', formType: 'detailed' },
        { id: 'quick', label: 'Quick Consultation Form', isLinked: false, sectionId: 'forms-editor', formType: 'quick' },
        { id: 'inbox', label: 'Customer Inquiries Inbox', isLinked: false, sectionId: 'inquiries' }
      ]
    },
    global: {
      id: 'global',
      title: 'Global: Header/Footer/Social/SEO',
      subtabs: [
        { id: 'branding', label: 'Logo & Branding (Locked Credit)', isLinked: false, sectionId: 'settings', scrollTarget: 'branding' },
        { id: 'header-footer', label: 'Header & Footer text', isLinked: false, sectionId: 'settings', scrollTarget: 'footer' },
        { id: 'social', label: 'Social & Chat Links', isLinked: false, sectionId: 'settings', scrollTarget: 'social' },
        { id: 'media', label: 'Media Library (Cloudinary)', isLinked: false, sectionId: 'media' },
        { id: 'users', label: 'Admin Accounts & Roles', isLinked: false, sectionId: 'users' },
        { id: 'github', label: 'Publish / Sync Status', isLinked: false, sectionId: 'github' }
      ]
    }
  };

  // Backward compatibility alias for legacy 'site' tab
  PAGE_TABS.site = PAGE_TABS.global;
  PAGE_TABS.forms_alias = PAGE_TABS.forms;'''

    pattern = re.compile(re.escape(target_start) + r'[\s\S]*?' + re.escape(target_end))
    if pattern.search(content):
        content = pattern.sub(new_page_tabs + '\n\n  window.PAGE_TABS = PAGE_TABS;', content)
        with open(js_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Patched PAGE_TABS in admin-finetune.js")
    else:
        print("Could not find PAGE_TABS in admin-finetune.js")

def patch_admin_index():
    index_path = os.path.join(ROOT_DIR, 'admin', 'index.html')
    with open(index_path, 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Update Sidebar Nav (Group 1-11)
    sidebar_nav_target = re.compile(r'<!-- 1\. HOME -->[\s\S]*?</nav>', re.IGNORECASE)
    new_sidebar_nav = '''<!-- 1. HOME -->
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
          <span class="sub-bullet"></span><span>Hero &amp; Video Location Badge</span>
        </a>
        <a class="nav-sub-link" data-page-tab="home" data-subtab="about" onclick="AdminApp.navigateToTab('home', 'about')">
          <span class="sub-bullet"></span><span>About &amp; Legacy Credentials</span>
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
          <span class="sub-bullet"></span><span>Sacred Destinations (linked)</span>
        </a>
        <a class="nav-sub-link" data-page-tab="home" data-subtab="bespoke" onclick="AdminApp.navigateToTab('home', 'bespoke')">
          <span class="sub-bullet"></span><span>Tailor-Made &amp; Bespoke Journeys</span>
        </a>
        <a class="nav-sub-link" data-page-tab="home" data-subtab="experiences" onclick="AdminApp.navigateToTab('home', 'experiences')">
          <span class="sub-bullet"></span><span>Immersive Experiences (linked)</span>
        </a>
        <a class="nav-sub-link" data-page-tab="home" data-subtab="reviews" onclick="AdminApp.navigateToTab('home', 'reviews')">
          <span class="sub-bullet"></span><span>Traveler Reviews (linked)</span>
        </a>
        <a class="nav-sub-link" data-page-tab="home" data-subtab="news-insights" onclick="AdminApp.navigateToTab('home', 'news-insights')">
          <span class="sub-bullet"></span><span>News and Insights (linked)</span>
        </a>
        <a class="nav-sub-link" data-page-tab="home" data-subtab="sustainability" onclick="AdminApp.navigateToTab('home', 'sustainability')">
          <span class="sub-bullet"></span><span>Sustainability &amp; Conservation</span>
        </a>
        <a class="nav-sub-link" data-page-tab="home" data-subtab="faq" onclick="AdminApp.navigateToTab('home', 'faq')">
          <span class="sub-bullet"></span><span>Frequently Asked Questions (FAQ)</span>
        </a>
        <a class="nav-sub-link" data-page-tab="home" data-subtab="seo" onclick="AdminApp.navigateToTab('home', 'seo')">
          <span class="sub-bullet"></span><span>SEO &amp; Social Meta</span>
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
          <span class="sub-bullet"></span><span>Page Content &amp; Hero</span>
        </a>
        <a class="nav-sub-link" data-page-tab="tours" data-subtab="categories" onclick="AdminApp.navigateToTab('tours', 'categories')">
          <span class="sub-bullet"></span><span>Categories</span>
        </a>
        <a class="nav-sub-link" data-page-tab="tours" data-subtab="packages" onclick="AdminApp.navigateToTab('tours', 'packages')">
          <span class="sub-bullet"></span><span>Packages (All 29 Packages)</span>
        </a>
        <a class="nav-sub-link" data-page-tab="tours" data-subtab="trip-finder" onclick="AdminApp.navigateToTab('tours', 'trip-finder')">
          <span class="sub-bullet"></span><span>Trip Finder options</span>
        </a>
        <a class="nav-sub-link" data-page-tab="tours" data-subtab="seo" onclick="AdminApp.navigateToTab('tours', 'seo')">
          <span class="sub-bullet"></span><span>SEO &amp; Social Meta</span>
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
          <span class="sub-bullet"></span><span>Page Content &amp; Hero</span>
        </a>
        <a class="nav-sub-link" data-page-tab="destinations" data-subtab="destinations-list" onclick="AdminApp.navigateToTab('destinations', 'destinations-list')">
          <span class="sub-bullet"></span><span>Destinations list (12 Curated)</span>
        </a>
        <a class="nav-sub-link" data-page-tab="destinations" data-subtab="seo" onclick="AdminApp.navigateToTab('destinations', 'seo')">
          <span class="sub-bullet"></span><span>SEO &amp; Social Meta</span>
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
          <span class="sub-bullet"></span><span>Page Content &amp; Hero</span>
        </a>
        <a class="nav-sub-link" data-page-tab="experiences" data-subtab="experiences-list" onclick="AdminApp.navigateToTab('experiences', 'experiences-list')">
          <span class="sub-bullet"></span><span>Experiences list</span>
        </a>
        <a class="nav-sub-link" data-page-tab="experiences" data-subtab="seo" onclick="AdminApp.navigateToTab('experiences', 'seo')">
          <span class="sub-bullet"></span><span>SEO &amp; Social Meta</span>
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
          <span class="sub-bullet"></span><span>Page Content &amp; Story</span>
        </a>
        <a class="nav-sub-link" data-page-tab="about" data-subtab="team" onclick="AdminApp.navigateToTab('about', 'team')">
          <span class="sub-bullet"></span><span>Team Members &amp; Leadership</span>
        </a>
        <a class="nav-sub-link" data-page-tab="about" data-subtab="seo" onclick="AdminApp.navigateToTab('about', 'seo')">
          <span class="sub-bullet"></span><span>SEO &amp; Social Meta</span>
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
          <span class="sub-bullet"></span><span>Page Content &amp; Hero</span>
        </a>
        <a class="nav-sub-link" data-page-tab="gallery" data-subtab="gallery-images" onclick="AdminApp.navigateToTab('gallery', 'gallery-images')">
          <span class="sub-bullet"></span><span>Gallery Showcase Images</span>
        </a>
        <a class="nav-sub-link" data-page-tab="gallery" data-subtab="seo" onclick="AdminApp.navigateToTab('gallery', 'seo')">
          <span class="sub-bullet"></span><span>SEO &amp; Social Meta</span>
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
          <span class="sub-bullet"></span><span>Page Content &amp; Hero</span>
        </a>
        <a class="nav-sub-link" data-page-tab="reviews" data-subtab="reviews-list" onclick="AdminApp.navigateToTab('reviews', 'reviews-list')">
          <span class="sub-bullet"></span><span>Verified Reviews list</span>
        </a>
        <a class="nav-sub-link" data-page-tab="reviews" data-subtab="seo" onclick="AdminApp.navigateToTab('reviews', 'seo')">
          <span class="sub-bullet"></span><span>SEO &amp; Social Meta</span>
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
          <span class="sub-bullet"></span><span>Page Content &amp; Hero</span>
        </a>
        <a class="nav-sub-link" data-page-tab="blog" data-subtab="blog-posts" onclick="AdminApp.navigateToTab('blog', 'blog-posts')">
          <span class="sub-bullet"></span><span>Editorial Blog Posts</span>
        </a>
        <a class="nav-sub-link" data-page-tab="blog" data-subtab="seo" onclick="AdminApp.navigateToTab('blog', 'seo')">
          <span class="sub-bullet"></span><span>SEO &amp; Social Meta</span>
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
        <svg viewBox="0 0 24 24" class="nav-chevron"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>
      </div>
      <div class="nav-collapsible-body">
        <a class="nav-sub-link" data-page-tab="contact" data-subtab="page-content" onclick="AdminApp.navigateToTab('contact', 'page-content')">
          <span class="sub-bullet"></span><span>Page Content &amp; Hero</span>
        </a>
        <a class="nav-sub-link" data-page-tab="contact" data-subtab="details" onclick="AdminApp.navigateToTab('contact', 'details')">
          <span class="sub-bullet"></span><span>Contact Details &amp; Channels</span>
        </a>
        <a class="nav-sub-link" data-page-tab="contact" data-subtab="seo" onclick="AdminApp.navigateToTab('contact', 'seo')">
          <span class="sub-bullet"></span><span>SEO &amp; Social Meta</span>
        </a>
      </div>
    </div>

    <!-- 10. INQUIRY FORMS -->
    <div class="nav-collapsible-group" id="navGroup-forms">
      <div class="nav-collapsible-header" onclick="AdminApp.toggleNavAccordion('forms')">
        <div class="nav-header-left">
          <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
          <span>Inquiry Forms</span>
        </div>
        <div class="nav-header-right">
          <span class="nav-badge" id="unreadInquiriesBadge">0</span>
          <svg viewBox="0 0 24 24" class="nav-chevron"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>
        </div>
      </div>
      <div class="nav-collapsible-body">
        <a class="nav-sub-link" data-page-tab="forms" data-subtab="detailed" onclick="AdminApp.navigateToTab('forms', 'detailed')">
          <span class="sub-bullet"></span><span>Detailed Bespoke Inquiry Form</span>
        </a>
        <a class="nav-sub-link" data-page-tab="forms" data-subtab="quick" onclick="AdminApp.navigateToTab('forms', 'quick')">
          <span class="sub-bullet"></span><span>Quick Consultation Form</span>
        </a>
        <a class="nav-sub-link" data-page-tab="forms" data-subtab="inbox" onclick="AdminApp.navigateToTab('forms', 'inbox')">
          <span class="sub-bullet"></span><span>Customer Inquiries Inbox</span>
        </a>
      </div>
    </div>

    <!-- SEPARATOR -->
    <div style="margin: 18px 12px 10px; height: 1px; background: rgba(255, 255, 255, 0.12);"></div>

    <!-- 11. GLOBAL: HEADER/FOOTER/SOCIAL/SEO -->
    <div class="nav-collapsible-group" id="navGroup-global">
      <div class="nav-collapsible-header" onclick="AdminApp.toggleNavAccordion('global')">
        <div class="nav-header-left">
          <svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>
          <span>Global Settings</span>
        </div>
        <svg viewBox="0 0 24 24" class="nav-chevron"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>
      </div>
      <div class="nav-collapsible-body">
        <a class="nav-sub-link" data-page-tab="global" data-subtab="branding" onclick="AdminApp.navigateToTab('global', 'branding')">
          <span class="sub-bullet"></span><span>Logo &amp; Branding (Locked Credit)</span>
        </a>
        <a class="nav-sub-link" data-page-tab="global" data-subtab="header-footer" onclick="AdminApp.navigateToTab('global', 'header-footer')">
          <span class="sub-bullet"></span><span>Header &amp; Footer Text</span>
        </a>
        <a class="nav-sub-link" data-page-tab="global" data-subtab="social" onclick="AdminApp.navigateToTab('global', 'social')">
          <span class="sub-bullet"></span><span>Social Links &amp; Chat</span>
        </a>
        <a class="nav-sub-link" data-page-tab="global" data-subtab="media" onclick="AdminApp.navigateToTab('global', 'media')">
          <span class="sub-bullet"></span><span>Media Library (Cloudinary)</span>
        </a>
        <a class="nav-sub-link" data-page-tab="global" data-subtab="users" onclick="AdminApp.navigateToTab('global', 'users')">
          <span class="sub-bullet"></span><span>Admin Accounts &amp; Roles</span>
        </a>
        <a class="nav-sub-link" data-page-tab="global" data-subtab="github" onclick="AdminApp.navigateToTab('global', 'github')">
          <span class="sub-bullet"></span><span>Publish / Sync Status</span>
        </a>
      </div>
    </div>
  </nav>'''

    if sidebar_nav_target.search(html):
        html = sidebar_nav_target.sub(new_sidebar_nav, html)
        print("Updated sidebar navigation in admin/index.html")

    # 2. Lock Designer Credit fields in settings card
    credit_target = re.compile(r'<div class="form-group">\s*<label>Designer Credit Link \(Infinite Design\)</label>[\s\S]*?<input class="form-control" id="settingDesignerFb" type="url"/>\s*</div>', re.IGNORECASE)
    new_credit = '''<div class="form-group">
  <label style="display: flex; align-items: center; gap: 6px;">
    <span>Designer Credit Link (Infinite Design)</span>
    <span class="badge" style="background: #FEF3C7; color: #92400E; font-size: 0.72rem; padding: 2px 6px; border-radius: 4px;">🔒 Locked</span>
  </label>
  <input class="form-control" id="settingDesignerUrl" type="url" value="https://infiniteweb.dev/" readonly disabled style="background: #F8FAFC; color: #64748B; cursor: not-allowed;"/>
  <small style="color: #64748B; font-size: 0.78rem;">Protected by Infinite Design agency attribution lock. Immutable across code, admin UI, and Firestore security rules.</small>
</div>
<div class="form-group">
  <label style="display: flex; align-items: center; gap: 6px;">
    <span>Designer Agency Facebook</span>
    <span class="badge" style="background: #FEF3C7; color: #92400E; font-size: 0.72rem; padding: 2px 6px; border-radius: 4px;">🔒 Locked</span>
  </label>
  <input class="form-control" id="settingDesignerFb" type="url" value="https://facebook.com/infinitewebdesign" readonly disabled style="background: #F8FAFC; color: #64748B; cursor: not-allowed;"/>
  <small style="color: #64748B; font-size: 0.78rem;">Protected by Infinite Design agency attribution lock. Immutable across code, admin UI, and Firestore security rules.</small>
</div>'''

    if credit_target.search(html):
        html = credit_target.sub(new_credit, html)
        print("Locked Designer Credit input fields in admin/index.html")

    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print("Saved admin/index.html")

if __name__ == '__main__':
    patch_finetune_js()
    patch_admin_index()
