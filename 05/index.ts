const fs = require('fs');

const day05part1 = input => {
  let done = false;
  let processed = input;
  while (!done) {
    const oldLength = processed.length;
    for (let i = 0; i < processed.length - 1; i++) {
      if (
        processed[i].toLowerCase() === processed[i + 1].toLowerCase() &&
        ((processed[i] === processed[i].toUpperCase() &&
          processed[i + 1] === processed[i].toLowerCase()) ||
          (processed[i] === processed[i].toLowerCase() &&
            processed[i + 1] === processed[i].toUpperCase()))
      ) {
        processed =
          processed.substr(0, i) + processed.substr(i + 2, processed.length);
        // Stupidly inefficient, I know
        break;
      }
    }
    done = processed.length === oldLength;
  }
  console.log(processed);
  return processed.length;
};

const run05 = async () => {
  console.log('Starting up');
  await fs.readFile('./inputs/05.txt', 'utf8', (err, contents) => {
    if (err) {
      console.error('ERROR', err);
    }

    console.log(day05part1(contents));
  });
};

run05();
