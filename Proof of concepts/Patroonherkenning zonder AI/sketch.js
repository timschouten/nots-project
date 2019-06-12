let x_vals = [];
let y_vals = [];

function setup() {
	let canvas = createCanvas(800, 400);
	canvas.parent('canvasContainer');
}

async function draw() {
	
	//Begin Draw chart
	background(255);
	stroke(0);
	noFill();
	strokeWeight(2);
	line(0, 0, width, 0);
	line(0, 0, 0, height);
	line(width, 0, width, height);
	line(0, height, width, height);
	line(0, height/2, width, height/2);
	//End Draw chart

	strokeWeight(8);
	for (let i = 0; i < x_vals.length; i++) {
		let px = map(x_vals[i], -1, 1, 0, width);
		let py = map(y_vals[i], -1, 1, height, 0);
		point(px, py);
	}
}