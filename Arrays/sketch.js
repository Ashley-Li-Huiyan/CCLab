let Cx=[];
let Cy=[];
let Cs=[];
let speedX=[];
let l = 10;
function setup() {
  createCanvas(400, 400);
  for(let i = 0; i < l; i ++){
    Cx[i] = 0;
  Cy[i] = random(height);
  Cs[i] = random(0.5,2);
  speedX[i] = map(Cs[i],0.5,2,5,0.5)
  }
  
}

function draw() {
  background(220);
  for(let i = 0; i < l;i++){
  Cx[i] += speedX[i];
  Cy[i] = Cy[i] + 10*Cs[i]*sin(frameCount*0.1);
  if(Cx[i] > width){
    Cx[i] = 0;
  }
  drawCloud(Cx[i], Cy[i], Cs[i]);
  }
  
  
}

function drawCloud(x, y, s) {
  push();
  translate(x, y);
//swing
  let angle = map(sin(frameCount * 0.05), -1, 1, PI / 4, -PI / 4)
  rotate(angle);
//size
  scale(s);
  drawArms();
  noStroke();
//body
  fill(255);
  circle(0, 0, 100);
//around body
  for (let angle = 0; angle < 2 * PI; angle += PI / 5) {
    push();
    rotate(angle);
    fill(255);
    circle(100 / 2 - 8, 0, 30);
    pop();
  }
  drawFace();
  pop();

}
function drawArms() {
  //arms
  beginShape();
  let lineLength2 = 70;
  noFill();
  for (let i = -lineLength2; i <= lineLength2; i += lineLength2 / 10) {
    strokeWeight(10);
    let v = 10 * sin(frameCount * 0.1 - i);
    vertex(i, v);
  }
  endShape();
}

function drawFace() {
  //face
  fill(0);
  circle(0 - 30, 0, 5);
  circle(0 + 30, 0, 5);
  arc(0, 0, 30, 30, 0, PI);
}

