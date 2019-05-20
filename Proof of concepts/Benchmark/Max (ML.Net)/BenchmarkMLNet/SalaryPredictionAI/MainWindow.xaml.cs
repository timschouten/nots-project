 //https://docs.microsoft.com/en-us/dotnet/machine-learning/tutorials/movie-recommmendation

using Microsoft.ML;
using Microsoft.ML.Data;
using Microsoft.ML.Trainers;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using static Microsoft.ML.DataOperationsCatalog;

namespace SalaryPredictionAI
{
    // <summary>
    // Interaction logic for MainWindow.xaml
    // </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        //static DataObject newCalculation =
        //    new DataObject(
        //        txt_Age.Text,
        //        txt_WorkClass.Text,
        //        txt_Fnlwgt.Text,
        //        txt_Education.Text,
        //        txt_EducationNum.Text,
        //        txt_MaritalStatus.Text,
        //        txt_Occupation.Text,
        //        txt_Relationship.Text,
        //        txt_Race.Text,
        //        txt_Sex.Text,
        //        txt_CapitalGain.Text,
        //        txt_CapitalLoss.Text,
        //        txt_HoursPerWeek.Text,
        //        txt_NativeCountry.Text
        //    );

        private void Btn_Submit_Click(object sender, RoutedEventArgs e)
        {
            //MLContext mlContext = new MLContext();

            //IDataView trainingDataView = LoadData(mlContext).training;
            //IDataView testDataView = LoadData(mlContext).test;

            //ITransformer model = BuildAndTrainModel(mlContext, trainingDataView);

            //UseModelForSinglePrediction(mlContext, model);
        }

        //public static (IDataView training, IDataView test) LoadData(MLContext mlContext)
        //{
        //    var trainingDataPath = Path.Combine("C:/Users/MaxSchulz/Dropbox/han/NotS/Project/BenchmarkMLNet/SalaryPredictionAI", "Data", "TrainingData.txt");
        //    var testDataPath = Path.Combine("C:/Users/MaxSchulz/Dropbox/han/NotS/Project/BenchmarkMLNet/SalaryPredictionAI", "Data", "adult.txt");

        //    IDataView trainingDataView = mlContext.Data.LoadFromTextFile<DataObject>(trainingDataPath, hasHeader: true, separatorChar: ',');
        //    IDataView testDataView = mlContext.Data.LoadFromTextFile<DataObject>(testDataPath, hasHeader: true, separatorChar: ',');

        //    return (trainingDataView, testDataView);
        //}

        //public static ITransformer BuildAndTrainModel(MLContext mlContext, IDataView trainingDataView)
        //{
        //    IEstimator<ITransformer> estimator = mlContext.Transforms.Conversion.MapValueToKey(outputColumnName: "userIdEncoded", inputColumnName: "Age")
        //        .Append(mlContext.Transforms.Conversion.MapValueToKey(outputColumnName: "movieIdEncoded", inputColumnName: "CapitalGain"));

        //    var options = new MatrixFactorizationTrainer.Options
        //    {
        //        MatrixColumnIndexColumnName = "userIdEncoded",
        //        MatrixRowIndexColumnName = "movieIdEncoded",
        //        LabelColumnName = "Salary",
        //        NumberOfIterations = 20,
        //        ApproximationRank = 100
        //    };

        //    var trainerEstimator = estimator.Append(mlContext.Recommendation().Trainers.MatrixFactorization(options));

        //    Console.WriteLine("=============== Training the model ===============");
        //    ITransformer model = trainerEstimator.Fit(trainingDataView);

        //    return model;
        //}

        //public static void EvaluateModel(MLContext mlContext, IDataView testDataView, ITransformer model)
        //{
        //    Console.WriteLine("=============== Evaluating the model ===============");
        //    var prediction = model.Transform(testDataView);

        //    var metrics = mlContext.Regression.Evaluate(prediction, labelColumnName: "Label", scoreColumnName: "Score");

        //    Console.WriteLine("Root Mean Squared Error : " + metrics.RootMeanSquaredError.ToString());
        //    Console.WriteLine("RSquared: " + metrics.RSquared.ToString());

        //    EvaluateModel(mlContext, testDataView, model);
        //}

        //public static void UseModelForSinglePrediction(MLContext mlContext, ITransformer model)
        //{
        //    Console.WriteLine("=============== Making a prediction ===============");
        //    var predictionEngine = mlContext.Model.CreatePredictionEngine<MovieRating, MovieRatingPrediction>(model);

        //    var testInput = new DataObject { userId = 7, movieId = 10 };

        //    var movieRatingPrediction = predictionEngine.Predict(testInput);

        //    if (Math.Round(movieRatingPrediction.Score, 1) > 3.5)
        //    {
        //        Console.WriteLine("Movie " + testInput.movieId + " is recommended for user " + testInput.userId);
        //    }
        //    else
        //    {
        //        Console.WriteLine("Movie " + testInput.movieId + " is not recommended for user " + testInput.userId);
        //    }
        //}
    }
}
