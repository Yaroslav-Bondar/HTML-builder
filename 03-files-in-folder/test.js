'use strict';

const fs = require('node:fs');

const files = ['1-readFileSync.js', 'n-untitled.js', 'README.md'];

const stats = new Array(files.length);

let rest = files.length;

const printResult = () => {
  // console.log('print result start');
  // console.dir({ stats });
};
let cycles = 0;
files.forEach((file, i) => {
  // cycles++;
  console.dir({ file, i });
  fs.lstat(file, (err, stat) => {
    if (err) {
      console.log(`File ${file} not found`);
    } else {
      stats[i] = stat;
    }
    if (--rest) return;
    console.log('cycles', cycles);
    printResult();
  });
});