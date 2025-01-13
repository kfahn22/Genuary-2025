// Adapted from the code from a dodecahedron from Coding Train
// https://editor.p5js.org/codingtrain/sketches/frIcGeI8l

// Reference for Icosahedron
// https://mathworld.wolfram.com/IcosahedronStellations.html

let icos;
let palette = [];
let textures = [];
let images = [];
let spritesheet;
let s = 128; // 64 for numbers.png
let r = 100;
let angle = 0;
let frames = 60;

function keyPressed() {
  if (key == "s") {
    const options = {
      units: "frames",
      delay: 0,
    };
    saveGif("GIF/icos.gif", frames, options);
  }
}

let url =
  "https://supercolorpalette.com/?scp=G0-hsl-186C91-22ACCE-54D5E3-91EDED-CFF7F3";


function extractHexCodes(url) {
  let startIndex = url.indexOf("=");
  let hexPart = url.substring(startIndex + 1);
  let parts = hexPart.split("-");
  return parts.filter((part) => /^[0-9A-Fa-f]{6}$/.test(part));
}

function hexToColor(hex) {
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  return color(r, g, b, 230);
}

function generatePaletteArray(url) {
  let hexCodes = extractHexCodes(url);
  return hexCodes.map((hex) => hexToColor(hex));
}

// If the face vertices are not in the prescripted order, that face's uvs will be distorted or warped.  I used "numbers.png" / images to trouble shoot.
function preload() {
 spritesheet = loadImage("spritesheet.jpg");
 // spritesheet = loadImage("numbers.png");
  // for (let i = 0; i < 32; i++) {
  //   let img = loadImage(`../11-impossible/assets/${i}.jpeg`);
  //   images.push(img);
 // }
}

function setup() {
  createCanvas(512, 512, WEBGL);

  palette = generatePaletteArray(url);

  // Extract sprites from the spritesheet
  for (let y = 0; y < spritesheet.height; y += s) {
    for (let x = 0; x < spritesheet.width; x += s) {
      let img = spritesheet.get(x, y, s, s);
      textures.push(img);
    }
  }

  icos = new Icosahedron(r, textures, palette);
  icos.addVertices();
  icos.addFaces();
}

function draw() {
  background(100);
  ambientLight(color(255));
  textureMode(NORMAL);
  translate(0, -20);
  //orbitControl(); 

  rotateY(frameCount * 0.001); 
  rotateX(-frameCount * 0.001); 

  // For GIF
  // rotateX(angle);
  // rotateY(angle);

  icos.show();
  angle += TWO_PI/frames;
}

function mousePressed() {
  save("icos.jpg");
}
