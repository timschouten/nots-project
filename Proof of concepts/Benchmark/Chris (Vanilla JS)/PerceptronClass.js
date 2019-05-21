let result_values_y = [];
let result_values_x = [];
let canvas = document.getElementById("result");
let ctx = canvas.getContext("2d");
// Draw a point in the middle of the canvas to check if centre is set correct
ctx.beginPath();
ctx.arc(canvas.width / 2, canvas.height / 2, 10, 0, 2 * Math.PI);
ctx.fill();
ctx.stroke();

/** Perceptron Class
 * generates random weights and bias to begin with
 * activator function to see whether it is above the Formula or below
 * train method that alters the weights where needed*/
class Perceptron {
	constructor() {
		this.weights = Perceptron.generateWeights(3);
		this.LR = 0.1; // learning rate
	}

	static generateWeights(lengths) {
		// Initialize randomly and appending bias weight
		const weights = [];
		const min = -1;
		const max = 1;
		for (let i = 0; i < lengths; i++) {
			weights.push(Math.random() * (+max - +min) + +min)
		}
		return weights
	}

	static ActivatorFunction(n) {
		if (n >= 0) {
			return 1
		} else {
			return -1;
		}
	}

	guess(inputs) {
		let sum = 0;
		for (let i = 0; i < this.weights.length; i++) {
			sum += inputs[i] * this.weights[i];
		}
		return Perceptron.ActivatorFunction(sum);
	}

// tune all the weights
	train(inputs, target) {
		const guess = this.guess(inputs);
		const err = target - guess;
		for (let i = 0; i < this.weights.length; i++) {
			this.weights[i] += err * inputs[i] * this.LR;
		}
	}

	guessY(x) {
// var m = this.weights[1] / this.weights[2];
		// var b = this.weights[2];
		// return m*x+b;
		return -(this.weights[2] / this.weights[1]) - (this.weights[0] / this.weights[1]) * x;
	}
}

/** Point Class
 * Initializes an point to place on screen with random values (Not bigger than canvas)
 * Label = Whether the point is above the Formula or below
 * */
class Point {
	constructor() {
		this.x = Math.random() * (+(canvas.width / 2) - +(0 - canvas.width / 2)) + +(0 - canvas.width / 2);
		this.y = Math.random() * (+(canvas.height / 2) - +(0 - canvas.height / 2)) + +(0 - canvas.width / 2);
		this.lineY = Formula(this.x);
		this.bias = 1;

		if (this.y > this.lineY) {
			this.label = 1;
		} else {
			this.label = -1;
		}
	}

	setX(x) {
		this.x = x;
		this.lineY = Formula(this.x);
	}

	setY(y) {
		this.y = y
	}
}

/** Generate perceptron and random points*/
const brain = new Perceptron();
let points = [];
for (let i = 0; i < 200; i++) {
	points.push(new Point())
}
let trainIndex = 0;
let trainingIndex = 0;
let redCount = 0;

/**
 * @return {number}
 */
function Formula(x) {
	return 5 * x + 2
}

let finalCount = 0;

/** Function that triggers the automatic learning process */
function StartDrawing() {
	setInterval(Draw, 10);
}

/** Method that updates the display text */
function UpdateDisplayText() {
	document.getElementById("trainIndex").innerHTML = "Training index = " + trainIndex + "\r\n" +
		"Ammount wrong = " + redCount + "/" + points.length;
	if (redCount === 0 && finalCount === 0) {
		finalCount = trainIndex;
		document.getElementById("trainIndex").innerHTML = "Neural network trained in " + finalCount + " iterations";
	}
}

/** Displays the whether the guess was correct in color
 * red = false
 * green = true
 * */
function DisplayGuessCorrection(ctx) {
	for (let i = 0; i < points.length; i++) {
		const inputs2 = [(canvas.width / 2) + points[i].x, (canvas.height / 2) + points[i].y, points[i].bias];
		let target = points[i].label;
		const guess = brain.guess(inputs2);
		const object = points[i];
		ctx.beginPath();
		ctx.arc(object.x, brain.guessY(object.x), 6, 0, 2 * Math.PI);
		if (guess === target) ctx.fillStyle = "green";
		else {
			ctx.fillStyle = "red";
			redCount++;
		}
		ctx.fill();
		/** Automatic learning
		 * Uses individual points to train
		 * Increase training index
		 * */
		const training = points[trainingIndex];
		const inputs = [(canvas.width / 2) + training.x, (canvas.height / 2) + training.y, training.bias];
		target = training.label;
		brain.train(inputs, target);
		trainingIndex++;
		if (trainingIndex === points.length) {
			trainingIndex = 0;
		}
	}
}

