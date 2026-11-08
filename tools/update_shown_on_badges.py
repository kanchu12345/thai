import os

file_path = r'admin\js\admin-finetune.js'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

target = """    // Initialize the new navigation to Home > Hero on startup
    setTimeout(() => {
      app.navigateToTab('home', 'hero');
    }, 120);"""

replacement = """    // 12. HOOK "SHOWN ON: ..." BADGES INTO ALL SOURCE MANAGERS & MODALS (Part 2)
    function hookShownOnBadges() {
      // 1. Tour Packages
      const origFilterPackages = app.filterPackages;
      if (origFilterPackages) {
        app.filterPackages = function() {
          origFilterPackages.apply(this, arguments);
          document.querySelectorAll('#packagesTableBody tr').forEach(row => {
            const titleCell = row.children[2];
            if (titleCell && !titleCell.querySelector('.shown-on-badge')) {
              const b = document.createElement('div');
              b.className = 'shown-on-badge';
              b.textContent = 'Shown on: Tours page, Home page (Featured Tours)';
              titleCell.appendChild(b);
            }
          });
        };
      }

      // 2. Categories
      const origRenderCategories = app.renderCategories;
      if (origRenderCategories) {
        app.renderCategories = function() {
          origRenderCategories.apply(this, arguments);
          document.querySelectorAll('#categoriesTableBody tr').forEach(row => {
            const titleCell = row.children[1];
            if (titleCell && !titleCell.querySelector('.shown-on-badge')) {
              const b = document.createElement('div');
              b.className = 'shown-on-badge';
              b.textContent = 'Shown on: Tours page, Home page (Category Showcase)';
              titleCell.appendChild(b);
            }
          });
        };
      }

      // 3. Destinations
      const origRenderDestinations = app.renderDestinations;
      if (origRenderDestinations) {
        app.renderDestinations = function() {
          origRenderDestinations.apply(this, arguments);
          document.querySelectorAll('#destinationsTableBody tr').forEach(row => {
            const titleCell = row.children[1];
            if (titleCell && !titleCell.querySelector('.shown-on-badge')) {
              const b = document.createElement('div');
              b.className = 'shown-on-badge';
              b.textContent = 'Shown on: Destinations page, Home page (Signature Destinations)';
              titleCell.appendChild(b);
            }
          });
        };
      }

      // 4. Reviews
      const origRenderReviews = app.renderReviews;
      if (origRenderReviews) {
        app.renderReviews = function() {
          origRenderReviews.apply(this, arguments);
          document.querySelectorAll('#reviewsTableBody tr').forEach(row => {
            const titleCell = row.children[0];
            if (titleCell && !titleCell.querySelector('.shown-on-badge')) {
              const b = document.createElement('div');
              b.className = 'shown-on-badge';
              b.textContent = 'Shown on: Reviews page, Home page (Verified Guest Testimonials)';
              titleCell.appendChild(b);
            }
          });
        };
      }

      // 5. Team Members
      const origRenderTeam = app.renderTeam;
      if (origRenderTeam) {
        app.renderTeam = function() {
          origRenderTeam.apply(this, arguments);
          document.querySelectorAll('#teamTableBody tr').forEach(row => {
            const titleCell = row.children[1];
            if (titleCell && !titleCell.querySelector('.shown-on-badge')) {
              const b = document.createElement('div');
              b.className = 'shown-on-badge';
              b.textContent = 'Shown on: About Us page';
              titleCell.appendChild(b);
            }
          });
        };
      }

      // 6. Blog Posts
      const origRenderBlogPosts = app.renderBlogPosts;
      if (origRenderBlogPosts) {
        app.renderBlogPosts = function() {
          origRenderBlogPosts.apply(this, arguments);
          document.querySelectorAll('#blogPostsTableBody tr').forEach(row => {
            const titleCell = row.children[1];
            if (titleCell && !titleCell.querySelector('.shown-on-badge')) {
              const b = document.createElement('div');
              b.className = 'shown-on-badge';
              b.textContent = 'Shown on: Blog page, Home page (News and Insights), Footer (Recent Posts)';
              titleCell.appendChild(b);
            }
          });
        };
      }

      // 7. Success Stories
      const origRenderSuccessStories = app.renderSuccessStories;
      if (origRenderSuccessStories) {
        app.renderSuccessStories = function() {
          origRenderSuccessStories.apply(this, arguments);
          document.querySelectorAll('#successStoriesTableBody tr').forEach(row => {
            const titleCell = row.children[2] || row.children[1];
            if (titleCell && !titleCell.querySelector('.shown-on-badge')) {
              const b = document.createElement('div');
              b.className = 'shown-on-badge';
              b.textContent = 'Shown on: Home page (Real Experience Stories)';
              titleCell.appendChild(b);
            }
          });
        };
      }
    }

    hookShownOnBadges();

    // Initialize the new navigation to Home > Hero on startup
    setTimeout(() => {
      app.navigateToTab('home', 'hero');
    }, 120);"""

normalized = content.replace('\r\n', '\n')
if target in normalized:
    new_content = normalized.replace(target, replacement, 1)
    if '\r\n' in content:
        new_content = new_content.replace('\n', '\r\n')
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("SUCCESS: Updated admin/js/admin-finetune.js with hookShownOnBadges")
else:
    print("ERROR: Target not found in admin/js/admin-finetune.js")
