const path = require('node:path');
const { makeBundle } = require('./modules/makeBundle.js');

const READ_DIR_NAME = 'styles';
const WRITE_DIR_NAME = 'project-dist';
const WRITE_FILE_NAME = 'bundle.css';
const READ_DIR_PATH = path.join(__dirname, READ_DIR_NAME);
const WRITE_PATH = path.join(__dirname, WRITE_DIR_NAME, WRITE_FILE_NAME);
const FILTER_EXTENSION = '.css';

makeBundle(READ_DIR_PATH, WRITE_PATH, FILTER_EXTENSION);
