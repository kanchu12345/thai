const fs = require('fs');
if (fs.existsSync('data/team.json')) {
  console.log('team.json exists:', fs.readFileSync('data/team.json', 'utf8'));
} else {
  console.log('team.json does not exist');
}
const about = fs.readFileSync('about.html', 'utf8');
const teamMatches = [...about.matchAll(/class=["'][^"']*team[^"']*["']/gi)];
console.log('Team class matches in about.html:', teamMatches.length);
