# An Intcode program is a list of integers separated by commas (like 1,0,0,3,99).
# To run one, start by looking at the first integer (called position 0). Here,
# you will find an opcode - either 1, 2, or 99. The opcode indicates what to do;
# for example, 99 means that the program is finished and should immediately halt.
# Encountering an unknown opcode means something went wrong.
# 
# Opcode 1 adds together numbers read from two positions and stores the result in
# a third position. The three integers immediately after the opcode tell you
# these three positions - the first two indicate the positions from which you
# should read the input values, and the third indicates the position at which the
# output should be stored.
# 
# For example, if your Intcode computer encounters 1,10,20,30, it should read the
# values at positions 10 and 20, add those values, and then overwrite the value
# at position 30 with their sum.
#
# Opcode 2 works exactly like opcode 1, except it multiplies the two inputs
# instead of adding them. Again, the three integers after the opcode indicate
# where the inputs and outputs are, not their values.
#
# Once you're done processing an opcode, move to the next one by stepping forward
# 4 positions.
#
# For example, suppose you have the following program:
# 1,9,10,3,2,3,11,0,99,30,40,50
# 
# For the purposes of illustration, here is the same program split into multiple
# lines:
# 
# 1,9,10,3,
# 2,3,11,0,
# 99,
# 30,40,50
# 
# The first four integers, 1,9,10,3, are at positions 0, 1, 2, and 3. Together,
# they represent the first opcode (1, addition), the positions of the two inputs
# (9 and 10), and the position of the output (3). To handle this opcode, you
# first need to get the values at the input positions: position 9 contains 30,
# and position 10 contains 40. Add these numbers together to get 70. Then, store
# this value at the output position; here, the output position (3) is at position
# 3, so it overwrites itself. Afterward, the program looks like this:
# 
# 1,9,10,70,
# 2,3,11,0,
# 99,
# 30,40,50
# 
# Step forward 4 positions to reach the next opcode, 2. This opcode works just
# like the previous, but it multiplies instead of adding. The inputs are at
# positions 3 and 11; these positions contain 70 and 50 respectively. Multiplying
# these produces 3500; this is stored at position 0:
# 
# 3500,9,10,70,
# 2,3,11,0,
# 99,
# 30,40,50
# 
# Stepping forward 4 more positions arrives at opcode 99, halting the program.
# 
# Here are the initial and final states of a few more small programs:
# 
# 1,0,0,0,99 becomes 2,0,0,0,99 (1 + 1 = 2).
# 2,3,0,3,99 becomes 2,3,0,6,99 (3 * 2 = 6).
# 2,4,4,5,99,0 becomes 2,4,4,5,99,9801 (99 * 99 = 9801).
# 1,1,1,4,99,5,6,0,99 becomes 30,1,1,4,2,5,6,0,99.
# 
# Once you have a working computer, the first step is to restore the gravity
# assist program (your puzzle input) to the "1202 program alarm" state it had
# just before the last computer caught fire. To do this, before running the
# program, replace position 1 with the value 12 and replace position 2 with the
# value 2. What value is left at position 0 after the program halts?
import pytest
from typing import List

OPTCODE_1 = 1
OPTCODE_2 = 2
OPTCODE_3 = 99

def handle_optcode_1(position1: int, position2: int, output_position: int, codes: List):
    noun = codes[position1]
    verb = codes[position2]
    result = codes[codes[position1]] + codes[codes[position2]]
    if 100 * noun + verb == 19690720:
        print(f"noun: {noun}")
        print(f"verb: {verb}")
    elif 100 * codes[codes[position1]] + codes[codes[position2]] == 19690720:
        print("YERP")
    codes[codes[output_position]]  = result

def handle_optcode_2(position1: int, position2: int, output_position: int, codes: List):
    noun = codes[position1]
    verb = codes[position2]
    result = codes[codes[position1]] * codes[codes[position2]]
    if 100 * noun + verb == 19690720:
        print(f"noun: {noun}")
        print(f"verb: {verb}")
    elif 100 * codes[codes[position1]] * codes[codes[position2]] == 19690720:
        print("YERP")
    codes[codes[output_position]] = result

def increment_positions(i):
    pos_1 = i + 1
    pos_2 = pos_1 + 1
    pos_out = pos_2 + 1
    return (pos_1, pos_2, pos_out)

def process_intcode(codes: List, pos_1: int=None, pos_2: int=None, pos_out: int=None):
    i = 0
    pos_1 = pos_1 or i+1
    pos_2 = pos_2 or i+2
    pos_out = pos_out or i+3
    while i < len(codes):
        # print("\n")
        if codes[i] == OPTCODE_1:
            # print(codes)
            # print("optcode 1")
            # print(f"i {i}")
            # print(f"pos_1 {pos_1}")
            # print(f"pos_2 {pos_2}")
            # print(f"pos_out {pos_out}")
            handle_optcode_1(pos_1, pos_2, pos_out, codes)
            i = pos_out + 1
            pos_1, pos_2, pos_out = increment_positions(i)
        elif codes[i] == OPTCODE_2:
            # print(codes)
            # print("optcode 2")
            # print(f"i {i}")
            # print(f"pos_1 {pos_1}")
            # print(f"pos_2 {pos_2}")
            # print(f"pos_out {pos_out}")
            handle_optcode_2(pos_1, pos_2, pos_out, codes)
            i = pos_out + 1
            pos_1, pos_2, pos_out = increment_positions(i)
        elif codes[i] == OPTCODE_3:
            # print(codes)
            # print("optcode 3")
            # print(f"i {i}")
            # print(f"pos_1 {pos_1}")
            # print(f"pos_2 {pos_2}")
            # print(f"pos_out {pos_out}")
            return codes
@pytest.mark.parametrize(
    "input_codes,output_codes",
    [
        ([1,0,0,0,99], [2,0,0,0,99]),
        ([2,3,0,3,99], [2,3,0,6,99]),
        ([2,4,4,5,99,0], [2,4,4,5,99,9801]),
        ([1,1,1,4,99,5,6,0,99], [30,1,1,4,2,5,6,0,99]),
    ],
)
def test_process_intcode(input_codes, output_codes):
    assert process_intcode(input_codes) == output_codes


if __name__ == '__main__':
    test_input_codes = [1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,9,19,1,19,5,23,2,6,23,27,1,6,27,31,2,31,9,35,1,35,6,39,1,10,39,43,2,9,43,47,1,5,47,51,2,51,6,55,1,5,55,59,2,13,59,63,1,63,5,67,2,67,13,71,1,71,9,75,1,75,6,79,2,79,6,83,1,83,5,87,2,87,9,91,2,9,91,95,1,5,95,99,2,99,13,103,1,103,5,107,1,2,107,111,1,111,5,0,99,2,14,0,0]
    test_input_codes[1] = 12
    test_input_codes[2] = 2
    result = process_intcode(test_input_codes)
    print(result[0])

