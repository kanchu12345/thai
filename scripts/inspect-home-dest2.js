const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const matches = [...content.matchAll(/href=["'][^"']*destinations[^"']*["']/gi)];
console.log('Links to destinations in index.html:', matches.length);
matches.forEach(m => console.log(m[0]));
