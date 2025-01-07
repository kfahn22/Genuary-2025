// This code ia a p5 implementation of the Persian Rug algorithm and generates a random Persian Rug from a color palettte
// Note that it is possible to randomly get a boring rug. Just press play again until you get a nice one!

// Read about the Persian rug algorithm; https://archive.bridgesmathart.org/2005/bridges2005-9.pdf

// Learn more here: https://github.com/kfahn22/Persian-Rug

// To learn more about recursion, watch Daniel Shiffman's Recursion Coding Challenge
// https://thecodingtrain.com/challenges/77-recursion

// Based on this Processing sketch (https://github.com/kfahn22/Persian-Rug/blob/main/sketch.pdez), which is adapted from https://stackoverflow.com/questions/26226531/persian-rug-recursion

// I am using the method for choosing colors from Dr. Eric Gossett https://www.youtube.com/watch?v=0wfPlzPvZiQ

let n = 10;
let sw = 2; // Adjust as desired to change look of rug
let palette = [];
let colorIndexArray = [];

// let url =
//   "https://supercolorpalette.com/?scp=G0-hsl-6A2962-70367D-69438E-60519E-666FA9-7D94B0-94AFB8-A9C1BF-BDCBC6-D0D7D2-E2E4E2-F2F2F2";

// I am getting the palette from supercolorpalette.com because this is a convienent way to get a consistent color array with 12 values
let url =
  "https://supercolorpalette.com/?scp=G0-hsl-FF910A-FFAB0F-FFD452-3BBA8D-10948F-06678E";

// Helper functions to convert the url to the color palette
function extractHexCodes(url) {
  let startIndex = url.indexOf("=");
  let hexPart = url.substring(startIndex + 1);
  let parts = hexPart.split("-");

  // Filter valid hex codes
  return parts.filter((part) => /^[0-9A-Fa-f]{6}$/.test(part));
}

function hexToColor(hex) {
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  return color(r, g, b);
}

function generatePaletteArray(url) {
  let hexCodes = extractHexCodes(url);
  return hexCodes.map((hex) => hexToColor(hex));
}

function setup() {
  let canvasSize = Math.pow(2, n) + 1; // 257 x 257 for n = 8
  createCanvas(canvasSize, canvasSize);
  noLoop();
  palette = generatePaletteArray(url);
  //console.log(palette);

  // Initialize the color index array
  colorIndexArray = Array(canvasSize)
    .fill()
    .map(() => Array(canvasSize).fill(0));

  // Draw border
  let w = canvasSize - 1;
  drawBorder(0, 0, w, w, 0);

  // Choose colors for the internal grid
  let shift = floor(random(1, palette.length));
  chooseColor(0, w, 0, w, shift);

  // Save the result
  // saveCanvas("persian_rug", "jpg");
}

function drawBorder(left, top, right, bottom, colorIndex) {
  let c = palette[colorIndex];
  stroke(c);
  strokeWeight(sw);
  line(left, top, right, top); // Top
  line(left, bottom, right, bottom); // Bottom
  line(left, top, left, bottom); // Left
  line(right, top, right, bottom); // Right
}

function chooseColor(left, right, top, bottom, shift) {
  if (left < right - 1) {
    let newIndex =
      (getIndex(colorIndexArray[left][top]) +
        getIndex(colorIndexArray[right][top]) +
        getIndex(colorIndexArray[left][bottom]) +
        getIndex(colorIndexArray[right][bottom]) +
        shift) %
      palette.length;

    let col = palette[newIndex];
    let midCol = floor((left + right) / 2);
    let midRow = floor((top + bottom) / 2);

    // Draw middle lines
    stroke(col);
    strokeWeight(sw);
    line(left + 1, midRow, right - 1, midRow); // Horizontal
    line(midCol, top + 1, midCol, bottom - 1); // Vertical

    // Update color index array
    colorIndexArray[midCol][midRow] = newIndex;

    // Recursive calls
    chooseColor(left, midCol, top, midRow, shift);
    chooseColor(midCol, right, top, midRow, shift);
    chooseColor(left, midCol, midRow, bottom, shift);
    chooseColor(midCol, right, midRow, bottom, shift);
  }
}

function getIndex(colorIndex) {
  // Directly use the color index from the array
  return colorIndex;
}

function mousePressed() {
  save("rug.jpg");
}
