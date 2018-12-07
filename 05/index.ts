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
  return processed.length;
};

const day05part2 = input => {
  const letters = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z'
  ];
  let minLength;

  for (const letter of letters) {
    const re = new RegExp(letter, 'gi');
    const inputWithoutLetter = input.replace(re, '');
    const result = day05part1(inputWithoutLetter);
    if (minLength === undefined || result < minLength) {
      minLength = result;
    }
    console.log({ letter }, { result }, { minLength });
  }
  return minLength;
};

const run05 = async () => {
  console.log('Starting up');
  await fs.readFile('./inputs/05.txt', 'utf8', (err, contents) => {
    if (err) {
      console.error('ERROR', err);
    }

    console.log(day05part1(contents));
    console.log(day05part2(contents));
  });
};

run05();
