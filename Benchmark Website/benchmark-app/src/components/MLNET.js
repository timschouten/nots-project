import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  }
}))

function MLNET() {

  var code =
    "var dataPath = \"sentiment.csv\";\n" +
    "var mlContext = new MLContext();\n" +
    "var loader = mlContext.Data.CreateTextLoader(new[]\n" +
    "   {\n" +
    "       new TextLoader.Column(\"SentimentText\", DataKind.String, 1),\n" +
    "       new TextLoader.Column(\"Label\", DataKind.Boolean, 0),\n" +
    "   },\n" +
    "   hasHeader: true,\n" +
    "   separatorChar: ','\n" +
    ");\n" +
    "\n" +
    "var data = loader.Load(dataPath);\n" +
    "var learningPipeline = mlContext.Transforms.Text\n" +
    "   .FeaturizeText(\"Features\", \"SentimentText\")\n" +
    "   .Append(mlContext.BinaryClassification.Trainers.FastTree\n" +
    "\n" +
    "var model = learningPipeline.Fit(data);";


  const classes = useStyles();
  return (
    <div>
      <div className={classes.toolbar} />
        <h1>ML.NET</h1>
        ML.Net is a Machine Learning framework developed on top of .Net Core en .Net Standard. This makes that ML.Net is supported across a wide variety of platforms. Where Tensorflow was build in C++ and Python, ML.Net was build in C++ and C#.
        <br/><br/>
        ML.Net was created on top of a previous library. The library it was build on was called TLC (The Learning Code) Library. Before that, TLC was known as TMSN (Text Mining Search and Navigation).
        <br/><br/>
        ML.Net introduces the concept of “Model Based Machine Learning”. In Model Based Machine Learning there is a concept called Models. Models are a set of predictions created in a precise mathematical form. Within these predictions variables exist within a problem cause, what variables are dependent on one another and what effect changing one has on another.
        <br/><br/>

        <h1>Using ML.Net</h1><br/>
        To use ML.Net we can use different standard functions embedded in ML.Net. Below you can see how ML.Net is used. In the example below data is loaded and a model is trained, which after that will be used.
        <br/><br/>
        <h3>Creating an "AI" in ML.Net</h3>
        <div align="left">
            var dataPath = sentiment.csv; // Training data to load<br/>
            var mlContext = new MLContext(); // MLContext is a class that contains all functionality<br/>
            // Loader that can load the data
            var loader = mlContext.Data.CreateTextLoader(new[]<br/>
                &emsp;&emsp;new TextLoader.Column("SentimentText", DataKind.String, 1),<br/>
                &emsp;&emsp;new TextLoader.Column("Label", DataKind.Boolean, 0),<br/>
                &emsp;&emsp;hasHeader: true,<br/>
                &emsp;&emsp;separatorChar: ','<br/>
            );
            <br/><br/>
            var data = loader.Load(dataPath);// Function that load the data in to var data <br/>
            // Create a learning piline that we can use to make a model
            var learningPipeline = mlContext.Transforms.Text<br/>
                &emsp;&emsp;.FeaturizeText("Features", "SentimentText")<br/>
                &emsp;&emsp;.Append(mlContext.BinaryClassification.Trainers.FastTree<br/>
            // Fit the pipeline to a model
            var model = learningPipeline.Fit(data);<br/>
        </div><br/>
        On this model we can now call the method CreatePredictionEngine(), that creates an object that has the function Predict()<br/><br/>
        <h3>Using an "AI" with ML.Net</h3><br/>
        <div align="left">
            var predictionEngine = mlContext.Model.CreatePredictionEngine SentimentData, SentimentPrediction(model); <br/>
            var prediction = predictionEngine.Predict(new SentimentData <br/>
            &emsp;&emsp;SentimentText = "Today is a great day!" <br/>
            );
        </div>
    </div>
  );
}
export default MLNET;
