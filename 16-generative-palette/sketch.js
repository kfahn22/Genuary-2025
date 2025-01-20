// Genuary 16: Generative Palatte

// Shape parameters
let sMin = 7; // Minimum shape scale
let sMax = 45; // Maximum shape scale
let s;
let a = 2;
let b = 1;
let m = 8;
let n1 = n2 = n3 = n = 1;
let d = 4;
let shape;
let shapeAngle = 0;


// Phyllotaxis parameters
let numMin = 100; // Minimum number of points
let numMax = 220; // Maximum number of points
let num; // Current number of points
let c = 10; // Distance between points
 let ds = [];

// Animation parameters
let t = 0; // Time variable for easing
let frames = 120; // Total frames for one grow-shrink cycle

function keyPressed() {
  if (key === "s") {
    const options = {
      units: "frames",
      delay: 0,
    };
    saveGif("phyllotaxis.gif", frames, options);
  }
}

function setup() {
  createCanvas(600, 600);
  s = sMin;
  num = numMin;
}

function draw() {
  background(0);

  // Easing function to coordinate change in num and s from chatGPT
  let phase = sin(TWO_PI * t)*0.5  + 1 / 2; // Maps sin(t) from -1..1 to 0..1
  t += 1 / frames; // Increment time
  if (t >= 1) {
    t = 0; // Reset after a full cycle
  }

  // Map phase to `s` and `num`
  s = lerp(sMin, sMax, phase);
  num = floor(lerp(numMin, numMax, phase));

  // Draw the shape and phyllotaxis pattern
  shape = new Shape(s, a, b, m, n1, n2, n3, n, d, shapeAngle);
  shape.kissCurve();
  phyllotaxis(num, c);
}

// https://thecodingtrain.com/challenges/30-phyllotaxis
function phyllotaxis(n, c) {
  for (let i = 0; i < n; i++) {
    let a = i * 137.5;
    let sc = c * sqrt(i);
    let x = width / 2 + sc * cos(a);
    let y = height / 2 + sc * sin(a);
   
    let d = dist(width / 2, height / 2, x, y);
    
    // ds.push(d);
    // console.log(max(ds));
    //let r = map(d, 0, 147, 0, 255)
    let dmax = 147;
    let r = ceil(abs(255 * cos(d/dmax * 10)));  
    let g = ceil(abs(255 * cos(d/dmax * 30)));
    let b = ceil(abs(255 * sin(d/dmax * 30)));
    // let g = ceil(abs(255 * cos(d * 30)));
    // let b = ceil(abs(255 * sin(d * 30)));
    push();
    translate(x, y);
    rotate(a);
    noStroke();
    fill(r, g, b, 150);
    shape.show();
    pop();
  }
}

function mousePressed() {
  save("16.jpg");
}
