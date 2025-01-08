// schedulePosts.js
// Dru Delarosa | @dntstck
// schedules posts

const fs = require('fs');
const path = require('path');

const scriptDir = path.resolve(__dirname);
const publishDir = path.resolve(scriptDir, '..');
const scheduledDir = path.resolve(scriptDir, '../scheduled');
const indexFilePath = path.resolve(scriptDir, '../index.md');
const templateFilePath = path.resolve(scriptDir, '../template.md');

console.log(`Script Directory: ${scriptDir}`);
console.log(`Publish Directory: ${publishDir}`);
console.log(`Scheduled Directory: ${scheduledDir}`);
console.log(`Index File Path: ${indexFilePath}`);
console.log(`Template File Path: ${templateFilePath}`);

function getDirectoryByTag(tag) {
  const tagDirectoryMap = {
    'cm5': 'cm5', 
    'devserver': 'devserver',
    'embedded': 'embeddedc',
    'microcontrollers': 'microcontrollers',
    'misc': 'misc',
    'osnetworking': 'osnetworking', 
    'picosystem': 'picosystem',
    'raspberrypi': 'raspberrypi',
    'thoughts': 'thoughts',
    'webdevelopment': 'webdev'
  };
  return tagDirectoryMap[tag] || 'misc';
}

try {
  if (!fs.existsSync(scheduledDir)) {
    console.error(`Scheduled directory does not exist: ${scheduledDir}`);
    process.exit(1);
  }

  const template = fs.readFileSync(templateFilePath, 'utf-8');
  const [header, footer] = template.split('<!-- Blog posts here -->');

  const files = fs.readdirSync(scheduledDir);
  console.log(`Scheduled files: ${files.join(', ')}`);

  const latestPosts = [];

  files.forEach(file => {
    const filePath = path.join(scheduledDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    console.log(`Processing file: ${file}`);
    console.log(`File Content: \n${content}`);

    const frontMatterRegex = /---\s*\n([\s\S]*?)\n\s*---/;
    const frontMatterMatch = content.match(frontMatterRegex);

    if (frontMatterMatch) {
      const frontMatter = frontMatterMatch[1];
      console.log(`Front Matter: \n${frontMatter}`);

      const publishDateRegex = /publishDate:\s*["']?([^"'\n]+)["']?/;
      const publishDateMatch = frontMatter.match(publishDateRegex);

      if (publishDateMatch) {
        const publishDateString = publishDateMatch[1].trim();
        console.log(`Publish Date String: ${publishDateString}`);
        const publishDate = new Date(Date.parse(publishDateString)); 
        console.log(`Parsed Publish Date: ${publishDate}, Current Date: ${new Date()}`);

        if (!isNaN(publishDate.getTime()) && new Date() >= publishDate) {
          const titleRegex = /title:\s*["']?([^"'\n]+)["']?/;
          const titleMatch = frontMatter.match(titleRegex);

          const tagsRegex = /tags:\s*\[([^\]]+)\]/;
          const tagsMatch = frontMatter.match(tagsRegex);

          if (tagsMatch) {
            const tags = tagsMatch[1].split(',').map(tag => tag.trim());
            console.log(`Tags: ${tags}`);

            tags.forEach(tag => {
              const tagDir = path.join(publishDir, getDirectoryByTag(tag.toLowerCase()));
              if (!fs.existsSync(tagDir)) {
                console.log(`Creating directory: ${tagDir}`);
                fs.mkdirSync(tagDir, { recursive: true });
              }

              const wrappedContent = `${header}\n${content}\n${footer}`;
              const publishPath = path.join(tagDir, file); // Keep the same filename
              console.log(`Moving file from ${filePath} to ${publishPath}`);
              try {
                if (fs.existsSync(publishPath)) {
                  console.log(`File already exists at ${publishPath}, deleting it.`);
                  fs.unlinkSync(publishPath);
                }
                fs.writeFileSync(publishPath, wrappedContent);
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

            if (titleMatch) {
              const title = titleMatch[1];
              latestPosts.push({ title, file });
            }
          }
        } else {
          console.log(`Not yet time to publish ${file}`);
        }
      } else {
        console.log(`No publish date found for ${file}`);
      }
    } else {
      console.log(`No front matter found for ${file}`);
    }
  });

  let indexContent = fs.readFileSync(indexFilePath, 'utf8');
  const latestPostsSection = latestPosts.map(post => {
    const directory = getDirectoryByTag(post.tag);
    const badgeUrl = `https://img.shields.io/badge/${encodeURIComponent(post.title)}-151515?style=flat-square&logo=GitHub&logoColor=white`;
    return `<a href="./${directory}/${post.file}"><img src="${badgeUrl}" alt="${post.title}"></a><br>`; // Keep the original file extension
  }).join('\n');
  console.log(`Latest Posts Section: \n${latestPostsSection}`);

  indexContent = indexContent.replace(
    /<!-- latest-posts-start -->([\\s\S]*?)<!-- latest-posts-end -->/,
    `<!-- latest-posts-start -->\n${latestPostsSection}\n<!-- latest-posts-end -->`
  );

  fs.writeFileSync(indexFilePath, indexContent);
  console.log('Updated index.md with latest posts.');

  if (fs.readdirSync(scheduledDir).length === 0) {
    console.log(`Scheduled directory is empty. Adding a placeholder file to keep the directory.`);
    fs.writeFileSync(path.join(scheduledDir, '.gitkeep'), '');
  } else {
    console.log(`Scheduled directory still contains files.`);
  }

} catch (error) {
  console.error(`Error: ${error.message}`);
}
