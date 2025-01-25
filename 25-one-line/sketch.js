let url =
  "https://supercolorpalette.com/?scp=G0-hsl-FFDA1F-FFDE38-FFE252-FFE66B-FFEB85";
let gray = "https://supercolorpalette.com/?scp=G0-hsl-00020A-677983-6C7C7F";

let url2 =
  "https://supercolorpalette.com/?scp=G0-hsl-FF1FE9-FF1FFB-F01FFF-DD1FFF-CB1FFF";

let x;
let y;

let grid;
let l;
let spacing = 50;
let cols, rows;

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function setup() {
  createCanvas(800, 800);
  // cols = floor(width / spacing);
  // rows = floor(height / spacing);
  // x = cols / 2;
  // y = rows / 2;
  background(51);
  strokeWeight(2);
  let col0 = color("#FF1FE9");
  let col1 = color("#FF1FFB");
  let col2 = color("#F01FFF");
  let col3 = color("#CB1FFF");

  addRadialGradient(0, 0, 800, 800, col0, col1, col2, col3);
  

  //grid = make2DArray(cols, rows);
  // for (let x = 0; x < width; x += spacing) {
  //   for (let y = 0; y < height; y += spacing) {
  //     //stroke(255);
  //     point(x, y);
  //   }
  // }

  translate(25, 0);
  l = new ContructLine(0, 0, spacing, 1, 0, gray);
  addSpiral();
}

function addRadialGradient(x, y, w, h, col0, col1, col2, col3) {
  fillGradient("radial", {
    from: [400, 400, 0],
    to: [400, 400, 400],
    steps: [
      [color(col0), 0],
      [color(col1), 0.4],
      [color(col3), 1],
    ],
  });
  rect(x, y, w, h);
}

// Function to save the canvas as an image when 's' key is pressed
function keyPressed() {
  if (key === "s" || key === "S") {
    save("25.jpg");
  }
}

function addSpiral() {
  l.spiral(0.5, 0.5, 3.63);
  l.show(7, 7, 0);

  for (let i = 0; i < 3; i++) {
    l.spiralLine(0.5, 0.5, 3.63, 3.3, i * 2 + 1);
    l.show(8 + i * 2, 7, PI / 2);
    l.show(5 - i * 2, 7, 0);
  }

  for (let i = 0; i < 3; i++) {
    l.spiralLine(0.5, 0.5, 3.63, 3.3, i * 2 + 2);
    l.show(5 - i * 2, 8, -PI / 2);
    l.show(7, 5 - i * 2, 0);
  }

  l.spiralLine(0.5, 0.5, 3.63, 3.3, 7);
  l.show(14, 7, PI / 2);
}
