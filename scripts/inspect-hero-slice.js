const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const start = content.indexOf('hero-img-bg');
console.log(content.slice(start - 100, start + 250));
