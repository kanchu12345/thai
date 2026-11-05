const fs = require('fs');

const revContent = fs.readFileSync('reviews.html', 'utf8');
const cardMatches = [...revContent.matchAll(/<div[^>]*class=["'][^"']*review[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi)];
console.log('Review elements in reviews.html:', cardMatches.length);

const authorMatches = [...revContent.matchAll(/class=["'][^"']*(?:author|reviewer|client)[^"']*["'][^>]*>([\s\S]*?)<\/[a-z0-9]+>/gi)];
console.log('Author elements:', authorMatches.map(m => m[1].replace(/<[^>]+>/g, '').trim()));
