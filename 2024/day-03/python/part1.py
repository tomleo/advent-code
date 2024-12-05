"""
Mull It Over

mul(X,Y) - where X and Y are each 1-3 digit

Valid:
mul(44,46) -> 2024
mul(123,4)

Invalid:
mul(4*
mul(6,9!
?(12,34)
mul ( 2 , 4 )

Given:
xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))

Should Eval:
mul(2,4)
mul(5,5)
mul(11,8)
mul(8,5)
"""

import re

def eval_memory_ops(mem_operations):
    mul_pattern = r'mul\((?P<a>\d{1,3}),(?P<b>\d{1,3})\)'
    for mem_operation in mem_operations:
        res = re.match(mul_pattern, mem_operation)
        if not res:
            continue
        yield int(res.groupdict()['a']) * int(res.groupdict()['b'])

def processCorruptMemory(memory):
    memory_pattern = r'mul\(\d{1,3},\d{1,3}\)'
    mem_operations = re.findall(memory_pattern, test_input)
    ops = [m for m in eval_memory_ops(mem_operations)]
    return ops


if __name__ == '__main__':
    with open('puzzle_input.txt', 'r+') as fin:
        test_input = fin.read()
        print(
            sum(processCorruptMemory(test_input))
        )

# test_input = 'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))'
# print(
#     sum(processCorruptMemory(test_input))
# )
