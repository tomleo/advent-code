/*
The unusual data (your puzzle input) consists of many reports, one report per
line. Each report is a list of numbers called levels that are separated by
spaces.

Each line is a "report"
Each column is a "level"

Safe if:
- The levels are either all increasing or all decreasing
- Any two adjacent levels differ by at least one and at most three
*/
// import { puzzleInput } from './puzzle_input';
import fs from 'node:fs';

export function isSafeReport(report: number[], increasing: boolean) {
    // Skip last "level" as there's no level to compare to
    for (let j=0; j<report.length - 1; j++) {
        const curLevel = report[j];
        const nextLevel = report[j+1];

        // Check level against next level 
        // 1. Check that it's increasing/decreasing from current level
        // 2. Check the difference is between 1 and 3
        const levelDiff = Math.abs(curLevel - nextLevel);
        const validIncreaseDecrease = increasing ? curLevel < nextLevel: curLevel > nextLevel;
        if (!validIncreaseDecrease) {
            return false;
        }

        const validDifferent = levelDiff >= 1 && levelDiff <= 3;
        if (!validDifferent) {
            return false;
        }
    }
    return true;
}

export function checkReports(reports: number[][]) {
    const inputReport = [];
    for (let i=0; i<reports.length; i++) {
        // Increasing or decreasing report?
        let isIncreasing = true;
        if (i == 0) {
            if (reports[i][0] > reports[i][1]) {
                isIncreasing = false;
            } else if (reports[i][0] < reports[i][1]) {
                isIncreasing = true;
            } else {
                inputReport.push(false);
                continue;
            }
        }
        const report = reports[i];
        inputReport.push(
            isSafeReport(report, isIncreasing)
        );
    }
    return inputReport;
}

export function rawInputToArray(rawInput: string) {
    return rawInput.split('\n').map(line => (line.split(' ').map(i => Number(i))));
}

export function printReport(input: number[][], inputReport: boolean[]) {
    for (let i=0; i<input.length; i++) {
        const row = input[i].join(' ');
        const result = inputReport[i] ? 'Safe' : 'Unsafe';
        console.log(`${row}\t\t\t${result}`);
    }
}

let rawInput = '';
try {
    rawInput = fs.readFileSync('./puzzle_input.txt', 'utf8');
} catch (err) {
    console.error(err);
    process.exit(1);
}

const input = rawInputToArray(rawInput);
const inputReport = checkReports(input);

// console.log(`Input Length: ${input.length}, Report Length: ${inputReport.length}`);
// printReport(input, inputReport);

const safeReportCount = inputReport.filter(i => i === true).length;
console.log("Safe Reports: ", safeReportCount);
