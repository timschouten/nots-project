import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import * as tf from '@tensorflow/tfjs'
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import P5Wrapper from 'react-p5-wrapper';

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  }
}));

let xs;
let ys;
const model = tf.sequential();
function sketch (p5) {
  p5.setup = async function () {
    // We want to predict the column "prijs", so we mark it as a label.
    const csvDataset = tf.data.csv(
      '/dataset.csv', {
        columnConfigs: {
          prijs: {
            isLabel: true
          }
        }
      });

    // Number of features is the number of column names minus one for the label column.
    const numOfFeatures = (await csvDataset.columnNames()).length - 1;
    console.log("Number of features:", numOfFeatures);

    // Prepare the Dataset for training.
    const flattenedDataset = csvDataset
      .map(({xs, ys}) => {
          return {xs: Object.values(xs), ys: Object.values(ys)};
        }
      ).batch(10);

    // setup model of neural network

    const hidden = tf.layers.dense({
      units: 4,
      inputShape: [numOfFeatures],
      activation: 'linear'
    });
    model.add(hidden);

    const output = tf.layers.dense({
      units: 1,
      activation: 'linear'
    });
    model.add(output);

    model.compile({
      optimizer: tf.train.sgd(.1),
      loss: tf.losses.meanSquaredError
    });

    await flattenedDataset.forEachAsync(async e => xs = await e.xs.data());
    await flattenedDataset.forEachAsync(async e => ys = await e.ys.data());

    // Fit the model using the prepared Dataset
    await model.fitDataset(flattenedDataset, {
      epochs: 100,
      callbacks: {
        onEpochEnd: async (epoch, logs) => {
          p5.draw();
          console.log("loss:", logs.loss);
        }
      }
    });
  };

  p5.draw = async function () {
    p5.createCanvas(400, 400);
    p5.background('#ffffff');
    p5.stroke('#000');
    p5.strokeWeight(8);

    // draw data points
    let x1, x2, y1, y2;
    if (ys) {
      for (let i = 0; i < ys.length; i++) {
        let px = p5.map(xs[i], 0, 1, 0, p5.width);
        let py = p5.map(ys[i], 0, 1, p5.height, 0);
        p5.point(px, py);
      }
      const line = await model.predict(tf.tensor([0, 1])).data();

      x1 = p5.map(0, 0, 1, 0, p5.width);
      x2 = p5.map(1, 0, 1, 0, p5.width);
      y1 = p5.map(line[0], 0, 1, p5.height, 0);
      y2 = p5.map(line[1], 0, 1, p5.height, 0);

      p5.strokeWeight(4);
    }
    p5.line(x1, y1, x2, y2);
  };
}

function TensorflowJS() {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.toolbar} />
      <h1>TensorflowJS</h1>
      <Typography paragraph>
        What framework shall I use for my project?
        Don't we all have the same problem when starting a new project.
        We already did the research for you and put every result on this website. You only need to choose what the best framework is that suits you.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <P5Wrapper sketch={sketch} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
export default TensorflowJS;
