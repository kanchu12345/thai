const fs = require('fs');
const { getAllCorePages } = require('./bind-all-pages');
const pages = getAllCorePages();
const map = {};
pages.forEach(p => {
  const content = fs.readFileSync(p, 'utf8');
  const m = content.match(/<body[^>]*data-cms-page=["']([^"']+)["']/i);
  map[p] = m ? m[1] : 'NONE';
});
console.log('Total pages:', pages.length);
console.log(JSON.stringify(map, null, 2));
