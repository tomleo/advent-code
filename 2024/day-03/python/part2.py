"""
do() instruction enables future mul instructions
don't() instruction disables future mul instructions

Only the most recent do() or don't() instruction applies
At the beginning of the program, mul instructions are enabled.
"""

import re

def eval_memory_ops(mem_operations):
    mul_pattern = r'mul\((?P<a>\d{1,3}),(?P<b>\d{1,3})\)'
    DO_COMMAND = "do()"
    DONT_COMMAND = "don\'t()"

    inDoMode = True
    for mem_operation in mem_operations:
        if mem_operation.startswith('mul') and inDoMode:
            res = re.match(mul_pattern, mem_operation)
            if not res:
                continue
            yield int(res.groupdict()['a']) * int(res.groupdict()['b'])
        elif mem_operation == DO_COMMAND:
            inDoMode = True
        elif mem_operation == DONT_COMMAND:
            inDoMode = False

def processCorruptMemory(memory):
    """
    mul_pattern = r'mul\(\d{1,3},\d{1,3}\)'
    do_pattern = r'do\(\)'
    dont_pattern = r'don\'t\(\)'
    """
    all_opt_patterns = r'(?P<mul>mul\(\d{1,3},\d{1,3}\))?(?P<do>do\(\))?(?P<don>don\'t\(\))?'
    mem_operations = [j for i in re.findall(all_opt_patterns, test_input, re.MULTILINE) for j in i if j]
    ops = [m for m in eval_memory_ops(mem_operations)]
    return ops

if __name__ == '__main__':
    # test_input = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"
    with open('puzzle_input.txt', 'r+') as fin:
        test_input = fin.read()
    print(
        sum(processCorruptMemory(test_input))
    )
