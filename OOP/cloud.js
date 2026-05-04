class Cloud {
  //constructor is like the setup
  constructor(x,y,s) {
    this.x = x;
    this.y = y;
    this.x0 = this.x;
    this.y0 = this.y;
    this.s = s;
    this.speed = 0;
    this.OUT = false;
    this.H = random(0,100);
    this.sound = thunder;
    this.Crashed = false;
  }
  //detect collision
  checkDist(other){
    let d = dist(this.x, this.y, other.x,other.y);
    if(d < (this.s+other.s)*50){
      console.log("boom!");
      this.H = random(100);
      this.Crashed = true;
      if(this.sound.isPlaying()==false){
      this.sound.play();
    }
    }else{
       this.Crashed = false;
    }
  }
  //what it will draw the cloud
  display() {
    push();
    translate(this.x, this.y);
    scale(this.s);
    colorMode(HSB,100);
    this.drawRightArm();
    this.drawLeftArm();
    noStroke();
    //body
    fill(this.H,50,100);
    circle(0, 0, 100);
    //circles around
    for (let a = 0; a < 2 * PI; a += PI / 6) {
      push();
      rotate(a);
      circle(50, 30, 50);
      pop();
    }
    //eyes
    fill(0);
    circle(-30, 0, 5);
    circle(30, 0, 5);
    arc(0, 0, 30, 30, 0, PI);
    pop();
  }
  //updating the variables
  update() {
    //this.y = noise(frameCount * 0.01) * height;
    this.speed = map(this.s,0.5,1,10,1);
    this.x = this.x + this.speed;
    console.log(this.speed);
    if(this.x > width){
       this.OUT = true
    }
  }
   drawRightArm() {
    //Right arm
    push();
    beginShape();
    let lineLength = 110;
    noFill();
    for (let i = 0; i <= lineLength; i += lineLength / 20) {
      strokeWeight(10);
      let v = 15 * sin(frameCount * 0.1 - i / 20);
      vertex(i, v);
    }
    endShape();
    pop();
  }
  
  drawLeftArm() {
    //Left arm
    push();
    scale(-1,1);  //this is like a mirror!
    beginShape();
    let lineLength = 110;
    noFill();
    for (let i = 0; i <= lineLength; i += lineLength / 20) {
      strokeWeight(10);
      let v = 15 * sin(frameCount * 0.1 - i / 20);
      vertex(i, v);
    }
    endShape();
    pop();
  }
}
