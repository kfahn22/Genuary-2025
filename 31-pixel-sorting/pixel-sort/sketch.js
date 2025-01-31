// Pixel sorting code from Daniel Shiffman
// https://thecodingtrain.com/challenges/47-pixel-sorting-in-processing
// Code to extract tiles also from Daniel Shiffman


let img;
let sorted;
let tiles = [];
const TILE_SIZE = 18;

// I used in pin from Pinterest in figure out the indices for the butterfly grid pattern
// https://www.pinterest.com/pin/17803361023896349/
let butterfly = [
  56, 80, 81, 82, 105, 108, 129, 133, 154, 159, 179,   204, 210, 213, 229, 237,
  262, 278, 279, 280, 287, 291, 302, 306, 307,310,  312, 313, 314, 315, 327, 333,
  336, 352,  359, 360, 365, 377, 383, 385, 393, 402, 403, 407, 409, 412, 419,
  420, 428, 429, 430,431, 432, 433, 438, 446, 458, 463, 471, 472, 483, 489,  496,
  508, 514, 533, 539, 559, 560, 561, 562, 563, 106, 107, 130, 131, 132, 155,
  158, 180, 184, 205, 209, 230, 235,  255, 260, 281, 285, 303, 304, 328, 353,
  362, 363, 364, 384, 390, 391, 392, 404, 408, 411, 418, 444, 445, 464, 468, 469,
  470, 490, 491, 492, 493, 494, 495, 496, 513, 535, 536, 537, 538,
];

function preload() {
  img = loadImage("flower-garden.jpg"); 
}

function setup() {
  createCanvas(450, 450);
  tiles = extractTiles(img);
  //console.log(tiles.length)
}

function draw() {
 //background(50, 77, 83)
 background(39, 60, 58)

  for (let tile of tiles) {
    image(tile.image, tile.x, tile.y);
  }
}

function extractTiles(img) {
  let counter = 0;
  let sortedTile;
  img.loadPixels();
  let tiles = [];
  for (let j = 0; j < img.height; j += TILE_SIZE) {
    for (let i = 0; i < img.width; i += TILE_SIZE) {
      let tileImage = createImage(TILE_SIZE, TILE_SIZE);
      copyTile(img, i, j, TILE_SIZE, tileImage);
      if (butterfly.includes(counter)) {
        sortedTile = sortPixels(tileImage);
        tiles.push({ image: sortedTile, index: counter, x: i, y: j });
        stroke(206, 3, 24);
        square(i, j, TILE_SIZE);
      // } else if (butterfly.includes(counter)) {
      //   fill(225, 197, 43);
      //   noStroke();
      //     square(i, j, TILE_SIZE);
      
      } else {
        // tiles.push({ image: tileImage, index: counter, x: i, y: j });
      }
      counter += 1;
    }
  }
  return tiles;
}

function copyTile(sourceImg, x, y, size, destImg) {
  destImg.copy(sourceImg, x, y, size, size, 0, 0, size, size);
}

function sortPixels(img) {
  img.loadPixels();
  let pixelsArray = [];
  for (let i = 0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i];
    let g = img.pixels[i + 1];
    let b = img.pixels[i + 2];
    let h = hue(color(r, g, b));
    pixelsArray.push({ r, g, b, h, index: i });
  }

  pixelsArray.sort((a, b) => b.h - a.h);

  for (let i = 0; i < pixelsArray.length; i++) {
    let pix = pixelsArray[i];
    let idx = i * 4;
    img.pixels[idx] = pix.r;
    img.pixels[idx + 1] = pix.g;
    img.pixels[idx + 2] = pix.b;
  }

  img.updatePixels();
  return img;
}

function mousePressed() {
  save("31.jpg");
}
