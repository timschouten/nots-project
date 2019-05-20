using Microsoft.ML.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace BenchmarkMLNet
{
    public class WalkData
    {
        [LoadColumn(0)]
        public string SentimentText;

        [LoadColumn(1), ColumnName("Label")]
        public bool Sentiment;
    }
}
