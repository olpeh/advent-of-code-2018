const fs = require('fs');

const countLetterOccurences = str => {
  const occurenceMap = new Map<string, number>();
  for (const letter of str) {
    if (occurenceMap.get(letter)) {
      occurenceMap.set(letter, occurenceMap.get(letter) + 1);
    } else {
      occurenceMap.set(letter, 1);
    }
  }
  return occurenceMap;
};

const containsAnyLetterNTimes = (n: number) => occurenceMap => {
  const arr = Array.from(occurenceMap.values());
  const arr2 = arr.filter(x => x === n);
  return arr2.length > 0;
};

const containsAnyLetter2Times = containsAnyLetterNTimes(2);
const containsAnyLetter3Times = containsAnyLetterNTimes(3);

const part1 = (input: string[]) => {
  const occurences = input.map(countLetterOccurences);
  const occurencesWithAnyLetterExactly2times = occurences.filter(
    containsAnyLetter2Times
  );
  const occurencesWithAnyLetterExactly3times = occurences.filter(
    containsAnyLetter3Times
  );
  const checksum: number =
    occurencesWithAnyLetterExactly2times.length *
    occurencesWithAnyLetterExactly3times.length;
  return checksum;
};

const run = async () => {
  console.log('Starting up');
  await fs.readFile('./inputs/02.txt', 'utf8', (err, contents) => {
    if (err) {
      console.error('ERROR', err);
    }

    const splittedInput: string[] = contents.split('\n').filter(x => x !== '');
    console.log(part1(splittedInput));
  });
};

run();
