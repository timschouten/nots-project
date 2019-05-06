class Perceptron {
	constructor(bias=1,learningRate=0.1,weights=[]) {
		this.bias = bias;
		this.learningRate = learningRate;
		this.weights = weights;
		this.trainingSet = [];
	}

	init(inputs,bias=this.bias) {
		// Initialize randomly and appending bias weight
		this.weights = [...inputs.map(i => Math.random()), bias];
	}

	adjustWeights(inputs,expected) {
		// ...
		const actual = this.evaluate(inputs);
		if (actual == expected) return true; // Correct weights, return and don't touch anything.

		// Otherwise update each weight by adding the error * learningRate relative to the input
		this.weights = this.weights.map((w,i) => w += this.delta(actual, expected,inputs[i]));
		// ...
	}

	// Calculates the difference between actual and expected for a given input
	delta(actual, expected, input,learningRate=this.learningRate) {
		const error = expected - actual; // How far off were we
		return error * learningRate * input;
	}

	// Sum inputs * weights
	weightedSum(inputs=this.inputs,weights=this.weights) {
		return inputs.map((inp,i) => inp * weights[i]).reduce((x,y) => x+y,0);
	}

	// Evaluate using the current weights
	evaluate(inputs) {
		return this.activate(this.weightedSum(inputs));
	}

	// Heaviside as the activation function
	activate(value) {
		return value >= 0 ? 1 : 0;
	}
}

function showResults() {
	var element = document.getElementById("result")
	const p1 = new Perceptron();
	var input = [1,1,1,1,1,1,1,1,1];
	p1.init(input);
	p1.adjustWeights(input);
	element.innerHTML = p1.evaluate([4,6,2,7,1,2,3,5,3]);
}
