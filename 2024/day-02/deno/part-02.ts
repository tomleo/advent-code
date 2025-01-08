import type { Report } from "./get-input.ts";
import { getRawInput, processInput } from "./get-input.ts";
import { createLogger, INFO } from './logging.ts';

const logger = createLogger(INFO);

const rawInput = await getRawInput();
const inputLines = processInput(rawInput);

export function isReportSafe(report: Report) {
    let prevReport;
    let curReport;
    let diff;
    const increasing = report[0] < report[1];
    for (let i=1; i<report.length; i++) {
        prevReport = report[i-1];
        curReport = report[i];

        // Levels must always be increasing or decreasing
        if (prevReport === curReport) {
            return false;
        }

        // Check increasing/decreasing correct
        if (increasing) {
            if (prevReport > curReport) {
                return false;
            }
        } else {
            if (prevReport < curReport) {
                return false;
            }
        }

        diff = Math.abs(curReport - prevReport);
        if (diff > 3) {
            return false;
        } else if (diff < 1) {
            return false;
        }
    }
    return true;
}

export function isReportSafeWithDampener(line: Report) {
    // If first 1 or 2 are the bad ones, it throws of the increasing / decreasing
    // let increasing = line[0] < line[1];
    let subStringList = line;
    let isSafe = isReportSafe(subStringList);
    if (isSafe) {
        return true;
    }

    for (let i=0; i<line.length; i++) {
        logger.debug(`Skipping ${line[i]}`);
        subStringList = [...line.slice(0, i), ...line.slice(i+1)];
        logger.debug('subStringList: ', subStringList);
        isSafe = isReportSafe(subStringList);
        if (isSafe) {
            return true;
        }
    }
    return isSafe;
}

export function getLineResults(r: Report[]) {
    return r.map(isReportSafeWithDampener);
}

export function getSafeReports(r: boolean[]) {
    return r.filter(l => l);
}

const lineResults = getLineResults(inputLines);
console.log(lineResults.length);
const safeReports = getSafeReports(lineResults);
console.log(safeReports.length);