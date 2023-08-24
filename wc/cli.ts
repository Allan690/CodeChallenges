#!/usr/bin/env node

import {readFile} from "./index";

const args = process.argv.slice(2);
if(args.length < 1) {
    console.log(`
    Usage:
    1) word count => cli.js -w <file_name> 
    2) multibyte count -> cli.js -m <file_name>
    3) character count -> cli.js -c <file_name>
    4) Line count -> cli.js -l <file_name>
    `);
    process.exit(1);
}


const flag = args[0];
const fileName = args[1];

if(!['-w', '-m', '-c', '-l'].includes(flag) && fileName.trim().length == 0) {
    console.log(`
    Usage:
    1) word count => cli.ts -w <file_name> 
    2) multibyte count -> cli.ts -m <file_name>
    3) character count -> cli.ts -c <file_name>
    4) Line count -> cli.ts -l <file_name>
    `);
    process.exit(1);
}

if(!['-w', '-m', '-c', '-l'].includes(flag)){
    (async () => {
        const res = await readFile(fileName)
        console.log(`${res.lineCount}  ${res.wordCount}  ${res.byteCount}  ${fileName}`)
    })()
} else if(flag === '-w') {
    (async () => {
        const res = await readFile(fileName)
        console.log(`${res.wordCount}  ${fileName}` )
    })()
} else if(flag === '-l') {
    (async () => {
        const res = await readFile(fileName)
        console.log(`${res.lineCount}  ${fileName}` )
    })()
} else if(flag === '-m') {
    (async () => {
        const res = await readFile(fileName)
        console.log(`${res.charCount}  ${fileName}` )
    })()
} else if(flag === '-c') {
    (async () => {
        const res = await readFile(fileName)
        console.log(`${res.byteCount}  ${fileName}` )
    })()
}
