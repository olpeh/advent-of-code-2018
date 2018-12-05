const fs = require('fs');

enum Action {
  begin = 'begins shift',
  asleep = 'falls asleep',
  wake = 'wakes up'
}

enum State {
  awake,
  asleep
}

interface GuardRecord {
  date: Date;
  action: Action;
  guardId?: number;
}

const whichAction = (isBegin, isFallsAsleep, isWakeUp) => {
  if (isBegin) {
    return Action.begin;
  }

  if (isFallsAsleep) {
    return Action.asleep;
  }

  if (isWakeUp) {
    return Action.wake;
  }

  throw new Error('Unknown action');
};

const parseInputRowToObject = str => {
  // [1518-09-24 23:59] Guard #2467 begins shift
  const date = new Date(str.match(/\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}/g));
  const isBegin = /begins shift/.test(str);
  const isFallsAsleep = /falls asleep/.test(str);
  const isWakesUp = /wakes up/.test(str);
  const guardId = Number(str.match(/(?<=\#)\d*/g));

  const action: Action = whichAction(isBegin, isFallsAsleep, isWakesUp);

  const record: GuardRecord = {
    date,
    action,
    guardId
  };
  return record;
};

function compareGuardRecords(a: GuardRecord, b: GuardRecord) {
  if (a.date < b.date) return -1;
  if (a.date > b.date) return 1;
  return 0;
}

const getGuardsAsleepMinutes = records => {
  const result: Map<number, number[]> = new Map();
  let currentGuardId: number;
  let lastFallAsleepDate: Date;

  records.forEach((element: GuardRecord) => {
    if (element.action === Action.begin) {
      currentGuardId = element.guardId;
    } else if (element.action === Action.asleep) {
      lastFallAsleepDate = element.date;
    } else if (element.action === Action.wake) {
      const asleepMinutesStart = lastFallAsleepDate.getMinutes();
      const asleepMinutesEnd = element.date.getMinutes();
      const asleepMinuteArr = [];

      for (let i = asleepMinutesStart; i < asleepMinutesEnd; i++) {
        asleepMinuteArr.push(i);
      }

      if (result.get(currentGuardId)) {
        result.set(
          currentGuardId,
          [...result.get(currentGuardId), ...asleepMinuteArr].sort()
        );
      } else {
        result.set(currentGuardId, asleepMinuteArr);
      }
    }
  });
  return result;
};

const getGuardWhoSleepsMost = (map: Map<number, number[]>) => {
  let maxMinutesAsleepId;
  let maxMinutesAsleep = 0;
  for (var [key, value] of map.entries()) {
    if (value.length > maxMinutesAsleep) {
      maxMinutesAsleepId = key;
      maxMinutesAsleep = value.length;
    }
  }
  return maxMinutesAsleepId;
};

const getGuardMostAsleepDuringMinute = (asleepMinutes: number[]) => {
  const map: Map<number, number> = new Map();
  asleepMinutes.forEach(minute => {
    if (map.get(minute)) {
      map.set(minute, map.get(minute) + 1);
    } else {
      map.set(minute, 1);
    }
  });
  let max = 0;
  let maxMinute = 0;
  for (var [key, value] of map.entries()) {
    if (value > max) {
      maxMinute = key;
      max = value;
    }
  }

  return maxMinute;
};

const day04part1 = input => {
  // RANDOM ORDER
  // [1518-04-15 00:00] Guard #179 begins shift
  // [1518-09-24 23:59] Guard #2467 begins shift
  // [1518-09-21 00:49] wakes up
  // [1518-09-21 00:19] falls asleep
  // [1518-07-17 00:51] wakes up
  const sortedRecords = input
    .map(parseInputRowToObject)
    .sort(compareGuardRecords);
  const guardsAsleepMinutes = getGuardsAsleepMinutes(sortedRecords);
  const guardWhoSleepsMost = getGuardWhoSleepsMost(guardsAsleepMinutes);
  console.log(guardWhoSleepsMost);
  const mostAsleepDuringMinute = getGuardMostAsleepDuringMinute(
    guardsAsleepMinutes.get(guardWhoSleepsMost)
  );
  console.log({ mostAsleepDuringMinute, guardWhoSleepsMost });
  return mostAsleepDuringMinute * guardWhoSleepsMost;
};

const day04part2 = input => {
  // RANDOM ORDER
  // [1518-04-15 00:00] Guard #179 begins shift
  // [1518-09-24 23:59] Guard #2467 begins shift
  // [1518-09-21 00:49] wakes up
  // [1518-09-21 00:19] falls asleep
  // [1518-07-17 00:51] wakes up
  const sortedRecords = input
    .map(parseInputRowToObject)
    .sort(compareGuardRecords);
  const guardsAsleepMinutes = getGuardsAsleepMinutes(sortedRecords);

  let maxMinute, maxValue, guardId;
  for (var [key, value] of guardsAsleepMinutes.entries()) {
    const max = Math.max.apply(null, value);
    if (maxMinute === undefined || max > maxValue) {
      guardId = key;
      maxValue = max;
      maxMinute = getGuardMostAsleepDuringMinute(value);
    }
  }
  return guardId * maxMinute;
};

const run04 = async () => {
  console.log('Starting up');
  await fs.readFile('./inputs/04.txt', 'utf8', (err, contents) => {
    if (err) {
      console.error('ERROR', err);
    }

    const splittedInput: string[] = contents.split('\n').filter(x => x !== '');

    //What is the ID of the guard you chose multiplied by the minute you chose?
    console.log(day04part1(splittedInput));
    console.log(day04part2(splittedInput));
  });
};

run04();
