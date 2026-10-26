const fs = require('fs');
const rev = fs.readFileSync('reviews.html', 'utf8');

const start = rev.indexOf('<div class="reviews-grid" id="reviewsGrid">');
const end = rev.indexOf('</section>', start);

console.log('Reviews grid start:', start, 'end:', end);
console.log('Length of reviews grid HTML:', end - start);
