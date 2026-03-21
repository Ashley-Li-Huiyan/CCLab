

let scanned = [];
let Moon = [];
let Flower = [];
let Star = [];

let curMoon = 0;
let curFlower = 0;
let curStar = 0;

let StarSize = 100;
function preload() {
  for (let i = 1; i <= 4; i++) {
    scanned.push(loadImage("0" + i + ".jpg"));
  }
}

function setup() {
  createCanvas(800, 500);

  eraseBg(scanned, 10);
  Moon = crop(scanned, 0, 10, 300, 300);
  Flower = crop(scanned, 0, 1300, 500, 320);
  Star = crop(scanned, 2200, 0, 100, 100);

}

function draw() {
  background(255);
  imageMode(CENTER);
  colorMode(HSB);
  console.log(frameCount % 4);
  
  
  
  for (let x = 0; x < width; x += 100) {
    for (let y = 0; y < height; y += 100) {
      push ();
      translate(x,y);
      
    tint(0, 0, 100);
      StarSize = map(sin(frameCount*0.1+x*y), -1,1,10,20);
      rotate(frameCount*0.01+x*y);
      let curStar = round(map(frameCount%50,1,49,0,3));
      image(Star[curStar], 0, 0,StarSize, StarSize);
      pop();
    }


  }
  
for (let i = 0; i < Flower.length; i++) {
  let Fx = noise(frameCount*0.001) * width;
  let Fy = noise(frameCount*0.001) * height+ sin(frameCount*0.1)*10;
  let D = dist(Fx,Fy,mouseX,mouseY)
    tint(334, 40, 100);
    if (D < 300){
    curFlower = round(map(sin(frameCount*0.1),-1,1,0,3))
    }else{
    curFlower = 0;
    }
    image(Flower[curFlower],Fx, Fy, 150, 100);
}
if(sin(frameCount*0.01)>0){
  tint (0,0,100);
  image(Moon[curMoon],mouseX,mouseY,200,200);
}else{
for (let i = 0; i < Moon.length; i++) {
    push ();
    translate (mouseX,mouseY);
    tint(0, 0, 100);
    //  let index = frameCount%4;
    // let angle = map(sin(frameCount*0.1),-1,1,0,2);
    rotate (frameCount*0.1);
    let curMoon = round(map(frameCount%50,1,49,0,3));
    image(Moon[curMoon], 0, 0, 200, 200);
    pop ();
  }
}
}

// You shouldn't need to modify these helper functions:

function crop(imgs, x, y, w, h) {
  let cropped = [];
  for (let i = 0; i < imgs.length; i++) {
    cropped.push(imgs[i].get(x, y, w, h));
  }
  return cropped;
}

function eraseBg(imgs, threshold = 100) {
  for (let i = 0; i < imgs.length; i++) {
    let img = imgs[i];
    img.loadPixels();
    for (let j = 0; j < img.pixels.length; j += 4) {
      let d = 255 - img.pixels[j];
      d += 255 - img.pixels[j + 1];
      d += 255 - img.pixels[j + 2];
      if (d < threshold) {
        img.pixels[j + 3] = 0;
      }
    }
    img.updatePixels();
  }
  // this function uses the pixels array
  // we will cover this later in the semester - stay tuned
}
