/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new Ashley(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class Ashley {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.Hx = 0;
    this.Hy = 0;
    this.Lx = -90;
    this.Ly = 0;
    this.Rx = 90;
    this.Ry = 0;
    this.Haty = -30;
  }
  update() {
    this.Hx = 0 + 70 * cos(frameCount * 0.01);
    this.Hy = 0 + 20 * sin(frameCount * 0.05);
    // this.Lx =
    this.Ly = 10 * sin(frameCount * 0.1) + noise(frameCount * 0.05) * 20;
    // this.Rx =
    this.Ry = 10 * sin(frameCount * 0.1) + noise(frameCount * 0.05) * 20;
    this.Haty = -40 + sin(frameCount * 0.1) * 10;
  }
  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y);
    this.DrawHatter(this.Hx, this.Hy);
    // ******** //
    // ⬇️ draw your dancer from here ⬇️



    pop();

  }
  DrawHatter(Hx, Hy) {
    push();
    translate(Hx, Hy);
    let s = map(sin(frameCount * 0.1), -1, 1, 0.5, 1);
    scale(s);
    //face
    push();
    colorMode(HSB, 100);
    noStroke();
    fill(50, 0, 100, 50);
    circle(0, -10, 120);
    pop();
    //glasses and hat

    this.DrawGlasses(0, -10);
    this.DrawHat(0, this.Haty);
    this.DrawMouth(0, 20);
    this.DrawLeftArm(this.Lx, this.Ly);
    this.DrawRightArm(this.Rx, this.Ry);
    pop();
  }

  DrawGlasses(p, q) {
    push();
    colorMode(HSB, 100);
    translate(p, q);
    noStroke();
    fill(100, 100, 0);
    beginShape();
    vertex(-50, -10);
    vertex(-50, 20);
    vertex(-10, 20);
    vertex(-10, 0);
    vertex(10, 0);
    vertex(10, 20);
    vertex(50, 20);
    vertex(50, -10);
    endShape();
    pop();
  }
  DrawHat(a, b) {
    push();
    colorMode(HSB, 100);
    translate(a, b);
    rectMode(CENTER);
    noStroke();
    fill(100, 1, 33);
    rect(0, -5, 150, 15);
    rect(0, -35, 100, 50);
    pop();
  }
  DrawMouth(c, d) {
    push();
    translate(c, d);
    strokeWeight(1);
    stroke(255, 255, 255);
    fill(255, 255, 255);
    arc(0, 0, 70, 50, 0, PI);
    stroke(0, 0, 0);
    strokeWeight(3)
    line(-25, 0, -25, 18);
    line(0, 0, 0, 25);
    line(25, 0, 25, 18);

    pop();
  }
  DrawLeftArm(e, f) {
    push();
    translate(e, f);
    //rectMode(CENTER);
    let angle = sin(frameCount * 0.1) * 0.15 * PI;
    if (sin(frameCount * 0.01) > 0) {
      rotate(PI * 0.6 - angle);
    } else {
      rotate(-(PI * 0.6 + angle));
    }
    fill(255, 255, 255);
    rect(0, 0, 30, 70);
    fill(0, 0, 0);
    rect(0, 0, 30, 60);
    fill(130, 127, 127);
    beginShape();
    vertex(0, 70);
    vertex(0, 100);
    vertex(5, 100);
    vertex(10, 80);
    vertex(15, 100);
    vertex(20, 100);
    vertex(25, 80);
    vertex(30, 75);
    vertex(30, 70);
    endShape();
    pop();
  }
  DrawRightArm(g, h) {
    push();
    translate(g, h);
    //rectMode(CENTER);
    let angle = sin(frameCount * 0.1) * 0.15 * PI;
    if (sin(frameCount * 0.01) > 0) {
      rotate(PI * 0.3 + angle);
    } else {
      rotate(-(PI * 0.6 + angle));
    }
    fill(255, 255, 255);
    rect(0, 0, 30, 70);
    fill(0, 0, 0);
    rect(0, 0, 30, 60);
    fill(130, 127, 127);
    beginShape();
    vertex(0, 70);
    vertex(0, 100);
    vertex(5, 100);
    vertex(10, 80);
    vertex(15, 100);
    vertex(20, 100);
    vertex(25, 80);
    vertex(30, 75);
    vertex(30, 70);
    endShape();
    pop();
  }




  // ⬆️ draw your dancer above ⬆️
  // ******** //

  // the next function draws a SQUARE and CROSS
  // to indicate the approximate size and the center point
  // of your dancer.
  // it is using "this" because this function, too, 
  // is a part if your Dancer object.
  // comment it out or delete it eventually.
  //this.drawReferenceShapes()


  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/