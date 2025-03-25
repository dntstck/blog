// genIndex.js
// Dru Delarosa | @dntstck
// generates shields for index.md relative to that dir, based on the posts in that dir.

const fs = require("fs");
const path = require("path");

const scriptDir = path.resolve(__dirname);
const blogDirs = [
  path.resolve(scriptDir, "../development"),
  path.resolve(scriptDir, "../devserver"),
  path.resolve(scriptDir, "../embedded"),
  path.resolve(scriptDir, "../gamedev"),
  path.resolve(scriptDir, "../microcontrollers"),
  path.resolve(scriptDir, "../misc"),
  path.resolve(scriptDir, "../picosystem"),
  path.resolve(scriptDir, "../rust"),
  path.resolve(scriptDir, "../raspberrypi"),
  path.resolve(scriptDir, "../webdev"),
];

// gen shields
const generateBadgeUrl = (title) =>
  `https://img.shields.io/badge/${encodeURIComponent(
    title
  )}-151515?style=flat-square&logo=GitHub&logoColor=white`;

const updateIndexMd = (dir, files) => {
  const indexFilePath = path.resolve(dir, "index.md");
  if (!fs.existsSync(indexFilePath)) {
    console.log(`index.md does not exist in ${dir}`);
    return;
  }
  let indexContent;
  try {
    indexContent = fs.readFileSync(indexFilePath, "utf8");
  } catch (err) {
    console.error(`Unable to read index.md in ${dir}: ${err}`);
    return;
  }

  const shields = files
    .map((file) => {
      const fileNameWithoutExt = file.replace(".md", "");
      const badgeUrl = generateBadgeUrl(fileNameWithoutExt);
      return `<a href="${fileNameWithoutExt}"><img src="${badgeUrl}" alt="${fileNameWithoutExt} Badge"></a><br>`;
    })
    .join("\n");

  indexContent = indexContent.replace(
    /<!-- all-posts-start -->([\s\S]*?)<!-- all-posts-end -->/,
    `<!-- all-posts-start -->\n${shields}\n<!-- all-posts-end -->`
  );

  try {
    fs.writeFileSync(indexFilePath, indexContent);
    console.log(`Updated ${indexFilePath} with shields.`);
  } catch (err) {
    console.error(`Unable to write to index.md in ${dir}: ${err}`);
  }
};

blogDirs.forEach((dir) => {
  console.log(`${path.basename(dir)}: ${dir}`);
  if (fs.existsSync(dir)) {
    fs.readdir(dir, (err, files) => {
      if (err) {
        return console.error(`Unable to scan dir ${dir}: ${err}`);
      }
      const markdownFiles = files.filter(
        (file) => file.endsWith(".md") && file !== "index.md"
      );
      if (markdownFiles.length > 0) {
        updateIndexMd(dir, markdownFiles);
      } else {
        console.log(`No markdown files to update in ${dir}`);
      }
    });
  } else {
    console.log(`Fatal error: directory ${dir} does not exist`);
  }
});
