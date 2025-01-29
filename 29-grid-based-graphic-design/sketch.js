// January 20 Grid Based Graphic Design

const w = 300;
const spacing = 20;
let images = [];
let maskedImages = [];

function preload() {
  for (let i = 0; i < 6; i++) {
    const path = "assets";
    images[i] = loadImage(`${path}/${i}.jpg`);
  }
}

function setup() {
  createCanvas(800, 800);
  background(images[1]);
  strokeWeight(3);
  stroke("#FFA91F");
  noFill();

  push();
  translate(width * 0.065, height * 0.275);
  goldenImages(120, 12);
  pop();
}

function goldenImages(w, spacing) {
  addDesign(spacing, 2 * w + 3 * spacing, w, images[6]);
  addDesign(w + 2 * spacing, 2 * w + 3 * spacing, w, images[0]);
  addDesign(2 * w + 3 * spacing, spacing, 3 * w + 2 * spacing, images[4]);

  maskedImages.push(
    new MaskedImage(images[3], width * 0.17, height * 0.17, 520)
  );
  maskedImages[0].display();
  circle(width * 0.17, height * 0.17, 260);
}

function goldenGrid(w, spacing) {
  fill("#2A1FFF");
  rect(spacing, spacing, 2 * w + spacing, 2 * w + spacing);
  rect(spacing, 2 * w + 3 * spacing, w, w);
  rect(w + 2 * spacing, 2 * w + 3 * spacing, w, w);
  rect(2 * w + 3 * spacing, spacing, 3 * w + 2 * spacing, 3 * w + 2 * spacing);
  rect(spacing, 3 * w + 4 * spacing, 5 * w + 4 * spacing, 5 * w + 4 * spacing);
}

function addDesign(x, y, s, img) {
  push();
  image(img, x, y, s, s);
  rect(x, y, s, s);
  pop();
}

function mousePressed() {
  save("29.jpg");
}
