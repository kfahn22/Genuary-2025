// January 22: Gradients Only

// I am using https://github.com/alterebro/p5.fillGradient to add the gradients

let s = 30; // Thickness of the weave lines
let n = 15; // Number of rows and columns
let r = 6;
let maxDist; // maxDist from center of canvas
let palette = [];

let pink = "https://supercolorpalette.com/?scp=G0-hsl-FFE45C-FF9D80-FF6BB8";

let gray = "https://supercolorpalette.com/?scp=G0-hsl-00020A-677983-6C7C7F";

function extractHexCodes(url) {
  let startIndex = url.indexOf("=");
  let hexPart = url.substring(startIndex + 1);
  let parts = hexPart.split("-");
  return parts.filter((part) => /^[0-9A-Fa-f]{6}$/.test(part));
}

function hexToColor(hex, alpha) {
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  return color(r, g, b, alpha);
}

function generatePaletteArray(url, alpha) {
  let hexCodes = extractHexCodes(url);
  return hexCodes.map((hex) => hexToColor(hex, alpha));
}

function setup() {
  createCanvas(800, 800);

  background(0);
  noStroke();
  maxDist = sqrt(width / 2, height / 2, 0, 0);
  let offset = int(random(palette.length));

  // Gray gradient background
  push();
  palette = generatePaletteArray(gray, 230);
  backgroundGradient(45, 15, 15, 1);
  pop();

  // // Phyllotaxis spiral variation
  // push();
  // palette = generatePaletteArray(pink, 255);
  // phyllotaxisSpiral(330, 20, 18);
  // pop();

  // Abstract Variation
  push();
  palette = generatePaletteArray(pink, 255);
  //randomGrids(n, int(random(palette.length)));
  abstractVariation(n, int(random(palette.length)));
  pop();
}

function phyllotaxisSpiral(n, c, w) {
  for (let i = 0; i < n; i++) {
    let a = i * 137.5;
    let r = c * sqrt(i);
    let x = width / 2 + r * cos(a);
    let y = height / 2 + r * sin(a);

    let d = dist(width / 2, height / 2, x, y);
    let relDist = d / maxDist;
    let h = map(relDist, 0, maxDist, w, 130);

    let offset = int(random(palette.length));
    let col1 = palette[i % palette.length];
    let col2 = palette[(i + offset) % palette.length];
    // If we get unlucky and the same two colors are choosen reset the second one
    if (col1 == col2) {
      col2 = palette[(i + 2) % palette.length];
    }
    push();
    translate(x, y);
    rotate(a);
    addLinearGradient(0, 0, w, h, col1, col2);
    pop();
  }
}

function randomGrids(n, offset) {
  // Top row
  gradientGrid(0, -height * 0.2, 15, 15, width / n, offset);

  // Middle parts
  gradientGrid(-width / 16, height * 0.4, 5, 5, width / n, offset);
  gradientGrid((width * 3) / 4, height * 0.4, 5, 5, width / n, offset);
  gradientGrid(width * 0.25, height * 0.2, 8, 8, width / (1 * n), offset);
  gradientGrid(width * 0.25, height * 0.55, 8, 8, width / (1 * n), offset);

  // Bottom row
  gradientGrid(0, height * 0.8, 15, 15, width / n, offset);
}

function backgroundGradient(nrows, ncols, n) {
  gradientGrid(0, -10, nrows, ncols, width / n, 1);
}

function abstractVariation(n, offset) {
  push();
  translate(width * 0.55, height * 0.55);
  rotate(PI / 4);
  randomGrids(n, offset);
  pop();
  push();
  translate(width * 0.45, height * 0.6);
  rotate((-PI * 3) / 4);
  randomGrids(n, offset);
  pop();

  push();
  translate(width, height * 0.5);
  rotate((PI * 1) / 4);
  randomGrids(n, offset);
  pop();
}

function gradientGrid(x, y, nrows, ncols, cellSize, offset) {
  push();
  translate(x, y);
  for (let row = 0; row < nrows; row++) {
    for (let col = 0; col < ncols; col++) {
      let x = col * cellSize;
      let y = (row * cellSize) / 3;

      let col1 = palette[(row + col) % palette.length];
      let col2 = palette[(row + col + offset) % palette.length];

      // Draw horizontal strip
      if ((row + col) % 2 === 0) {
        addLinearGradient(x, y + cellSize / 2 - s / 2, cellSize, s, col1, col2);
      }

      // Draw vertical strip
      if ((row + col) % 2 === 1) {
        addLinearGradient(x + cellSize / 2 - s / 2, y, s, cellSize, col2, col1);
      }
    }
  }
  pop();
}

function addLinearGradient(x, y, w, h, col1, col2) {
  let gradient = drawingContext.createLinearGradient(x, y, x + w, y + h);
  gradient.addColorStop(0, col1.toString());
  gradient.addColorStop(1, col2.toString());
  drawingContext.fillStyle = gradient;
  rect(x, y, w, h);
}

function mousePressed() {
  save("img.jpg");
}
