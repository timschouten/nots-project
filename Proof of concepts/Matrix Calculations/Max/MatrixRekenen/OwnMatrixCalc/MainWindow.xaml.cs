using MathNet.Numerics.LinearAlgebra;
using MathNet.Numerics.LinearAlgebra.Complex;
using System;
using System.Collections.Generic;
using System.Windows;
using System.Windows.Controls;

namespace OwnMatrixCalc
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private static List<TextBox> textBoxesMatrix1 = new List<TextBox>();
        private static List<TextBox> textBoxesMatrix2 = new List<TextBox>();

        private static int TheMatrix1Width  = 3;
        private static int TheMatrix1Height = 3;
        private static int TheMatrix2Width  = 3;
        private static int TheMatrix2Height = 3;

        public MainWindow()
        {
            InitializeComponent();

            textBoxesMatrix1.Add(txt_Matrix1Num1);
            textBoxesMatrix1.Add(txt_Matrix1Num2);
            textBoxesMatrix1.Add(txt_Matrix1Num3);
            textBoxesMatrix1.Add(txt_Matrix1Num4);
            textBoxesMatrix1.Add(txt_Matrix1Num5);
            textBoxesMatrix1.Add(txt_Matrix1Num6);
            textBoxesMatrix1.Add(txt_Matrix1Num7);
            textBoxesMatrix1.Add(txt_Matrix1Num8);
            textBoxesMatrix1.Add(txt_Matrix1Num9);

            textBoxesMatrix2.Add(txt_Matrix2Num1);
            textBoxesMatrix2.Add(txt_Matrix2Num2);
            textBoxesMatrix2.Add(txt_Matrix2Num3);
            textBoxesMatrix2.Add(txt_Matrix2Num4);
            textBoxesMatrix2.Add(txt_Matrix2Num5);
            textBoxesMatrix2.Add(txt_Matrix2Num6);
            textBoxesMatrix2.Add(txt_Matrix2Num7);
            textBoxesMatrix2.Add(txt_Matrix2Num8);
            textBoxesMatrix2.Add(txt_Matrix2Num9);
        }

        private void CalculateMatrixClick(object sender, RoutedEventArgs e)
        {
            double[,] matrix1 = CreateMatrixes(textBoxesMatrix1);
            double[,] matrix2 = CreateMatrixes(textBoxesMatrix2);

            double[,] resultArray = MultiplyMatrixes(matrix1, matrix2, TheMatrix1Width, TheMatrix1Height, TheMatrix2Width, TheMatrix2Height);
            SetAnswer(resultArray);
        }

        private void SaveMatrixValuesClick(object sender, RoutedEventArgs e)
        {
            TheMatrix1Width = int.Parse(txt_Matrix1Width.Text);
            TheMatrix1Height = int.Parse(txt_Matrix1Heigth.Text);
            TheMatrix2Width = int.Parse(txt_Matrix2Width.Text);
            TheMatrix2Height = int.Parse(txt_Matrix2Heigth.Text);

            DoUIEnabling();
        }

        static double[,] MultiplyMatrixes(double[,] matrix1, double[,] matrix2,
                            int matrix1Width, int matrix1Depth,
                            int matrix2Width, int matrix2Depth)
        {
            double[,] resultArray = new double[matrix1Width, matrix2Depth];
            if (matrix1Depth != matrix2Width)
            {
                Console.WriteLine("Matrix multiplication not possible!");
                Console.WriteLine("They aren't matching with Height and Width!");
            }
            else
            {
                for (int i = 0; i < matrix1Width; i++)
                {
                    for (int j = 0; j < matrix2Depth; j++)
                    {
                        for (int l = 0; l < matrix1Depth; l++)
                        {
                            resultArray[i, j] += matrix1[i, l] * matrix2[l, j];
                        }
                    }
                }
            }
            return resultArray;
        }

        public double[,] CreateMatrixes(List<TextBox> textBoxesMatrix)
        {
            int[] MatrixNumbers = new int[textBoxesMatrix.Count];
            for (int i = 0; i < MatrixNumbers.Length; i++)
            {
                if (!textBoxesMatrix[i].Text.Equals(string.Empty)) MatrixNumbers[i] = int.Parse(textBoxesMatrix[i].Text);
                else MatrixNumbers[i] = 1;
            }
            double[,] matrix = { { MatrixNumbers[0], MatrixNumbers[1], MatrixNumbers[2] },
                                  { MatrixNumbers[3], MatrixNumbers[4], MatrixNumbers[5] },
                                  { MatrixNumbers[6], MatrixNumbers[7], MatrixNumbers[8] }
            };
            return matrix;
        }

        private static void CSharpMartix(double[,] arrayA, double[,] arrayB)
        {
            Matrix<double> matrix1 = Matrix<double>.Build.DenseOfArray(arrayA);
            Matrix<double> matrix2 = Matrix<double>.Build.DenseOfArray(arrayB);
            Matrix<double> total = matrix1.Multiply(matrix2);
        }

        private void SetAnswer(double[,] resultArray)
        {
            // Matrix 1 is 3 x 2
            if (TheMatrix1Width == 3 && TheMatrix1Height == 2)
            {
                txt_Matrix3Num1.Text = resultArray[0, 0].ToString();
                txt_Matrix3Num2.Text = resultArray[0, 1].ToString();
                txt_Matrix3Num4.Text = resultArray[1, 0].ToString();
                txt_Matrix3Num5.Text = resultArray[1, 1].ToString();
            }
            // Matrix 1 is 2 x 3
            else if (TheMatrix1Width == 2 && TheMatrix1Height == 3)
            {
                txt_Matrix3Num1.Text = resultArray[0, 0].ToString();
                txt_Matrix3Num2.Text = resultArray[0, 1].ToString();
                txt_Matrix3Num4.Text = resultArray[1, 0].ToString();
                txt_Matrix3Num5.Text = resultArray[1, 1].ToString();
            }
            else
            {
                txt_Matrix3Num1.Text = resultArray[0, 0].ToString();
                txt_Matrix3Num2.Text = resultArray[0, 1].ToString();
                txt_Matrix3Num3.Text = resultArray[0, 2].ToString();
                txt_Matrix3Num4.Text = resultArray[1, 0].ToString();
                txt_Matrix3Num5.Text = resultArray[1, 1].ToString();
                txt_Matrix3Num6.Text = resultArray[1, 2].ToString();
                txt_Matrix3Num7.Text = resultArray[2, 0].ToString();
                txt_Matrix3Num8.Text = resultArray[2, 1].ToString();
                txt_Matrix3Num9.Text = resultArray[2, 2].ToString();
            }
        }

        private void DoUIEnabling()
        {
            /////////////////////////////////////////////////// Matrix 1
            if (TheMatrix1Width < 3 && TheMatrix1Height < 3)
            {
                txt_Matrix1Num3.IsEnabled = false; txt_Matrix1Num3.Text = "";
                txt_Matrix1Num6.IsEnabled = false; txt_Matrix1Num6.Text = "";
                txt_Matrix1Num7.IsEnabled = false; txt_Matrix1Num7.Text = "";
                txt_Matrix1Num8.IsEnabled = false; txt_Matrix1Num8.Text = "";
                txt_Matrix1Num9.IsEnabled = false; txt_Matrix1Num9.Text = "";
            }
            else if (TheMatrix1Height < 3)
            {
                txt_Matrix1Num7.IsEnabled = false; txt_Matrix1Num7.Text = "";
                txt_Matrix1Num8.IsEnabled = false; txt_Matrix1Num8.Text = "";
                txt_Matrix1Num9.IsEnabled = false; txt_Matrix1Num9.Text = "";
            }
            else if (TheMatrix1Width < 3)
            {
                txt_Matrix1Num3.IsEnabled = false; txt_Matrix1Num3.Text = "";
                txt_Matrix1Num6.IsEnabled = false; txt_Matrix1Num6.Text = "";
                txt_Matrix1Num9.IsEnabled = false; txt_Matrix1Num9.Text = "";
            }
            else
            {
                txt_Matrix1Num1.IsEnabled = true;
                txt_Matrix1Num2.IsEnabled = true;
                txt_Matrix1Num3.IsEnabled = true;
                txt_Matrix1Num4.IsEnabled = true;
                txt_Matrix1Num5.IsEnabled = true;
                txt_Matrix1Num6.IsEnabled = true;
                txt_Matrix1Num7.IsEnabled = true;
                txt_Matrix1Num8.IsEnabled = true;
                txt_Matrix1Num9.IsEnabled = true;
            }
            /////////////////////////////////////////////////// Matrix 2
            if (TheMatrix2Width < 3 && TheMatrix2Height < 3)
            {
                txt_Matrix2Num3.IsEnabled = false; txt_Matrix2Num3.Text = "";
                txt_Matrix2Num6.IsEnabled = false; txt_Matrix2Num6.Text = "";
                txt_Matrix2Num7.IsEnabled = false; txt_Matrix2Num7.Text = "";
                txt_Matrix2Num8.IsEnabled = false; txt_Matrix2Num8.Text = "";
                txt_Matrix2Num9.IsEnabled = false; txt_Matrix2Num9.Text = "";
            }
            else if (TheMatrix2Height < 3)
            {
                txt_Matrix2Num7.IsEnabled = false; txt_Matrix2Num7.Text = "";
                txt_Matrix2Num8.IsEnabled = false; txt_Matrix2Num8.Text = "";
                txt_Matrix2Num9.IsEnabled = false; txt_Matrix2Num9.Text = "";
            }
            else if (TheMatrix2Width < 3)
            {
                txt_Matrix2Num3.IsEnabled = false; txt_Matrix2Num3.Text = "";
                txt_Matrix2Num6.IsEnabled = false; txt_Matrix2Num6.Text = "";
                txt_Matrix2Num9.IsEnabled = false; txt_Matrix2Num9.Text = "";
            }
            else
            {
                txt_Matrix2Num1.IsEnabled = true;
                txt_Matrix2Num2.IsEnabled = true;
                txt_Matrix2Num3.IsEnabled = true;
                txt_Matrix2Num4.IsEnabled = true;
                txt_Matrix2Num5.IsEnabled = true;
                txt_Matrix2Num6.IsEnabled = true;
                txt_Matrix2Num7.IsEnabled = true;
                txt_Matrix2Num8.IsEnabled = true;
                txt_Matrix2Num9.IsEnabled = true;
            }
        }
    }
}
