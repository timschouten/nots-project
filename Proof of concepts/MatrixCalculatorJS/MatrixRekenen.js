function getCol(matrix, col){
	const column = [];
	for(var i=0; i<matrix.length; i++){
		column.push(matrix[i][col]);
	}
	return column;
}

var array = [[4,6], [2,1],[6,9]];
var array2 = [[1,5,8], [4,3,2],[7,6,5]];
//first row * first collom
//first row * second collom
//etc
//second row * first collum
//		console.log("Result " + multiplyResult + "Total " + resultNumber)
//second row * second collum
//etc
function CalculateMatrix() {
	var resultArray = [[], [], []];
	array.forEach((row, i) => {
		array.forEach((item, runAmount) => {
			var colom = getCol(array2, runAmount);
			var resultNumber = 0;
			row.forEach((number, index) => {
				resultNumber +=  number * colom[index];
				console.log("Equation: " + number + "*" + colom[index] + "= " + resultNumber)
			});
			resultArray[i].push(resultNumber);
		})
	});
	ShowResults(resultArray)
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