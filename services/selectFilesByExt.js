const path = require('node:path');
const { readdir } = require('node:fs/promises');

const selectFilesByExt = async (readDirPath, extension) => {
  const entries = await readdir(readDirPath, { withFileTypes: true });
  let files = entries.filter(entry => entry.isFile());
  files = files.map(file => file.name);
  files = files.filter((name) => {
    const { ext } = path.parse(name);
    return ext === extension ? true : false;
  });
  return files;
};

module.exports.selectFilesByExt = selectFilesByExt;