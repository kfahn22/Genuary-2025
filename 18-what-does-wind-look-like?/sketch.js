let wind;
let nrows = 20;
let ncols = 20;

let url =
  "https://supercolorpalette.com/?scp=G0-hsl-7C7A99-8C8EAB-9EA5BD-B1BBCD-C6D1DD-DBE5EB-F2F6F8";



function setup() {
  createCanvas(810, 450);
  background("#7C7A99");
  wind = new Wind(nrows, ncols, 90, url);
  wind.addStorm();
}

function draw() {
}

function mousePressed() {
    save("wind.jpg");
}