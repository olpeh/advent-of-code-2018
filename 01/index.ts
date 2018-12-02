import { elemInArray } from '../utils/arrays';
const fs = require('fs');

const run = async () => {
  console.log('Starting up');
  const startingFrequency = 0;
  await fs.readFile('./inputs/01.txt', 'utf8', (err, contents) => {
    if (err) {
      console.error('ERROR', err);
    }

    const splittedInput: number[] = contents.split('\n').map(x => parseInt(x));
    const resultingFrequency = splittedInput.reduce(
      (a, b) => a + b,
      startingFrequency
    );

    // Part 1
    console.log(resultingFrequency);

    //Part 2 What is the first frequency your device reaches twice?

    let result = null;

    const frequencyHistory: number[] = [];
    let currentFrequency: number = startingFrequency;
    let i = 0;
    while (!result) {
      currentFrequency =
        currentFrequency + splittedInput[i % splittedInput.length];
      if (elemInArray(frequencyHistory, currentFrequency)) {
        console.log('Found duplicate', currentFrequency, i);
        result = currentFrequency;
        break;
      }
      frequencyHistory.push(currentFrequency);
      i++;
    }
    console.log(result);
  });
};

run();
