const { readdir } = require('node:fs/promises');
const path = require('node:path');
const fs = require('node:fs');

const DIR_PATH = 'secret-folder';
const READ_DIR_PATH = path.join(__dirname, DIR_PATH);

(async () => {
  let files;
  try {
    const entries = await readdir(READ_DIR_PATH, { withFileTypes: true });
    files = entries.filter(entry => entry.isFile());
  } catch (error) {
    console.log(error);
  }
  files.forEach(file => {
    const filePath = path.join(READ_DIR_PATH, file.name);
    fs.lstat(filePath, (error, stats) => {
      if (error) {
        console.log(error);
      } else {
        let { name, ext } = path.parse(filePath);
        ext = ext.slice(ext.indexOf('.') + 1);
        console.log(`${name} - ${ext} - ${stats.size} bytes`);
      }
    });
  });
})();