class SoundBlob {
  constructor(bx, by) {
    this.r = []; //radius
    this.R = []; //recorded value from mic
    this.n = 0; //number of circles
    //push 0 till R.length = n;
    if (this.R.length < this.n) {
      this.R.push(0);
      this.r.push(0);
    }
    //the position of one bubble
    this.bx = bx;
    this.by = by;
    this.bz = map(mouseY, 0, height, -500, 500);
    this.speedbz = random(0.01, 0.005);
    this.speed = random(0.01, 0.05);
    this.allowPlay = false;
    this.isdone = false;
    this.lifespan = 100;
  }

  displayBlob() {
    push();
    translate(this.bx, this.by, this.bz);
    rotate(frameCount * this.speed);
    colorMode(HSB, 100);

    beginShape();
    //n is the number of circles in one bubble
    //n = R.length
    for (let i = 0; i < this.n; i++) {
      let angle = map(i, 0, this.R.length, 0, 2 * PI);
      let x = 0 + this.r[i] * cos(angle);
      let y = 0 + this.r[i] * sin(angle);
      let z = sin(this.r[i] * 0.1) * 100;
      let H = map(angle, 0, 2 * PI, 0, 100);
      let S = map(angle, 0, 2 * PI, 0, 100);

      //noStroke();
      stroke(H, S, 100);
      strokeWeight(2);
      noFill();
      curveVertex(x, y, z);
    }
    endShape(CLOSE);

    for (let i = 0; i < this.n; i++) {
      let angle = map(i, 0, this.R.length, 0, 2 * PI);
      let x = 0 + this.r[i] * cos(angle);
      let y = 0 + this.r[i] * sin(angle);
      let z = sin(this.r[i] * 0.1) * 100;
      let H = map(angle, 0, 2 * PI, 0, 100);
      let S = map(angle, 0, 2 * PI, 0, 100);

      stroke(H, S, 100);
      line(0, 0, 0, x, y, z);

      noStroke();
      fill(H, S, 100);
      push();
      translate(x, y, z);
      //circle(0, 0, 5);
      pop();
      // }
    }

    pop();
  }

  recordValues() {
    //when n is updated, update R whith recordings
    if (this.R.length < this.n) {
      this.R.push(50 * level);
      this.r.push(0);
    }
  }

  updateValues() {
    // let radius = recored values
    for (let i = 0; i < this.n; i++) {
      this.r[i] = lerp(this.r[i], this.R[i], 0.5);
    }
    //movig back and forth in Z
    this.bz = map(sin(frameCount * this.speedbz), -1, 1, -500, 500);
    this.lifespan =  this.lifespan - 0.1;
    if (this.lifespan < 0) {
      this.isdone = true;
    }
  }
}
