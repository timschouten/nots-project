a = [[1, 2],
     [3, 2]]

b = [[3, 2],
     [1, 2]]

final = []

index = 0

newRow = []
for row in a:
    column = []

    i = 0
    for bRow in b:
        while i < len(bRow):
            i += 1
            column.append(bRow[index])
    index = index + 1

    print(column)

    secondIndex = 0
    newSum = []
    for bColumn in column:
        print(row[secondIndex] * bColumn, secondIndex)
        newSum.append(row[secondIndex] * bColumn)
        secondIndex = secondIndex + 1


    value = 0
    for sum in newSum:
        value = value + sum

    newRow.append(value)
    print(newRow, "END")
