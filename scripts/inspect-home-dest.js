const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

// Find destinations section in index.html
const start = content.indexOf('destinations');
const section = content.slice(content.lastIndexOf('<section', start), content.indexOf('</section>', start) + 10);
const titles = [...section.matchAll(/<h[34][^>]*>([\s\S]*?)<\/h[34]>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
console.log('Destination headings in index.html:', titles);
