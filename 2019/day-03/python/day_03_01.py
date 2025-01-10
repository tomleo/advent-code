import pytest
from typing import List

DOT = "."
DASH = "-"


def instructions_to_graph(instructions: List[str]):
    graph_width = 0
    graph_height = 0
    graph = [[DOT]]
    current_row = 0
    current_column = 0
    for instruction in instructions:
        direction = instruction[0]
        amount = int(instruction[1])
        if direction == "R":
            graph[current_row] = add_dots(graph[current_row], current_column + amount)
            row = graph[current_row]
            for i in range(current_column, amount):
                row[current_column + i] = DASH
        elif direction == "U":
            for i in range(current_row, amount):
                try:
                    graph[i]
                except IndexError:
                    graph.append([])
                graph[i] = add_dots(graph[i], current_column + amount)
        elif direction == "L":
            pass
        elif direction == "D":
            pass
    return graph

def add_dots_up():
    pass

def add_dots_left():
    pass

def add_dots_down():
    pass

def add_dots(row: List[str], end: int)  -> List[str]:
    new_row = [i for i in row]
    for i in range(0, end):
        try:
            if new_row[i] != DOT:
                continue
        except IndexError:
            new_row.append(DOT)
            continue
    return new_row


def print_graph(graph: List[List[str]]) -> str:
    result = ""
    for row in graph:
        for index, col in enumerate(row):
            result += col
            if index != len(row) - 1:
                result += " "
        result += "\n"
    return result


def test_instruction_to_graph_right_print():
    graph_str = print_graph(instructions_to_graph(["R8"]))
    assert graph_str == "- - - - - - - -\n"


def test_instruction_to_graph_right():
    graph = instructions_to_graph(["R8"])
    assert graph == [["-", "-", "-", "-", "-", "-", "-", "-"]]

def test_instruction_to_graph_up():
    graph = instructions_to_graph(["R8", "U5"])
    graph_str = print_graph(graph)
    assert graph_str == """
. . . . . . . |
. . . . . . . |
. . . . . . . |
. . . . . . . |
. . . . . . . |
- - - - - - - -"""


def manhattan_distance(p: List, q: List):
    # Are the vectors equal length?
    # d = distance between two vectors (p, q)
    d = 0
    for i in range(len(p)):
        d += abs(p[i] - q[i])
    return d


# @pytest.mark.parametrize(
#     "mass,expected_output",
#     [
#         (12, 4),
#         (14, 4),
#         # (1969, 644),
#         # (100756, 33583),
#     ],
# )
# def test_round_down(mass, expected_output):
#     pass
