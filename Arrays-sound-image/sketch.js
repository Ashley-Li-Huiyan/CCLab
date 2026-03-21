let Sound = [];
let x = [];
let y = [];
function preload(){
  //Sound1 = loadSound("assets/my-sounds/00.mp3");
  for(let i = 1;i < 9; i ++){
  Sound.push(loadSound("assets/my-sounds/0"+i+".mp3"))
  }
}

function setup() {
  createCanvas(400, 400);
  //Sound1.loop();

  
}

function draw() {
  background(220);
  for(let i = 0;i < x.length; i ++){
  circle(x[i],y[i],50);
  }
}

function mousePressed(){
  
  x.push(mouseX);
  y.push(mouseY);
}