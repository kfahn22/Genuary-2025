let font;
let s = "black";
let w;

function preload() {
    font = loadFont("Cubano.ttf");
}

function setup() {
    createCanvas(512, 512);
    background(0);
    textFont(font);
    textSize(11)
    w = ceil(textWidth(s));
    addGrid(s, w, 10)
}

function addGrid(s, w, h) {
    for (let y = 0; y < width; y += h) {
      for (let x = 0; x < height; x += w) {
        let i = 0;
        let d = dist(width / 2, height / 2, x, y);
        let max = dist(width / 2, height / 2, width, height);
        let a = map(d, 0, pow(max,1.1), 0, 255);
        noStroke();
        fill(255, 255, 255, a);
        textAlign(LEFT, TOP);
        text(s, x+i*w, y);
        i += 1;
      }
    }
  }

function mousePressed() {
    save("4.jpg");
}