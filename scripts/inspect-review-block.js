const fs = require('fs');
const rev = fs.readFileSync('reviews.html', 'utf8');

const start = rev.indexOf('Chen Wei-Ting');
console.log(rev.slice(start - 200, start + 300));
