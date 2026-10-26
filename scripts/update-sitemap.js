/**
 * scripts/update-sitemap.js
 * Updates sitemap.xml to use canonical URLs for category and tours index pages
 */

const fs = require('fs');
const path = require('path');

const sitemapPath = path.join(__dirname, '..', 'sitemap.xml');
let content = fs.readFileSync(sitemapPath, 'utf8');

const URL_MAP = {
  'cultural-tours.html': 'tours/cultural/',
  'buddhist-heritage-tours.html': 'tours/buddhist-heritage/',
  'wildlife-tours.html': 'tours/wildlife/',
  'beach-tours.html': 'tours/beach/',
  'hill-country-tours.html': 'tours/hill-country/',
  'ayurvedic-tours.html': 'tours/ayurvedic/',
  'honeymoon-tours.html': 'tours/honeymoon/',
  'family-tours.html': 'tours/family/',
  'adventure-tours.html': 'tours/adventure/',
  'golf-tours.html': 'tours/golf/',
  'ramayana-tours.html': 'tours/ramayana/',
  'sri-lanka-tours.html': 'tours/'
};

let count = 0;
for (const [oldUrl, newUrl] of Object.entries(URL_MAP)) {
  const regex = new RegExp(`https://lotusceylon\\.com/${oldUrl}`, 'g');
  if (regex.test(content)) {
    content = content.replace(regex, `https://lotusceylon.com/${newUrl}`);
    count++;
  }
}

fs.writeFileSync(sitemapPath, content, 'utf8');
console.log(`✓ Updated sitemap.xml: replaced ${count} legacy URL patterns with canonical paths.`);
