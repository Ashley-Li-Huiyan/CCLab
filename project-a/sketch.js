/*
Template for IMA's Creative Coding Lab 

Project A: Generative Creatures
CCLaboratories Biodiversity Atlas 
*/

let fre1, fre2, fre3, fre4, fre5, fre6;
let x, y, Jx, Jy, H, S, B, i, j;
let sB = 50;
let accX = 0;
let accY = 0;
let speedX = 0;
let speedY = 0;
let away = 0.3;
let dHead = 100;
let dJ = 0;
let size = 1;
let moveAway = false;
let opb = 0;
let day = false;
let op = 100;

function setup() {
    let canvas = createCanvas(800, 500);
    canvas.id("p5-canvas");
    canvas.parent("p5-canvas-container");
//   createCanvas(800, 500);
  fre1 = random(0.01, 0.05);
  fre2 = random(0.03, 0.07);
  fre3 = random(0.02, 0.04);
  fre4 = random(0.07, 0.08);
  fre5 = random(0.02, 0.05);
  fre6 = random(0.01, 0.03);
  Jx = width / 2;
  Jy = height / 2;
}

function draw() {
  background(255, 10);
  dJ = dist(mouseX, mouseY, Jx, Jy);

  drawBackground();
  
  //if attack:shrink;no attack:normal or nervous
  if (mouseIsPressed) {
    if (size < 1.2 && size >= 0.1) {
      size = size - 0.01;
    }
  } else {
    if (dJ > 200) {
      Newsize2 = map(sin(frameCount * 0.03), -1, 1, 0.7, 1.2);
      size = lerp(size, Newsize2, 0.01);
    } else {
      Newsize1 = map(dJ, 0, 200, 0.5, 0.1);
      size = lerp(size, Newsize1, 0.01);
    }
  }
  
  //if mouse near, go away
  if (dJ <= size * 50) {
    accX = (mouseX - Jx) * -away;
    accY = (mouseY - Jy) * -away;
    speedX += accX;
    speedY += accY;
    moveAway = true;
  }
  if (moveAway) {
    speedX = speedX * 0.9;
    speedY = speedY * 0.9;
    Jx += speedX;
    Jy += speedY;
    //abs will convert any number into a positive number
    if (abs(speedX) < 0.0001) {
      moveAway = false;
    }
  } else {
    accX = 0;
    accY = 0;
    speedX = 0;
    speedY = 0;
    //in y it should move with sin wave, you can find the right way to move it
    r = height * noise(frameCount * 0.001);
    let newJy = r + map(sin(frameCount * 0.03), -1, 1, -100, 100);
    Jx = lerp(Jx, width * noise(frameCount * 0.001), 0.1);
    Jy = lerp(Jy, newJy, 0.1);
  }
  drawJellyfish(Jx, Jy, size);
}

function drawJellyfish(x, y, s) {
  push();
  translate(x, y);
  colorMode(HSB, 100);
  H = map(cos(frameCount * 0.01), -1, 1, 30, 70);
  S = map(sin(frameCount * 0.01), -1, 1, 80, 100);
  op = map(dJ, 50, 400, 10, 100);
  stroke(H, S, 100, op);
  scale(s);
  noFill();
  //head
  for (let dHead = 0; dHead <= 100; dHead += 10) {
    arc(0, 0, dHead, dHead, 0.75 * PI, 0.25 * PI);
  }

  //wings
  for (let angle = 0; angle <= PI; angle += PI / 6) {
    for (let dWing = 0; dWing < 35; dWing += 5) {
      push();
      let angleWing = map(sin(frameCount * 0.01), -1, 1, -0.1 * PI, 0.1 * PI);
      rotate(angleWing);
      arc(
        50 * cos(angle),
        15 + 15 * sin(angle),
        dWing,
        dWing * 1.5,
        0.8 * PI,
        0.2 * PI
      );
      pop();
    }
  }

  //feet
  drawFeet(-50, 17, 60, fre1);
  drawFeet(-30, 20, 80, fre2);
  drawFeet(-10, 25, 100, fre3);
  drawFeet(10, 25, 100, fre4);
  drawFeet(30, 20, 80, fre5);
  drawFeet(50, 17, 60, fre6);
  pop();
}

// function drawWing(){

// }

function drawFeet(p, q, Feetlength, fre) {
  push();
  noFill();
  colorMode(HSB, 100);
  H = map(cos(frameCount * 0.01), -1, 1, 30, 70);
  S = map(sin(frameCount * 0.01), -1, 1, 80, 100);
  op = map(dJ, 50, 400, 10, 100);
  stroke(H, S, 100, op);
  strokeWeight(2);
  translate(p, q);
  beginShape();
  for (let i = 0; i <= Feetlength; i += Feetlength / 18) {
    push();
    let v = sin(5 * frameCount * fre + i);
    vertex(v, i);
    pop();
  }
  endShape();
  pop();
}

function drawBackground() {
  push();
  
  colorMode(HSB, 100);
  
  if (sin(frameCount * 0.01) > 0) {
    opb = lerp(opb, 0, 0.1);
    background(0, opb);
    
    //day
    day = true;
  } else {
    opb = lerp(opb, 100, 0.01);
    background(0, opb);
    //night
    day = false;
  }

  

  for (let i = sB / 2; i < width; i += sB) {
    for (let j = sB / 2; j < width; j += sB) {
      //coral circadian rhythm
      let sB = map(noise(frameCount * 0.01 + i + 2 * j), 0, 1, 20, 55);
      let D = dist(mouseX, mouseY, i, j);
      let H = map(sB, 20, 50, 60, 40);
      let S = map(sB, 20, 50, 80, 100);
      if (day == true) {
        op = lerp(0, 100, 0.05);
        B = 100;
      } else {
        op = map(D, 0, 100, 100, 0);
        B = map(D, 0, 300, 80, 0);
      }

      // let B = map(D, 0, 300, 80, 0);
      let d = dist(Jx, Jy, i, j);
      let di = i - Jx;
      let dj = j - Jy;
      let Away = 50; //how far it will go
      let off = (Away * di) / d;
      noFill();
      stroke(H, S, B, op);
      strokeWeight(2);
      let I = lerp(i, i + off, 0.3);
      let J = lerp(j, j + off, 0.3);
      if (noise(i + 2 * j) > 0.4) {
        circle(I, J, sB);
      } else {
        rectMode(CENTER);
        rect(I, J, sB);
      }
    }
  }
  pop();
}