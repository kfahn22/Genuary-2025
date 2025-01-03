let angle = 0;
let frames = 60;

function keyPressed() {
  if (key == "s") {
    const options = {
      units: "frames",
      delay: 0,
    };
    saveGif("GIF/pinwheel.gif", frames, options);
  }
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  pinwheel(width / 2, height / 2, 2, 1, 43, radians(angle), "#fb3640");
  pinwheel(width * 0.175, height * 0.5, 2, 1, 43, radians(angle), "#ffb238");
  pinwheel(width * 0.825, height * 0.5, 2, 1, 43, radians(angle), "#7f7eff");

  angle += 360 / frames;
}

// https://mathcurve.com/courbes2d/ornementales/ornementales.shtml
function pinwheel(x, y, m, n, scale, a, color) {
  push();
  fill(255);
  rect(x - 2, y, 4, 250);
  pop();
  push();
  translate(x, y);
  fill(color);
  stroke(color);
  rotate(a);
  beginShape();
  for (let theta = 0; theta < radians(360); theta += radians(1)) {
    let denom = 1 - 0.75 * pow(sin(m * theta), 2);
    let r = pow(sin(4 * theta) / denom, 0.5);
    let v0 = scale * r * cos(theta);
    let v1 = n * scale * r * sin(theta);
    vertex(v0, v1);
  }
  endShape(CLOSE);
  pop();
}

// function mousePressed() {
//   save("3.jpg");
// }
