import fs from 'node:fs';

/*

Find all instances of XMAS
- horizontal
- vertical
- diagonal

horizontal, vertical, diagonal, written backwards, or even overlapping other words
*/

const WORD_XMAS = 'XMAS';

const strToArray = (str) => {
    return str.split('\n').map(line => line.split(''));
}

const matchVertical = (wordSearch, word) => {
    /*
    Y,X
    0,0
    1,0
    2,0
    3,0
    ...
    */
    const matches = [];

    // Go column by column, instead of row by row
    const rowLength = wordSearch[0].length;
    for (let x=0; x<rowLength; x++) {
        let partialMatch = [];
        let activeLetterIndex = 0;
        for (let y=0; y<wordSearch.length; y++) {
            const item = wordSearch[y][x];
            // console.log(`y: ${y}, x: ${x} -- ${item}`);

            if (item === word[activeLetterIndex]) {
                partialMatch.push([y,x]);
                activeLetterIndex += 1;
            } else {
                activeLetterIndex = 0;
                partialMatch = [];
            }

            // Whole word found?
            if (partialMatch.length === word.length) {
                matches.push([...partialMatch]);
                partialMatch = [];
            }

            // Has gone through whole word?
            if (activeLetterIndex > word.length - 1) {
                activeLetterIndex = 0;
                partialMatch = [];
            }
        }
    }

    return matches;
}

const matchHorizontal = (wordSearch, word) => {
    const matches = [];
    for (let i=0; i<wordSearch.length; i++) {
        const row = wordSearch[i];
        let partialMatch = [];
        let activeLetterIndex = 0;

        for (let j=0; j<row.length; j++) {
            const item = row[j];

            if (item === word[activeLetterIndex]) {
                partialMatch.push([i,j]);
                activeLetterIndex += 1;
            } else {
                activeLetterIndex = 0;
                partialMatch = [];
            }

            // Whole word found?
            if (partialMatch.length === word.length) {
                matches.push([...partialMatch]);
                partialMatch = [];
            }

            // Has gone through whole word?
            if (activeLetterIndex > word.length - 1) {
                activeLetterIndex = 0;
                partialMatch = [];
            }
        }
    }
    return matches;
}


const matchDiagonal = (wordSearch, word) => {
  /*
  [X] [ ] [ ] [ ]
  [ ] [M] [ ] [ ]
  [ ] [ ] [A] [ ]
  [ ] [ ] [ ] [S]

  0,0
  1,1
  2,2
  3,3

  0,1
  1,2
  2,3
  3,-
  */
    const matches = [];

    for (let j=0; j < wordSearch.length; j++) {
        let partialMatch = [];
        let activeLetterIndex = 0;
        for (let i=0; i < wordSearch.length; i++) {
            let item;
            try {
                item = wordSearch[i+j][i+j];
            } catch (exp) {
                // console.log(exp);
                continue;
            }
            console.log(`item: ${item}, i+j: ${i+j}`);

            if (item === word[activeLetterIndex]) {
                partialMatch.push([i+j,i+j])
                activeLetterIndex += 1;
            } else {
                activeLetterIndex = 0;
                partialMatch = [];
            }

            console.log('partialMatch: ', partialMatch);

            // Whole word found?
            if (partialMatch.length === word.length) {
                matches.push([...partialMatch])
                partialMatch = [];
            }

            // Has gone through whole word
            if (activeLetterIndex > word.length - 1) {
                activeLetterIndex = 0;
                partialMatch = [];
            }
        }
    }

    return matches;

}

/*
..X...
.SAMX.
.A..A.
XMAS.S
.X....
*/
const example_01 = `..X...
.SAMX.
.A..A.
XMAS.S
.X....`

const example_02 = `X..X.
M.MM.
A.AA.
S.S..`;

// console.log(
//     strToArray(example_01)
// );

// console.log(
//     matchHorizontal(strToArray(example_01))
// );

// console.log(
//     matchVertical(strToArray(example_02), WORD_XMAS)
// );

const example_03 = `X...
.M..
..A.
...S`;


// console.log(
//   matchDiagonal(strToArray(example_03), WORD_XMAS)
// );


// WTF is overlapping?


let rawInput = '';
try {
    rawInput = fs.readFileSync('./example_puzzle_input.txt', 'utf8');
} catch (err) {
    console.error(err);
    process.exit(1);
}

const wordReversed = WORD_XMAS.split("").reverse().join("");
console.log('wordReversed: ', wordReversed);
const input = strToArray(rawInput);
console.log('input: ', input);

const matchesHorizontalForward = matchHorizontal(input, WORD_XMAS);
const matchHorizontalBackward = matchHorizontal(input, wordReversed);
const matchesVerticalFowrward = matchVertical(input, WORD_XMAS)
// const matchesVerticalBackward = matchVertical(input, wordReversed);
const matchesDiagonalFowrward = matchDiagonal(input, WORD_XMAS)
const matchesDiagonalBackward = matchDiagonal(input, wordReversed);


const matches = {
    matchesHorizontalForward,
    matchHorizontalBackward,
    matchesVerticalFowrward,
    // matchesVerticalBackward,
    matchesDiagonalFowrward,
    matchesDiagonalBackward,
}

console.log(matches);

const totalWords = Object.keys(matches).reduce((acc, curr) => acc += curr.length, 0);
console.log('Total Words: ', totalWords);

/*
Total Words: 760
That's not the right answer; your answer is too low
*/