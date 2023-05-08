const path = require('node:path');
const { copyDir } = require('./modules/copyDir.js');

const DIR_NAME_COPY = 'files-copy';
const READ_DIR_NAME = 'files';
const DIR_PATH_COPY = path.join(__dirname, DIR_NAME_COPY);
const READ_DIR_PATH = path.join(__dirname, READ_DIR_NAME);

copyDir(READ_DIR_PATH, DIR_PATH_COPY);

