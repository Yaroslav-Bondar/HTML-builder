const fs = require('node:fs');
const readline = require('node:readline');
const { stdin: input, stdout } = require('node:process');
const process = require('node:process');
const path = require('node:path');

const FAREWELl_PHRASE = 'Goodbye good luck.';
const WRITE_PATH = path.join(__dirname, 'log.txt');

const output = fs.createWriteStream(WRITE_PATH);
const rl = readline.createInterface({ input, output });

stdout.write('Enter text:\n');

rl.on('line', (input) => {
  output.write(`${input}\n`);
  if (input == 'exit') {
    console.log(`${FAREWELl_PHRASE}`);
    rl.close();
  }
});

process.on('SIGINT', () => {
  stdout.write(`${FAREWELl_PHRASE}\n`);
  rl.close();
});
