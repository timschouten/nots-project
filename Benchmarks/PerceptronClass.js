class Perceptron {
	constructor() {
		this.weights = this.generateWeights(2);
		this.LR = 0.1;
		console.log(this.weights)
	}

	generateWeights(lengths) {
		// Initialize randomly and appending bias weight
		var weights = [];
		var min=-1;
		var max=1;
		for (var i = 0; i<lengths; i++){
			weights.push(Math.random() * (+max - +min) + +min)
		}
		return weights
	}
	ActivatorFunction(n){
		if (n >= 0){
			return 1
		}else{
			return -1;
		}
	}
	guess(inputs){
		var sum = 0;
		for(var i = 0; i < this.weights.length; i++){
			sum += inputs[i]*this.weights[i];
		}
		var output = this.ActivatorFunction(sum);
		return output;
	}
	train(inputs, target){
		var guess = this.guess(inputs);
		var err = target - guess;
		// tune all the weights
		for(var i=0; i<this.weights.length;i++){
			this.weights[i] += err * inputs[i] * this.LR;
		}
	}
}
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
	show(){
		if (this.label === 1){
			this.color = "Green";
		}else{
			this.color = "Red";
		}
		return{x:this.x, y: this.y, label:this.label, color:this.color}
	}
}
var brain = new Perceptron();
var points = [];
for (var i = 0; i<100; i++) {
	points.push(new Point())
}
//Draw();
var trainIndex = 0;
var trainingIndex = 0;
function StartDrawing() {
	setInterval(Draw, 1000)
}
function Draw(){
	trainIndex++;
	document.getElementById("trainIndex").innerHTML = "Training index = " + trainIndex
	var element = document.getElementById("result");
	var ctx = element.getContext("2d");
	ctx.clearRect(0, 0, element.width, element.height);
	for (var i=0;i<points.length;i++){
		var object = points[i].show();
		ctx.beginPath();
		ctx.arc(object.x, object.y, 5, 0,2 * Math.PI);
		if (object.color === "Green"){
			ctx.fill();
		}
		ctx.stroke();
		ctx.beginPath();       // Start a new path
		ctx.moveTo(0, 0);    // Move the pen to (30, 50)
		ctx.lineTo(500, 500);  // Draw a line to (150, 100)
		ctx.stroke();
	}
	for (i=0;i<points.length;i++){
		var inputs2 = [points[i].x, points[i].y];
		var target = points[i].label;

		//brain.train(inputs2, target);
		var guess = brain.guess(inputs2);
		object = points[i].show();
		ctx.beginPath();
		ctx.arc(object.x, object.y, 2, 0,2 * Math.PI);
		if (guess === target) ctx.fillStyle = "green";
		else ctx.fillStyle = "red";
		ctx.fill()
		var training = points[trainingIndex];
		var inputs2 = [training.x, training.y];
		var target = training.label;
		brain.train(inputs2, target);
		trainingIndex++;
		if (trainingIndex === points.length){
			trainingIndex = 0;
		}
	}
}
function Train() {
	trainingIndex++;
	document.getElementById("trainIndex").innerHTML = "Training index = " + trainingIndex
	for (i=0;i<points.length;i++){
		var inputs2 = [points[i].x, points[i].y];
		var target = points[i].label;
		brain.train(inputs2, target);
		Draw();
	}
}