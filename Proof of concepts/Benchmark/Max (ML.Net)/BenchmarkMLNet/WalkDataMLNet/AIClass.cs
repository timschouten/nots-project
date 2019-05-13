using Microsoft.ML;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using WalkDataMLNet.Classes;
using static Microsoft.ML.DataOperationsCatalog;

namespace WalkDataMLNet
{
    public static class AIClass
    {
        public static void DoAIStuff()
        {
            MLContext mlContext = new MLContext();
            TrainTestData splitDataView = LoadData(mlContext); // <-- Data uitgelezen uit Excel?

            //var pipeline = mlContext.Transforms.Concatenate("Features", new[] { "WalkData" })
            var pipeline = mlContext.Transforms.Concatenate("Features", new[] { "Score" })
               .Append(mlContext.Regression.Trainers.Sdca(labelColumnName: "Label", maximumNumberOfIterations: 100));

            IDataView trainingData = mlContext.Data.LoadFromEnumerable(GetWalkDataRecords());

            var model = pipeline.Fit(trainingData);

            var testWalkDataView = mlContext.Data.LoadFromEnumerable(GetWalkDataRecords());
            var testWalkData = model.Transform(testWalkDataView);

            //var metrics = mlContext.Regression.Evaluate(testWalkDataView, labelColumnName: "Label");
            var metrics = mlContext.Regression.Evaluate(testWalkDataView, labelColumnName: "Label");

            Console.WriteLine($"R^2: {metrics.RSquared:0.##}");
            Console.WriteLine($"RMS error: {metrics.RootMeanSquaredError:0.##}");

            //ITransformer transformerModel = BuildAndTrainModel(mlContext, splitDataView.TrainSet);
            //Evaluate(mlContext, transformerModel, splitDataView.TestSet);
            //UseModelWithSingleItem(mlContext, model);
            //UseModelWithBatchItems(mlContext, model);
        }

        /// <summary>
        /// Load data 
        /// </summary>
        /// <param name="mlContext"></param>
        /// <returns></returns>
        private static TrainTestData LoadData(MLContext mlContext)
        {
            IDataView dataView = mlContext.Data.LoadFromEnumerable(GetWalkDataRecords()); 
                // mlContext.Data.LoadFromTextFile<SentimentData>(_dataPath, hasHeader: false);
            
            // 0.2 stands for the percentage of the ammount of trainingdata in this case 20%
            TrainTestData splitDataView = mlContext.Data.TrainTestSplit(dataView, testFraction: 0.2);
            return splitDataView;
        }

        private static List<WalkDataRecord> GetWalkDataRecords()
        {
            var csv = new List<WalkDataRecord>();
            var lines = File.ReadAllLines(@"Data/datasetSubsetStap.csv");
            foreach (string line in lines)
            {
                if (line != lines.First())
                {
                    WalkDataRecord wdr = new WalkDataRecord();
                    string[] temp = line.Split(';');
                    wdr.Moment = 0; // Convert.ToSingle(float.Parse(temp[0])); //Convert.ToDateTime(temp[0]);
                    wdr.AxisData = new float[] { float.Parse(temp[1]), float.Parse(temp[2]), float.Parse(temp[3]) };
                    csv.Add(wdr);

                    // Console.WriteLine("DateTime = " + wdr.Moment.ToString() + " // Axis = " + wdr.AxisData[0] + ", " + wdr.AxisData[1] + ", " + wdr.AxisData[2]);
                }
            }
            return csv;
        }
    }
}
