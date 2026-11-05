const fs = require('fs');
const home = fs.readFileSync('index.html', 'utf8');

const authorMatches = [...home.matchAll(/class=["'][^"']*(?:author|reviewer|client)[^"']*["'][^>]*>([\s\S]*?)<\/[a-z0-9]+>/gi)];
console.log('Home author elements:', authorMatches.map(m => m[1].replace(/<[^>]+>/g, '').trim()));
