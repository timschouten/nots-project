/** Point Class
 * Initializes an point to place on screen with random values (Not bigger than canvas)
 * Label = Whether the point is above the Formula or below
 * */
class Point {
	constructor(){
		this.x = Math.random() * (+1000 - +0) + +0;
		this.y = Math.random() * (+1000 - +0) + +0;
		this.lineY = Formula(this.x);

		this.bias = 1;
		if (this.y > this.lineY){
			this.label = 1;
		}else{
			this.label = -1;
		}
	}
	setX(x){
		this.x = x;
	}
	setY(y){
		this.y=y
	}
}