const fs = require('fs');

interface Claim {
  id: number;
  offset: {
    left: number;
    top: number;
  };
  size: {
    width: number;
    height: number;
  };
}

interface Square {
  x: number;
  y: number;
}

const parseInputRow = str => {
  // Example #728 @ 503,489: 20x23
  const id = Number(str.match(/(?<=\#)\d*/g));
  const left = Number(str.match(/(?<=\@\s)\d*/g));
  const top = Number(str.match(/(?<=\@\s\d*\,)\d*/g));
  const width = Number(str.match(/(?<=\:\s)\d*/g));
  const height = Number(str.match(/(?<=\:\s\d*\x)\d*/g));

  const claim: Claim = {
    id,
    offset: {
      left,
      top
    },
    size: {
      width,
      height
    }
  };
  return claim;
};

const createClaimMap = (claims: Claim[]) => {
  const map = new Map<string, number>();

  claims.forEach(claim => {
    for (
      let x = claim.offset.left;
      x < claim.offset.left + claim.size.width;
      x++
    ) {
      for (
        let y = claim.offset.top;
        y < claim.offset.top + claim.size.height;
        y++
      ) {
        const square: Square = { x, y };
        if (map.get(`${square.x},${square.y}`)) {
          map.set(
            `${square.x},${square.y}`,
            map.get(`${square.x},${square.y}`) + 1
          );
        } else {
          map.set(`${square.x},${square.y}`, 1);
        }
      }
    }
  });

  return map;
};

const hasBeenClaimedTwiceOrMore = occurenceMap => {
  const result: string[] = [];
  for (var [key, value] of occurenceMap.entries()) {
    if (value > 1) {
      result.push(key);
    }
  }
  return result;
};

const day03part1 = input => {
  const claims = input.map(parseInputRow);
  const claimMap = createClaimMap(claims);
  const doubleClaimed = hasBeenClaimedTwiceOrMore(claimMap);
  return doubleClaimed.length;
};

const getNeverDoubleClaimed = (claims: Claim[], doubleClaimed: string[]) => {
  // LOL a horribly perfroming approach
  let result: number = -1;

  for (let k = 0; k < claims.length; k++) {
    const claim = claims[k];
    let overlapping = true;
    let skip = false;
    for (
      let x = claim.offset.left;
      x < claim.offset.left + claim.size.width;
      x++
    ) {
      for (
        let y = claim.offset.top;
        y < claim.offset.top + claim.size.height;
        y++
      ) {
        const matchingIndex = doubleClaimed.indexOf(`${x},${y}`);
        if (matchingIndex === -1) {
          overlapping = false;
        } else {
          overlapping = true;
          skip = true;
          continue;
        }
      }
    }
    if (!skip && !overlapping) {
      result = claim.id;
      break;
    }
  }

  return result;
};

const day03part2 = input => {
  const claims = input.map(parseInputRow);
  const claimMap = createClaimMap(claims);
  const doubleClaimed = hasBeenClaimedTwiceOrMore(claimMap);
  const neverDoubleClaimed = getNeverDoubleClaimed(claims, doubleClaimed);
  return neverDoubleClaimed;
};

const run03 = async () => {
  console.log('Starting up');
  await fs.readFile('./inputs/03.txt', 'utf8', (err, contents) => {
    if (err) {
      console.error('ERROR', err);
    }

    const splittedInput: string[] = contents.split('\n').filter(x => x !== '');
    console.log(day03part1(splittedInput));
    console.log(day03part2(splittedInput));
  });
};

run03();
