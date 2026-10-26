const fs = require('fs');
const blog = fs.readFileSync('blog.html', 'utf8');
const headings = [...blog.matchAll(/<h[234][^>]*>([\s\S]*?)<\/h[234]>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
console.log('Headings in blog.html:', headings);
