const fs = require('fs');

const run = async () => {
  console.log('Starting up');
  const startingFrequency = 0;
  await fs.readFile('./inputs/01.txt', 'utf8', (err, contents) => {
    if (err) {
      console.error('ERROR', err);
    }

    const splittedInput = contents.split('\n').map(x => parseInt(x));
    const resultingFrequency = splittedInput.reduce(
      (a, b) => a + b,
      startingFrequency
    );
    console.log(resultingFrequency);
  });
};

run();
