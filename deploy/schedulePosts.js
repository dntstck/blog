// schedulePosts.js
// Dru Delarosa | @dntstck
// schedules posts

const fs = require('fs');
const path = require('path');

const scriptDir = path.resolve(__dirname);
const publishDir = path.resolve(scriptDir, '..');
const scheduledDir = path.resolve(scriptDir, '../scheduled');

console.log(`Script Directory: ${scriptDir}`);
console.log(`Publish Directory: ${publishDir}`);
console.log(`Scheduled Directory: ${scheduledDir}`);

try {
  const files = fs.readdirSync(scheduledDir);
  console.log(`Scheduled files: ${files.join(', ')}`);

  files.forEach(file => {
    const filePath = path.join(scheduledDir, file);
    const content = fs.readFileSync(filePath, 'utf8');

    const frontMatterRegex = /---\n([\s\S]*?)\n---/;
    const frontMatterMatch = content.match(frontMatterRegex);

    if (frontMatterMatch) {
      const frontMatter = frontMatterMatch[1];

      const publishDateRegex = /publishDate:\s*["']?([^"'\n]+)["']?/;
      const publishDateMatch = frontMatter.match(publishDateRegex);

      if (publishDateMatch) {
        const publishDate = new Date(publishDateMatch[1].trim());
        console.log(`Publish Date: ${publishDate}, Current Date: ${new Date()}`);

        if (!isNaN(publishDate)) {
          if (new Date() >= publishDate) {
            const publishPath = path.join(publishDir, file);
            fs.writeFileSync(publishPath, content);
            fs.unlinkSync(filePath);
            console.log(`Published ${file}`);
          } else {
            console.log(`Not yet time to publish ${file}`);
          }
        } else {
          console.log(`Invalid publish date for ${file}`);
        }
      } else {
        console.log(`No publish date found for ${file}`);
      }
    } else {
      console.log(`No front matter found for ${file}`);
    }
  });
} catch (error) {
  console.error(`Error: ${error.message}`);
}
