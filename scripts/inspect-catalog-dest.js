const fs = require('fs');
const cat = JSON.parse(fs.readFileSync('data/seed-catalog.json', 'utf8'));
console.log('Seed catalog destinations:');
cat.destinations.forEach((d, i) => {
  console.log(i + 1, d.slug, d.title ? d.title.en : d.name, d.region);
});
