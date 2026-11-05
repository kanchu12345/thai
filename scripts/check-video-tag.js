const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const videoMatch = content.match(/<video[\s\S]*?<\/video>/i);
if (videoMatch) {
  console.log('Video tag in index.html:\n', videoMatch[0]);
} else {
  console.log('No video tag found');
}
