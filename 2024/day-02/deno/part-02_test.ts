import { assertEquals } from "jsr:@std/assert";
import { isReportSafeWithDampener, getLineResults, getSafeReports } from './part-02.ts';
// import { processInput } from "./get-input.ts";

const testCasesPart2 = [
  { input: [7, 6, 4, 2, 1], expected: true },
  { input: [1, 2, 7, 8, 9], expected: false },
  { input: [9, 7, 6, 2, 1], expected: false },
  { input: [1, 3, 2, 4, 5], expected: true },
  { input: [8, 6, 4, 4, 1], expected: true },
  { input: [1, 3, 6, 7, 9], expected: true },
];

for (const testCase of testCasesPart2) {
    Deno.test(`test part 2 input: ${testCase.input}`, () => {
        const result = isReportSafeWithDampener(testCase.input);
        assertEquals(result, testCase.expected);
    });
}

Deno.test('test report counts with dampener', () => {
    const inputs = testCasesPart2.map(i => i.input);
    const lineResults = getLineResults(inputs);
    const safeResults = getSafeReports(lineResults);
    assertEquals(safeResults.length, 4);
});

const testCasesPart2AdditionalTests = [
    { input: [5, 6, 7, 10, 13, 16, 13], expected: true },
    { input: [19, 21, 24, 27, 28, 28], expected: true }, // Drop 28
    { input: [16, 18, 20, 21, 23, 25, 29], expected: true }, // Drop the 29
    { input: [44, 46, 48, 49, 52, 55, 56, 62], expected: true }, // Drop 62
    { input: [51, 52, 53, 50, 52], expected: false },
    { input: [10, 11, 12, 14, 11, 10], expected: false },
    { input: [80, 83, 85, 86, 88, 85, 85], expected: false },
    { input: [89, 90, 88, 90, 94], expected: false },
    { input: [85, 86, 83, 85, 92], expected: false },
    { input: [31, 32, 32, 33, 36], expected: true },
];

for (const testCase of testCasesPart2AdditionalTests) {
    Deno.test(`test more part 2 input: ${testCase.input}`, () => {
        const result = isReportSafeWithDampener(testCase.input);
        assertEquals(result, testCase.expected);
    });
}

const trim = (str: string) => String(str).replace(/^\s+|\s+$/g, '');

const testCasePart3 = `
17 18 18 19 16: no
33 34 34 37 39 40 43 43: no
86 87 89 90 92 92 96: no
7 9 11 13 16 16 23: no
59 60 64 67 69: no
43 45 49 51 48: no
11 13 14 17 21 22 24 24: no
74 75 78 82 83 86 88 92: no
7 8 9 12 16 18 23: no
35 36 39 45 48 49: no
10 12 14 15 22 24 21: no
4 6 11 12 12: no
84 86 88 93 97: no
5 7 8 15 16 23: no
67 66 68 70 71 74 76: safe
17 16 19 20 22 25 22: no
41 40 42 45 46 47 47: no
59 56 58 61 63 67: no
26 25 26 29 31 32 38: no
81 78 76 79 82 85 86 88: no
54 52 49 52 54 55 53: no
24 23 25 23 25 25: no
29 28 27 30 31 34 38: no
65 64 66 64 69: no
88 86 86 87 90 93 96: no
98 97 97 99 97: no
68 67 68 71 71 72 72: no
45 42 45 46 49 49 53: no
91 89 89 91 92 99: no
63 62 65 67 68 72 75: no
79 76 79 80 82 85 89 87: no
37 35 38 42 42: no
90 87 88 92 93 97: no
80 77 80 82 85 89 94: no
9 6 12 13 15: safe
88 87 89 96 99 97: no
39 37 39 45 46 49 52 52: no
6 4 5 6 12 13 16 20: no
2 1 4 9 12 14 21: no
80 80 81 84 86: safe
`.split('\n').filter(i => i).map(i => {
    const [rawInput, rawExpected] = i.split(':');
    const input = rawInput.split(' ').map(Number);
    const expected = trim(rawExpected) === 'safe' ? true: false;
    return {
        input,
        expected
    }
});

for (const testCase of testCasePart3) {
    Deno.test(`test ${testCase.input} expected to be ${testCase.expected}`, () => {
        const result = isReportSafeWithDampener(testCase.input);
        assertEquals(result, testCase.expected);
    });
}
