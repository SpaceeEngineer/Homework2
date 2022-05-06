const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');
const fs = require('fs');

class LimitSizeStream extends stream.Transform {
  
  constructor(opt) {
    super(opt);

    this.limit = opt;
    this.index = 0;
    
  }

  _transform(chunk, encoding, callback) {
    try {
      const resultString = `${chunk.toString('utf8')}`;
      this.index += resultString.length;

      if (this.index > this.limit) {
        throw new LimitExceededError();
      }

      callback(null, resultString);
    } catch (err) {
      console.log(err);
    }
  }
}

const limitSizeStream = new LimitSizeStream(8); // 8 байт
const outStream = fs.createWriteStream('out.txt');

limitSizeStream.pipe(outStream);

limitSizeStream.write('hello'); // 'hello' - це 5 байт, тому цей стрінг повністю записаний у файл

setTimeout(() => {
    limitSizeStream.write('world'); // помилка LimitExceeded! у файлі лишилось лише 'hello'
}, 10);

module.exports = LimitSizeStream;
