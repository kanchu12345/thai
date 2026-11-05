const fs = require('fs');

let c = fs.readFileSync('index.html', 'utf8');
const oldBlock = c.indexOf('The Lotus Journal:');
const start = c.lastIndexOf('<section', oldBlock);
const end = c.indexOf('</section>', oldBlock) + 10;
let section = c.slice(start, end);
section = section.split('href="inquiry-detailed.html"').join('href="blog.html"');
c = c.slice(0, start) + section + c.slice(end);
fs.writeFileSync('index.html', c, 'utf8');
console.log('Successfully updated blog links in index.html to blog.html');
