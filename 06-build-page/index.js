const { mkdir } = require('node:fs/promises');
const { readFile, writeFile } = require('node:fs/promises');
const path = require('node:path');
const { makeBundle } = require('../05-merge-styles/modules/makeBundle.js');
const { copyDir } = require('../04-copy-directory/modules/copyDir.js');
const { selectFilesByExt } = require('../services/selectFilesByExt.js');

const join = path.join;

const DEST_FOLDER_NAME = 'project-dist';
const DEST_FOLDER = join(__dirname, DEST_FOLDER_NAME);

const HTML_SOURCE_FILE = 'template.html';
const HTML_SOURCE_PATH = join(__dirname, HTML_SOURCE_FILE);
const HTML_DEST_FILE = 'index.html';
const HTML_DEST_PATH = join(DEST_FOLDER, HTML_DEST_FILE);
const HTML_FILE_EXT = '.html';

const COMPONENTS_FOLDER = join(__dirname, 'components');

const ASSETS_SOURCE_FOLDER = join(__dirname, 'assets');
const ASSETS_DEST_FOLDER = join(__dirname, DEST_FOLDER_NAME, 'assets');

const STYLE_DEST_FILE ='style.css';
const STYLE_SOURCE_FOLDER = join(__dirname, 'styles');
const STYLE_DEST_PATH = join(__dirname, DEST_FOLDER_NAME, STYLE_DEST_FILE);
const STYLE_FILE_EXT = '.css';

const createTemplate = async () => {
  let html = await readFile(HTML_SOURCE_PATH, 'utf-8');
  let files = await selectFilesByExt(COMPONENTS_FOLDER, HTML_FILE_EXT);

  for (let i = 0; i < files.length; i++) {
    const content = await readFile(join(COMPONENTS_FOLDER, files[i]), 'utf-8');
    const fileName = path.parse(files[i]).name;
    const regExp = new RegExp(`{{${fileName}}}`, 'g');
    html = html.replace(regExp, content);
  }
  
  writeFile(HTML_DEST_PATH, html, 'utf-8');
};

(async () => {
  try {
    await mkdir(DEST_FOLDER, { recursive: true });
    
    createTemplate();
    
    makeBundle(STYLE_SOURCE_FOLDER, STYLE_DEST_PATH, STYLE_FILE_EXT);
    
    copyDir(ASSETS_SOURCE_FOLDER, ASSETS_DEST_FOLDER);
  } catch(err) {
    console.log(err);
  }
})();