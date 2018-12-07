const fs = require('fs');

const parseRow = (str: string) => {
  //Example:  Step W must be finished before step B can begin.
  const stepName = str.match(/(?<=Step\s)\w/g);
  const before = str.match(/(?<=before step\s)\w/g);
  return { name: stepName[0], before: before[0] };
};

const processDependencies = steps => {
  const dependencyMap: Map<string, string[]> = new Map();

  steps.forEach(step => {
    const inMap = dependencyMap.get(step.before);
    if (inMap) {
      dependencyMap.set(step.before, [...inMap, step.name]);
    } else {
      dependencyMap.set(step.before, [step.name]);
    }

    const nameInMap = dependencyMap.get(step.name);
    if (!nameInMap) {
      dependencyMap.set(step.name, []);
    }
  });
  return dependencyMap;
};

const findStepWithNoDependencies = dependencyMap => {
  let result = [];
  for (var [key, value] of dependencyMap.entries()) {
    if (value.length === 0) {
      result.push(key);
    }
  }
  return result.sort()[0];
};

const execute = (step, dependencyMap) => {
  console.log('Executing', step);
  const newMap = new Map();
  for (var [key, value] of dependencyMap.entries()) {
    if (key !== step) {
      newMap.set(key, value.filter(x => x !== step));
    }
  }
  return newMap;
};

const executeAndLogOrder = dependencyMap => {
  const executionOrder = [];

  let done = false;
  let remaining = dependencyMap;
  while (!done) {
    const next = findStepWithNoDependencies(remaining);
    if (next) {
      executionOrder.push(next);
      console.log(remaining);
      remaining = execute(next, remaining);
    }
    done = !next;
  }
  return executionOrder;
};

const day07part1 = input => {
  const steps = input.map(parseRow);
  const dependencyMap = processDependencies(steps);
  const executionOrder = executeAndLogOrder(dependencyMap);
  return executionOrder.join('');
};

const test = () => {
  console.log('Testing...');
  const testInput = `Step C must be finished before step A can begin.
                     Step C must be finished before step F can begin.
                     Step A must be finished before step B can begin.
                     Step A must be finished before step D can begin.
                     Step B must be finished before step E can begin.
                     Step D must be finished before step E can begin.
                     Step F must be finished before step E can begin.`;

  const splittedInput: string[] = testInput.split('\n').filter(x => x !== '');
  console.log(day07part1(splittedInput));
};

const run07 = async () => {
  console.log('Starting up');
  test();
  await fs.readFile('./inputs/07.txt', 'utf8', (err, contents) => {
    if (err) {
      console.error('ERROR', err);
    }

    const splittedInput: string[] = contents.split('\n').filter(x => x !== '');

    console.log(day07part1(splittedInput));
  });
};

run07();
