let url =
  "https://supercolorpalette.com/?scp=G0-hsl-FF1F1F-FB5223-F68128-21E5FD-25B4F8";

function setup() {
  createCanvas(800, 800);
  background(255);
  angleMode(DEGREES);
  noLoop();
  let n = int(random(3, 8));
  let pattern = new Pattern(n, url);
  let depth = int(random(2, 6));
  pattern.drawPattern(pattern.ctr, pattern.radius, depth, 0);
  pattern.show();
}

function mousePressed() {
  save("img.jpg");
}
