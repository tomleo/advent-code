import * as path from "jsr:@std/path";

const current = Deno.cwd();
const p = path.join(current, "../", "input.txt");
const text = await Deno.readTextFileSync(p);

type Level = number;
type Report = Level[];
const inputLines: Report[] = text.split('\n').map(i => i.split(' ')).map(i => i.map(Number));

export function isReportSafe(report: Report) {
    const increasing = report[0] < report[1];

    let prevReport;
    let curReport;
    let diff;

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
        }
    }
    return true;
}

const lineResults = inputLines.map(line => {
    return isReportSafe(line);
});

console.log(lineResults.length);

const safeReports = lineResults.filter(l => l);

console.log(safeReports.length);
