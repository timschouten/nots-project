using Microsoft.ML.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace WalkDataMLNet.Classes
{
    public class WalkDataRecord
    {
        [LoadColumn(0), ColumnName("Label")]
        public Single Moment { get; set; }

        [LoadColumn(1, 3), ColumnName("Score")]
        //[LoadColumn(1, 3), ColumnName("WalkData")]
        [VectorType(3)]
        public float[] AxisData { get; set; }
    }

    public class WalkRecordPrediction : WalkDataRecord
    {
        [ColumnName("PredictedLabel")]
        public bool Prediction { get; set; }

        public float Probability { get; set; }

        public float Score { get; set; }
    }

    public class Step
    {
        public Step(List<WalkDataRecord> MyStep)
        {
            this.MyStep = MyStep;
        }

        public List<WalkDataRecord> MyStep { get; set; }
    }
}