function DrawSeperationLines(ctx) {
	const beginLine = new Point();
	beginLine.setX(canvas.width / 2);
	beginLine.setY(0 - canvas.height / 2);
	const endLine = new Point();
	endLine.setX(canvas.width);
	endLine.setY(brain.guessY(canvas.width)); // use the width to guess y
	ctx.beginPath();
	ctx.moveTo(canvas.width / 2, 0 - Formula(canvas.height / 2));
	ctx.lineTo(canvas.width, 0 - Formula(canvas.width / 2));
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(beginLine.x, beginLine.y);
	ctx.lineTo(endLine.x, endLine.y);
	ctx.stroke();
}

/** Draws the points on screen with color representing if its guessed correct or not */
function Draw() {
	if (finalCount > 0) return; // stop if netwerk is trained
	trainIndex++; // amount of training iterations
	redCount = 0; // amount of wrong guesses

	//prepare canvas
	const element = document.getElementById("result");
	const ctx = element.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// draw the points on screen
	for (let i = 0; i < points.length; i++) {
		const object = points[i];
		ctx.beginPath();
		ctx.arc(object.x, brain.guessY(object.x), 10, 0, 2 * Math.PI);
		if (object.label === 1) {
			ctx.fill();
		}
		ctx.stroke();
	}

	DrawSeperationLines(ctx);
	DisplayGuessCorrection(ctx);
	UpdateDisplayText();
	findLineByLeastSquares(result_values_x, result_values_y)

}

async function csvJSON(csv) {
	const lines = csv.split("\n");
	const result = [];

	const headers = lines[0].split(";");
	for (let i = 1; i < lines.length; i++) {
		const obj = {};
		const currentline = lines[i].split(";");
		for (let j = 0; j < headers.length; j++) {
			obj[headers[j]] = String(currentline[j]).replace("	", ".");
		}
		result.push(obj);

	}
	return result;

}

function CreatePoints(data) {

	points = [];
	for (let i = 0; i < 30; i++) { //change this to lower the amount of points
		let p = new Point();
		p.setX((canvas.width / 2) + parseFloat(data[i].x));
		result_values_x.push((canvas.width / 2) + parseFloat(data[i].x));
		p.setY((canvas.width / 2) + parseFloat(data[i].y));
		result_values_y.push((canvas.width / 2) + parseFloat(data[i].y));
		points.push(p);
	}
}

async function ReadData() {
	const file = document.getElementById('csvFile').files[0];
	const reader = new FileReader();
	reader.readAsText(file);
	reader.onload = async function (e) {
		const data = await csvJSON(e.target.result);
		CreatePoints(data);

	};
}

function findLineByLeastSquares(values_x, values_y) {
	let v;
	values_y.pop();
	values_x.pop();
	let sum_x = 0;
	let sum_y = 0;
	let sum_xy = 0;
	let sum_xx = 0;
	let count = 0;

	/*
	 * We'll use those variables for faster read/write access.
	 */
	let x = 0;
	let y = 0;
	const values_length = values_x.length;

	if (values_length !== values_y.length) {
		throw new Error('The parameters values_x and values_y need to have same size!');
	}

	/*
	 * Nothing to do.
	 */
	if (values_length === 0) {
		return [[], []];
	}

	/*
	 * Calculate the sum for each of the parts necessary.
	 */
	for (v = 0; v < values_length; v++) {
		x = values_x[v];
		y = values_y[v];
		sum_x += x;
		sum_y += y;
		sum_xx += x * x;
		sum_xy += x * y;
		count++;
	}

	/*
	 * Calculate m and b for the formular:
	 * y = x * m + b
	 */
	const m = (count * sum_xy - sum_x * sum_y) / (count * sum_xx - sum_x * sum_x);
	const b = (sum_y / count) - (m * sum_x) / count;

	/*
	 * We will make the x and y result line now
	 */
	const result_values_x = [];
	const result_values_y = [];

	for (v = 0; v < values_length; v++) {
		x = values_x[v];
		y = x * m + b;
		result_values_x.push(x);
		result_values_y.push(y);
	}
	ctx.moveTo(points[0].x, points[0].y);

	let lineIndex;
	for (lineIndex = 1; lineIndex < result_values_x.length - 2; lineIndex++) {
		const xc = (result_values_x[lineIndex] + result_values_x[lineIndex + 1]) / 2;
		const yc = (result_values_y[lineIndex] + result_values_y[lineIndex + 1]) / 2;
		ctx.quadraticCurveTo(result_values_x[lineIndex], result_values_y[lineIndex], xc, yc);
		ctx.stroke();
	}
	// curve through the last two points
	ctx.quadraticCurveTo(result_values_x[lineIndex], result_values_y[lineIndex], result_values_x[lineIndex + 1], result_values_y[lineIndex + 1]);
	return [result_values_x, result_values_y];
}