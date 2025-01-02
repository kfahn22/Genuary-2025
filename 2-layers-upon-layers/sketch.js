// L-system snake-kolam rule from Paul Bourke
// https://paulbourke.net/fractals/lsys/
// Basic code from:
// https://natureofcode.com/fractals/
// https://thecodingtrain.com/challenges/16-l-system-fractal-trees
// Grain filter from
// https://github.com/meezwhite/p5.grain

let level  = 6;
let length, shapeScale; 

let axiom;
let rules;
let angle;
let sentence;
let fractal;
let palette1, palette2;
// let url1 =
//   "https://supercolorpalette.com/?scp=G0-hsl-FFDA1F-FFC71F-FFB41F-FFA21F-1F44FF-1F57FF-1F69FF-1F7CFF";

// let url2 =
//   "https://supercolorpalette.com/?scp=G0-hsl-FF8B1F-FF781F-FF661F-1F9CFF-1FAFFF";

//let url1 = "https://supercolorpalette.com/?scp=G0-hsl-FFDA1F-FBAC23-F68128-215BFD-2588F8";

let url0 =
  "https://supercolorpalette.com/?scp=G0-hsl-0129EF-1569F9-37A3F6-58CFF3-78EEF2";
let url1 =
  "https://supercolorpalette.com/?scp=G0-hsl-EF9701-F46D06-F44510-EF261F";
let url2 =
  "https://supercolorpalette.com/?scp=G0-hsl-FFE70A-FBDF41-F9DF76-F9E5A9";
let url3 =
  "https://supercolorpalette.com/?scp=G0-hsl-950AFF-A141FB-B376F9-CAA9F9";
let url5 =
  "https://supercolorpalette.com/?scp=G0-hsl-0129EF-424EFA-938FFA-FCDE1A-FAF569";
let url6 =
  "https://supercolorpalette.com/?scp=G0-hsl-FFA91F-FB7D23-F65428-218BFD-25B5F8";

let url4 =
  "https://supercolorpalette.com/?scp=G0-hsl-FF0A74-FB419B-F976BC-F9A9D8";

let shapes = [];

let lsystem = {
  snake_kolam: {
    axiom: "F+XF+F+XF",
    rules: {
      X: "X{F-F-F}+XF+F+X{F-F-F}+X",
    },
    angle: "90",
    length_factor: "1",
  },
  hilbert: {
    axiom: "X",
    rules: {
      X: "-YF+XFX+FY-",
      Y: "+XF-YFY-FX+",
    },
    angle: 90,
    length_factor: 1,
    max_Level: 5,
    author: "Paul Bourke",
  },
};

function setup() {
  createCanvas(800, 800);
  background(0);

  // Add p5gain library
  p5grain.setup();

  resetButton = createButton("Reset");
  resetButton.position(width + 110, 5);
  resetButton.mousePressed(reset);

  //fractal = lsystem.snake_kolam;
  fractal = lsystem.hilbert;
  setRule(fractal);

  // Set text size as a fraction of length
  strokeWeight(6);

  length = 14;
  //length = 23; // step length
  let n = 0.8
  
  shapes.push(
    new Zigzag(10, 0, length, random(3, 6), random(0.4, 0.6), 4, url4)
  );
  shapes.push(
    new Zigzag(0, 0, length, random(3,6), random(0.4, 0.6), 6, url1)
  );
  shapes.push(
    new Zigzag(
      0,
      10,
      length,
      random(3,6),
      random(0.4, 0.6),
      2,
      url2
    )
  );
  shapes.push(
    new Zigzag(0, 5, length, random(3,6), random(0.4, 0.6), 3, url5)
  );
  shapes.push(
    new Zigzag(0, 0, length, random(3,6), random(0.4, 0.6), 2, url3)
  );
  shapes.push(
    new Zigzag(0, 0, length, random(3,6), random(0.4, 0.6), 2, url0)
  );


  for (let s of shapes) {
    s.addPoints();
  }
  push();
  translate(width * 0.0, height * 1); // hilbert
 // translate(width * 0.06, height * 0.06);
 // rotate(random(radians(90, 90)));
  for (let i = 0; i < level; i++) {
    generate();
  }

  turtle();
  pop();

 applyChromaticGrain(42);
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
      noFill();
      for (let s of shapes) {
        s.openShow();
      }
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

function reset() {
  push();

  selectedShape = new Zigzag(0, 0, length * shapeScale, radians(0));
  selectedShape.addPoints();
  translate(width * 0.05, height * 0.05);
  background(0);
  setRule(fractal);
  for (let i = 0; i < level; i++) {
    generate();
  }
  turtle();
  pop();

  //applyChromaticGrain(42);
}

// Function to save the canvas as an image when 's' key is pressed
function keyPressed() {
  if (key === "s" || key === "S") {
    save("img.jpg");
  }
}
