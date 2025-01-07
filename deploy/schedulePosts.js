// schedulePosts.js
// Dru Delarosa | @dntstck
// schedules posts

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// relative paths
const scriptDir = path.resolve(__dirname);
const publishDir = path.resolve(scriptDir, '..'); // root
const scheduledDir = path.resolve(scriptDir, '../scheduled'); // scheduled

console.log(`Script Directory: ${scriptDir}`);
console.log(`Publish Directory: ${publishDir}`);
console.log(`Scheduled Directory: ${scheduledDir}`);

try {
  
  const files = fs.readdirSync(scheduledDir);
  console.log(`Scheduled files: ${files.join(', ')}`);

  files.forEach(file => {
    const filePath = path.join(scheduledDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    const parsedContent = matter(content);
    const publishDate = new Date(parsedContent.data.publishDate);
    
    console.log(`Publish Date: ${publishDate}, Current Date: ${new Date()}`);

    if (!isNaN(publishDate)) {
      // check dates
      if (new Date() >= publishDate) {
        const publishPath = path.join(publishDir, file);
        fs.writeFileSync(publishPath, parsedContent.content);
        fs.unlinkSync(filePath);
        console.log(`Published ${file}`);
      } else {
        console.log(`Not yet time to publish ${file}`);
      }
    } else {
      console.log(`Invalid publish date for ${file}`);
    }
  });
} catch (error) {
  console.error(`Error: ${error.message}`);
}
