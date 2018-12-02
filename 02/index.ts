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

const containsAnyLetterNTimes = (n: number) => occurenceMap =>
  Array.from(occurenceMap.values()).filter(x => x === n).length > 0;

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

const countStrOccurences = (strArr: string[]) => {
  const occurenceMap = new Map<string, number>();
  strArr.forEach(str => {
    if (occurenceMap.get(str)) {
      occurenceMap.set(str, occurenceMap.get(str) + 1);
    } else {
      occurenceMap.set(str, 1);
    }
  });
  return occurenceMap;
};

const findStringsWhereOnlyDiffInPosition = (input, position) => {
  const occurences = countStrOccurences(
    input.map(x => `${x.substring(0, position)}${x.substring(position + 1)}`)
  );

  const result: string[] = [];
  for (var [key, value] of occurences.entries()) {
    if (value > 1) {
      result.push(key);
    }
  }
  return result;
};

const part2 = (input: string[]) => {
  // assuming all of them are equally long
  const length = input[0].length;

  for (let i = 0; i < length; i++) {
    const found = findStringsWhereOnlyDiffInPosition(input, i);
    if (found.length) {
      console.log(found);
    }
  }
  return;
};

const run = async () => {
  console.log('Starting up');
  await fs.readFile('./inputs/02.txt', 'utf8', (err, contents) => {
    if (err) {
      console.error('ERROR', err);
    }

    const splittedInput: string[] = contents.split('\n').filter(x => x !== '');
    console.log(part1(splittedInput));
    console.log(part2(splittedInput));
  });
};

run();
