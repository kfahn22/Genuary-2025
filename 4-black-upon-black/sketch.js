let font;
let w = 16;

function preload() {
    font = loadFont("Cubano.ttf");
}

function setup() {
    createCanvas(512, 512);
    background(0);
    layer1 = new Grid(width, w, w, font);
    layer1.addGrid();
}

function mousePressed() {
    save("4.jpg");
}