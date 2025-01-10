# Intcode programs are given as a list of integers; these values are used as
# the initial state for the computer's memory
#
# A position in memory is called an address
#
# Opcodes (like 1, 2, or 99) mark the beginning of an instruction
#
# The values used immediately after an opcode, if any, are called the instruction's parameters
#
# The address of the current instruction is called the instruction pointer
#
# After an instruction finishes, the instruction pointer increases by the
# number of values in the instruction; until you add more instructions to the
# computer, this is always 4 (1 opcode + 3 parameters) for the add and multiply
# instructions. (The halt instruction would increase the instruction pointer by
# 1, but it halts the program instead.)
#
# what pair of inputs produces the output 19690720?
#
# address 1 = noun
# address 2 = verb
# Each of the two input values will be between 0 and 99, inclusive.
#
# Find the input noun and verb that cause the program to produce the output
# 19690720. What is 100 * noun + verb? (For example, if noun=12 and verb=2, the
# answer would be 1202.)

from typing import List
# from dataclasses import dataclass

class Instruction:

    def __init__(self, opt_code: int, instructions: List[int] = None)
        self.opt_code = opt_code
        self.instructions = instructions or []

    @property
    def pointer_increment(self):
        return len(self.instructions) + 1

    @property
    def noun(self):
        return self.instructions[0]

    @property
    def verb(self):
        return self.instructions[1]

def process_intcode(memory: List[int]):
    address = 0
    instruction_pointer = 0
    

