first = [[1, 2, 3],
     [3, 2, 1],
     [1, 2, 3]]

second = [[1, 2],
         [1, 2],
         [1, 2]]


def index_exists(ls, i):
    return (0 <= i < len(ls)) or (-len(ls) <= i < 0)


# Creating columns from a multi dimensional array
# Returns the columns as a multi dimensional array
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


# Multiplies the row with the columns
# Returns the total of the row as an array
def multiply_matrix(row, columns):
    total = []
    column_index = 0
    for r in row:
        new = []
        for column in columns:
            new.append(r * column[column_index])
        total.append(new)
        column_index += 1
    return total


def calculate_new_matrix(array_of_sum):
    values = []

    for row in array_of_sum:
        for i in range(len(array_of_sum)):
            if index_exists(values, i):
                values[i] = values[i] + row[i]
            else:
                if index_exists(row, i):
                    values.append(row[i])
    return values


def multiply(a, b):
    final = []
    for row in a:
        columns = get_columns_from_array(b)
        new_sum = multiply_matrix(row, columns)
        final.append(calculate_new_matrix(new_sum))
    return final


print("RESULT", multiply(first, second))
