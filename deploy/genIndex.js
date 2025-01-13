// genIndex.js
// Dru Delarosa | @dntstck
// generates shields for index.md relative to that dir, based on the posts in that dir.

const fs = require('fs');
const path = require('path');

const scriptDir = path.resolve(__dirname);
const blogDirs = [
    path.resolve(scriptDir, '../cm5'),
    path.resolve(scriptDir, '../devserver'),
    path.resolve(scriptDir, '../embeddedc'),
    path.resolve(scriptDir, '../microcontrollers'),
    path.resolve(scriptDir, '../misc'),
    path.resolve(scriptDir, '../osnetworking'),
    path.resolve(scriptDir, '../picosystem'),
    path.resolve(scriptDir, '../raspberrypi'),
    path.resolve(scriptDir, '../thoughts'),
    path.resolve(scriptDir, '../webdev')
];

// generate badge URL
const generateBadgeUrl = (title) => `https://img.shields.io/badge/${encodeURIComponent(title)}-151515?style=flat-square&logo=GitHub&logoColor=white`;

// update index.md with shields
const updateIndexMd = (dir, files) => {
    const indexFilePath = path.resolve(dir, 'index.md');
    if (!fs.existsSync(indexFilePath)) {
        console.log(`index.md does not exist in ${dir}`);
        return;
    }
    let indexContent = fs.readFileSync(indexFilePath, 'utf8');
    const shields = files.map(file => {
        const badgeUrl = generateBadgeUrl(file.replace('.md', ''));
        return `<a href="${file}"><img src="${badgeUrl}" alt="${file}"></a><br>`;
    }).join('\n');
    indexContent = indexContent.replace(
        /<!-- all-posts-start -->([\s\S]*?)<!-- all-posts-end -->/,
        `<!-- all-posts-start -->\n${shields}\n<!-- all-posts-end -->`
    );
    fs.writeFileSync(indexFilePath, indexContent);
    console.log(`Updated ${indexFilePath} with shields.`);
};


blogDirs.forEach(dir => {
    console.log(`${path.basename(dir)}: ${dir}`);
    if (fs.existsSync(dir)) {
        fs.readdir(dir, (err, files) => {
            if (err) {
                return console.error(`Unable to scan dir ${dir}: ${err}`);
            }
            const markdownFiles = files.filter(file => file.endsWith('.md') && file !== 'index.md');
            if (markdownFiles.length > 0) {
                updateIndexMd(dir, markdownFiles);
            } else {
                console.log(`No markdown files to update in ${dir}`);
            }
        });
    } else {
        console.log(`fatal error: directory ${dir} does not exist`);
    }
});