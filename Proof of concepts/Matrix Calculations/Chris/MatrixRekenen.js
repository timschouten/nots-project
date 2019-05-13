function getCol(matrix, col){
	const column = [];
	for(var i=0; i<matrix.length; i++){
		column.push(matrix[i][col]);
	}
	return column;
}

var array2 = [
	[4,6,3,4],
	[4,2,1,3],
	[4,6,9,3],
	[4,6,9,3]
];
var array = [
	[1,5,8,4],
	[1,5,8,4],
	[1,5,8,4],
	[4,3,2,4]
];
//first row * first collom
//first row * second collom
//etc
//second row * first collum
//		console.log("Result " + multiplyResult + "Total " + resultNumber)
//second row * second collum
function ShowStepsTaken(stepsTaken) {
	var element = document.getElementById("stepsTaken");
	stepsTaken.forEach((step,stepIndex) => {
		var para = document.createElement("p");
		var node = document.createTextNode(stepIndex + ". " + step);
		para.appendChild(node);
		element.appendChild(para);
	})
}

//etc
function CalculateMatrix() {
	var resultArray = [[], [], [], []];
	var stepsTaken =[];
	array.forEach((row, i) => {
		array.forEach((item, columIndex) => {
			var colom = getCol(array2, columIndex);
			var resultNumber = 0;
			row.forEach((number, index) => {
				resultNumber +=  number * colom[index];
				stepsTaken.push("Equation: " + number + "*" + colom[index] + "= " + resultNumber);
				console.log("Equation: " + number + "*" + colom[index] + "= " + resultNumber)
			});
			stepsTaken.push("final number : " +resultNumber);
			resultArray[i].push(resultNumber);
		})
	});
	ShowResults(resultArray)
	ShowStepsTaken(stepsTaken);
}
function LoadHTMLTable(){
	var table = document.getElementById("array1Table");
	array.forEach((row, rowIndex) => {
		var createdRow = table.insertRow(rowIndex);
		row.forEach((number, numberIndex) =>{
			var cell1 = createdRow.insertCell(numberIndex);
			cell1.innerHTML = number;
		})
	});

	table = document.getElementById("array2Table");
	array2.forEach((row, rowIndex) => {
		var createdRow = table.insertRow(rowIndex);
		row.forEach((number, numberIndex) =>{
			var cell1 = createdRow.insertCell(numberIndex);
			cell1.innerHTML = number;
		})
	})
}

function ShowResults(resultArray){
	var table = document.getElementById("resultsTable");
	resultArray.forEach((row, rowIndex) => {
		var createdRow = table.insertRow(rowIndex);
		row.forEach((number, numberIndex) =>{
			var cell1 = createdRow.insertCell(numberIndex);
			cell1.innerHTML = number;
		})
	})
}