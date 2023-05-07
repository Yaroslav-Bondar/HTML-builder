const { mkdir } = require('node:fs/promises');
const { readdir } = require('node:fs/promises');
const { copyFile } = require('node:fs/promises');
const path = require('node:path');

const DIR_NAME_COPY = 'files-copy';
const READ_DIR_NAME = 'files';
const DIR_PATH_COPY = path.join(__dirname, DIR_NAME_COPY);
const READ_DIR_PATH = path.join(__dirname, READ_DIR_NAME);

async function copyDir() {
  const copy = async (fileName) => {
    await copyFile(path.join(READ_DIR_PATH, fileName), path.join(DIR_PATH_COPY, fileName));
  };

  try {
    await mkdir(DIR_PATH_COPY, { recursive: true });

    const entries = await readdir(READ_DIR_PATH, { withFileTypes: true });

    let files = entries.filter(entry => entry.isFile());
    files = files.map(file => file.name);

    files.forEach(copy);
  } catch (err) {
    console.log(err);
  }
}

copyDir();