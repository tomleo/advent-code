# Fuel required to launch a given module is based on its mass. Specifically, to
# find the fuel required for a module, take its mass, divide by three, round
# down, and subtract 2.
import pytest
import math
from typing import List

def round_down(num: float) -> int:
    return int(math.floor(num))

def fuel_req(mass: int) -> float:
    return round_down(mass / 3) - 2

def fuel_req_recursive(mass: int) -> float:
    _fuel = fuel_req(mass)
    if _fuel < 0:
        # print(f"Fuel: {_fuel}")
        return 0
    # print(f"Fuel: {_fuel} +")
    return _fuel + fuel_req_recursive(_fuel)

def test_fuel_req_recursive():
    """
    A module of mass 14 requires 2 fuel. This fuel requires no further fuel (2
    divided by 3 and rounded down is 0, which would call for a negative
    fuel), so the total fuel required is still just 2.

    At first, a module of mass 1969 requires 654 fuel. Then, this fuel requires
    216 more fuel (654 / 3 - 2). 216 then requires 70 more fuel, which requires
    21 fuel, which requires 5 fuel, which requires no further fuel. So, the
    total fuel required for a module of mass 1969 is 654 + 216 + 70 + 21 + 5 =
    966.

    The fuel required by a module of mass 100756 and its fuel is: 33583 + 11192 +
    3728 + 1240 + 411 + 135 + 43 + 12 + 2 = 50346.
    """
    assert fuel_req_recursive(1969) == 966
    assert fuel_req_recursive(100756) == 50346
    

def total_fuel(parts_list: List[int]) -> float:
    return sum(fuel_req(i) for i in parts_list)

def total_fuel_req(parts_list: List[int]) -> float:
    return sum(fuel_req_recursive(i) for i in parts_list)

@pytest.mark.parametrize(
    "mass,expected_output",
    [
        (12, 4),
        (14, 4),
        # (1969, 644),
        # (100756, 33583),
    ]
)
def test_round_down(mass, expected_output):
    """
    For a mass of 12, divide by 3 and round down to get 4, then subtract 2 to get 2.
    For a mass of 14, dividing by 3 and rounding down still yields 4, so the fuel required is also 2.
    For a mass of 1969, the fuel required is 654.
    For a mass of 100756, the fuel required is 33583.
    """
    assert round_down(mass /  3) == expected_output

@pytest.mark.parametrize(
    "mass,fuel_required",
    [
        (12, 2),
        (14, 2),
        (1969, 654),
        (100756, 33583),
    ]
)
def test_fuel(mass, fuel_required):
    """
    For a mass of 12, divide by 3 and round down to get 4, then subtract 2 to get 2.
    For a mass of 14, dividing by 3 and rounding down still yields 4, so the fuel required is also 2.
    For a mass of 1969, the fuel required is 654.
    For a mass of 100756, the fuel required is 33583.
    """
    assert fuel_req(mass) == fuel_required

if __name__ == '__main__':
    test_input = [74364, 146203, 128470, 91616, 115655, 134147, 53470, 126471, 70040, 88750, 142353, 143329, 86356, 118399, 97959, 148345, 117705, 87624, 63862, 71962, 106974, 66255, 119735, 78726, 93698, 148680, 144638, 83341, 149571, 147196, 54526, 91775, 63153, 143441, 71134, 114131, 120931, 109833, 106073, 64547, 126938, 52877, 89945, 59466, 79660, 147815, 55381, 100052, 78824, 121844, 104155, 117313, 69305, 144645, 81350, 123512, 81467, 120836, 118612, 143999, 90792, 71054, 138942, 56481, 71850, 85266, 77437, 86530, 147311, 133699, 126684, 58708, 149482, 104101, 67985, 81648, 95290, 77155, 76578, 116025, 83980, 59517, 62078, 89003, 126205, 122542, 116388, 144040, 102560, 77098, 127534, 56415, 85703, 85580, 86787, 72029, 82533, 132187, 70849, 98839]
    print(total_fuel(test_input))

    test_input_2 = [74364, 146203, 128470, 91616, 115655, 134147, 53470, 126471, 70040, 88750, 142353, 143329, 86356, 118399, 97959, 148345, 117705, 87624, 63862, 71962, 106974, 66255, 119735, 78726, 93698, 148680, 144638, 83341, 149571, 147196, 54526, 91775, 63153, 143441, 71134, 114131, 120931, 109833, 106073, 64547, 126938, 52877, 89945, 59466, 79660, 147815, 55381, 100052, 78824, 121844, 104155, 117313, 69305, 144645, 81350, 123512, 81467, 120836, 118612, 143999, 90792, 71054, 138942, 56481, 71850, 85266, 77437, 86530, 147311, 133699, 126684, 58708, 149482, 104101, 67985, 81648, 95290, 77155, 76578, 116025, 83980, 59517, 62078, 89003, 126205, 122542, 116388, 144040, 102560, 77098, 127534, 56415, 85703, 85580, 86787, 72029, 82533, 132187, 70849, 98839]
    print(total_fuel_req(test_input_2))

