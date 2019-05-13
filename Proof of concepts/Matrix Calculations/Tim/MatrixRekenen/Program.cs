using System;

namespace MatrixRekenen
{
    class Program
    {
        static void Main(string[] args)
        {
            const int columns = 3;
            const int rows = 3;

            int[,] matrix1 = new int[rows, columns] { { 4, 6, 1 }, { 2, 1, 3 }, { 2, 1, 3 } };
            int[,] matrix2 = new int[columns, rows] { { 1, 5, 2 }, { 4, 5, 4 }, { 1, 3, 8 } };
            int[,] result = new int[rows, rows];

            for (int column = 0; column < columns; column++)
                for (int row = 0; row < rows; row++)
                    for (int i = 0; i < rows; i++)
                        result[column, row] += matrix1[column, i] * matrix2[i, row];

            foreach (int item in result)
                Console.WriteLine(item);
        }
    }
}
