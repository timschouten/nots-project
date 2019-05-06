/** Perceptron Class
 * generates random weights and bias to begin with
 * activator function to see whether it is above the line or below
 * train method that alters the weights where needed*/
class Perceptron {
	constructor() {
		this.weights = Perceptron.generateWeights(2);
		this.LR = 0.1; // learning rate
	}

	static generateWeights(lengths) {
		// Initialize randomly and appending bias weight
		const weights = [];
		const min = -1;
		const max = 1;
		for (let i = 0; i<lengths; i++){
			weights.push(Math.random() * (+max - +min) + +min)
		}
		return weights
	}
	static ActivatorFunction(n){
		if (n >= 0){
			return 1
		}else{
			return -1;
		}
	}
	guess(inputs){
		let sum = 0;
		for(let i = 0; i < this.weights.length; i++){
			sum += inputs[i]*this.weights[i];
		}
		return Perceptron.ActivatorFunction(sum);
	}
	train(inputs, target){
		const guess = this.guess(inputs);
		const err = target - guess;
		// tune all the weights
		for(let i=0; i<this.weights.length; i++){
			this.weights[i] += err * inputs[i] * this.LR;
		}
	}
}
/** Point Class
 * Initializes an point to place on screen with random values (Not bigger than canvas)
 * Label = Whether the point is above the line or below
 * */
class Point {
	constructor(){
		this.x = Math.random() * (+500 - +0) + +0;
		this.y = Math.random() * (+500 - +0) + +0;

		if (this.x > this.y){
			this.label = 1;
		}else{
			this.label = -1;
		}
	}
}

/** Generate perceptron and random points*/
const brain = new Perceptron();
const points = [];
for (let i = 0; i<100; i++) {
	points.push(new Point())
}
let trainIndex = 0;
let trainingIndex = 0;
let redCount = 0;
let finalCount = 0;

/** Function that triggers the automatic learning process */
function StartDrawing() {
	setInterval(Draw, 1000)
}
/** Method that updates the display text */
function UpdateDisplayText() {
	document.getElementById("trainIndex").innerHTML = "Training index = " + trainIndex + "\r\n" +
		"Ammount wrong = " + redCount + "/100";
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
		const inputs2 = [points[i].x, points[i].y];
		let target = points[i].label;
		const guess = brain.guess(inputs2);
		const object = points[i];
		ctx.beginPath();
		ctx.arc(object.x, object.y, 2, 0, 2 * Math.PI);
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
		const inputs = [training.x, training.y];
		target = training.label;
		brain.train(inputs, target);
		trainingIndex++;
		if (trainingIndex === points.length) {
			trainingIndex = 0;
		}
	}
}

/** Draws the points on screen with color representing if its guessed correct or not */
function Draw(){
	if (finalCount > 0) return; // stop if netwerk is trained
	trainIndex++; // amount of training iterations
	redCount = 0; // amount of wrong guesses

	//prepare canvas
	const element = document.getElementById("result");
	const ctx = element.getContext("2d");
	ctx.clearRect(0, 0, element.width, element.height);

	// draw the points on screen
	for (let i=0; i<points.length; i++){
		const object = points[i];
		ctx.beginPath();
		ctx.arc(object.x, object.y, 5, 0,2 * Math.PI);
		if (object.label === 1){
			ctx.fill();
		}
		ctx.stroke();
		ctx.beginPath();       // Start a new path
		ctx.moveTo(0, 0);    // Move the pen to (30, 50)
		ctx.lineTo(500, 500);  // Draw a line to (150, 100)
		ctx.stroke();
	}
	//Draw the color of the guess whether it was correct (green) or not (red)
	DisplayGuessCorrection(ctx);
	UpdateDisplayText();
}
/** Manually train the perceptron
 * Loop through all points and use these to alter the weights
 * */
function Train() {
	trainingIndex++;
	document.getElementById("trainIndex").innerHTML = "Training index = " + trainingIndex;
	for (let i=0;i<points.length;i++){
		const inputs2 = [points[i].x, points[i].y];
		const target = points[i].label;
		brain.train(inputs2, target);
		Draw();
	}
}