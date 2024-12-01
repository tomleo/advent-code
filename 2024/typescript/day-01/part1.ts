import { puzzleInput } from './puzzle_input';

console.log("This is a test");

const [, , ...args] = process.argv;

// console.log(args);

/* 
As each location is checked, they will mark it on their list with a star.

They figure the Chief Historian must be in one of the first fifty places they'll look, so in order to save Christmas, you need to help them get fifty stars on their list before Santa takes off on December 25th.
 
the historically significant locations are listed not by name but by a unique number called the location ID.

 */

// const exampleInput = `3   4
// 4   3
// 2   5
// 1   3
// 3   9
// 3   3
// `


/*

1. Pair up the smallest number in the left list with the smallest number in the right list
2. Then the second-smallest left number with the second-smallest right number

Within each pair, figure out how far apart the two numbers are
you'll need to add up all of those distances

*/


const iList = puzzleInput.split('\n').map(i => i.split(/\ +/)).filter(i => i.length > 1);
// console.log(iList);

const l1 = iList.map(i  => Number(i[0])).sort();
const l2 = iList.map(i => Number(i[1])).sort();
// console.log(l1);
// console.log(l2);

const lSum = [];
for (let i=0; i<l1.length; i++) {
  const n1 = l1[i];
  const n2 = l2[i];

  if (n1 > n2) {
    lSum.push(n1 - n2);
  } else {
    lSum.push(n2 - n1);
  }
}
// console.log(lSum);

const sum = lSum.reduce((acc, curr) => acc += curr, 0);
console.log(sum);


