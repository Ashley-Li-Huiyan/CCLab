let b = []; //bubbles
let mic;
let level = 0;
let counter = []; //timer for recording
let index = 0; //counter index
let allowPlay = []; //allow sound to play
let d = []; //d between mouse and
let z = 0; //asign a value
let handPose;
let phand;
let video;
let hands = [];
let options = { maxHands: 1, flipped: true };
let rightbutton = false;
let cam;
let notes = [
  261.63, // C4
  293.66, // D4
  329.63, // E4
  349.23, // F4
  392.0, // G4
  440.0, // A4
  493.88, // B4
  523.25, // C5
  587.33, // D5
  659.25, // E5
  698.46, // F5
  783.99, // G5
  880.0, // A5
  987.77, // B5
  1046.5, // C6
  1174.66, // D6
  1318.51, // E6
  1396.91, // F6
  1567.98, // G6
  1760.0, // A6
  1975.53, // B6
  2093.0, // C7
];
let isPlaying = false;
let mysound;

function preload() {
  handPose = ml5.handPose(options);
  myFont = loadFont('times/times.TTF');
  mysound = loadSound("Nocturnes.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  cam = createCamera();
  //setting up the mic
  mic = new p5.AudioIn();
  mic.start();
  video = createCapture(VIDEO);
  video.size(windowWidth, windowHeight);
  video.hide();
  // Start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);
}

// Callback function for when handPose outputs data
function gotHands(results) {
  // Save the output to the hands variable
  hands = results;
}

function draw() {
  background(0);
  // Enable orbiting with the mouse.
  orbitControl();
  z = cam.eyeZ;
  //hands
  push();
  translate(-width / 2, -height / 2);
  //text
  textFont(myFont);
  fill(255);
  textSize(16);
  text("press the right button to create a memory",0,50);
  text("put your hand near to replay it",0,70);
  // Draw all the tracked hand points
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    phand = hand.keypoints[9];
    fill(255);
    beginShape();
    curveVertex(phand.x, phand.y-10);
    curveVertex(phand.x-5, phand.y);
    curveVertex(phand.x-10, phand.y+10);
    curveVertex(phand.x, phand.y+10);
    curveVertex(phand.x+10, phand.y+10);
    curveVertex(phand.x+5, phand.y);
    endShape(CLOSE);
    //circle(phand.x, phand.y, 50);
  }
  //stars
  for (let i = 0; i < width; i += 10) {
    for (let j = 0; j < height; j += 10) {
      if (noise(i*j+i+j) > 0.8) {
        push();
        let cz = map(sin(frameCount * 0.01), -1, 1, -50, 50);
        let op = map(cos(frameCount * 0.1), -1, 1, 100, 200);
        translate(i, j, cz);
        noStroke();
        fill(255, 255, 255, op);
        circle(i, j, 5);
        pop();
      }
    }
  }
  pop();
  //bubble
  push();
  translate(-width / 2, -height / 2);

  //console.log(counter);
  level = map(mic.getLevel(), 0, 1, 1, 10);
  //each bubble record and display
  for (let i = 0; i < b.length; i++) {
    b[i].recordValues();
    b[i].updateValues();
    b[i].displayBlob();
    if (hands.length > 0) {
      d[i] = dist(b[i].bx, b[i].by, b[i].bz, phand.x, phand.y, b[i].bz);
    }else{
       d[i] = 500;
    }

    console.log(d[i]);
    //console.log(d[0]);
    if (d[i] < 100 && b[i].allowPlay) {
      b[i].playBlob();

    } else if (d[i] > 100 && b[i].allowPlay == false) {
      b[i].allowPlay = true;
    }

    if (b[i].isdone == true) {
      b.splice(i, 1);
      index = index - 1;
    }
  } //b for loop ends

  if (mouseIsPressed && mouseButton == RIGHT) {
    //each bubble has its own counter
    //number of circles depends on its counter
    for (let i = 0; i < b.length; i++) {
      b[i].n = counter[i];
    }
    counter[index]++; //n of the current bubble ++
  } //mouse is pressed ends
  pop();

  if (keyIsPressed){
    if(key === "a" || key === "A" && mysound.isPlaying()==false){
      mysound.play();
    }
  }
} // draw ends

//each time I click, push one bubble and its counter
function mousePressed() {
  if (mouseButton == RIGHT) {
    b.push(new SoundBlob(mouseX, mouseY));
    counter.push(0);
    //console.log("mouse pressed");
    rightbutton = true;
  }
}
//when I release,update n for next bubble
function mouseReleased() {
  if (rightbutton == true && b.length > 0) {
    b[index].allowPlay = true;
    index++;
    // console.log("mouse released");
    rightbutton = false;
  }
}
