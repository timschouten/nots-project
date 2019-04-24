a = [[12, 2, 12],
     [3, 32, 3],
     [3, 32, 3],
     [3, 32, 3]]

b = [[33, 21, 32, 4],
     [8, 25, 325, 6],
     [8, 25, 53, 7]]

final = []

index = 0

def index_exists(ls, i):
    return (0 <= i < len(ls)) or (-len(ls) <= i < 0)


def get_columns_from_array(array):
    columns = []
    for bRow in array:
        for i in range(len(bRow)):
            if index_exists(columns, i):
                columns[i].append(bRow[i])
            else:
                column = [bRow[i]]
                columns.append(column)
    return columns


def multiply_matrix(row, columns):
    total = []
    column_index = 0
    for r in row:
        for column in columns:
            total.append(r * column[column_index])
        column_index += 1
    return total


def calculate_new_matrix(array_of_sum):
    newRow = []
    value = 0
    secondValue = 0
    thirdValue = 0
    forthValue = 0
    same = 0

    for sum in array_of_sum:
        if same == 0:
            value = value + sum
            same = 1
        elif same == 1:
            secondValue = secondValue + sum
            same = 2
        elif same == 2:
            thirdValue = thirdValue + sum
            same = 3
        else:
            forthValue = forthValue + sum
            same = 0

    newRow.append(value)
    newRow.append(secondValue)
    newRow.append(thirdValue)
    newRow.append(forthValue)
    final.append(newRow)


for row in a:
    columns = get_columns_from_array(b)
    newSum = multiply_matrix(row, columns)
    calculate_new_matrix(newSum)

print("END", final)
