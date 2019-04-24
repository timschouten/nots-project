$(document).ready(function() {
	$("#uitrekenen").on("click", function() {
		let x1 = $("#matrix1-x").val();
		let y1 = $("#matrix1-y").val();
		let x2 = $("#matrix2-x").val();
		let y2 = $("#matrix2-y").val();

		console.log("Click");

		if(x1 === y2 || x1 !== "" || x2 !== "" || y1 !== "" || y2 !== "") {
			let arr1 = [];
			let ri1 = 1;
			for (let y = 0; y < y1; y++) {
				arr1[y] = [];
				for (let x = 0; x < x1; x++) {
					arr1[y][x] = $("#matrix1-" + ri1).val();
					ri1++;
				}
			}

			let arr2 = [];
			let ri2 = 1;
			for (let y = 0; y < y2; y++) {
				arr2[y] = [];
				for (let x = 0; x < x2; x++) {
					arr2[y][x] = $("#matrix2-" + ri2).val();
					ri2++;
				}
			}

			let length = x1;

			let ri = 1;
			for (let i = 0; i < arr1.length; i++) {
				for (let x = 0; x < arr2[0].length; x++) {
					let result = 0;
					for (let z = 0; z < length; z++) {
						result += arr1[i][z] * arr2[z][x];
					}
					$("#result-" + ri).val(result);
					ri++;
				}
			}
		}
	});
	$("#matrix1-x,#matrix1-y,#matrix2-x,#matrix2-y").on("keyup", () => {
		let x1 = $("#matrix1-x").val();
		let y1 = $("#matrix1-y").val();
		let x2 = $("#matrix2-x").val();
		let y2 = $("#matrix2-y").val();

		if(x1 !== y2 || x1 === "" || x2 === "" || y1 === "" || y2 === "") {
			$("#uitrekenen").attr("disabled", true);
		} else {
			$("#uitrekenen").removeAttr("disabled");

			$("#result").empty();

			let ri = 1;
			for(let r = 0; r < y1; r++){
				let columns = "";
				for(let c = 0; c < x2; c++){
					columns += "<td><input type=\"text\" id=\"result-" + ri + "\" disabled/></td>";
					ri++;
				}
				$("#result").append("<tr>" + columns + "</tr>");
			}
		}

	});
	$("#matrix1-x,#matrix1-y").on("keyup", () => {
		let x = $("#matrix1-x").val();
		let y = $("#matrix1-y").val();
		if(x !== "" && y !== ""){
			$("#matrix1").empty();

			let ri = 1;
			for(let r = 0; r < y; r++){
				let columns = "";
				for(let c = 0; c < x; c++){
					columns += "<td><input type=\"text\" id=\"matrix1-" + ri + "\"/></td>";
					ri++;
				}
				$("#matrix1").append("<tr>" + columns + "</tr>");
			}

		}
	});
	$("#matrix2-x,#matrix2-y").on("keyup", () => {
		let x = $("#matrix2-x").val();
		let y = $("#matrix2-y").val();
		if(x !== "" && y !== ""){
			$("#matrix2").empty();

			let ri = 1;
			for(let r = 0; r < y; r++){
				let columns = "";
				for(let c = 0; c < x; c++){
					columns += "<td><input type=\"text\" id=\"matrix2-" + ri + "\"/></td>";
					ri++;
				}
				$("#matrix2").append("<tr>" + columns + "</tr>");
			}

		}
	});
});