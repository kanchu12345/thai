const fs = require('fs');
const content = fs.readFileSync('destinations.html', 'utf8');

const regex = /<h3[^>]*>([\s\S]*?)<\/h3>/gi;
let match;
const headings = [];
while ((match = regex.exec(content)) !== null) {
  headings.push(match[1].replace(/<[^>]+>/g, '').trim());
}
console.log('H3 in destinations.html:', headings);
