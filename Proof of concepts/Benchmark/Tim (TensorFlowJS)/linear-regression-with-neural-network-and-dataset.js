let xs;
let ys;

async function setup() {
  noLoop();

  // We want to predict the column "prijs", so we mark it as a label.
  const csvDataset = tf.data.csv(
    'adult-subset.csv', {
      columnConfigs: {
        income_bracket: {
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
  const model = tf.sequential();

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
    loss: tf.losses.absoluteDifference
  });

  await flattenedDataset.forEachAsync(async e => xs = await e.xs.data());
  await flattenedDataset.forEachAsync(async e => ys = await e.ys.data());

  // Fit the model using the prepared Dataset
  await model.fitDataset(flattenedDataset, {
    epochs: 1,
    callbacks: {
      onEpochEnd: async (epoch, logs) => {
          //await draw(model);
        console.log("loss:", logs.loss);
      }
    }
  });
}

async function draw(model) {
  createCanvas(400, 400);
  background(0);
  stroke(255);
  strokeWeight(8);

  // draw data points
  let x1, x2, y1, y2;
  if(ys) {
    for (let i = 0; i < ys.length; i++) {
      let px = map(xs[i], 0, 1, 0, width);
      let py = map(ys[i], 0, 1, height, 0);
      point(px, py);
    }

    const line = await model.predict(tf.tensor([0, 1])).data();

    x1 = map(0, 0, 1, 0, width);
    x2 = map(1, 0, 1, 0, width);
    y1 = map(line[0], 0, 1, height, 0);
    y2 = map(line[1], 0, 1, height, 0);

    strokeWeight(4);
  }
  line(x1, y1, x2, y2);
}
