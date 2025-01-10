import * as path from "jsr:@std/path";
import * as logging from "jsr:@tomleo/logging";

const logger = logging.createLogger(logging.DEBUG)

export async function getRawInput(fileName: string) {
    const current = Deno.cwd();
    const p = path.join(current, "../", fileName);
    const text = await Deno.readTextFileSync(p);
    return text;
}

const wordToNumber: { [key: string]: number } = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
}

function isWordANumber(str: string) {
    const pattern = /one|two|three|four|five|six|seven|eight|nine/g;
    return !!str.match(pattern);
}

type matchType = {
    index: number;
    word: string;
};

/*
 * This function fails for the test-case of 2eighthree, where it would return "28".
 * The key to this function is understanding that JS's regex::matchAll doesn't
 * handle "overlaps", instead the regex match needs to be performed over all
 * substrings until no more matches of numbers of "word numbers" can be found.
 */
function findFirstAndLastNumber(str: string) {
    logger.debug('findFirstAndLastNumber - str: ', str);
    const pattern = /\d|one|two|three|four|five|six|seven|eight|nine/g;
    const numbersAndWords = [...str.matchAll(pattern)].map(m => {
        return {
            index: m.index,
            word: m[0],
        }
    })
    const firstMatch = numbersAndWords[0];
    logger.debug('findFirstAndLastNumber - firstMatch: ', firstMatch);
    const firstNum = isWordANumber(firstMatch.word) ? wordToNumber[firstMatch.word]: firstMatch.word;
    logger.debug('findFirstAndLastNumber - firstNum: ', firstNum);

    const lastMatch = numbersAndWords.at(-1) as matchType;
    logger.debug('findFirstAndLastNumber - lastMatch: ', lastMatch);
    const lastNum = isWordANumber(lastMatch.word) ? wordToNumber[lastMatch.word]: lastMatch.word;
    logger.debug('findFirstAndLastNumber - lastNum: ', lastNum);
    const firstAndLastNumber = `${firstNum}${lastNum}`;
    logger.debug('findFirstAndLastNumber - firstAndLastNumber: ', firstAndLastNumber);
    logger.debug('\n');
    return parseInt(firstAndLastNumber, 10);
}

function findAllNumbersInString(str: string) {
    const pattern = /\d|one|two|three|four|five|six|seven|eight|nine/g;
    const findNumber = (s: string) => ([...s.matchAll(pattern)].map(m => {
        return {
            index: m.index,
            word: m[0],
        }
    })[0]);
    logger.debug('str: ', str);
    let curStr = str;
    const foundNumbers: (string|number)[] = [];
    while(true) {
        const foundNum = findNumber(curStr);
        if (!foundNum) {
            const result = parseInt(`${foundNumbers[0]}${foundNumbers.at(-1)}`, 10);
            logger.debug('result: ', result);
            logger.debug('');
            return result;
        }
        foundNumbers.push(
            isWordANumber(foundNum.word) ? wordToNumber[foundNum.word]: foundNum.word
        );
        curStr = curStr.slice(1, curStr.length);
    }
}

if (import.meta.main) {
    const inputFile = 'input.txt';
    const rawInput = await getRawInput(inputFile);
    const numbers = rawInput.split('\n').map(findAllNumbersInString);

    logger.warning('numbers: ', numbers);
    const total = numbers.reduce((acc: number, cur: number) => {
        return acc + cur;
    }, 0);


    logger.warning('total: ', total);
}
