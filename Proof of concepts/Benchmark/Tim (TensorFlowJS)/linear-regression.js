/*
    Summary CodeTrain Linear Regression with TensorFlow.js - 17:00 min
    https://www.youtube.com/watch?v=dLp10CFIvxI&list=PLRqwX-V7Uu6YIeVA3dNxbR9PYj4wV31oQ&index=5
 */
let x_vals = [];
let y_vals = [];
let m, b;

const learningRate = .2;
const optimizer = tf.train.sgd(learningRate);

function setup() {
  createCanvas(400 ,400);
  background(0);

  m = tf.variable(tf.scalar(random(1)));
  b = tf.variable(tf.scalar(random(1)));
}

function loss(pred, labels) {
  return pred.sub(labels).square().mean();
}

function predict(x) {
  const xs = tf.tensor1d(x);
  return xs.mul(m).add(b); // y = mx + b
}

function mousePressed() {
  const x = map(mouseX, 0, width, 0, 1);
  const y = map(mouseY, 0, height, 1, 0);
  x_vals.push(x);
  y_vals.push(y);
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(8);

  if(x_vals.length > 0) {
    const ys = tf.tensor1d(y_vals);
    optimizer.minimize(() => loss(predict(x_vals), ys));
  }

  for (let i = 0; i < x_vals.length; i++){
    let px = map(x_vals[i], 0, 1, 0, width);
    let py = map(y_vals[i], 0, 1, height, 0);
    point(px, py);
  }

  const xs = [0, 1];
  const ys = predict(xs);

  const x1 = map(xs[0], 0, 1, 0, width);
  const x2 = map(xs[1], 0, 1, 0, width);

  const lineY = ys.dataSync();
  const y1 = map(lineY[0], 0, 1, height, 0);
  const y2 = map(lineY[1], 0, 1, height, 0);

  line(x1, y1, x2, y2);
}