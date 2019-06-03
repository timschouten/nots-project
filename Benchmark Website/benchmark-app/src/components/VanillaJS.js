import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  }
}))

function VanillaJS() {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.toolbar} />
        <h1>VanillaJS</h1>
        <Typography paragraph>
          What framework shall I use for my project?
          Don't we all have the same problem when starting a new project.
          We already did the research for you and put every result on this website. You only need to choose what the best framework is that suits you.
        </Typography>
      <div className={"row"}>

      <div>
        <canvas width="1000" height="1000" id="result"></canvas>
      </div>
      </div>
      <button className={"btn btn-info"} onClick={() => Draw()}>Show first results</button>
      <button className={"btn btn-info"} onClick={() => StartDrawing()}>StartLearning</button>
      <button className={"btn btn-info"} onClick={() => Draw()}>Train</button>
      <p id="trainIndex"></p>
    </div>
  );
}
//y=mx + b
const screenHeight = 1000;
const screenWidth = 1000;
/** Perceptron Class
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
    this.lineY = Formula(this.x);
  }
  setY(y){
    this.y=y
  }
}
/** Generate perceptron and random points*/
const brain = new Perceptron();
let points = [];
for (let i = 0; i<200; i++) {
  points.push(new Point())
}
let trainIndex = 0;
let trainingIndex = 0;
let redCount = 0;
/**
 * @return {number}
 */
function Formula(x){
  return 5*x + 2
}
let finalCount = 0;
/** Function that triggers the automatic learning process */
function StartDrawing() {
  setInterval(Draw, 1000)
}
/** Method that updates the display text */
function UpdateDisplayText() {
  document.getElementById("trainIndex").innerHTML = "Training index = " + trainIndex + "\r\n" +
      "Ammount wrong = " + redCount + "/100";
  if (redCount === 0 && finalCount === 0) {
    finalCount = trainIndex;
    document.getElementById("trainIndex").innerHTML = "Neural network trained in " + finalCount + " iterations";
  }
}
/** Displays the whether the guess was correct in color
 * red = false
 * green = true
 * */
function DisplayGuessCorrection(ctx) {
  for (let i = 0; i < points.length; i++) {
    const inputs2 = [points[i].x, points[i].y, points[i].bias];
    let target = points[i].label;
    const guess = brain.guess(inputs2);
    const object = points[i];
    ctx.beginPath();
    ctx.arc(object.x, object.y, 6, 0, 2 * Math.PI);
    if (guess === target) ctx.fillStyle = "green";
    else {
      ctx.fillStyle = "red";
      redCount++;
    }
    ctx.fill();
    /** Automatic learning
     * Uses individual points to train
     * Increase training index
     * */
    const training = points[trainingIndex];
    const inputs = [training.x, training.y, training.bias];
    target = training.label;
    brain.train(inputs, target);
    trainingIndex++;
    if (trainingIndex === points.length) {
      trainingIndex = 0;
    }
  }
}

function DrawSeperationLines(ctx) {
  var beginLine = new Point()
  beginLine.setX(0);
  beginLine.setY(brain.guessY(0));
  var endLine = new Point()
  endLine.setX(screenHeight);
  endLine.setY(brain.guessY(screenHeight));
  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.moveTo(0, Formula(0));    // Move the pen to (30, 50)
  ctx.lineTo(1000, Formula(1000));  // Draw a Formula to (150, 100)
  ctx.stroke();
  ctx.beginPath();       // Start a new path
  ctx.moveTo(beginLine.x, beginLine.y);    // Move the pen to (30, 50)
  ctx.lineTo(endLine.x, endLine.y);  // Draw a Formula to (150, 100)
  ctx.stroke();
}

/** Draws the points on screen with color representing if its guessed correct or not */
function Draw(){
  if (finalCount > 0) return; // stop if netwerk is trained
  trainIndex++; // amount of training iterations
  redCount = 0; // amount of wrong guesses

  //prepare canvas
  const element = document.getElementById("result");
  const ctx = element.getContext("2d");
  ctx.clearRect(0, 0, element.width, element.height);

  // draw the points on screen
  for (let i=0; i<points.length; i++){
    const object = points[i];
    ctx.beginPath();
    ctx.arc(object.x, object.y, 10, 0,2 * Math.PI);
    if (object.label === 1){
      ctx.fill();
    }
    ctx.stroke();
  }
  DrawSeperationLines(ctx);
  DisplayGuessCorrection(ctx);
  UpdateDisplayText();
}
export default VanillaJS;
