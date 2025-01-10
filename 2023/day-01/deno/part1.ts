import * as path from "jsr:@std/path";
import * as logging from "jsr:@tomleo/logging";

export async function getRawInput(fileName: string) {
    const current = Deno.cwd();
    const p = path.join(current, "../", fileName);
    const text = await Deno.readTextFileSync(p);
    return text;
}

const logger = logging.createLogger(logging.INFO);

// lines of text; each line
// originally contained a specific **calibration value** that the Elves now need to
// recover.
// On each line, the calibration value can be found by combining the 
// **first digit** and the **last digit** (in that order) to form a single **two-digit number**.

function getNumbersInString(str: string) {
    const pattern = /[0-9]/g;
    const matchingNumbers = [...str.matchAll(pattern)].map(i => i[0]);
    return matchingNumbers;
}

async function getNumbers(inputFile: string) {
    const testInput = await getRawInput(inputFile);
    const numbers = testInput.split('\n').map(line => {
        logger.debug(line);
        let joinedNumber = getNumbersInString(line).join('');
        if (joinedNumber.length < 2) {
            joinedNumber = joinedNumber + joinedNumber;
        } else if (joinedNumber.length > 2) {
            joinedNumber = joinedNumber.at(0) as string + joinedNumber.at(-1) as string
        }
        const num = Number(joinedNumber);
        logger.debug(num);
        return num;
    });
    return numbers;
}

if (import.meta.main) {
    // const numbers = await getNumbers('test-input-1.txt');
    const numbers = await getNumbers('input.txt');
    logger.debug(numbers);
    const total = numbers.reduce((acc, cur) => acc += cur);
    logger.info(total);
}
