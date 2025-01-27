// Genuary 27: Make something interesting with no randomness or noise or trig.

// I didn't pay attention to the "no trig."  While I think it is fair to use an Lsystem, the animation uses a sin curve.

// Shape parameters
// let sMin = 7; // Minimum shape scale
// let sMax = 45; // Maximum shape scale
let s;
let a, b, m;
let level = 6;
let fractal;

//let shape;
let shapes = [];
//let c = [];

// let minAngle = -180;
// let maxAngle = 180;
// let minScale = 0.15;
// let maxScale = 1.1;
// let minA = 0;
// let maxA = 4;
// let minB = 0.06;
// let maxB = 1.0;
// let minM = 2;
// let maxM = 8;
let length = 140;

// Animation parameters
let t = 0; // Time variable for easing
let frames = 120; // Total frames for one grow-shrink cycle

let lsystem = {
  rounded_star: {
    axiom: "F",
    rules: {
      F: "F++F",
    },
    angle: 77,
    length_factor: 1,
    max_Level: 8,
    author: "",
  },
  kolam: {
    axiom: "(-D--D)",
    rules: {
      A: "F++FFFF--F--FFFF++F++FFFF--F",
      B: "F--FFFF++F++FFFF--F--FFFF++F",
      C: "BFA--BFA",
      D: "CFC--CFC",
    },
    angle: 45.1,
    length_factor: 1,
    max_Level: 5,
    author: "Paul Bourke",
  },
};

function keyPressed() {
  if (key === "s") {
    const options = {
      units: "frames",
      delay: 0,
    };
    saveGif("no-random.gif", frames, options);
  }
}

function setup() {
  createCanvas(400, 400);

  fractal = lsystem.rounded_star;
  setRule(fractal);
}

function draw() {
  background(39, 111, 191);

  // Reset shapes array
  shapes = [];

  strokeWeight(2);
  noFill();

  // Easing function to coordinate change in num and s from chatGPT
  let phase = sin(TWO_PI * t) * 0.5 + 1 / 2; // Maps sin(t) from -1..1 to 0..1
  t += 1 / frames; // Increment time
  if (t >= 1) {
    t = 0; // Reset after a full cycle
  }

  push();
  addFlower(phase);
  pop();
  push();
  addClover(phase);
  pop();
}

// function addCraniod(phase) {
//   level = 7;
//   sentence = "";
//   setRule(fractal);
//   a = lerp(minA, maxA, phase);
//   ang = lerp(maxAngle, minAngle, phase);
//   s = 0.3 * length;
//   shapes.push(new Shape(s, 0, 1, 1, 3, 1, 1, 1, 1, 1, ang));
//   shapes[0].craniod();

//   let c = color(247, 206, 91, 150);
//   strokeWeight(2);

//   noFill();
//   push();
//   translate(width * 0.33, height * 0.47);
//   for (let i = 0; i < level; i++) {
//     generate();
//   }

//   turtle(c);
//   pop();
// }

// function addSupershape(phase) {
//   level = 6;
//   sentence = "";
//   setRule(fractal);
//   a = lerp(minA, maxA, phase);
//   m = lerp(4, 8, phase);
//   ang = lerp(maxAngle, minAngle, phase);
//   s = 0.5 * 220;
//   // shape = new Shape(s, a, 1, 1, 3, 1, 1, 1, 1, 1, ang);
//   shapes.push(new Shape(s, 1, 1, m, 1, 1, 1, 1, 1, 1, ang));
//   shapes[0].supershape();

//   let c = color(186, 191, 209, 150);
//   strokeWeight(2);
  
//   noFill();
//   push();
//   translate(width * 0.33, height * 0.47);
//   for (let i = 0; i < level; i++) {
//     generate();
//   }

//   turtle(c);
//   pop();
// }

function addFlower(phase) {
  level = 6;
  sentence = "";
  setRule(fractal);
  a = lerp(0.5, 1.5, phase);
  m = lerp(2, 8, phase);
  sc = lerp(0.15, 0.5, phase);
  ang = lerp(-180, 180, phase);
  s = sc * length;
  shapes.push(new Shape(s, 1, 1, m, 1, 1, 1, 1, 1, 1, ang));
  shapes[0].flower();

  push();
  translate(width * 0.33, height * 0.47);
  for (let i = 0; i < level; i++) {
    generate();
  }

  turtle();
  pop();
}

function addClover(phase) {
  level = 5;
  sentence = "";
  setRule(fractal);
  ang = lerp(-45, 45, phase);
  s = 0.25 * length;
  //m = lerp(4, 8, phase);
  //r, a, b, m, n1, n2, n3, n, d, angle;
  shapes.push(new Shape(s, 1, 1, 2, 1, 1, 1, 1, 1, ang));

  shapes[1].clover();
  
  push();
  translate(width * 0.33, height * 0.47);
  for (let i = 0; i < level; i++) {
    generate();
  }

  turtle();
  pop();
}

function setRule(pattern) {
  axiom = pattern.axiom;
  rules = pattern.rules;
  angle = radians(pattern.angle);
  lf = pattern.length_factor;
  sentence = axiom;
}

function generate() {
  let nextSentence = "";
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);
    let found = false;
    for (let key in rules) {
      if (current === key) {
        found = true;
        nextSentence += rules[key];

        break;
      }
    }
    if (!found) {
      nextSentence += current;
    }
  }
  sentence = nextSentence;
}

function turtle() {
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);
    if (current === "F") {
      for (let i = 0; i < shapes.length; i++) {
        if (i == 0) {
          stroke(246, 244, 243, 160);
          shapes[0].show();
        } else {
          stroke(255, 127, 17);

          shapes[1].show();
        }
      }
      translate(length, 0);
    } else if (current === "f") {
      translate(length, 0);
    } else if (current === "+") {
      rotate(angle);
    } else if (current === "-") {
      rotate(-angle);
    } else if (current == "[") {
      push();
    } else if (current == "]") {
      pop();
    } else if (current == ">") {
      push();
      length = length * lf;
      pickShape();
      pop();
    } else if (current == "<") {
      push();
      length = length / lf;
      pickShape();
      pop();
    } else if (current == "(") {
      angle -= radians(0.1);
    } else if (current == ")") {
      angle += radians(0.1);
    } else if (current == "{") {
      beginShape();
    } else if (current == "}") {
      noStroke();
      endShape();
    }
  }
}

// Function to save the canvas as an image when 'k' key is pressed
function keyPressed() {
  if (key === "k" || key === "K") {
    save("27.jpg");
  }
}
