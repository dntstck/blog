// schedulePosts.js
// Dru Delarosa | @dntstck
// schedules posts

const fs = require('fs');
const path = require('path');

const scriptDir = path.resolve(__dirname);  // check dirs are correct
const publishDir = path.resolve(scriptDir, '..'); 
const scheduledDir = path.resolve(scriptDir, '../scheduled');


fs.readdirSync(scheduledDir).forEach(file => {
  const filePath = path.join(scheduledDir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  if (new Date() >= new Date(content.publishDate)) {
    const publishPath = path.join(publishDir, file);
    fs.writeFileSync(publishPath, content);
    fs.unlinkSync(filePath);
    console.log(`Published ${file}`);
  }
});

