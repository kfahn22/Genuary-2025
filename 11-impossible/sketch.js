// https://github.com/kfahn22/Buckyball/tree/main

let buckyball;
let images = [];
let frames = 120;
let angle = 0;
let font;

function keyPressed() {
  if (key == "s") {
    const options = {
      units: "frames",
      delay: 0,
    };
    saveGif("GIF/bucky.gif", frames, options);
  }
}

function preload() {
  for (let i = 0; i < 32; i++) {
    let img = loadImage(`assets/${i}.jpeg`);
    images.push(img);
  }
  font = loadFont("Cubano.ttf");
}

function setup() {
  createCanvas(512, 512, WEBGL);
  //createCanvas(256, 256, WEBGL); // for GIF
  let r = 22; // for GIF
  buckyball = new Buckyball(45, images, font);
  buckyball.addVertices();
  buckyball.addFaces();
}

function draw() {
  background(59);
  // Needed for UV coordinates
  textureMode(NORMAL);
  //orbitControl();
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);

  // For GIF
  // rotateX(angle);
  // rotateY(angle);

  buckyball.show();
  //angle += TWO_PI/frames;
}

function mousePressed() {
  save("bucky.jpg");
}
