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
  // Verify if directories exist and are accessible
  if (!fs.existsSync(scheduledDir)) {
    console.error(`Scheduled directory does not exist: ${scheduledDir}`);
    process.exit(1);
  }

  if (!fs.existsSync(publishDir)) {
    console.error(`Publish directory does not exist: ${publishDir}`);
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
        const publishDateString = publishDateMatch[1].trim().split(' ')[0]; // Ignore comments
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
                const tagDir = path.join(publishDir, tag.toLowerCase()); // Convert tag to lowercase
                if (!fs.existsSync(tagDir)) {
                  console.log(`Creating directory: ${tagDir}`);
                  fs.mkdirSync(tagDir, { recursive: true }); // Ensure parent directories are created
                }
                const publishPath = path.join(tagDir, file);
                console.log(`Moving file from ${filePath} to ${publishPath}`);

                // Check if the file exists before moving
                if (!fs.existsSync(filePath)) {
                  console.error(`Source file does not exist: ${filePath}`);
                  return;
                }

                try {
                  if (fs.existsSync(publishPath)) {
                    console.log(`File already exists at ${publishPath}, deleting it.`);
                    fs.unlinkSync(publishPath);
                  }
                  fs.renameSync(filePath, publishPath);
                  console.log(`Published ${file} to ${publishPath}`);

                  // Verify if the file exists in the new location
                  if (fs.existsSync(publishPath)) {
                    console.log(`File successfully moved to ${publishPath}`);

                    // Check if the file is no longer in the source directory
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
} catch (error) {
  console.error(`Error: ${error.message}`);
}
