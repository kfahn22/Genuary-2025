// https://github.com/kfahn22/Buckyball/tree/main

let buckyball;
let spritesheet;
let s = 128;
//let s = 256; // I tried a higher resolutio image and it buckyball failed to render correctly.  Not sure why.
let textures = [];
let palette = [];
let font;
let images = [];

// For trouble-shooting -- trying to figure out why some images are skewed
// numbers.png
// https://editor.p5js.org/kfahn/sketches/M3k5BJI29

// Sprites from https://editor.p5js.org/kfahn/sketches/7LcbjlbSV

let url =
  "https://supercolorpalette.com/?scp=G0-hsl-1FF8FF-2396FB-283CF6-6E2CF2-C131ED-E935C5-E43A78";

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
  return color(r, g, b, 200);
}

function generatePaletteArray(url) {
  let hexCodes = extractHexCodes(url);
  return hexCodes.map((hex) => hexToColor(hex));
}

function preload() {
  //spritesheet = loadImage("spritesheet.jpg");
  spritesheet = loadImage("numbers.png");

  for (let i = 0; i < 6; i++){
    let img = loadImage(`assets/${i}.jpeg`);
    images.push(img);
    
  }
  //font = loadFont("Cubano.ttf");
}

function setup() {
  createCanvas(512, 512, WEBGL);
  // Generate a color palette
  palette = generatePaletteArray(url);

  // Extract sprites from the spritesheet
  for (let y = 0; y < spritesheet.height; y += s) {
    for (let x = 0; x < spritesheet.width; x += s) {
      let img = spritesheet.get(x, y, s, s);
      textures.push(img);
    }
  }

  let sprites = textures.slice(0, 32);
  //buckyball = new Buckyball(45, palette, sprites, font);
   buckyball = new Buckyball(45, palette, images, font);
  buckyball.addVertices();
  buckyball.addFaces();
}

function draw() {
  background(59);
  textureMode(NORMAL); // Enable UV coordinates
  //orbitControl(); // Allows mouse rotation
  rotateX(frameCount * 0.01); // Slow rotation
  rotateY(frameCount * 0.01); // Slow rotation

  buckyball.show();
  //buckyball.showVert();
}

function mousePressed() {
  save("bucky.jpg");
}
