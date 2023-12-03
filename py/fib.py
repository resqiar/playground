def generate_fib(i: int):
    result = [0, 1]

    for i in range(2, i):
        last_num = result[i - 1]
        last_two_num = result[i - 2]
        current_num = last_num + last_two_num
        result.append(current_num)

    return result[:i]

print(generate_fib(10))
