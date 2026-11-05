const fs = require('fs');
const path = require('path'); // File extensions to process
const extensions = ['.html', '.htm', '.css', '.js', '.ts', '.jsx', '.tsx', '.json', '.md', '.php', '.vue']; // Recursively collect all files with given extensions
function collectFiles(dir) { let results = []; const entries = fs.readdirSync(dir, { withFileTypes: true }); for (const entry of entries) { const fullPath = path.join(dir, entry.name); if (entry.isDirectory()) { results = results.concat(collectFiles(fullPath)); } else if (entry.isFile()) { if (extensions.includes(path.extname(entry.name).toLowerCase())) { results.push(fullPath); } } } return results;
} // Regex for any emoji (Unicode Extended Pictographic set)
const emojiRegex = /\p{Extended_Pictographic}/gu;
// Regex to match empty HTML tags (after emoji removal)
const emptyTagRegex = /<([A-Za-z][A-Za-z0-9-]*)\b[^>]*>\s*<\/\1>/g; let changedFiles = []; const projectRoot = process.cwd();
const files = collectFiles(projectRoot); files.forEach(file => { let content = fs.readFileSync(file, 'utf8'); const original = content; // Remove emojis content = content.replace(emojiRegex, ''); // Remove now‑empty tags content = content.replace(emptyTagRegex, ''); // Collapse multiple spaces (optional cleanup) content = content.replace(/\s{2,}/g, ' '); if (content !== original) { try { fs.writeFileSync(file, content, 'utf8'); changedFiles.push(file); } catch (e) { console.error(`Failed to write ${file}: ${e.message}`); } }
}); console.log('Changed files:');
changedFiles.forEach(f => console.log(f)); // Verification: search for any remaining emojis
let remaining = [];
files.forEach(file => { const txt = fs.readFileSync(file, 'utf8'); if (emojiRegex.test(txt)) { remaining.push(file); }
});
if (remaining.length > 0) { console.log('Emoji still present in the following files:'); remaining.forEach(f => console.log(f));
} else { console.log('No emoji characters remain in the codebase.');
}
