// L-system snake-kolam rule from Paul Bourke
// https://paulbourke.net/fractals/lsys/
// Basic code from:
// https://natureofcode.com/fractals/
// https://thecodingtrain.com/challenges/16-l-system-fractal-trees
// Grain filter from
// https://github.com/meezwhite/p5.grain

let level = 2;
let length, shapeScale;

let axiom;
let rules;
let angle;
let sentence;
let fractal;
let palette1, palette2;
let s;

let url =
  "https://supercolorpalette.com/?scp=G0-hsl-DB7900-D74E04-D32709-CE0D14";


let lsystem = {
  skierpinski: {
    axiom: "F--XF--F--XF",
    rules: {
      X: "XF+F+XF--F--XF+F+X",
    },
    angle: 45,
    length_factor: 1,
    max_Level: 3,
    author: "Paul Bourke",
  },
};

function setup() {
  createCanvas(800, 800);
  background("#08415c");

  // Add p5gain library
  //p5grain.setup();

  
  fractal = lsystem.skierpinski;
  setRule(fractal);

  length = 81;
  shapeScale = length * 0.5;

 
s = new Quadrifolium(shapeScale, 2, url);
 //s = new Superellipse(shapeScale, 0.6, 0.5, 4, 4.5, url0)
 s.addPoints();
  push();
  translate(width * 0.87, height * 0.94);
  rotate(radians(-45));
  for (let i = 0; i < level; i++) {
    generate();
  }

  turtle();
  pop();

 // applyChromaticGrain(42);
}

function draw() {
  noLoop();
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
  let amt = 0;
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);
    if (current === "F") {
        s.show();
      translate(length, 0);
    } else if (current === "f") {
      translate(length, 0);
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
      //let c = random(palette);
      //   c[3] = 160;
      //   fill(c);
      endShape();
    }
  }
}

// Function to save the canvas as an image when 's' key is pressed
function keyPressed() {
  if (key === "s" || key === "S") {
    save("img.jpg");
  }
}
