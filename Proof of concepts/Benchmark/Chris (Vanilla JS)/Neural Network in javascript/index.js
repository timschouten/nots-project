/*
 * This is a re-write of the presentation at https://www.youtube.com/watch?v=VR043_wnHRk for javascript
 * Created by Johan Broddfelt, johbac@gmail.com
 * License: Use freely and modify as you like
 */
(function() {
	var main = document.getElementById('main');

	var randomWeight = function() {
		return Math.random();
		//return Math.random() * 2 - 1;
	};

	// Generate a color from a number, for presentation only
	var getColor = function(col) {
		col = parseInt(col*510/20) * 2;
		//console.log(col);
		var r = 0;
		if (col >= 255) { r = col-255; }
		var b = 0;
		if (col <= 255) { b = 255-col; }
		var g = ((255)-(r+b));
		return '#'+toHex(r)+toHex(g)+toHex(b); // int = parseInt(hexString, 16);

	};

	var toHex = function(num) {
		return ('0' + num.toString(16)).slice(-2);
	}

	var TransferFunctions = function() {
		this.evaluate = function(tFunc, input) {
			switch (tFunc) {
				case 'sigmoid':
					return this.sigmoid(input);
				case 'none':
				default:
					return 0.0;
			}
		};
		this.evaluateDerivative = function(tFunc, input) {
			switch (tFunc) {
				case 'sigmoid':
					return this.sigmoidDerivative(input);
				case 'none':
				default:
					return 0.0;
			}
		};

		this.sigmoid = function(x) {
			return (1/(1 + Math.pow(Math.E, -x)));
		};
		this.sigmoidDerivative = function(x) {
			return this.sigmoid(x) * (1 - this.sigmoid(x));
		};
	};

	var Gaussian = function() {
		this.getRandomGaussians = function(mean, stddev) {
			var u = 0.0, v = 0.0, s = 0.0, t = 0.0;
			while (u*u + v*v > 1 || (u===0 && v===0)) {
				u = 2*Math.random()-1;
				v = 2*Math.random()-1;
			}

			s = u*u + v*v;
			t = Math.sqrt((-2.0 * Math.log(s)) / s);

			val1 = stddev * u * t + mean;
			val2 = stddev * v * t + mean;
			return [val1, val2];
		};
		this.getRandomGaussian = function(mean, stddev) {
			if (mean === undefined) { mean = 0.0; stddev = 1.0; }
			var valArr = this.getRandomGaussians(mean, stddev);
			return valArr[0];
		};
	};

	var BackPropagationNetwork = function() {
		/* Private data */
		this.layerCount = 0;
		this.inputSize = 0;
		this.layerSize = [];
		this.transferFunction = [];

		this.layerOutput = [];
		this.layerInput = [];
		this.bias = [];
		this.delta = [];
		this.previousBiasDelta = [];

		this.weight = [];
		this.previousWeightDelta = [];

		/* Constructor */
		this.initialize = function(layerSizes, transferFunctions) {
			if (transferFunctions.length !== layerSizes.length || transferFunctions[0] !== 'none') {
				alert('Cannot construct a network with these parameters');
				javascript_abort();
			}

			// Initialize network
			this.layerCount = layerSizes.length - 1;
			this.inputSize = layerSizes[0];
			this.layerSize = [];

			for (i=0; i < this.layerCount; i++) {
				this.layerSize[i] = layerSizes[i + 1];
			}
			this.transferFunction = [];
			for (i=0; i < this.layerCount; i++) {
				this.transferFunction[i] = transferFunctions[i + 1];
			}

			// Start dimentioning arrays
			this.bias = [];
			this.previousBiasDelta = [];
			this.delta = [];
			this.layerOutput = [];
			this.layerInput = [];

			this.weight = [];
			this.previousWeightDelta = [];

			// Fill 2 dimetional arrays
			for (l=0; l<this.layerCount; l++) {
				this.bias[l] = [];
				this.previousBiasDelta[l] = [];
				this.delta[l] = [];
				this.layerOutput[l] = [];
				this.layerInput[l] = [];

				this.weight[l] = [];
				this.previousWeightDelta[l] = [];

				var size = this.layerSize[l - 1];
				if (l === 0) { size = this.inputSize; }
				for (i=0; i<size; i++) {
					this.weight[l][i] = [];
					this.previousWeightDelta[l][i] = [];
				}
			}

			// Initialize the weights
			var g = new Gaussian();
			for (l=0; l<this.layerCount; l++) {
				for (j=0; j < this.layerSize[l]; j++) {
					this.bias[l][j] = g.getRandomGaussian();
					this.previousBiasDelta[l][j] = 0.0;
					this.delta[l][j] = 0.0;
					this.layerOutput[l][j] = 0.0;
					this.layerInput[l][j] = 0.0;
				}
				var size = this.layerSize[l - 1];
				if (l === 0) { size = this.inputSize; }
				for (i=0; i<size; i++) {
					for (j=0; j<this.layerSize[l]; j++) {
						this.weight[l][i][j] = g.getRandomGaussian();
						this.previousWeightDelta[l][i][j] = 0.0;
					}
				}
			}
		};

		// Methods
		this.run = function(input) {
			if (input.length !== this.inputSize) {
				console.log('Input data is not of correct dimention.');
				javascript_abort();
			}

			var output = [];

			for (l=0; l< this.layerCount; l++) {
				for (j=0; j<this.layerSize[l]; j++) {
					var sum = 0.0;
					var size = this.layerSize[l-1];
					var inp = this.layerOutput[l - 1];
					if (l === 0) { size = this.inputSize; inp = input; }
					for (i=0; i<size; i++) {
						sum += this.weight[l][i][j] * inp[i];
					}

					sum += this.bias[l][j];
					this.layerInput[l][j] = sum;
					var t = new TransferFunctions();
					this.layerOutput[l][j] = t.evaluate(this.transferFunction[l], sum);
				}
			}

			// Copy this output to the output array
			for (i=0; i<this.layerSize[this.layerCount - 1]; i++) {
				output[i] = this.layerOutput[this.layerCount - 1][i];
			}

			return output;
		};

		this.train = function(input, desired, trainingRate, momentum) {
			// Parameter validation
			if (input.length !== this.inputSize) {
				console.log('Invalid input parameter "input": ' + input);
				javascript_abort();
			}
			if (desired.length !== this.layerSize[this.layerCount-1]) {
				console.log('Invalid input parameter "desired":' + desired);
				javascript_abort();
			}
			var error = 0.0;
			var sum = 0.0;
			var weightDelta = 0.0;
			var biasDelta = 0.0;

			var output = this.run(input);

			// Back-propagate the error
			var t = new TransferFunctions();
			for (l=this.layerCount; l>=0; l--) {
				// Output layer
				if (l === (this.layerCount - 1)) {
					for (k=0; k<this.layerSize[l]; k++) {
						this.delta[l][k] = output[k] - desired[k];
						error += Math.pow(this.delta[l][k], 2);
						this.delta[l][k] *= t.evaluateDerivative(this.transferFunction[l], this.layerInput[l][k]);
					}
				} else { // Hidden layer
					for (i=0; i<this.layerSize[l]; i++) {
						sum = 0.0;
						for (j=0; j<this.layerSize[l + 1]; j++) {
							sum += this.weight[l + 1][i][j] * this.delta[l + 1][j];
						}
						sum *= t.evaluateDerivative(this.transferFunction[l], this.layerInput[l][i]);

						this.delta[l][i] = sum;
					}
				}
			}

			// Update the weights and biases
			for (l=0; l<this.layerCount; l++) {
				var size = this.layerSize[l-1];
				var inp = this.layerOutput[l - 1];
				if (l === 0) { size = this.inputSize; inp = input; }
				for (i=0; i<size; i++) {
					for (j=0; j<this.layerSize[l]; j++) {
						weightDelta = trainingRate * this.delta[l][j] * inp[i] + momentum * this.previousWeightDelta[l][i][j];
						this.weight[l][i][j] -= weightDelta;

						this.previousWeightDelta[l][i][j] = weightDelta;
					}
				}
			}
			for (l=0; l<this.layerCount; l++) {
				for (i=0; i<this.layerSize[l]; i++) {
					biasDelta = trainingRate * this.delta[l][i];
					this.bias[l][i] -= biasDelta + momentum * this.previousBiasDelta[l][i];

					this.previousBiasDelta[l][i] = biasDelta;
				}
			}

			return error;
		};

	};

	/*
	 * Her is the code that uses the classes above
	 */

	var layerSizes = [2, 5, 5, 5, 1];
	var tFuncs = ['none', 'sigmoid', 'sigmoid', 'sigmoid', 'sigmoid'];
	// Smallest possible net. 2 inputs and 1 neuron that tries to learn
	//var layerSizes = [2, 1];
	//var tFuncs = ['none', 'sigmoid'];
	var bpn = new BackPropagationNetwork();
	bpn.initialize(layerSizes, tFuncs);

	var input = [[0,0],[0,1],[1,0],[1,1]];
	var desired = [[[0],[0],[0],[0]],
		[[1],[1],[1],[1]],
		[[0],[0],[0],[1]],
		[[0],[0],[1],[0]],
		[[0],[1],[0],[0]],
		[[1],[0],[0],[0]],
		[[1],[0],[1],[0]],
		[[0],[1],[0],[1]],
		[[0],[0],[1],[1]],
		[[0],[1],[1],[0]],
		[[1],[0],[0],[1]]];
	var output = [];
	var err = 1;
	var errGoal = 0.01;
	var maxCount = 10000;
	var count = 0;
	var maxAttempts = 2;
	var attempt = 0;
	var trainingRate = 0.15;
	var momentum = 0.10;

	var educate = function(target) {
		main = document.getElementById('training_area');
		main.innerHTML = '';
		main.innerHTML += '<strong>Training results</strong><br>';
		count = 0;
		attempt = 0;
		err = 1;
		var iterations = 0;
		bpn.initialize(layerSizes, tFuncs);

		for (it=0; it<4; it++) {
			output = bpn.run(input[it]);
			main.innerHTML += '<div style="display: inline-block; height: 20px; width: 20px; background: '
				+ getColor(10*output[0]) + '"></div> ';
		}
		var random = '';
		if (iterations === 0) {
			random = ' (random)';
		}
		main.innerHTML += ' ' + iterations + ' iterations' + random + '<br>';

		while (err > errGoal && count <= maxCount) {
			count++;
			iterations++
			err = 0.0;
			for (it=0; it<4; it++) {
				err += bpn.train(input[it], desired[target][it], trainingRate, momentum);
			}

			if (count % 250 === 0) {
				for (it=0; it<4; it++) {
					output = bpn.run(input[it]);
					main.innerHTML += '<div style="display: inline-block; height: 20px; width: 20px; background: '
						+ getColor(10*output[0]) + '"></div> ';
				}
				main.innerHTML += ' ' + iterations + ' iterations, error: ' + err.toFixed(5) + '<br>';
			}

			if (false && count % 250 === 0) {
				output = bpn.run(input[0]);
				console.log('Iteration ' + count + ' Input: ' + input[0] + ' Output: ' + output[0] + ' Error: ' + err);
				output = bpn.run(input[1]);
				console.log('Iteration ' + count + ' Input: ' + input[1] + ' Output: ' + output[0] + ' Error: ' + err);
				output = bpn.run(input[2]);
				console.log('Iteration ' + count + ' Input: ' + input[2] + ' Output: ' + output[0] + ' Error: ' + err);
				output = bpn.run(input[3]);
				console.log('Iteration ' + count + ' Input: ' + input[3] + ' Output: ' + output[0] + ' Error: ' + err);
				console.log('------');
			}
			if (count === maxCount && err > 0.01 && attempt < maxAttempts) {
				count = 0;
				bpn.initialize(layerSizes, tFuncs);
				main.innerHTML += '--- Reset random weights ---<br>';
				attempt++;
			}
		}
		for (it=0; it<4; it++) {
			output = bpn.run(input[it]);
			main.innerHTML += '<div style="display: inline-block; height: 20px; width: 20px; background: '
				+ getColor(10*output[0]) + '"></div> ';
		}
		main.innerHTML += ' ' + iterations + ' iterations, error: ' + err.toFixed(5) + '<br>';
		/*
				console.log('Error: ' + err.toFixed(5) + ' Iterations: ' + (count-1));
				output = bpn.run(input[0]);
				console.log('Input: ' + input[0] + ' Desired ' + desired[0] + ' Output: ' + output[0].toFixed(3));
				output = bpn.run(input[1]);
				console.log('Input: ' + input[1] + ' Desired ' + desired[1] + ' Output: ' + output[0].toFixed(3));
				output = bpn.run(input[2]);
				console.log('Input: ' + input[2] + ' Desired ' + desired[2] + ' Output: ' + output[0].toFixed(3));
				output = bpn.run(input[3]);
				console.log('Input: ' + input[3] + ' Desired ' + desired[3] + ' Output: ' + output[0].toFixed(3));
		*/
	};

	main.innerHTML += '<img src="33_neural_js.png" style="height: 200px;"><br>';
	main.innerHTML += '<strong>Input data (AB)</strong><br>';
	main.innerHTML += '<div style="display: inline-block; height: 20px; width: 20px; background: #ccc; text-align: center;">00</div> ';
	main.innerHTML += '<div style="display: inline-block; height: 20px; width: 20px; background: #ccc; text-align: center;">01</div> ';
	main.innerHTML += '<div style="display: inline-block; height: 20px; width: 20px; background: #ccc; text-align: center;">10</div> ';
	main.innerHTML += '<div style="display: inline-block; height: 20px; width: 20px; background: #ccc; text-align: center;">11</div><br><br> ';
	main.innerHTML += '<strong>Select goal for output (X)</strong><br>';
	for (d=0; d<desired.length; d++) {
		for (it=0; it<4; it++) {
			main.innerHTML += '<div style="display: inline-block; height: 20px; width: 20px; background: '
				+ getColor(10*desired[d][it][0]) + '"></div> ';
		}
		main.innerHTML += ' <input type="submit" class="train_btn" id="' + d + '" value="Learn" style="vertical-align: 5px;"><br>';
	}
	main.innerHTML += '<div id="training_area"></div>';
	//educate(0);
	var tBtn = document.getElementsByClassName('train_btn');
	for (btn=0; btn<tBtn.length; btn++) {
		tBtn[btn].onclick = function() { educate(this.id); };
	}

})();