using Microsoft.ML.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SalaryPredictionAI
{
    public class DataObject
    {
        [LoadColumn(0)]
        public string Age { get; set; }
        [LoadColumn(1)]
        public string Workclass { get; set; }
        [LoadColumn(2)]
        public string Fnlwgt { get; set; }
        [LoadColumn(3)]
        public string Education { get; set; }
        [LoadColumn(4)]
        public string EducationNum { get; set; }
        [LoadColumn(5)]
        public string MaritalStatus { get; set; }
        [LoadColumn(6)]
        public string Occupation { get; set; }
        [LoadColumn(7)]
        public string Relationship { get; set; }
        [LoadColumn(8)]
        public string Race { get; set; }
        [LoadColumn(9)]
        public string Sex { get; set; }
        [LoadColumn(10)]
        public string CapitalGain { get; set; }
        [LoadColumn(11)]
        public string CapitalLoss { get; set; }
        [LoadColumn(12)]
        public string HoursPerWeek { get; set; }
        [LoadColumn(13)]
        public string NativeCountry { get; set; }
        [LoadColumn(14)]
        public string Salary { get; set; }

        public DataObject(
                string Age,
                string Workclass,
                string Fnlwgt,
                string Education,
                string EducationNum,
                string MaritalStatus,
                string Occupation,
                string Relationship,
                string Race,
                string Sex,
                string CapitalGain,
                string CapitalLoss,
                string HoursPerWeek,
                string NativeCountry
            )
        {
            this.Age = Age;
            this.Workclass = Workclass;
            this.Fnlwgt = Fnlwgt;
            this.Education = Education;
            this.EducationNum = EducationNum;
            this.MaritalStatus = MaritalStatus;
            this.Occupation = Occupation;
            this.Relationship = Relationship;
            this.Race = Race;
            this.Sex = Sex;
            this.CapitalGain = CapitalGain;
            this.CapitalLoss = CapitalLoss;
            this.HoursPerWeek = HoursPerWeek;
            this.NativeCountry = NativeCountry;
        }
    }

    public class SentimentPrediction
    {
        [ColumnName("PredictedLabel")]
        public bool Prediction { get; set; }
        public float Probability { get; set; }
        public float Score { get; set; }
    }
}
