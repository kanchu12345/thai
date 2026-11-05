const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const m = content.match(/<img[^>]*class=["'][^"']*hero-img-bg[^"']*["'][^>]*>/i);
if (m) {
  console.log('Hero image tag:', m[0]);
} else {
  console.log('hero-img-bg not found');
}

// Check <link rel="preload"> in head of index.html
const preloads = [...content.matchAll(/<link[^>]*rel=["']preload["'][^>]*>/gi)].map(p => p[0]);
console.log('Preloads in head:', preloads);
