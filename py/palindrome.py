x = "121"
y = "nonesense"
z = "civic"

def is_pal(val: str) -> bool:
    val_len = len(val)
    middle_len = int(val_len / 2)

    for i in range(middle_len + 1):
        start_char = val[i]
        end_char = val[val_len - 1 - i]

        print(start_char, end_char)

        if start_char != end_char:
            return False
    
    return True

print(is_pal(x))
print(is_pal(y))
print(is_pal(z))
