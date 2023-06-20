student_data = [
   {"id": "012202100001", "name": "John Doe", "score": 90.7},
   {"id": "012202100002", "name": "Jack Smith", "score": 80},
   {"id": "012202100003", "name": "Randall Lu", "score": 70.65},
   {"id": "012202100004", "name": "Samantha Arden", "score": 65},
   {"id": "012202100005", "name": "Abby Johnson", "score": 60},
   {"id": "012202100006", "name": "Rick Martin", "score": 55},
   {"id": "012202100007", "name": "Maria Park", "score": 78.5},
   {"id": "012202100008", "name": "Rene Christine", "score": 89.5},
   {"id": "012202100009", "name": "Christie Alexander", "score": 100},
   {"id": "012202100010", "name": "David Holler", "score": 77},
]

# ================================
# START OF FIRST QUESTION
# ================================

total = 0;

minStudent = {}
maxStudent = {}

min = float("inf")
max = float("-inf")

for student in student_data:
    score = student["score"]
    total += score
    
    if student["score"] < min:
        min = score
        minStudent = student

    if student["score"] > max:
        max = score
        maxStudent = student

average = total / len(student_data)

print("============================")
print("TOTAL :", total)
print("AVERAGE :", average)
print("LOWEST SCORE :", minStudent)
print("HIGHEST SCORE", maxStudent)
print("============================")

# ================================
# ================================

# ================================
# START OF SECOND QUESTION
# ================================
sorted_score = sorted(student_data, key=lambda x:x["score"])
sorted_name = sorted(student_data, key=lambda x:x["name"])

print("============================")
print("-- SORTED BY SCORE (ASC)")
for student in sorted_score:
    print(student)
print("------------------------")

print("-- SORTED BY NAME (ASC)")
for student in sorted_name:
    print(student)
print("------------------------")
print("============================")

# ================================
# ================================

# ================================
# START OF THIRD QUESTION
# ================================
def get_data_higher_than_equal(data, min_score):
    for idx, student in enumerate(data):
        # if current student score pass the min_score threshold,
        # then immediately return the rest of the array
        if student["score"] >= min_score:
            return data[idx:]

    return []

result = get_data_higher_than_equal(sorted_score, 60)
print("------------------------")
print("--- DISPLAY FROM MIN ---")
print(result)
print("------------------------")

# ================================
# ================================

# ================================
# START OF FOURTH QUESTION
# ================================
def get_letter_grade(data):
    scores = []

    for student in data:
        current_score = student["score"]

        if 85 <= current_score <= 100:
            scores.append("A")
            continue
        elif 70 <= current_score < 85:
            scores.append("B")
            continue
        elif 60 <= current_score < 70:
            scores.append("C")
            continue
        elif 55 <= current_score < 60:
            scores.append("D")
            continue
        elif 0 <= current_score < 55:
            scores.append("E")
            continue
        else:
            scores.append("invalid score")
            continue

    return scores

letter_grades = get_letter_grade(student_data)

print("------------------------")
print("---- LETTER GRADES -----")
print(letter_grades)
print("------------------------")

# ================================
# ================================

# ================================
# START OF FIFTH QUESTION
# ================================
total_letter_grades = {}

for score in letter_grades:
    # if the dict have score in letter_grades
    # then increment the total 
    if score in total_letter_grades:
        total_letter_grades[score] = total_letter_grades[score] + 1
    else:
        # if not defined, set the value as 1
        total_letter_grades[score] = 1

# ================================
# ================================

print("------------------------")
print("---- TOTAL LETTER GRADES -----")
print(total_letter_grades, "\n")

# print all the items inside the dict
for value in total_letter_grades.items():
    print(value[0], " = ", value[1])

print("------------------------")
