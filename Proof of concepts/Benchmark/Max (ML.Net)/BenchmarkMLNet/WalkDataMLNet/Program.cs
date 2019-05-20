using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.ML;
using Microsoft.ML.Data;
using static Microsoft.ML.DataOperationsCatalog;
using Microsoft.ML.Trainers;
using Microsoft.ML.Transforms.Text;
using WalkDataMLNet.Classes;

// 30
namespace WalkDataMLNet
{
    /// <summary>
        /// Leren hoe ik moet debuggen in ML.Net
        /// Kijken naar perceptrons in ML.Net
    /// </summary>
    static class Program
    {
        private static List<Step> myWalk = new List<Step>();
        private static int maxDivergent = 2;
        private static int minDivergent = -2;

        static void Main(string[] args)
        {
            //myWalk = RecognizeSteps(GetWalkDataRecords());
            AIClass.DoAIStuff();
        }

        public static List<WalkDataRecord> GetWalkDataRecords()
        {
            var csv = new List<WalkDataRecord>();
            var lines = File.ReadAllLines(@"Data/datasetSubsetStap.csv");
            foreach (string line in lines)
            {
                if (line != lines.First())
                {
                    WalkDataRecord wdr = new WalkDataRecord();
                    string[] temp = line.Split(';');
                    wdr.Moment = 0; //Convert.ToSingle(float.Parse(temp[0]));// Convert.ToDateTime(temp[0]);
                    wdr.AxisData = new float[] { float.Parse(temp[1]), float.Parse(temp[2]), float.Parse(temp[3]) };
                    csv.Add(wdr);

                    // Console.WriteLine("DateTime = " + wdr.Moment.ToString() + " // Axis = " + wdr.AxisData[0] + ", " + wdr.AxisData[1] + ", " + wdr.AxisData[2]);
                }
            }
            return csv;
        }

        public static List<Step> RecognizeSteps(List<WalkDataRecord> wdrs)
        {
            List<List<WalkDataRecord>> allSteps = new List<List<WalkDataRecord>>();
            WalkDataRecord startWDR = wdrs.First();
            List<WalkDataRecord> oneStep = new List<WalkDataRecord>();
            List<Step> allMySteps = new List<Step>();

            int numberOfRecordsInStep = 0;
            int currentRecord = 0;
            int startStepRecord = 0;
            int totalSteps = 0;

            foreach (WalkDataRecord wdr in wdrs)
            {
                if (wdr != wdrs.First())
                {
                    if (
                        //wdr.AxisData[0].CheckRange(startWDR.AxisData[0] * minDivergent, startWDR.AxisData[0] * maxDivergent) &&
                        wdr.AxisData[1].CheckRange(startWDR.AxisData[1] * minDivergent, startWDR.AxisData[1] * maxDivergent) //&&
                        //wdr.AxisData[2].CheckRange(startWDR.AxisData[2] * minDivergent, startWDR.AxisData[2] * maxDivergent)
                       )
                    {
                        // Step complete
                        Step stepToAdd = new Step(oneStep);

                        totalSteps++;

                        Console.WriteLine("==================== STEP COMPLETED ====================");
                        Console.WriteLine("Total steps " + totalSteps);
                        Console.WriteLine("Start of step record " + startStepRecord);
                        Console.WriteLine("End of step record " + currentRecord);
                        Console.WriteLine("Number of records in this step " + (numberOfRecordsInStep+1));

                        allSteps.Add(oneStep);
                        oneStep = new List<WalkDataRecord>();

                        startStepRecord = currentRecord;
                        numberOfRecordsInStep = 0;
                        Console.WriteLine("==================== CONTINUE ====================\n");
                    }
                    else
                    {
                        //Console.WriteLine("Incomplete");
                        numberOfRecordsInStep++;
                        oneStep.Add(wdr);
                    }
                }
                currentRecord++;
            }
            return allMySteps;
        }

        public static bool CheckRange(this float num, double min, double max)
        {
            return ((double)num > min && (double)num < max);
        }
    }
}
