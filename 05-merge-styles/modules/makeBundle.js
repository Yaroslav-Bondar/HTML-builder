const { readFile, writeFile } = require('node:fs/promises');
const path = require('node:path');
const { selectFilesByExt } = require('../../services/selectFilesByExt.js');

async function* generateContent(readDirPath, files) {
  for (let i = 0; i < files.length; i++) {
    let content = await readFile(path.join(readDirPath, files[i]), 'utf-8');
    yield content;
  }
}

const makeBundle = async (readPath, writePath, fileExt) => {
  let content = '';
  const files = await selectFilesByExt(readPath, fileExt);
  for await (const value of generateContent(readPath, files)) {
    content += value + '\n';
  }
  writeFile(writePath, content, 'utf-8');
};

module.exports.makeBundle = makeBundle;