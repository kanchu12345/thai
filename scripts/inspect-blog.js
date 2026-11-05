const fs = require('fs');
const blog = fs.readFileSync('blog.html', 'utf8');
const articleMatches = [...blog.matchAll(/<article[^>]*>([\s\S]*?)<\/article>/gi)];
console.log('Articles in blog.html:', articleMatches.length);
articleMatches.forEach((m, i) => {
  const title = (m[1].match(/<h[234][^>]*>([\s\S]*?)<\/h[234]>/i) || [])[1];
  console.log(i + 1, title ? title.replace(/<[^>]+>/g, '').trim() : 'No title');
});
