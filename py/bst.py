from typing import List


def bs(arr: List[int], target: int):
    start_point = 0
    end_point = len(arr) - 1

    while start_point <= end_point:
        middle_point = (start_point + end_point) // 2

        if arr[middle_point] == target:
            return True
        elif arr[middle_point] < target:
            start_point = middle_point + 1
        elif arr[middle_point] > target:
            end_point = middle_point - 1

    return False


print(bs([1, 2, 5, 9, 12, 24, 66, 231], 1))
