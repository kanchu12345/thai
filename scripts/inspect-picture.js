const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const start = content.indexOf('<picture');
const end = content.indexOf('</picture>', start) + 10;
console.log(content.slice(start, end));
