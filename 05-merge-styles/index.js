const { readFile, writeFile } = require('node:fs/promises');
const path = require('node:path');
const { selectFilesByExt } = require('../services/selectFilesByExt.js');

const READ_DIR_NAME = 'styles';
const WRITE_DIR_NAME = 'project-dist';
const WRITE_FILE_NAME = 'bundle.css';
const READ_DIR_PATH = path.join(__dirname, READ_DIR_NAME);
const WRITE_PATH = path.join(__dirname, WRITE_DIR_NAME, WRITE_FILE_NAME);
const FILTER_EXTENSION = '.css';

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

makeBundle(READ_DIR_PATH, WRITE_PATH, FILTER_EXTENSION);

module.exports.makeBundle = makeBundle;
