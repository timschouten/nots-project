let xmin = 0;
let xmax = 0;
		
async function run() {
	var file = document.getElementById('csvFile').files[0];
	var reader = new FileReader();
	reader.readAsText(file);
	reader.onload = async function(e) {
		var jsonData = [];
		jsonData = await csvJSON(e.target.result);  
		
		let steps = getSteps(jsonData);
		console.log(steps);
		
		$("#stepCount").text("" + steps.length);
		
		let amount = 0;
		
		for(let i = 0; i < steps.length; i++){
			if(steps[i].length > amount){
				amount = steps[i].length;
			}
		}
		
		for(let i = 0; i < jsonData.length; i++){
			let x = parseFloat(jsonData[i].x);
			if(x < xmin){
				xmin = x;
			} else if(x > xmax){
				xmax = x;
			}
		}
		
		for(let k = 0; k < steps.length; k++){
			for(let i = 0; i < amount; i++){
				if(steps[k].length > i){
					x_vals.push(map(i*(width/amount), 0, width, -1, 1));
					let y = map(parseFloat(steps[k][i].x), xmin, xmax, 0, height);
					y_vals.push(map(y, 0, height, -1, 1));
				}
			}
		}
	};
  
}

async function csvJSON(csv){
	var lines=csv.split("\n");
	var result = [];
	var headers=lines[0].split(";");

	for(var i=1;i<lines.length;i++){
		var obj = {};
		var currentline=lines[i].split(";");
		for(var j=0;j<headers.length;j++){
			obj[headers[j]] = String(currentline[j]).replace("	", ".");
		}		
		result.push(obj);
	}

	return result;
}

function getSteps(data) {
	let total = [];
	let current = [];
	let counting = false;
	for(let i = 0; i < data.length - 4; i++){
		let x = parseFloat(data[i].x);
		let nextX = parseFloat(data[i+1].x);	
		
		current.push(data[i]);
		
		if(counting){
			if(Math.abs(parseFloat(data[i].x) - parseFloat(data[i+1].x)) < 10 
			&& Math.abs(parseFloat(data[i+1].x) - parseFloat(data[i+2].x)) < 10 
			&& Math.abs(parseFloat(data[i+2].x) - parseFloat(data[i+3].x)) < 10 
			&& Math.abs(parseFloat(data[i+3].x) - parseFloat(data[i+4].x)) < 10) {
				counting = false;
				total.push(current);
				current = [];
			}
		} else {
			if(Math.abs(parseFloat(data[i].x) - parseFloat(data[i+1].x)) >= 10) {
				counting = true;
			}
		}
		
		
	}
	return total;
}



$(document).ready(function () {
    $("#laden").on("click", function () {
		run();
    });
});

particlesJS("particles-js", {
    "particles": {
        "number": {"value": 80, "density": {"enable": true, "value_area": 800}},
        "color": {"value": "#ffffff"},
        "shape": {
            "type": "circle",
            "stroke": {"width": 0, "color": "#000000"},
            "polygon": {"nb_sides": 5},
            "image": {"src": "img/github.svg", "width": 100, "height": 100}
        },
        "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {"enable": false, "speed": 1, "opacity_min": 0.1, "sync": false}
        },
        "size": {"value": 3, "random": true, "anim": {"enable": false, "speed": 40, "size_min": 0.1, "sync": false}},
        "line_linked": {"enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1},
        "move": {
            "enable": true,
            "speed": 4,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {"enable": false, "rotateX": 600, "rotateY": 1200}
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {"enable": true, "mode": "repulse"},
            "onclick": {"enable": true, "mode": "push"},
            "resize": true
        },
        "modes": {
            "grab": {"distance": 400, "line_linked": {"opacity": 1}},
            "bubble": {"distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3},
            "repulse": {"distance": 150, "duration": 0.4},
            "push": {"particles_nb": 4},
            "remove": {"particles_nb": 2}
        }
    },
    "retina_detect": true
});