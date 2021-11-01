const fs = require('fs');
// const path = require('path');
const readline = require('readline');
const process = require('process');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let writeableStream = fs.createWriteStream("02-write-file/text.txt");

rl.write('Please, input some text (If you want to finish: enter "exit" or press Ctrl + C):\n');

rl.on('line', (input) => {
    if (input === 'exit') {
        console.log('Thank you!\n');
        rl.close();
    } else {
        writeableStream.write(input + '\n');
    }
});

rl.on('close', () => {
    console.log('Thank you!\n');
});