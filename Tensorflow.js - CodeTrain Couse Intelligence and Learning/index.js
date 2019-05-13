async function setup() {
  noCanvas();

  /*
    Summary CodeTrain TensorFlow.js course session 6.1 - 6.4
 */

  let shape = [2, 3]; // shape of the tensor/matrix

  tf.tidy(() => { // dispose all tensors // prevent memory leak
    const t1 = tf.tensor2d([4, 2, 3, 1, 4, 2], shape, 'int32'); // tensor2d = matrix
    const t2 = tf.tensor2d([9, 2, 3, 4, 4, 3], shape, 'int32').transpose(); // transpose change shape to [2, 3] => [3, 2]
    const t3 = t1.matMul(t2); // matMul multiply matrix t1 with matrix t2

    t1.print(); // same as console.log(t1.toString())
    t2.print();
    t3.print();

    console.log(t3.dataSync()); // get data of tensor sync
  });

  const tensor = tf.tensor([1, 2, 1, 4], [2, 2], 'int32'); // generic version of tensor // tf.tensor(data, shape, type)
  const scalar = tf.scalar(1, 'int32'); // tensor with single number => 1
  const vector = tf.tensor1d([1, 2, 3], 'int32'); // tensor with an array of numbers => [1, 2, 3]
  const matrix = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3], 'int32'); // tensor with a matrix of numbers => [[1, 2, 3], [4, 5, 6]]
  const cube = tf.tensor3d([1, 2, 3, 4, 5, 6, 7 ,8], [2, 2, 2], 'int32'); // tensor with a matrix of numbers => [[[1, 2],[3, 4]], [[5, 6],[7, 8]]]

  scalar.print();
  vector.print();
  matrix.print();
  cube.print();

  console.log(scalar.dataSync()); // get data of tensor sync
  console.log(await scalar.data()); // get data of tensor async
  console.log(tf.memory().numTensors); // print all tensors in memory

  /*
    Summary CodeTrain TensorFlow.js course session 6.5 part 1
 */

  const model = tf.sequential(); // model of neural network

  const hidden = tf.layers.dense({ // dense layer = all neurons are connected with neurons in previous/next layer
    units: 4, // neurons
    inputShape: [2], // input shape of previous layer, previous layer is the input layer
    activation: 'sigmoid' // activation function
  });
  const output = tf.layers.dense({
    units: 3, // neurons
    activation: 'sigmoid' // activation function
  });

  model.add(hidden);
  model.add(output);

  model.compile({
    optimizer: tf.train.sgd(0.1),
    loss: tf.losses.meanSquaredError
  });
}