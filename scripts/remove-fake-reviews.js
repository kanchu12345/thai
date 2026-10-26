const fs = require('fs');

let content = fs.readFileSync('reviews.html', 'utf8');

// 1. Remove aggregateRating from schema.org
content = content.replace(/,\s*"aggregateRating":\s*\{[\s\S]*?"ratingCount":\s*"142"\s*\}/, '');

// 2. Replace unverified 4.98 metric in trust-metrics-strip
content = content.replace(/<div class="metric-value">4\.98 \/ 5\.0<\/div>\s*<div class="metric-label">Guest Satisfaction Score<\/div>/,
  '<div class="metric-value">100% Bespoke</div>\n            <div class="metric-label">Tailored Private Journeys</div>');

// 3. Replace 15 hardcoded fake review cards with Authentic Guestbook Notice
const start = content.indexOf('<div class="reviews-grid" id="reviewsGrid">');
const end = content.indexOf('</section>', start);

const guestbookHtml = `<div class="reviews-grid" id="reviewsGrid" style="display: block; max-width: 820px; margin: 0 auto; text-align: center;">
          <div style="background: #FFFFFF; padding: 3.5rem 2rem; border-radius: var(--radius-md); border: 1px solid #EAF0F4; box-shadow: var(--shadow-sm);">
            <div style="font-size: 2.5rem; margin-bottom: 1rem;">✍️</div>
            <h3 class="heading--32 font-color--dark-blue" style="margin-bottom: 0.75rem;" data-cms="reviews.guestbook_title">Authentic Traveler Guestbook</h3>
            <p style="color: #64748B; font-size: 1.05rem; line-height: 1.7; max-width: 620px; margin: 0 auto 2rem;" data-cms="reviews.guestbook_desc">
              Lotus Ceylon values genuine guest experiences above all. Post-journey reflections, pilgrim memoirs, and traveler testimonials are collected directly following private journeys and verified before publication.
            </p>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
              <a href="./inquiry-detailed.html" class="btn-primary-gold" style="padding: 0.85rem 1.75rem; text-decoration: none;" data-cms="reviews.guestbook_btn1">Share Journey Feedback</a>
              <a href="https://wa.me/94715422384?text=Hello%20Lotus%20Ceylon!%20I%20would%20like%20to%20inquire%20about%20traveler%20references." target="_blank" rel="noopener noreferrer" style="padding: 0.85rem 1.75rem; border: 1px solid var(--color-gold); color: var(--color-dark-blue); border-radius: var(--radius-sm); text-decoration: none; font-weight: 600; display: inline-flex; align-items: center;" data-cms="reviews.guestbook_btn2">Request Client References</a>
            </div>
          </div>
        </div>
      </div>`;

content = content.slice(0, start) + guestbookHtml + content.slice(end);

// Also remove the filter tabs container that counted (15), (4), etc.
const tabStart = content.indexOf('<div class="exp-filter-tabs"');
if (tabStart !== -1) {
  const tabEnd = content.indexOf('</div>', tabStart) + 6;
  content = content.slice(0, tabStart) + content.slice(tabEnd);
}

fs.writeFileSync('reviews.html', content, 'utf8');
console.log('✓ Successfully removed fake reviews, unverified ratings, and updated reviews.html');
