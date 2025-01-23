// Click and drag the mouse to view the scene from different angles.
// https://p5js.org/reference/p5/panorama/

// https://www.architecturaldigest.com/story/brutalist-architecture-101

// https://editor.p5js.org/kfahn/sketches/EZ28BwYqn

// let url = "https://supercolorpalette.com/?scp=G0-hsl-A39F8A-9A9489-918C88-878787-828282";

let img;
let angle = 0;
let cam;

// Load an image and create a p5.Image object.
function preload() {
  img = loadImage("coast.jpg");
  //img2 = loadImage("cement.jpg");
}

function setup() {
  createCanvas(800, 800, WEBGL);

  describe("House on ridge");
  cam = createCamera();
}

function draw() {
  // Add the panorama.
  panorama(img);

  // Enable orbiting with the mouse.
  orbitControl();

  // Use the image as a light source.
  imageLight(img);
  noStroke();

  // Calculate the camera's x-coordinate.
  let x = 400 * cos(frameCount * 0.01);

  // Orbit the camera around the box.
  //camera(x, 400, 1000);
  //cam.setPosition(x, 200, 800);
  cam.lookAt(0, 100, 0);

  
  

  push();
  translate(0, 300);
  //rotateY(-PI / 3);
  house();
  pop();

 
}

function house() {
  push();
  // Add a dark gray ambient material.
  ambientMaterial("#4A4A4A");
  translate(0, -240, 0);
  box(400, 200, 300);
  pop();

  push();
  // Add a dark gray ambient material.
  ambientMaterial("#4A4A4A");
  translate(0, -100, 0);
  box(280, 170, 280);
  pop();

  // elevator
  push();
  ambientMaterial("#4A4A4A");
  translate(0, 60, 0);
  box(100, 110);
  pop();

  // Add floors
  push();
   ambientMaterial("#4A4A4A");
  translate(-100, 0);
  rotateY(PI / 2);
  ambientMaterial(0);
  slab(350, 1.4);
  supportBeams(200, 150, PI / 4);
  pop();
  push();
  translate(100, 0);
  rotateY(-PI / 2);
  slab(350, 1.4);
  supportBeams(200, 150, PI / 4);
  pop();

  //x, y, z, angle, w, h, d
  horizontalBeam(0, 0, 50, 0, 200, 20, 20);
  horizontalBeam(0, 0, 150, 0, 200, 20, 20);
  horizontalBeam(0, 0, -50, 0, 200, 20, 20);
  horizontalBeam(0, 0, -150, 0, 200, 20, 20);

  push();
  translate(0, 140);
  rotateY(-PI / 2);
  slab(350, 1);
  pop();

  // Add windows
  firstFloorWindows();
  secondFloorWindows(220);

  // Railing
  ambientMaterial(0)
  addSafetyRailing(200, 240, 30, 545, 480);
  addSafetyRailing(40, 175, 0, 345, 355);
}

// Wrap around railing
function addSafetyRailing(x, y, deltaY, s1, s2) {
  addRailings(x, y, s1);

  push();
  rotateY(PI / 2);
  addRailings(x, y + deltaY, s2);
  pop();

  addRailingPosts(270, -185, 240, 3);
  push();
  rotateY(PI / 2);
  addRailingPosts(180, -185, 270, 3);
  pop();
}
// n number of posts
function addRailingPosts(x, y, z, n) {
  for (let i = -x; i <= x; i += x / n) {
    railingPost(i, y, -z);
    railingPost(i, y, z);
  }
}

function railing(x, y, z, s) {
  push();
  translate(x, y, z);
  box(s, 5, 5);
  pop();
}

function addRailings(y, z, s) {
  railing(0, -y, z, s);
  railing(0, -(y + 25), z, s);
  railing(0, -y, -z, s);
  railing(0, -(y + 25), -z, s);
  railing(0, -y, -z, s);
}

function railingPost(x, y, z) {
  push();
  translate(x, y, z);
  box(5, 80, 5);
  pop();
}

// Window functions
function singleWindow(x, y, z, s) {
  push();
   specularMaterial(50);
   shininess(200);
   metalness(100);
  translate(x, y, z);
  rotateY(PI / 2);
  plane(s, s * 2);
  pop();
}

function sideWindows(x, y, z, s, n) {
  for (let i = 0; i < n; i++) {
    singleWindow(x, y, z + i * 70, s);
  }
}

function secondFloorWindows(y) {
  push();
  // specularMaterial(50);
  // shininess(200);
  // metalness(100);
  sideWindows(201, -y, -110, 60, 4);
  sideWindows(-201, -y, -110, 60, 4);
  push();
  rotateY(PI / 2);
  sideWindows(151, -y, -110, 60, 4);
  sideWindows(-151, -y, -110, 60, 4);
  pop();
  pop();
}

function firstFloorWindows() {
  push();
  specularMaterial(50);
  shininess(200);
  metalness(100);
  singleWindow(-141, -200, -60, 100);
  singleWindow(-141, -200, 60, 100);
  singleWindow(141, -200, -60, 100);
  singleWindow(141, -200, 60, 100);

  push();
  rotateY(PI / 2);
  singleWindow(-141, -70, -32, 50);
  singleWindow(-141, -70, 32, 50);
  pop();

  push();
  rotateY(PI / 2);
  singleWindow(141, -70, -32, 50);
  singleWindow(141, -70, 32, 50);
  pop();
  pop();
}

function supportBeams(l1, l2, angle) {
  supportBeam(50, 120, 0, angle, 0, 20, l1, l2, 15);
  supportBeam(-50, 120, 0, angle, 0, 20, l1, l2, 15);
  supportBeam(-150, 120, 0, angle, 0, 20, l1, l2, 15);
  supportBeam(150, 120, 0, angle, 0, 20, l1, l2, 15);
}

function slab(s, a) {
  push();
  translate(0, -150, 0);
  rotateX(PI / 2);
  box(s * a, s, 10);
  pop();
}

// Support beams
function supportBeam(x, y, z, angle1, angle2, w, h1, h2, d) {
  push();
  translate(x, -80, -60);
  rotateX(angle1);
  box(w, h1, d);
  pop();
  push();
  translate(x, y - 80, z);
  rotateY(angle2);
  box(w, h2, d);
  pop();
}

function horizontalBeam(x, y, z, angle, w, h, d) {
  push();
  translate(x, y, z);
  rotateX(angle);
  box(w, h, d);
  pop();
}

function mousePressed() {
  save("23.jpg");
}