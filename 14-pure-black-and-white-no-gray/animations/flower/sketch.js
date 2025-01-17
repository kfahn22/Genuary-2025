// L-system kolam rule from Paul Bourke
// https://paulbourke.net/fractals/lsys/
// Basic code from:
// https://natureofcode.com/fractals/
// https://thecodingtrain.com/challenges/16-l-system-fractal-trees

let level = 3;
let length = 20;
let shapeScale = 0.8;

let axiom;
let rules;
let angle;
let sentence;
let fractal;
// Shape class parameters, for more info see:
// https://github.com/kfahn22/L-System-Pattern-Generator/tree/main/code/L-system-playground

let a = 2;
let b = 1;
let m = 6;
let n1 = 1;
let n2 = 1;
let n3 = 1;
let n = 1;
let d = 1;
let shapeAngle = 0; // rotate of shape

// shape object
let shapes = [];
let frames = 60;
let l;
let direction = 1; // 1 for increasing, -1 for decreasing
let s1, s2;

function keyPressed() {
  if (key == "s") {
    const options = {
      units: "frames",
      delay: 0,
    };
    saveGif("GIF/flower.gif", frames, options);
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
  ADH231a: {
    axiom: "F++++F",
    rules: {
      F: "F+F+F++++F+F+F",
    },
    angle: 45,
    length_factor: 1,
    max_Level: 3,
    author: "Anthony Hammer",
  },
  pentaplexity: {
    axiom: "F++F++F++F++F",
    rules: {
      F: "F++F++F+++++F-F++F",
    },
    angle: "36",
    length_factor: 1,
    max_Level: 4,
    author: "Paul Bourke",
  },
};

function setup() {
  createCanvas(800, 800);
  fractal = lsystem.ADH231a;

  l = length * shapeScale;
}

function draw() {
  background(0);

  sentence = ""; // Reset the sentence
  setRule(fractal);

  // gear
  s1 = new Shape(
    l,
    3,
    4,
    8,
    n1,
    n2,
    n3,
    n,
    d,
    shapeAngle,
    // color(0, 0, 0),
    // color(0, 0, 0)
    color(255, 255, 255),
    color(255, 255, 255)
  );

  // flower
  s2 = new Shape(
    l,
    1.25,
    1,
    8,
    n1,
    n2,
    n3,
    n,
    d,
    shapeAngle,
    color(0, 0, 0),
    //color(0, 0, 0)
   color(255, 255, 255),
    // color(255, 255, 255)
  );

  s1.gear(l);
  s2.flower(l);
 
  push();
  translate(width * 0.1, height * 0.5);
  for (let i = 0; i < level; i++) {
    generate();
  }
  turtle(l, shapeAngle);
  pop();

shapeAngle += TWO_PI / frames;
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
     // s1.show(shapeAngle);
      //s2.show(shapeAngle - radians(15));
      s2.show(shapeAngle);
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
  save("flower.jpg");
}
