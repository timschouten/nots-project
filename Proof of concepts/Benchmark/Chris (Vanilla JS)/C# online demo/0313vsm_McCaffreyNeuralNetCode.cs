using System;

// demo of a Rosenblatt style perceptron in C#

namespace Perceptrons
{
  class PerceptronProgram
  {
    static void Main(string[] args)
    {
      try
      {
        Console.WriteLine("\nBegin Perceptron demo\n");

        int[][] trainingData = new int[5][];
        trainingData[0] = new int[] { 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1,   0 };  // 'A'
        trainingData[1] = new int[] { 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0,   1 };  // last bit: 0 = is-B false, 1 = is-B true
        trainingData[2] = new int[] { 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1,   0 };  // 'C'
        trainingData[3] = new int[] { 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0,   0 };  // 'D'
        trainingData[4] = new int[] { 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1,   0 };  // 'E'


        Console.WriteLine("Training data input is patterns for characters A-E");
        Console.WriteLine("Goal is to predict patterns that represent 'B'");

        Console.WriteLine("\nTraining input patterns (in row-col descriptive format):\n");
        ShowData(trainingData[0]);
        ShowData(trainingData[1]);
        ShowData(trainingData[2]);
        ShowData(trainingData[3]);
        ShowData(trainingData[4]);

        Console.WriteLine("\n\nFinding best weights and bias for a 'B' classifier perceptron");
        int maxEpochs = 1000;
        double alpha = 0.075;
        double targetError = 0.0;

        double bestBias = 0.0;
        double[] bestWeights = FindBestWeights(trainingData, maxEpochs, alpha, targetError, out bestBias);
        Console.WriteLine("\nTraining complete");

        Console.WriteLine("\nBest weights and bias are:\n");
        ShowVector(bestWeights);
        Console.WriteLine(bestBias.ToString("F3"));

        double totalError = TotalError(trainingData, bestWeights, bestBias);
        Console.WriteLine("\nAfter training total error = " + totalError.ToString("F4"));

        ////int[] dataVector = new int[] { 0, 1, 0, 1, 1,      0, 0, 0, 0, 0,     0, 1, 0, 0, 1,     0, 1, 0, 0, 1,    0, 1, 0, 1, 1 };  // damaged '0' -> should give 0 (not a '1' or '3')
        //int[] dataVector = new int[] { 0, 0, 1, 1, 1,    0, 0, 0, 0, 1,    0, 0, 0, 1, 1,    0, 0, 0, 0, 0,    0, 1, 1, 1, 1 };  // damaged '3' -> should give 1 (is a '1' or '3')
        //Console.WriteLine("\nPredicting is a '1' or '3' (yes = 1, no = 0) for the following pattern:\n");
        //ShowData(dataVector);

        int[] unknown = new int[] { 0, 1, 1, 0,     0, 0, 0, 1,     1, 1, 1, 0,     1, 0, 0, 1,     1, 1, 1, 0 };  // damaged 'B' in 2 positions
        Console.WriteLine("\nPredicting is a 'B' (yes = 1, no = 0) for the following pattern:\n");
        ShowData(unknown);

        int prediction = Predict(unknown, bestWeights, bestBias);  // perform the classification
        Console.Write("\nPrediction is " + prediction + " which means pattern ");
        string s0 = "is NOT recognized as a 'B'";
        string s1 = "IS recognized as a 'B'";
        if (prediction == 0) Console.WriteLine(s0);
        else Console.WriteLine(s1);
       
        Console.WriteLine("\nEnd Perceptron demo\n");
        Console.ReadLine();
      }
      catch (Exception ex)
      {
        Console.WriteLine(ex.Message);
        Console.ReadLine();
      }


    } // Main

    public static int StepFunction(double x)
    {
      if (x > 0.5) return 1; else return 0;
    }

    public static int ComputeOutput(int[] trainVector, double[] weights, double bias)
    {
      double dotP = 0.0;
      for (int j = 0; j < trainVector.Length - 1; ++j)  // not last bit which is the desired
        dotP += (trainVector[j] * weights[j]);
      dotP += bias;
      return StepFunction(dotP);
    }

    public static int Predict(int[] dataVector, double[] bestWeights, double bestBias)
    {
      double dotP = 0.0;
      for (int j = 0; j < dataVector.Length; ++j)  // all bits
        dotP += (dataVector[j] * bestWeights[j]);
      dotP += bestBias;
      return StepFunction(dotP);
    }

    public static double TotalError(int[][] trainingData, double[] weights, double bias)
    {
      double sum = 0.0;
      for (int i = 0; i < trainingData.Length; ++i)
      {
        int desired = trainingData[i][trainingData[i].Length - 1];
        int output = ComputeOutput(trainingData[i], weights, bias);
        sum += (desired - output) * (desired - output);  // equivalent to Abs(desired - output) in this case
      }
      return 0.5 * sum;
    }

    public static double[] FindBestWeights(int[][] trainingData, int maxEpochs, double alpha, double targetError, out double bestBias)
    {
      int dim = trainingData[0].Length - 1;
      double[] weights = new double[dim];  // implicitly all 0.0
      double bias = 0.05;
      double totalError = double.MaxValue;
      int epoch = 0;

      while (epoch < maxEpochs && totalError > targetError)
      //while (epoch < maxEpochs)
      {
        for (int i = 0; i < trainingData.Length; ++i)  // each training vector
        {
          int desired = trainingData[i][trainingData[i].Length - 1];  // last bit
          int output = ComputeOutput(trainingData[i], weights, bias);
          int delta = desired - output;  // -1 (if output too large), 0 (output correct), or +1 (output too small)

          for (int j = 0; j < weights.Length; ++j)
            weights[j] = weights[j] + (alpha * delta * trainingData[i][j]);  // corrects weight

          bias = bias + (alpha * delta);
        }

        totalError = TotalError(trainingData, weights, bias);  // rescans; could do in for loop
        ++epoch;
      }
      bestBias = bias;
      return weights;
    }

    public static void ShowVector(double[] vector)
    {
      for (int i = 0; i < vector.Length; ++i)
      {
        if (i > 0 && i % 4 == 0) Console.WriteLine("");
        Console.Write(vector[i].ToString("+0.000;-0.000") + " ");
      }
      Console.WriteLine("");
    }

    public static void ShowData(int[] data)
    {
      for (int i = 0; i < 20; ++i)  // hard-coded to indicate custom routine
      {
        if (i % 4 == 0) { Console.WriteLine(""); Console.Write(" "); }  // finished a row
        if (data[i] == 0) Console.Write(" ");
        else Console.Write("1");
      }
      Console.WriteLine("");
    }


  } // class

  

} // ns
