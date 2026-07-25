// schedulePosts.js
// Dru Delarosa | @dntstck
// Move scheduled posts to _posts when publishDate <= now

const fs = require('fs');
const path = require('path');

const scheduledDir = path.resolve(__dirname, '../scheduled');
const postsDir = path.resolve(__dirname, '../_posts');

if (!fs.existsSync(scheduledDir)) {
  console.error(`Scheduled directory not found: ${scheduledDir}`);
  process.exit(1);
}

fs.readdirSync(scheduledDir).forEach(file => {
  if (!file.endsWith('.md')) return;

  const filePath = path.join(scheduledDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/publishDate:\s*["']?([^"'\n]+)["']?/);

  if (!match) return console.log(`No publishDate in ${file}`);

  const publishDate = new Date(match[1].trim());
  if (isNaN(publishDate)) return console.log(`Invalid date in ${file}`);

  if (new Date() >= publishDate) {
    const destPath = path.join(postsDir, file);
    fs.renameSync(filePath, destPath);
    console.log(`Published ${file} → ${destPath}`);
  } else {
    console.log(`Not time yet for ${file}`);
  }
});
