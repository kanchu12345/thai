import os

file_path = r'assets\js\cms.js'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

target = """          // Notify parent frame
          const isWatermark = target.classList.contains('watermark-heading') || (target.className && String(target.className).includes('watermark'));
          if (window.parent && window.parent !== window) {
            const isHidden = target.getAttribute('data-cms-hidden') === 'true' || target.style.display === 'none';
            const altText = target.tagName === 'IMG' ? (target.getAttribute('alt') || '') : '';
            const styleObj = window.getComputedStyle ? {
              fontSize: window.getComputedStyle(target).fontSize,
              fontWeight: window.getComputedStyle(target).fontWeight,
              textAlign: window.getComputedStyle(target).textAlign,
              color: window.getComputedStyle(target).color
            } : {};

            window.parent.postMessage({
              type: 'lotus:element-selected',
              key: key,
              attrType: attrType,
              currentVal: (currentVal || '').trim(),
              tagName: target.tagName.toLowerCase(),
              sectionId: sectionId,
              packageSlug: packageSlug || null,
              destinationSlug: destinationSlug || null,
              linkedHref: linkedHref || null,
              isWatermark: isWatermark,
              sliderImages: sliderImages,
              isHidden: isHidden,
              altText: altText,
              computedStyles: styleObj
            }, '*');
          }"""

replacement = """          // Design credit protection check
          const isCreditLocked = !!(target.closest('#designCredit, .infinite-design-credit, a[href*="infiniteweb.dev"]') || (target.textContent && target.textContent.includes('Infinite Design')));

          // Linked content check (single source of truth enforcement)
          let isLinked = false;
          let linkedSource = '';
          let targetTab = '';
          let targetSubtab = '';
          let modalOpenFn = '';

          const path = (window.location.pathname || '').toLowerCase();
          const isHomePage = path.endsWith('index.html') || path.endsWith('/') || path === '' || !path.includes('.html');

          if (pkgEl || target.closest('#featuredTours, .package-card, .tour-card, .tour-grid-card, .curated-card, .beach-package-card')) {
            if (isHomePage || target.closest('#featuredTours')) {
              isLinked = true;
              linkedSource = 'Tours > Packages';
              targetTab = 'tours';
              targetSubtab = 'packages';
              if (packageSlug) modalOpenFn = "AdminApp.openPackageModal('" + packageSlug + "');";
            }
          } else if (target.closest('#categoryShowcase, .cat-showcase-card, [data-category-slug]')) {
            if (isHomePage || target.closest('#categoryShowcase')) {
              isLinked = true;
              linkedSource = 'Tours > Categories';
              targetTab = 'tours';
              targetSubtab = 'categories';
            }
          } else if (destEl || target.closest('#destinations, #destinationsGrid, .dest-card')) {
            if (isHomePage || target.closest('#destinations')) {
              isLinked = true;
              linkedSource = 'Destinations > Destinations list';
              targetTab = 'destinations';
              targetSubtab = 'destinations-list';
              if (destinationSlug) modalOpenFn = "AdminApp.openDestinationModal('" + destinationSlug + "');";
            }
          } else if (target.closest('#experiences, .experience-card, .exp-grid-item, .exp-card')) {
            if (target.closest('.experience-card, .exp-grid-item, .exp-card')) {
              isLinked = true;
              linkedSource = 'Experiences > Experiences list';
              targetTab = 'experiences';
              targetSubtab = 'experiences-list';
            }
          } else if (target.closest('#reviews, .testimonial-card, .review-card, .reviews-slider')) {
            if (isHomePage || target.closest('#reviews')) {
              if (target.closest('.testimonial-card, .review-card, .swiper-slide')) {
                isLinked = true;
                linkedSource = 'Reviews > Reviews list';
                targetTab = 'reviews';
                targetSubtab = 'reviews-list';
              }
            }
          } else if (target.closest('#gallery, .gallery-grid, .gallery-item')) {
            if (isHomePage || target.closest('#gallery')) {
              if (target.closest('.gallery-item, .gallery-thumb, [data-gallery-idx]')) {
                isLinked = true;
                linkedSource = 'Gallery > Gallery Images';
                targetTab = 'gallery';
                targetSubtab = 'gallery-images';
              }
            }
          } else if (target.closest('#newsInsights, .news-card, .news-card-big, .news-card-side, .footer-recent-posts')) {
            if (isHomePage || target.closest('#newsInsights, .footer-recent-posts')) {
              isLinked = true;
              linkedSource = 'Blog > Blog Posts';
              targetTab = 'blog';
              targetSubtab = 'blog-posts';
            }
          } else if (target.closest('#teamGrid, .team-card, .team-member-card')) {
            isLinked = true;
            linkedSource = 'About Us > Team Members';
            targetTab = 'about';
            targetSubtab = 'team';
          }

          // Notify parent frame
          const isWatermark = target.classList.contains('watermark-heading') || (target.className && String(target.className).includes('watermark'));
          if (window.parent && window.parent !== window) {
            const isHidden = target.getAttribute('data-cms-hidden') === 'true' || target.style.display === 'none';
            const altText = target.tagName === 'IMG' ? (target.getAttribute('alt') || '') : '';
            const styleObj = window.getComputedStyle ? {
              fontSize: window.getComputedStyle(target).fontSize,
              fontWeight: window.getComputedStyle(target).fontWeight,
              textAlign: window.getComputedStyle(target).textAlign,
              color: window.getComputedStyle(target).color
            } : {};

            window.parent.postMessage({
              type: 'lotus:element-selected',
              key: key,
              attrType: attrType,
              currentVal: (currentVal || '').trim(),
              tagName: target.tagName.toLowerCase(),
              sectionId: sectionId,
              packageSlug: packageSlug || null,
              destinationSlug: destinationSlug || null,
              linkedHref: linkedHref || null,
              isWatermark: isWatermark,
              sliderImages: sliderImages,
              isHidden: isHidden,
              altText: altText,
              computedStyles: styleObj,
              isCreditLocked: isCreditLocked,
              isLinked: isLinked,
              linkedSource: linkedSource,
              targetTab: targetTab,
              targetSubtab: targetSubtab,
              modalOpenFn: modalOpenFn
            }, '*');
          }"""

normalized_content = content.replace('\r\n', '\n')
if target in normalized_content:
    new_content = normalized_content.replace(target, replacement, 1)
    # preserve original CRLF if it was CRLF
    if '\r\n' in content:
        new_content = new_content.replace('\n', '\r\n')
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("SUCCESS: Updated assets/js/cms.js")
else:
    print("ERROR: Target not found in assets/js/cms.js")
