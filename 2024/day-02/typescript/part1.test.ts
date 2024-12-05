import {describe, expect, test} from '@jest/globals';
import each from 'jest-each';
import { isSafeReport, checkReports } from './part1';

describe('isSafeReport checker', () => {
    each([
        { testInput: [7, 6, 4, 2, 1], isIncreasing: false, ctx: 'safe all decreasing', expectedResult: true },
        { testInput: [1, 2, 7, 8, 9], isIncreasing: true, ctx: 'increase to large', expectedResult: false },
        { testInput: [9, 7, 6, 2, 1], isIncreasing: false, ctx: 'decrease too large', expectedResult: false },
        { testInput: [1, 3, 2, 4, 5], isIncreasing: true, ctx: 'change from increase to decrease', expectedResult: false },
        { testInput: [8, 6, 4, 4, 1], isIncreasing: false, ctx: 'no difference between levels', expectedResult: false },
        { testInput: [1, 3, 6, 7, 9], isIncreasing: true, ctx: 'safe all increasing', expectedResult: true },
    ]).test('$testInput: $expectedResult ($ctx)', ({testInput, isIncreasing, ctx, expectedResult}) => {
        const result = isSafeReport(testInput, isIncreasing);
        expect(result).toStrictEqual(expectedResult);
    });
});

test('full example', () => {
    const testInput = [
        [ 7, 6, 4, 2, 1 ],
        [ 1, 2, 7, 8, 9 ],
        [ 9, 7, 6, 2, 1 ],
        [ 1, 3, 2, 4, 5 ],
        [ 8, 6, 4, 4, 1 ],
        [ 1, 3, 6, 7, 9 ],
        [ 1, 2, 3 ],
        [ 1, 1, 3 ],
        [ 2, 5, 8 ],
        [ 1, 5, 8 ]
    ];
    const result = checkReports(testInput);
    expect(result).toStrictEqual([
        true,  false, false,
        false, false, true,
        true,  false, true,
        false
    ]);
});
