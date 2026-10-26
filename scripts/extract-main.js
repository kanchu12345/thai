const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const gitExe = 'C:\\Users\\kanch\\AppData\\Local\\GitHubDesktop\\app-3.6.4\\resources\\app\\git\\cmd\\git.exe';

const files = [
  'index.html',
  'tours/beach/index.html',
  'tours/beach/southern-sands-serenade/index.html'
];

files.forEach(f => {
  const dest = path.join('main-benchmark', f);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const content = execSync(`"${gitExe}" show main:${f}`).toString('utf8');
  fs.writeFileSync(dest, content, 'utf8');
  console.log('Extracted main:', f, 'to', dest);
});
