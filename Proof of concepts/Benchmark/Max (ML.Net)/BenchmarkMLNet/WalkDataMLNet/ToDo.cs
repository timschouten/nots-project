using System;
using System.Collections.Generic;
using System.Text;

namespace WalkDataMLNet
{
    class ToDo
    {
        /**
        TrainTestData splitDataView = LoadData(mlContext);
        ITransformer model = BuildAndTrainModel(mlContext, splitDataView.TrainSet);
        Evaluate(mlContext, model, splitDataView.TestSet);
        UseModelWithSingleItem(mlContext, model);
        UseModelWithBatchItems(mlContext, model);
         * 
         * 
        public static TrainTestData LoadData(MLContext mlContext)
        {
            IDataView dataView = mlContext.Data.LoadFromEnumerable<WalkDataRecord>(GetWalkDataRecords());
            // 0.2 stands for the percentage of the ammount of trainingdata in this case 20%
            TrainTestData splitDataView = mlContext.Data.TrainTestSplit(dataView, testFraction: 0.2);
            return splitDataView;
        }

        public static ITransformer BuildAndTrainModel(MLContext mlContext, IDataView splitTrainSet)
        {
            var estimator = mlContext.Transforms.Text.FeaturizeText(outputColumnName: "Features", inputColumnName: "WalkData")
                .Append(mlContext.BinaryClassification.Trainers.SdcaLogisticRegression(labelColumnName: "WalkData", featureColumnName: "WalkData"));

            Console.WriteLine("=============== Create and Train the Model ===============");
            var model = estimator.Fit(splitTrainSet);
            Console.WriteLine("=============== End of training ===============");
            Console.WriteLine();

            return model;
        }

        public static void Evaluate(MLContext mlContext, ITransformer model, IDataView splitTestSet)
        {
            Console.WriteLine("=============== Evaluating Model accuracy with Test data===============");
            IDataView predictions = model.Transform(splitTestSet);
            CalibratedBinaryClassificationMetrics metrics = mlContext.BinaryClassification.Evaluate(predictions, "Label");

            Console.WriteLine();
            Console.WriteLine("Model quality metrics evaluation");
            Console.WriteLine("--------------------------------");
            Console.WriteLine($"Accuracy: {metrics.Accuracy:P2}");
            Console.WriteLine($"Auc: {metrics.AreaUnderRocCurve:P2}");
            Console.WriteLine($"F1Score: {metrics.F1Score:P2}");
            Console.WriteLine("=============== End of model evaluation ===============");
        }

        private static void UseModelWithSingleItem(MLContext mlContext, ITransformer model)
        {
            PredictionEngine<WalkDataRecord, WalkRecordPrediction> predictionFunction = mlContext.Model.CreatePredictionEngine<WalkDataRecord, WalkRecordPrediction>(model);
            WalkDataRecord sampleStatement = new WalkDataRecord
            {
                AxisData = new float[] { 0.5f, 0.5f, 0.5f }
            };
            var resultprediction = predictionFunction.Predict(sampleStatement);

            Console.WriteLine();
            Console.WriteLine("=============== Prediction Test of model with a single sample and test dataset ===============");

            Console.WriteLine();
            Console.WriteLine($"Prediction: {(Convert.ToBoolean(resultprediction.Prediction) ? "Positive" : "Negative")} | Probability: {resultprediction.Probability} ");

            Console.WriteLine("=============== End of Predictions ===============");
            Console.WriteLine();
        }

        public static void UseModelWithBatchItems(MLContext mlContext, ITransformer model)
        {
            IEnumerable<WalkDataRecord> sentiments = new[]
            {
                new WalkDataRecord
                {
                    AxisData = new float[] { 0.5f, 0.5f, 0.5f }
                },
                new WalkDataRecord
                {
                    AxisData = new float[] { 1f, 1f, 1f }
                }
            };

            IDataView batchComments = mlContext.Data.LoadFromEnumerable(sentiments);

            IDataView predictions = model.Transform(batchComments);

            // Use model to predict whether comment data is Positive (1) or Negative (0).
            IEnumerable<WalkRecordPrediction> predictedResults = mlContext.Data.CreateEnumerable<WalkRecordPrediction>(predictions, reuseRowObject: false);

            Console.WriteLine();
            Console.WriteLine("=============== Prediction Test of loaded model with multiple samples ===============");

            foreach (WalkRecordPrediction prediction in predictedResults)
            {
                Console.WriteLine($"Prediction: {(Convert.ToBoolean(prediction.Prediction) ? "Positive" : "Negative")} | Probability: {prediction.Probability} ");
            }
            Console.WriteLine("=============== End of predictions ===============");
        }
         */
    }
}
