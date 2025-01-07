let s = 80;
let columns = [];

function setup() {
  createCanvas(400, 400);
  background(0);
  angleMode(DEGREES);
  noStroke();

  columns.push(new Maze(s, -width / 8, 0));
  columns.push(new Maze(s, (width * 1) / 8, (width * 1) / 4));
  columns.push(new Maze(s, (width * 3) / 8, (width * 1) / 2));
  columns.push(new Maze(s, (width * 5) / 8, (width * 3) / 4));
  columns.push(new Maze(s, (width * 7) / 8, width));

  for (let c of columns) {
    c.addRow();
  }
}

function draw() {}

// Function to save the canvas as an image when 's' key is pressed
function keyPressed() {
  if (key === "s" || key === "S") {
    save("img.jpg");
  }
}
