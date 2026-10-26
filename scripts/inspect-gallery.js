const fs = require('fs');
const gallery = fs.readFileSync('gallery.html', 'utf8');
const imgs = [...gallery.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*alt=["']([^"']+)["']/gi)];
console.log('Gallery images:', imgs.length);
imgs.slice(0, 10).forEach((m, i) => console.log(i + 1, m[1], m[2]));
