using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.ML.Data;

namespace BenchmarkMLNet
{
    public class SentimentData
    {
        [LoadColumn(0)]
        public int testNumber;

        [LoadColumn(1)]
        public string SentimentText;

        [LoadColumn(2), ColumnName("Label")]
        public bool Sentiment;
    }

    public class SentimentPrediction : SentimentData
    {
        [ColumnName("PredictedLabel")]
        public bool Prediction { get; set; }

        public float Probability { get; set; }

        public float Score { get; set; }
    }
}
