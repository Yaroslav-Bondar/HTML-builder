const { stdout } = process;
const fs = require('node:fs');
const path = require('node:path');

const readablePath = path.join(__dirname, 'text.txt');
const readableStream = fs.createReadStream(readablePath);

let data = '';
readableStream.on('data', chunk => data += chunk);
readableStream.on('error', error => stdout.write(`${error}\n`));
readableStream.on('end', () => stdout.write(data));
