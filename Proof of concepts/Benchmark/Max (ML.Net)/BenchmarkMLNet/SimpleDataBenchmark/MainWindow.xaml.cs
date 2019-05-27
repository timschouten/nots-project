using BenchmarkMLNet;
using Microsoft.ML;
using Microsoft.ML.Data;
using System;
using System.Diagnostics;
using System.IO;
using System.Windows;
using System.Windows.Controls;
using static Microsoft.ML.DataOperationsCatalog;

namespace SimpleDataBenchmark
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        static readonly string _dataPath = Path.Combine("C:/Users/MaxSchulz/Dropbox/han/NotS/Project/BenchmarkMLNet/SimpleDataBenchmark", "yelp_labelled.txt");
        static MLContext mlContext;
        static TrainTestData splitDataView;
        static ITransformer model;

        static int numPostive = 0;
        static int numMeh = 0;
        static int numNegative = 0;

        public MainWindow()
        {
            InitializeComponent();
            InitAI();
        }

        public static void InitAI()
        {
            mlContext = new MLContext();
            splitDataView = LoadData(mlContext);
            model = BuildAndTrainModel(mlContext, splitDataView.TrainSet);
            Evaluate(mlContext, model, splitDataView.TestSet);
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            float review = UseModelWithSingleItem(mlContext, model, txt_Input.Text);
            Debug.WriteLine("Review = " + review);

            if (review <= -3)
            {
                numNegative++;
                ListViewItem newListItem = new ListViewItem();
                newListItem.Content = txt_Input.Text;
                lsv_Negative.Items.Add(newListItem);
            }
            else if (review > -3 && review <= 3)
            {
                numMeh++;
                ListViewItem newListItem = new ListViewItem();
                newListItem.Content = txt_Input.Text;
                lsv_Meh.Items.Add(newListItem);
            }
            else if (review > 3)
            {
                numPostive++;
                ListViewItem newListItem = new ListViewItem();
                newListItem.Content = txt_Input.Text;
                lsv_Positive.Items.Add(newListItem);
            }

            txt_Input.Text = string.Empty;
            txt_Negative.Content = numNegative;
            txt_Meh.Content = numMeh;
            txt_Positive.Content = numPostive;
        }

        public static TrainTestData LoadData(MLContext mlContext)
        {
            IDataView dataView = mlContext.Data.LoadFromTextFile<SentimentData>(_dataPath, hasHeader: false);
            // 0.2 stands for the percentage of the ammount of trainingdata in this case 20%
            TrainTestData splitDataView = mlContext.Data.TrainTestSplit(dataView, testFraction: 0.2);
            return splitDataView;
        }

        public static ITransformer BuildAndTrainModel(MLContext mlContext, IDataView splitTrainSet)
        {
            var estimator = mlContext.Transforms.Text.FeaturizeText(outputColumnName: "Features", inputColumnName: nameof(SentimentData.SentimentText))
                .Append(mlContext.BinaryClassification.Trainers.SdcaLogisticRegression(labelColumnName: "Label", featureColumnName: "Features"));
            var model = estimator.Fit(splitTrainSet);
            return model;
        }

        public static void Evaluate(MLContext mlContext, ITransformer model, IDataView splitTestSet)
        {
            IDataView predictions = model.Transform(splitTestSet);
            CalibratedBinaryClassificationMetrics metrics = mlContext.BinaryClassification.Evaluate(predictions, "Label");
        }

        private static float UseModelWithSingleItem(MLContext mlContext, ITransformer model, string input)
        {
            PredictionEngine<SentimentData, SentimentPrediction> predictionFunction = mlContext.Model.CreatePredictionEngine<SentimentData, SentimentPrediction>(model);
            SentimentData sampleStatement = new SentimentData { SentimentText = input };
            var resultprediction = predictionFunction.Predict(sampleStatement);
            return resultprediction.Score;
        }
    }
}
