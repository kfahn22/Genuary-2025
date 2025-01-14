// L-system kolam rule from Paul Bourke
// https://paulbourke.net/fractals/lsys/
// Basic code from:
// https://natureofcode.com/fractals/
// https://thecodingtrain.com/challenges/16-l-system-fractal-trees

let level = 2;
let length = 300;
let shapeScale = 0.3;

let axiom;
let rules;
let angle;
let sentence;
let fractal;
let a = 0.1; // Cornu spiral parameter
let shapeAngle = 0; // rotate of shape

let shape;
let frames = 120;
let l;
let direction = 1; // 1 for increasing, -1 for decreasing

function keyPressed() {
  if (key == "s") {
    const options = {
      units: "frames",
      delay: 0,
    };
    saveGif("GIF/cornu.gif", frames, options);
  }
}

let lsystem = {
  kolam: {
    axiom: "(-D--D)",
    rules: {
      A: "F++FFFF--F--FFFF++F++FFFF--F",
      B: "F--FFFF++F++FFFF--F--FFFF++F",
      C: "BFA--BFA",
      D: "CFC--CFC",
    },
    angle: "45.1",
    length_factor: "1",
  },
};

function setup() {
  createCanvas(800, 800);
  fractal = lsystem.kolam;

  l = length * shapeScale;
}

// function draw() {
//   background(0);
//   sentence = ""; // reset sentence
//   setRule(fractal);

//   shape = new CornuSpiral(l);
//   shape.addPoints(a);

//   push();
//   translate(width / 2, height * 0.75);
//   for (let i = 0; i < 2; i++) {
//     generate();
//   }
//   turtle(l, shapeAngle);
//   pop();

//   if (a < 2.2) {
//     a += 0.1;
//     shapeAngle += TWO_PI/frames;
//   } else {
//     a = 0;
//     shapeAngle = 0;
//   }
 
// //   } else if (shapeAngle < PI / 2) {
// //     shapeAngle += PI / frames;
// //   } else {
// //     l -= PI / frames;
// //   }
// }

function draw() {
  background(0);
  sentence = ""; // Reset the sentence
  setRule(fractal);

  shape = new CornuSpiral(l);
  shape.addPoints(a);

  push();
  translate(width / 2, height * 0.75);
  for (let i = 0; i < 2; i++) {
    generate();
  }
  turtle(l, shapeAngle);
  pop();



  // Update the value of `a` based on direction
  if (a >= 2.2) {
    direction = -1; // Switch to decreasing
  } else if (a <= 0) {
    direction = 1; // Switch to increasing
  }

  a += direction * 0.1; // Adjust `a` based on direction
  shapeAngle += TWO_PI / frames; // Rotate shape
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

function turtle(l, shapeAngle) {
  let amt = 0;
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);
    if (current === "F") {
      noFill();
      shape.openShow(shapeAngle);
      translate(l, 0);
    } else if (current === "f") {
      translate(l, 0);
    } else if (current === "+") {
      rotate(angle);
      amt += 0.1;
    } else if (current === "-") {
      rotate(-angle);
      amt += 0.2;
    } else if (current == "[") {
      push();
    } else if (current == "]") {
      pop();
    } else if (current == ">") {
      push();
      l = l * lf;
      pickShape();
      pop();
    } else if (current == "<") {
      push();
      l = l / lf;
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

// Function to save the canvas as an image when 's' key is pressed
function mousePressed() {
    save("cornu.jpg"); 
}
