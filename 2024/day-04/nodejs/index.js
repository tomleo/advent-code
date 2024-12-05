/*

Find all instances of XMAS
- horizontal
- vertical
- diagonal

*/

const WORD_XMAS = 'XMAS';

const strToArray = (str) => {
    return str.split('\n').map(line => line.split(''));
}

const matchVertical = (wordSearch) => {
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

            if (item === WORD_XMAS[activeLetterIndex]) {
                partialMatch.push([y,x]);
                activeLetterIndex += 1;
            } else {
                activeLetterIndex = 0;
                partialMatch = [];
            }

            // Whole word found?
            if (partialMatch.length === WORD_XMAS.length) {
                matches.push([...partialMatch]);
                partialMatch = [];
            }

            // Has gone through whole word?
            if (activeLetterIndex > WORD_XMAS.length - 1) {
                activeLetterIndex = 0;
                partialMatch = [];
            }
        }
    }

    return matches;
}

const matchHorizontal = (wordSearch) => {
    const matches = [];
    for (let i=0; i<wordSearch.length; i++) {
        const row = wordSearch[i];
        let partialMatch = [];
        let activeLetterIndex = 0;

        for (let j=0; j<row.length; j++) {
            const item = row[j];

            // Has gone through whole word?
            if (activeLetterIndex > WORD_XMAS.length - 1) {
                activeLetterIndex = 0;

                // Whole word found?
                if (partialMatch.length === WORD_XMAS.length) {
                    matches.push([...partialMatch]);
                    partialMatch = [];
                }
            }

            if (item === WORD_XMAS[activeLetterIndex]) {
                partialMatch.push([i,j]);
                activeLetterIndex += 1;
            } else {
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

console.log(
    matchVertical(strToArray(example_02))
);
