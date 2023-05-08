const { mkdir } = require('node:fs/promises');
const { readdir, readFile, writeFile } = require('node:fs/promises');
const path = require('node:path');
const { makeBundle } = require('../05-merge-styles/modules/makeBundle.js');
const { copyDir } = require('../04-copy-directory/modules/copyDir.js');

const join = path.join;

// const HTML_TEMPLATE_NAME = 'template.html';
// const HTML_TEMPLATE_PATH = join(__dirname, HTML_TEMPLATE_NAME)
const DEST_FOLDER_NAME = 'project-dist';
// const ASSETS_FOLDER_NAME = 'assets';

const DEST_FOLDER = join(__dirname, DEST_FOLDER_NAME);
const ASSETS_SOURCE_FOLDER = join(__dirname, 'assets');
const ASSETS_DEST_FOLDER = join(__dirname, DEST_FOLDER_NAME, 'assets');
const STYLE_DEST_FILE ='style.css';
const STYLE_SOURCE_FOLDER = join(__dirname, 'styles');
const STYLE_DEST_PATH = join(__dirname, DEST_FOLDER_NAME, STYLE_DEST_FILE);
const STYLE_FILE_EXT = '.css';

// const createTemplate() {
//   // const html = readFile(HTML_TEMPLATE_PATH, 'utf-8')
  
// }

(async () => {
  try {
    await mkdir(DEST_FOLDER, { recursive: true });
    makeBundle(STYLE_SOURCE_FOLDER, STYLE_DEST_PATH, STYLE_FILE_EXT);
    copyDir(ASSETS_SOURCE_FOLDER, ASSETS_DEST_FOLDER);
  } catch(err) {
    console.log(err);
  }
})();