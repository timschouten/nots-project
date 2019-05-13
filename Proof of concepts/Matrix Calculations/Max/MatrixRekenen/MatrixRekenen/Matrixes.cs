using MathNet.Numerics.LinearAlgebra;
using MathNet.Numerics.LinearAlgebra.Complex;
using System;
using System.Collections.Generic;
using System.Text;

namespace MatrixRekenen
{
    class Matrixes
    {
        static void Main(string[] args)
        {
            Console.WriteLine("=================== Set 1 ===================");
            double[,] array1 = { { 4, 6, 8 },
                                 { 2, 1, 4 },
                                 { 6, 9, 3 }
            };

            double[,] array2 = { { 1, 5, 8 },
                                 { 4, 3, 2 },
                                 { 7, 6, 5 }
            };

            //Console.WriteLine("=================== Way 1 ===================");
            //MultiplyMatrixes(array1, array2, 3, 3, 3, 3);
            //Console.WriteLine("=================== Way 2 ===================");
            //CSharpMartix(array1, array2);
            Console.WriteLine("=================== Way 3 ===================");
            MultiplyMatrix(array1, array2);


            //Console.WriteLine("=================== Set 2 ===================");
            //double[,] array3 = { { 4, 6 },
            //                     { 2, 1 }
            //};

            //double[,] array4 = { { 1, 5 },
            //                     { 4, 3 }
            //};

            //Console.WriteLine("=================== Way 1 ===================");
            //MultiplyMatrixes(array3, array4, 2, 2, 2, 2);

            //Console.WriteLine("=================== Way 2 =================== (Easy way)");
            //CSharpMartix(array3, array4);
        }

        static void MultiplyMatrix(double[,] array1, double[,] array2)
        {
            double[,] resultArray = new double[3,3];
            for (int i = 0; i < 3; i++)
            {
                for (int j = 0; j < 3; j++)
                {
                    for (int l = 0; l < 3; l++)
                    {
                        resultArray[i, j] += array1[i, l] * array2[l, j];
                    }
                }
            }

            for (int i = 0; i < 3; i++)
            {
                for (int j = 0; j < 3; j++)
                {
                    Console.Write(resultArray[i, j] + "\t");
                }
                Console.WriteLine();
            }
        }

        static void MultiplyMatrixes(double[,] array1, double[,] array2, int m, int n, int p, int q)
        {
            int i, j;

            Console.WriteLine("Matrix a:");
            for (i = 0; i < m; i++)
            {
                for (j = 0; j < n; j++)
                {
                    Console.Write(array1[i, j] + " ");
                }
                Console.WriteLine();
            }

            Console.WriteLine("Matrix b:");
            for (i = 0; i < p; i++)
            {
                for (j = 0; j < q; j++)
                {
                    Console.Write(array2[i, j] + " ");
                }
                Console.WriteLine();
            }

            if (n != p) Console.WriteLine("Matrix multiplication not possible");
            else
            {
                double[,] c = new double[m, q];
                for (i = 0; i < m; i++)
                {
                    for (j = 0; j < q; j++)
                    {
                        c[i, j] = 0;
                        for (int k = 0; k < n; k++)
                        {
                            c[i, j] += array1[i, k] * array2[k, j];
                        }
                    }
                }
                Console.WriteLine("The product of the two matrices is :");
                for (i = 0; i < m; i++)
                {
                    for (j = 0; j < n; j++)
                    {
                        Console.Write(c[i, j] + "\t");
                    }
                    Console.WriteLine();
                }
            }
        }

        /// /////////////////////////////////////////////////////////////
        
        static void CSharpMartix(double[,] arrayA, double[,] arrayB)
        {
            Matrix<double> matrix1 = Matrix<double>.Build.DenseOfArray(arrayA);
            Matrix<double> matrix2 = Matrix<double>.Build.DenseOfArray(arrayB);

            Matrix<double> total = matrix1.Multiply(matrix2);

            Console.WriteLine("Matrix = " + total);
        }
    }
}
