const { mkdir, readdir, copyFile } = require('node:fs/promises');
const path = require('node:path');

async function copyDir(readPath, writePath) {
  const copy = async (fileName) => {
    await copyFile(path.join(readPath, fileName), path.join(writePath, fileName));
  };

  try {
    await mkdir(writePath, { recursive: true });
    const entries = await readdir(readPath, { withFileTypes: true });

    let files = entries.filter(entry => entry.isFile());
    files = files.map(file => file.name);
    let folders = entries.filter(entry => entry.isDirectory());
    folders = folders.map(folder => folder.name);

    files.forEach(copy);

    if (folders.length) {
      folders.forEach(folder => {
        copyDir(path.join(readPath, folder), path.join(writePath, folder));
      });
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports.copyDir = copyDir;