import { puzzleInput } from './puzzle_input';

// const puzzleInput = `3   4
// 4   3
// 2   5
// 1   3
// 3   9
// 3   3
// `;

const iList = puzzleInput.split('\n').map(i => i.split(/\ +/)).filter(i => i.length > 1);
const l1 = iList.map(i  => Number(i[0])).sort();
const l2 = iList.map(i => Number(i[1])).sort();
const lSum = [];

for (let i=0; i<l1.length; i++) {
  const n1 = l1[i];
  lSum.push(
    n1 * l2.filter(i => i=== n1).length
  );
}
// console.log(lSum);

const sum = lSum.reduce((acc, curr) => acc += curr, 0);
console.log(sum);

