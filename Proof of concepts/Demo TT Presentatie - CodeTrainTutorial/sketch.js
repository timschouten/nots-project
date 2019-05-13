let x_vals = [];
let y_vals = [];

let a, b, c, d;
let dragging = false;

const learningRate = 0.1;
const optimizer = tf.train.adam(learningRate);

function setup() {
	createCanvas(1600, 800);
	a = tf.variable(tf.scalar(random(-1, 1)));
	b = tf.variable(tf.scalar(random(-1, 1)));
	c = tf.variable(tf.scalar(random(-1, 1)));
	d = tf.variable(tf.scalar(random(-1, 1)));
}

function loss(pred, labels) {
	return pred.sub(labels).square().mean();
}

function predict(x) {
	const xs = tf.tensor1d(x);
	// y = ax^3 + bx^2 + cx + d
	const ys = xs.pow(tf.scalar(3)).mul(a)
		.add(xs.square().mul(b))
		.add(xs.mul(c))
		.add(d);
	return ys;
}


function mouseClicked() {
	let x = map(mouseX, 0, width, -1, 1);
    let y = map(mouseY, 0, height, 1, -1);
    x_vals.push(x);
    y_vals.push(y);
}

async function draw() {
    tf.tidy(() => {
      if (x_vals.length > 0) {
        const ys = tf.tensor1d(y_vals);
        optimizer.minimize(() => loss(predict(x_vals), ys));
      }
    });
	
	//Begin Draw chart
	background(255);
	stroke(0);
	line(0, 0, width, 0);
	line(0, 0, 0, height);
	line(width, 0, width, height);
	line(0, height, width, height);
	stroke(0);
	strokeWeight(0.3);
	for(let i = 0; i < 10; i++){
		line(0, i*(height/10), width, i*(height/10));
	}
	for(let i = 0; i < 20; i++){
		line(i*(width/20), 0, i*(width/20), height);
	}
	//End Draw chart

	strokeWeight(8);
	for (let i = 0; i < x_vals.length; i++) {
		let px = map(x_vals[i], -1, 1, 0, width);
		let py = map(y_vals[i], -1, 1, height, 0);
		point(px, py);
	}


	const curveX = [];
	for (let x = -1; x <= 1; x += 0.05) {
		curveX.push(x);
	}

	const ys = tf.tidy(() => predict(curveX));
	let curveY = ys.dataSync();
	ys.dispose();

	beginShape();
	noFill();
	stroke(0);
	strokeWeight(2);
	for (let i = 0; i < curveX.length; i++) {
		let x = map(curveX[i], -1, 1, 0, width);
		let y = map(curveY[i], -1, 1, height, 0);
		vertex(x, y);
	}
	endShape();
}