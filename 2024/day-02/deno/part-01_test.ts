import { assertEquals } from "jsr:@std/assert";
import { isReportSafe } from './part-01.ts';

const testCasesPart1 = [
  { input: [7, 6, 4, 2, 1], expected: true },
  { input: [1, 2, 7, 8, 9], expected: false },
  { input: [9, 7, 6, 2, 1], expected: false },
  { input: [1, 3, 2, 4, 5], expected: false },
  { input: [8, 6, 4, 4, 1], expected: false },
  { input: [1, 3, 6, 7, 9], expected: true },
  { input: [5, 6, 7, 10, 13, 16, 13], expected: false },
];

for (const testCase of testCasesPart1) {
  Deno.test(`test part 1 input: ${testCase.input}`, () => {
    const result = isReportSafe(testCase.input);
    assertEquals(result, testCase.expected);
  });
}
