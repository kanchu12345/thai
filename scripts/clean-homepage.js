/**
 * scripts/clean-homepage.js
 * Removes fake testimonials and unverified satisfaction counter from index.html
 * Installs empty-state review block driven by data-cms-list="reviews"
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove 4th counter box (5-Star Guest Satisfaction 99.8%)
const counterRegex = /<div class="counter-box counter-box--lotus">[\s\S]*?5-Star Guest Satisfaction<\/p>\s*<\/div>/i;
if (counterRegex.test(content)) {
  content = content.replace(counterRegex, '');
  console.log('✓ Removed unverified 5-Star Guest Satisfaction counter box');
}

// 2. Replace fake testimonials with reviews list + empty state card
const reviewsBlockRegex = /<div class="testimonial-cards-grid">[\s\S]*?<\/section>/i;
const newReviewsBlock = `<div class="testimonial-cards-grid" data-cms-list="reviews" style="display: flex; justify-content: center; width: 100%;">
          <div class="empty-reviews-card" style="background: rgba(255,255,255,0.9); border: 1px dashed rgba(197, 168, 128, 0.6); border-radius: 12px; padding: 3rem 2rem; text-align: center; max-width: 620px; margin: 0 auto; box-shadow: 0 4px 16px rgba(0,0,0,0.03);">
            <div style="font-size: 2.2rem; margin-bottom: 0.75rem;">☸️</div>
            <h4 style="font-family: 'Playfair Display', serif; font-size: 1.35rem; color: #002B49; margin-bottom: 0.5rem;" data-cms="siteContent.home.reviewsEmptyTitle">Guest Reviews Coming Soon</h4>
            <p style="color: #64748B; font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;" data-cms="siteContent.home.reviewsEmptyDesc">
              We are currently welcoming our upcoming season guests across Sri Lanka. Verified guest reviews and reflections will appear here as they are published.
            </p>
            <a href="contact.html" class="next-btn next-btn--gold" style="display: inline-flex; padding: 0.75rem 1.5rem;"><span>Plan Your Bespoke Tour</span></a>
          </div>
        </div>
      </div>
    </section>`;

if (reviewsBlockRegex.test(content)) {
  content = content.replace(reviewsBlockRegex, newReviewsBlock);
  console.log('✓ Replaced fake named testimonials with data-cms-list="reviews" and verified empty-state card');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('✓ index.html successfully cleaned');
