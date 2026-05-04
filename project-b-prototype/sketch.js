let r = [];
let R = [];
let mic;
let level = 0;
function setup() {
  createCanvas(400, 400);
  mic = new p5.AudioIn();
  mic.start();
  for (let i = 0; i < 10; i++) {
    r.push(0);
    R.push(0);
  }
}

function draw() {
  background(220);
  level = map(mic.getLevel(), 0, 1, 1, 10);
  if (R.length == 10) {
    R.splice(0, R.length);
  }
  noFill();
  beginShape();
  for (let i = 0; i < 10; i++) {
    let angle = map(i, 0, 10, 0, 2 * PI);
    let x = width / 2 + r[i] * cos(angle);
    let y = height / 2 + r[i] * sin(angle);
    curveVertex(x, y);

  }
  endShape(CLOSE);

  if (R.length < 10) {
    R.push(50 * level);
  }


  if (R.length == 10) {
    for (let i = 0; i < 10; i++) {
      r[i] = lerp(r[i], R[i], 0.5);
    }
  }

}



