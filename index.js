const fs = require('fs');
const { Transform } = require('stream');

const inputFile = 'cs2.txt';
const outputFile = 'out.txt';

const reader = fs.createReadStream(inputFile, { encoding: 'latin1' });
const writer = fs.createWriteStream(outputFile, { encoding: 'latin1' });

const modifyLettersStream = new Transform({
    transform(chunk, encoding, callback) {
        const modifiedChunk = modifyText(chunk);
        callback(null, modifiedChunk);
    }
});

function modifyText(chunk) {
    return chunk.toString('utf8').split('').map((letter, index) => {
        if ((index + 1) % 3 === 0) {
            return letter.toUpperCase();
        } else {
            return letter;
        }
    }).join('');
}

reader.pipe(modifyLettersStream).pipe(writer);

writer.on('finish', () => {
    console.log('Успіх. Створено новий файл. \nНазва вихідного файлу:', outputFile);
});

reader.on('error', (err) => {
    console.error('Помилка читання вхідного файлу:', err);
});

writer.on('error', (err) => {
    console.error('Помилка запису вихідного файлу:', err);
});