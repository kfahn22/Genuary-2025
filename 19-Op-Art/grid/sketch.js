// January 20 Op Art

let ncols = 20;
let nrows = 20;
let r = 100;
let wY = 0.1;
let wX = 0.1;
let spX = wX * r;
let spY = wY * r;
let gridX = spX + wX * r;
let gridY = spY + wY * r;

function setup() {
  createCanvas(800, 800);
  background("#3a0842");
  p5grain.setup();
  rectMode(CENTER);

  // Need noStroke for gradial gradient
  noStroke();
  // Add radial gradient
  fillGradient("radial", {
    from: [375, 375, 0],
    to: [350, 350, 450],
    steps: [
      [color("#bfae48"), 0],
      [color("#5fad41"), 0.25],
      [color("#2d936c"), 0.75],
      [color("#391463"), 1],
    ],
  });
  rect(-400, 0, 800, 800);

  push();
  stroke("#bfae48");
  strokeWeight(4);

  addEllipses(spX, spY, width / 2, height / 2);
  pop();

  applyChromaticGrain(42);
}

// Idea to base grid size on r + spacing from Patt Vira
// // https://editor.p5js.org/pattvira/sketches/kXt2VFUkT
function addGrid(w, h) {
  let currentWX = wX; // Temporary scaling factors
  let currentWY = wY;

  for (let i = 0; i < w; i += gridX) {
    currentWY = wY; // Reset `wY` for each row
    for (let j = 0; j < h; j += gridY) {
      ellipse(i, j, r * currentWX, r * currentWY);
      // Increment `wY`
      currentWY += 0.1;
      spY = map(currentWY * r, 10, 100, 2, 4);
      gridY = currentWY * r + spY;
    }
    // Increment `wX`
    currentWX += 0.1;
    spX = map(currentWX * r, 10, 100, 2, 4);
    gridX = currentWX * r + spX;
  }
}

function addEllipses(spX, spY, w, h) {
  push();
  translate(3 * spX, 3 * spY);
  addGrid(w, h);
  pop();

  push();
  translate(width - 3 * spX, height - 3 * spY);
  rotate(PI);
  addGrid(w, h);
  pop();

  push();
  translate(width - 3 * spX, 3 * spY);
  rotate(PI / 2);
  addGrid(w, h);
  pop();

  push();
  translate(3 * spX, height - 3 * spY);
  rotate(-PI / 2);
  addGrid(w, h);
  pop();
}

// function addEllipseRow(j, x, y, r) {
//   push();
//   translate(x, y);
//   for (let i = 0; i < height; i += gridY/2) {
//     ellipse(i, j, r, r );
//   }
//   pop();
// }

// function addEllipseColumn(i) {
//   for (let j = 0; j < width; j += gridX) {
//     ellipse(i, j, r * wX, r * wY);
//   }
// }

function mousePressed() {
  save("op.jpg");
}
