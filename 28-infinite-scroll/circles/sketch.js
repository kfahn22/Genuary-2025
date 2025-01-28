// Wolfram Elementary CA - Scrolling!
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/challenges/179-wolfram-ca
// https://youtu.be/Ggxt06qSAe4
// https://editor.p5js.org/codingtrain/sketches/u6ALWY0Kt

// Sea life images (with backgrounds removed by me) from https://www.kaggle.com/datasets/vencerlanz09/sea-animals-image-dataste?resource=download

let cells = [];
let history = [];
let circles = [];

let ruleSet;
let w = 32;
let startRule = 90;
// a selection of rules
let ruleCollection = [235, 30, 110, 57, 62, 75, 22];
let frames = 60;

function keyPressed() {
  if (key == "s") {
    const options = {
      units: "frames",
      delay: 0,
    };
    saveGif("GIF/circles.gif", frames, options);
  }
}

function setRules(ruleValue) {
  ruleSet = ruleValue.toString(2);
  while (ruleSet.length < 8) {
    ruleSet = "0" + ruleSet;
  }
}

function setup() {
  createCanvas(900, 450);
  setRules(startRule);
  frameRate(10);

  let total = width / w;
  for (let i = 0; i < total; i++) {
    cells[i] = 0;
    circles.push(new Swirl(w));

  }
  cells[floor(total / 2)] = 1;
}

function draw() {
  history.push(cells);
  randomSeed(42);
  if (random(1) < 0.01) {
    let nextRule = random(ruleCollection);
    setRules(nextRule);
    cells[floor(cells.length / 2)] = 1;
  }

  let cols = height / w;
  if (history.length > cols + 1) {
    history.splice(0, 1);
  }

  let y = 0;
  background(6, 109, 175);
  for (let cells of history) {
    for (let i = 0; i < cells.length; i++) {
      let x = i * w;
      if (cells[i] == 1) {
        noStroke();
        let i = int(random(circles.length));
        circles[i].show(x, y);
        // square(x, y - w, w);
      }
    }
    y += w;
  }

  let nextCells = [];
  let len = cells.length;
  for (let i = 0; i < cells.length; i++) {
    let left = cells[(i - 1 + len) % len];
    let right = cells[(i + 1) % len];
    let state = cells[i];
    nextCells[i] = calculateState(left, state, right);
  }
  cells = nextCells;
}

function calculateState(a, b, c) {
  let neighborhood = "" + a + b + c;
  // console.log(neighborhood);
  let value = 7 - parseInt(neighborhood, 2);
  return parseInt(ruleSet[value]);
}

function mousePressed() {
  save("28.jpg");
}

