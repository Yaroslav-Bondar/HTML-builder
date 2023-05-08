const { mkdir } = require('node:fs/promises');
const { readdir, readFile, writeFile } = require('node:fs/promises');
const path = require('node:path');

const join = path.join;

const DEST_FOLDER_NAME = 'project-dist';
const HTML_TEMPLATE_NAME = 'template.html';
const DEST_FOLDER_PATH = join(__dirname, DEST_FOLDER_NAME);
const HTML_TEMPLATE_PATH = join(__dirname, HTML_TEMPLATE_NAME)

const createTemplate() {
  const html = readFile(HTML_TEMPLATE_PATH, 'utf-8')
  
}

(async () => {
  try {
    await mkdir(DEST_FOLDER_PATH);
  } catch(err) {
    console.log(err);
  }
})();