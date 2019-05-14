/** PerceptronOLD Class
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
// tune all the weights
	train(inputs, target){
		const guess = this.guess(inputs);
		const err = target - guess;
		for(let i=0; i<this.weights.length; i++){
			this.weights[i] += err * inputs[i] * this.LR;
		}
	}

	guessY(x) {
// var m = this.weights[1] / this.weights[2];
		// var b = this.weights[2];
		// return m*x+b;
		return -(this.weights[2]/this.weights[1]) - (this.weights[0]/this.weights[1]) * x;
	}
}