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
        xs = {
          age: xs.age,
          capital_gain: xs.capital_gain,
          capital_loss: xs.capital_loss,
          education_num: xs.education_num,
          fnlwgt: xs.fnlwgt,
          gender: xs.gender === "Male" ? 0 : 1,
          hours_per_week: xs.hours_per_week
        };

        ys.income_bracket = ys.income_bracket == ">50K" ? 1 : 0;

        return {xs: Object.values(xs), ys: Object.values(ys)};
      }
    ).batch(10);

  // setup model of neural network
  const model = tf.sequential();

  const hidden = tf.layers.dense({
    units: 10,
    inputShape: [7],
    activation: 'linear'
  });
  model.add(hidden);

  const output = tf.layers.dense({
    units: 1,
    activation: 'linear'
  });
  model.add(output);

  model.compile({
    optimizer: tf.train.sgd(0.01),
    loss: tf.losses.meanSquaredError
  });

 // await flattenedDataset.forEachAsync(async e => xs = await e.xs.data());
 // await flattenedDataset.forEachAsync(async e => ys = await e.ys.data());

  // Fit the model using the prepared Dataset
  await model.fitDataset(flattenedDataset, {
    epochs: 100,
    callbacks: {
      onEpochEnd: async (epoch, logs) => {
        console.log("loss:", logs.loss);
      }
    }
  });
}