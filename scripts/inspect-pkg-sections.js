const fs = require('fs');
const content = fs.readFileSync('tours/beach/southern-sands-serenade/index.html', 'utf8');

const headings = [...content.matchAll(/<h[234][^>]*>([\s\S]*?)<\/h[234]>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
console.log('Headings in package page:', headings);

// Check if data-cms attributes exist in these sections
const cmsMatches = [...content.matchAll(/data-cms(?:-[a-z]+)?=["']([^"']+)["']/gi)].map(m => m[1]);
console.log('Sample data-cms keys:', cmsMatches.slice(0, 30));
