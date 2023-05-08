const { readFile, writeFile } = require('node:fs/promises');
const path = require('node:path');
const { selectFilesByExt } = require('../services/selectFilesByExt.js');

const READ_DIR_NAME = 'styles';
const WRITE_DIR_NAME = 'project-dist';
const WRITE_FILE_NAME = 'bundle.css';
const READ_DIR_PATH = path.join(__dirname, READ_DIR_NAME);
const WRITE_DIR_PATH = path.join(__dirname, WRITE_DIR_NAME);
const FILTER_EXTENSION = '.css';

async function* generateContent() {
  const files = await selectFilesByExt(READ_DIR_PATH, FILTER_EXTENSION);
  for (let i = 0; i < files.length; i++) {
    let content = await readFile(path.join(READ_DIR_PATH, files[i]), 'utf-8');
    yield content;
  }
}

const makeBundle = async () => {
  let content = '';
  for await (const value of generateContent()) {
    content += value + '\n';
  }
  writeFile(path.join(WRITE_DIR_PATH, WRITE_FILE_NAME), content, 'utf-8');
};

makeBundle();
