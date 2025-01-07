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

    console.log(`File Content: \n${content}`);

    const frontMatterRegex = /---\n([\s\S]*?)\n---/;
    const frontMatterMatch = content.match(frontMatterRegex);

    if (frontMatterMatch) {
      const frontMatter = frontMatterMatch[1];
      console.log(`Front Matter: \n${frontMatter}`);

      const publishDateRegex = /publishDate:\s*["']?([^"'\n]+)["']?/;
      const publishDateMatch = frontMatter.match(publishDateRegex);

      if (publishDateMatch) {
        const publishDateString = publishDateMatch[1].trim().split(' ')[0]; // Ignore comments
        console.log(`Publish Date String: ${publishDateString}`);
        const publishDate = new Date(publishDateString);
        console.log(`Parsed Publish Date: ${publishDate}, Current Date: ${new Date()}`);

        if (!isNaN(publishDate.getTime())) {
          if (new Date() >= publishDate) {
            const tagsRegex = /tags:\s* \[([^\] ]+)\]/;
            const tagsMatch = frontMatter.match(tagsRegex);

            if (tagsMatch) {
              const tags = tagsMatch[1].split(',').map(tag => tag.trim());
              console.log(`Tags: ${tags}`);

              tags.forEach(tag => {
                const tagDir = path.join(publishDir, tag);
                if (!fs.existsSync(tagDir)) {
                  fs.mkdirSync(tagDir);
                }
                const publishPath = path.join(tagDir, file);
                fs.renameSync(filePath, publishPath);
                console.log(`Published ${file} to ${publishPath}`);
              });
            } else {
              console.log(`No tags found for ${file}`);
            }
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
