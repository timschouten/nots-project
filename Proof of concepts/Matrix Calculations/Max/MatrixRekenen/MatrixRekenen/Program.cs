//using System;

//namespace MatrixRekenen
//{
//    class Program
//    {
//        static int m = 2, n = 3, p = 2, q = 3;

//        static void Main(string[] args)
//        {

//            int[,] matrixA = { { 1, 2, 3 }, { 1, 2, 3} };
//            int[,] matrixB = { { 4, 5, 6 }, { 4, 5, 6} };

//            LogMatrixes(matrixA, m, n);
//            LogMatrixes(matrixB, p, q);

//            int[,] matrixC = CalculateMatrix(matrixA, matrixB, 2, 3);

//            LogMatrixes(matrixC, 2, 3);
//        }

//        static int[,] CalculateMatrix(int[,] a, int[,] b, int c, int d)
//        {
//            int[,] newMatrix = new int[c, d];

//            for (int i = 0; i < c; i++)
//            {
//                for (int j = 0; j < d; j++)
//                {
//                    newMatrix[i, j] = 0;
//                    for (int k = 0; k < c; k++)
//                    {
//                        newMatrix[i, j] += a[i, k] * b[k, j];
//                    }
//                }
//            }

//            return newMatrix;
//        }

//        static void LogMatrixes(int[,] a, int m, int n)
//        {
//            Console.WriteLine("Matrix:");
//            for (int i = 0; i < m; i++)
//            {
//                for (int j = 0; j < n; j++)
//                {
//                    Console.Write(a[i, j] + " ");
//                }
//                Console.WriteLine();
//            }
//        }
//    }
//}
