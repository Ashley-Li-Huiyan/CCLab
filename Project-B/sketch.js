let b = []; //bubbles
let mic;
let level = 0;
let counter = []; //timer for recording
let index = 0; //counter index
let sound;
let allowPlay = []; //allow sound to play
let d = []; //d between mouse and
let z = 0; //asign a value
let handPose;
let video;
let hands = [];
let options = { maxHands: 1, flipped: false };
let rightbutton = false;
let cam;

function preload() {
  sound = loadSound("Sound.mp3");
  handPose = ml5.handPose(options);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  cam = createCamera(); 
  //setting up the mic
  mic = new p5.AudioIn();
  mic.start();
  video = createCapture(VIDEO);
  video.size(640, 480);
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
  // Enable orbiting with the mouse.
  orbitControl();
  z = cam.eyeZ;
  //hands
  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);
  // Draw all the tracked hand points
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];
      fill(0, 255, 0);
      noStroke();
      circle(keypoint.x, keypoint.y, 10);
    }
  }
  pop();
  //bubble
  push();
  translate(-width / 2, -height / 2);
  background(0);
  //console.log(counter);
  level = map(mic.getLevel(), 0, 1, 1, 10);
  //each bubble record and display
  for (let i = 0; i < b.length; i++) {
    b[i].recordValues();
    b[i].updateValues();
    b[i].displayBlob();
    d[i] = dist(b[i].bx, b[i].by, b[i].bz, mouseX, mouseY,b[i].bz);
    //console.log(d[0]);
    if (d[i] < 100 && sound.isPlaying() == false && b[i].allowPlay == true) {
      sound.play();
    }
    if (b[i].isdone == true) {
      b.splice(i, 1);
    }
    // for (let i = 0; i < b.length; i++) {
    //   if (i > 10) {
    //     b.splice(i, 1);
    //   }
    // }
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
} // draw ends

//each time I click, push one bubble and its counter
function mousePressed() {
  if (mouseButton == RIGHT) {
    b.push(new SoundBlob(mouseX, mouseY));
    counter.push(0);
    console.log("mouse pressed");
    rightbutton = true;
  }
}
//when I release,update n for next bubble
function mouseReleased() {
  if (rightbutton == true && b.length > 0) {
    b[index].allowPlay = true;
    index++;
    console.log("mouse released");
    rightbutton = false;
  }
}
