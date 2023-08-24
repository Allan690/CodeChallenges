/**
 * read file => get line count of file
 * => get character count
 * => get byte count
 * => get word count
 */
import * as fs from 'fs';

export async function readFile(fileName: string): Promise<{
    lineCount: number, byteCount: number, charCount: number, wordCount: number
}> {
    let lineCount = 0;
    let byteCount = 0;
    let charCount = 0;
    let wordCount =  0;
    const stream = fs.createReadStream(fileName)
    return new Promise((resolve, reject) => {
        stream.on('data', (chunk) => {
            lineCount += chunk.toString().split('\n').length - 1;
            byteCount += chunk.length
            charCount += chunk.toString().length;
            wordCount += chunk.toString().split(/\s+/).map( w => w.trim()).filter((w) => w.replace(/[*]/gmiu,"").length >= 1).length;
        });
        stream.on('end', () => {
            resolve({
                lineCount: lineCount,
                byteCount: byteCount,
                charCount: charCount,
                wordCount: wordCount
            })
        })
        stream.on('error', (error) => {
            reject(error)
        })
    })
}

