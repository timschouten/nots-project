using System;
using System.IO;
using Microsoft.ML;

namespace AnomalyDetection
{
    class Program
    {
        static readonly string _dataPath = Path.Combine(Environment.CurrentDirectory, "Data", "product-sales.csv");
        //assign the Number of records in dataset file to constant variable
        const int _docsize = 36;

        static void Main(string[] args)
        {
            MLContext mlContext = new MLContext();

            IDataView dataView = mlContext.Data.LoadFromTextFile<ProductSalesData>(path: _dataPath, hasHeader: true, separatorChar: ',');
            DetectSpike(mlContext, _docsize, dataView);
        }
        
        static void DetectSpike(MLContext mlContext, int docSize, IDataView productSales)
        {
            var iidSpikeEstimator = mlContext.Transforms.DetectIidSpike(outputColumnName: nameof(ProductSalesPrediction.Prediction), inputColumnName: nameof(ProductSalesData.numSales), confidence: 95, pvalueHistoryLength: docSize / 4);
            ITransformer trainedModel = iidSpikeEstimator.Fit(productSales);
            IDataView transformedData = trainedModel.Transform(productSales);
            var predictions = mlContext.Data.CreateEnumerable<ProductSalesPrediction>(transformedData, reuseRowObject: false);
            Console.WriteLine("Alert\tScore\tP-Value");

            foreach (var p in predictions)
            {
                var results = $"{p.Prediction[0]}\t{p.Prediction[1]:f2}\t{p.Prediction[2]:F2}";

                if (p.Prediction[0] == 1)
                {
                    results += " <-- Spike detected";
                }

                Console.WriteLine(results);
            }
            Console.WriteLine("");
        }
    }
}
