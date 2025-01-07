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
  if (!fs.existsSync(scheduledDir)) {
    console.error(`Scheduled directory does not exist: ${scheduledDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(scheduledDir);
  console.log(`Scheduled files: ${files.join(', ')}`);

  files.forEach(file => {
    const filePath = path.join(scheduledDir, file);
    const content = fs.readFileSync(filePath, 'utf8');

    console.log(`File Content: \n${content}`);

    const frontMatterRegex = /---\s*\n([\s\S]*?)\n\s*---/;
    const frontMatterMatch = content.match(frontMatterRegex);

    if (frontMatterMatch) {
      const frontMatter = frontMatterMatch[1];
      console.log(`Front Matter: \n${frontMatter}`);

      const publishDateRegex = /publishDate:\s*["']?([^"'\n]+)["']?/;
      const publishDateMatch = frontMatter.match(publishDateRegex);

      if (publishDateMatch) {
        const publishDateString = publishDateMatch[1].trim().split(' ')[0];
        console.log(`Publish Date String: ${publishDateString}`);
        const publishDate = new Date(publishDateString);
        console.log(`Parsed Publish Date: ${publishDate}, Current Date: ${new Date()}`);

        if (!isNaN(publishDate.getTime())) {
          if (new Date() >= publishDate) {
            const tagsRegex = /tags:\s*\[([^\]]+)\]/;
            const tagsMatch = frontMatter.match(tagsRegex);

            if (tagsMatch) {
              const tags = tagsMatch[1].split(',').map(tag => tag.trim());
              console.log(`Tags: ${tags}`);

              tags.forEach(tag => {
                const tagDir = path.join(publishDir, tag.toLowerCase());
                if (!fs.existsSync(tagDir)) {
                  console.log(`Creating directory: ${tagDir}`);
                  fs.mkdirSync(tagDir, { recursive: true });
                }
                const publishPath = path.join(tagDir, file);
                console.log(`Moving file from ${filePath} to ${publishPath}`);
                try {
                  if (fs.existsSync(publishPath)) {
                    console.log(`File already exists at ${publishPath}, deleting it.`);
                    fs.unlinkSync(publishPath);
                  }
                  fs.renameSync(filePath, publishPath);
                  console.log(`Published ${file} to ${publishPath}`);

                  if (fs.existsSync(publishPath)) {
                    console.log(`File successfully moved to ${publishPath}`);

                    if (!fs.existsSync(filePath)) {
                      console.log(`File successfully removed from ${filePath}`);
                    } else {
                      console.error(`File still exists in source directory: ${filePath}`);
                    }
                  } else {
                    console.error(`File move failed: ${publishPath} not found`);
                  }
                } catch (err) {
                  console.error(`Failed to move file: ${err.message}`);
                }
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

  // Ensure the scheduled directory remains intact
  if (fs.readdirSync(scheduledDir).length === 0) {
    console.log(`Scheduled directory is empty. Adding a placeholder file to keep the directory.`);
    fs.writeFileSync(path.join(scheduledDir, '.gitkeep'), '');
  } else {
    console.log(`Scheduled directory still contains files.`);
  }

} catch (error) {
  console.error(`Error: ${error.message}`);
}