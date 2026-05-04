let cloud = [];
let rain = [];
let thunder;
function preload(){
  thunder = loadSound("thunder.mp3")
}
function setup() {
  createCanvas(400, 400);
}

function mousePressed() {
  cloud.push(new Cloud(mouseX, mouseY, random(0.5, 1)));
}
function draw() {
  background(220);
  // if (mouseIsPressed) {
  //   rain.push(new Rain(mouseX, mouseY));
  // }
  for (let i = 0; i < cloud.length; i++) {
    for (let j = 0; j < cloud.length; j++) {
      cloud[i].update();
      cloud[i].display();
      if (i != j) {
        cloud[i].checkDist(cloud[j]);
      }
    }
    if (cloud[i].Crashed) {
        rain.push(new Rain(cloud[i].x, cloud[i].y, cloud[i].H));
      }
     if (cloud[i].OUT) {
        cloud.splice(i, 1);
      }
  }
  for (let i = 0; i < rain.length; i++) {
    rain[i].updateRain();
    rain[i].displayRain();
    if (rain[i].OUT) {
      rain.splice(i, 1);
    }
  }
}




