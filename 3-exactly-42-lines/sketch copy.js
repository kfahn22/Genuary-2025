let angle = 0;

function setup() {
  createCanvas(512, 512);
  angleMode(DEGREES);
}

function draw() {
  background(0);
  pinwheel(width / 2, height / 2, 2, 1, 60, angle, "#fb3640");
  pinwheel(width * 0.25, height * 0.5, 2, 1, 60, -angle, "#ffb238");
  pinwheel(width * 0.75, height * 0.5, 2, 1, 60, -angle, "#7f7eff");

  angle += 1;
}

// https://mathcurve.com/courbes2d/ornementales/ornementales.shtml
function pinwheel(x, y, m, n, scale, a, palette) {
  rect(x - 4, y, 8, 250);
  push();
  translate(x, y);
  fill(palette);
  stroke(palette);
  rotate(a);
  beginShape();
  for (let theta = 0; theta < 360; theta += 1) {
    let denom = 1 - 0.75 * pow(sin(m * theta), 2);
    let r = pow(sin(4 * theta) / denom, 0.5);
    let v0 = scale * r * cos(theta);
    let v1 = n * scale * r * sin(theta);
    vertex(v0, v1);
  }
  endShape(CLOSE);
  fill(255);
  pop();
}

function pinwheel(x, y, m, n, scale, a, color) {
  // Shadow effect
  push();
  translate(x + 10, y + 10); // Offset shadow position
  fill(0, 50); // Black shadow with low opacity
  stroke(0, 50);
  rotate(a); // Rotate shadow
  beginShape();
  for (let theta = 0; theta < 360; theta += 1) {
    let denom = 1 - 0.75 * pow(sin(m * theta), 2);
    let r = pow(sin(4 * theta) / denom, 0.5);
    let v0 = scale * r * cos(theta);
    let v1 = n * scale * r * sin(theta);
    vertex(v0, v1);
  }
  endShape(CLOSE);
  pop();

  // Main pinwheel
  push();
  translate(x, y);
  fill(color);
  stroke(color);
  rotate(a);
  beginShape();
  for (let theta = 0; theta < 360; theta += 1) {
    let denom = 1 - 0.75 * pow(sin(m * theta), 2);
    let r = pow(sin(4 * theta) / denom, 0.5);
    let v0 = scale * r * cos(theta);
    let v1 = n * scale * r * sin(theta);
    vertex(v0, v1);
  }
  endShape(CLOSE);
  fill(255);
  pop();
}

function mousePressed() {
  save("3.jpg");
}
