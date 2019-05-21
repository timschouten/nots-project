/**
 * @compiler Bridge.NET 17.7.0
 */
Bridge.assembly("Demo", function ($asm, globals) {
	"use strict";

	Bridge.define("Perceptrons.PerceptronProgram", {
		main: function Main (args) {
			try {
				console.log("\nBegin Perceptron demo\n");

				var trainingData = System.Array.init(5, null, System.Array.type(System.Int32));
				trainingData[System.Array.index(0, trainingData)] = System.Array.init([0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0], System.Int32);
				trainingData[System.Array.index(1, trainingData)] = System.Array.init([1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1], System.Int32);
				trainingData[System.Array.index(2, trainingData)] = System.Array.init([0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0], System.Int32);
				trainingData[System.Array.index(3, trainingData)] = System.Array.init([1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0], System.Int32);
				trainingData[System.Array.index(4, trainingData)] = System.Array.init([1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0], System.Int32);


				console.log("Training data input is patterns for characters A-E");
				console.log("Goal is to predict patterns that represent 'B'");

				console.log("\nTraining input patterns (in row-col descriptive format):\n");
				Perceptrons.PerceptronProgram.ShowData(trainingData[System.Array.index(0, trainingData)]);
				Perceptrons.PerceptronProgram.ShowData(trainingData[System.Array.index(1, trainingData)]);
				Perceptrons.PerceptronProgram.ShowData(trainingData[System.Array.index(2, trainingData)]);
				Perceptrons.PerceptronProgram.ShowData(trainingData[System.Array.index(3, trainingData)]);
				Perceptrons.PerceptronProgram.ShowData(trainingData[System.Array.index(4, trainingData)]);

				console.log("\n\nFinding best weights and bias for a 'B' classifier perceptron");
				var maxEpochs = 1000;
				var alpha = 0.075;
				var targetError = 0.0;

				var bestBias = { v : 0.0 };
				var bestWeights = Perceptrons.PerceptronProgram.FindBestWeights(trainingData, maxEpochs, alpha, targetError, bestBias);
				console.log("\nTraining complete");

				console.log("\nBest weights and bias are:\n");
				Perceptrons.PerceptronProgram.ShowVector(bestWeights);
				console.log(System.Double.format(bestBias.v, "F3"));

				var totalError = Perceptrons.PerceptronProgram.TotalError(trainingData, bestWeights, bestBias.v);
				console.log("\nAfter training total error = " + (System.Double.format(totalError, "F4") || ""));


				var unknown = System.Array.init([0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0], System.Int32);
				console.log("\nPredicting is a 'B' (yes = 1, no = 0) for the following pattern:\n");
				Perceptrons.PerceptronProgram.ShowData(unknown);

				var prediction = Perceptrons.PerceptronProgram.Predict(unknown, bestWeights, bestBias.v);
				System.Console.Write("\nPrediction is " + prediction + " which means pattern ");
				var s0 = "is NOT recognized as a 'B'";
				var s1 = "IS recognized as a 'B'";
				if (prediction === 0) {
					console.log(s0);
				} else {
					console.log(s1);
				}

				console.log("\nEnd Perceptron demo\n");
				prompt();
			} catch (ex) {
				ex = System.Exception.create(ex);
				console.log(ex.Message);
				prompt();
			}


		},
		statics: {
			methods: {
				StepFunction: function (x) {
					if (x > 0.5) {
						return 1;
					} else {
						return 0;
					}
				},
				ComputeOutput: function (trainVector, weights, bias) {
					var dotP = 0.0;
					for (var j = 0; j < ((trainVector.length - 1) | 0); j = (j + 1) | 0) {
						dotP += (trainVector[System.Array.index(j, trainVector)] * weights[System.Array.index(j, weights)]);
					}
					dotP += bias;
					return Perceptrons.PerceptronProgram.StepFunction(dotP);
				},
				Predict: function (dataVector, bestWeights, bestBias) {
					var dotP = 0.0;
					for (var j = 0; j < dataVector.length; j = (j + 1) | 0) {
						dotP += (dataVector[System.Array.index(j, dataVector)] * bestWeights[System.Array.index(j, bestWeights)]);
					}
					dotP += bestBias;
					return Perceptrons.PerceptronProgram.StepFunction(dotP);
				},
				TotalError: function (trainingData, weights, bias) {
					var $t;
					var sum = 0.0;
					for (var i = 0; i < trainingData.length; i = (i + 1) | 0) {
						var desired = ($t = trainingData[System.Array.index(i, trainingData)])[System.Array.index(((trainingData[System.Array.index(i, trainingData)].length - 1) | 0), $t)];
						var output = Perceptrons.PerceptronProgram.ComputeOutput(trainingData[System.Array.index(i, trainingData)], weights, bias);
						sum += Bridge.Int.mul((((desired - output) | 0)), (((desired - output) | 0)));
					}
					return 0.5 * sum;
				},
				FindBestWeights: function (trainingData, maxEpochs, alpha, targetError, bestBias) {
					var $t, $t1;
					var dim = (trainingData[System.Array.index(0, trainingData)].length - 1) | 0;
					var weights = System.Array.init(dim, 0, System.Double);
					var bias = 0.05;
					var totalError = System.Double.max;
					var epoch = 0;

					while (epoch < maxEpochs && totalError > targetError) {
						for (var i = 0; i < trainingData.length; i = (i + 1) | 0) {
							var desired = ($t = trainingData[System.Array.index(i, trainingData)])[System.Array.index(((trainingData[System.Array.index(i, trainingData)].length - 1) | 0), $t)];
							var output = Perceptrons.PerceptronProgram.ComputeOutput(trainingData[System.Array.index(i, trainingData)], weights, bias);
							var delta = (desired - output) | 0;

							for (var j = 0; j < weights.length; j = (j + 1) | 0) {
								weights[System.Array.index(j, weights)] = weights[System.Array.index(j, weights)] + (alpha * delta * ($t1 = trainingData[System.Array.index(i, trainingData)])[System.Array.index(j, $t1)]);
							}

							bias = bias + (alpha * delta);
						}

						totalError = Perceptrons.PerceptronProgram.TotalError(trainingData, weights, bias);
						epoch = (epoch + 1) | 0;
					}
					bestBias.v = bias;
					return weights;
				},
				ShowVector: function (vector) {
					for (var i = 0; i < vector.length; i = (i + 1) | 0) {
						if (i > 0 && i % 4 === 0) {
							console.log("");
						}
						System.Console.Write((System.Double.format(vector[System.Array.index(i, vector)], "+0.000;-0.000") || "") + " ");
					}
					console.log("");
				},
				ShowData: function (data) {
					for (var i = 0; i < 20; i = (i + 1) | 0) {
						if (i % 4 === 0) {
							console.log("");
							System.Console.Write(" ");
						}
						if (data[System.Array.index(i, data)] === 0) {
							System.Console.Write(" ");
						} else {
							System.Console.Write("1");
						}
					}
					console.log("");
				}
			}
		}
	});
});
