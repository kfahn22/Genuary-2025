let spriteSheet;
let pattern;
let patterns = [];
let cols = 4; // Number of columns in the sprite sheet
let rows = 4; // Number of rows in the sprite sheet
let spriteSize;
let palette = [];

let url =
    "https://supercolorpalette.com/?scp=G0-hsl-186C91-22ACCE-54D5E3-91EDED-CFF7F3";

function extractHexCodes(url) {
  let startIndex = url.indexOf("=");
  let hexPart = url.substring(startIndex + 1);
  let parts = hexPart.split("-");
  return parts.filter((part) => /^[0-9A-Fa-f]{6}$/.test(part));
}

function hexToColor(hex, alpha) {
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  // let alpha = map(overlap, 0.25, 1.0, 50, 225);
  return color(r, g, b, alpha);
}

function generatePaletteArray(url, alpha) {
  let hexCodes = extractHexCodes(url);
  return hexCodes.map((hex) => hexToColor(hex, alpha));
}

let uniqueConfigs = new Set(); // Set to store unique pattern configurations

function setup() {
  createCanvas(512, 512);
  angleMode(DEGREES);
  spriteSize = width / cols;
  spriteSheet = createGraphics(width, height);

  // Create patterns with buffers
  for (let i = 0; i < cols * rows; i++) {
    let buffer = createGraphics(spriteSize, spriteSize); // Create buffer for the pattern
    let config;

    // Ensure unique configuration
    do {
      let n = 3;
      let overlap = random(0.75, 1.0);
      let depth = int(random(2, 4));
      let a = map(overlap, 0.5, 1.0, 150, 225);
      palette = generatePaletteArray(url, 220);
      // Create a unique string for this configuration
      config = `${n}-${overlap.toFixed(2)}-${depth}`;

      if (!uniqueConfigs.has(config)) {
        uniqueConfigs.add(config); // Mark configuration as used
        pattern = new Pattern(buffer, n, overlap, palette); 
        // Translate to center of buffer
        buffer.translate(spriteSize / 2, (spriteSize * 1) / 2);
        push();
        pop();
        let idx = int(random(palette.length - 1));
        pattern.drawPattern(createVector(0, 0), spriteSize * 0.6, depth, idx);
      }
    } while (!pattern); // Repeat until a unique snowflake is generated

    patterns.push(pattern);
  }

  // Draw snowflakes onto the sprite sheet
  spriteSheet.background("#0E3753");
  for (let i = 0; i < patterns.length; i++) {
    let x = (i % cols) * spriteSize;
    let y = int(i / cols) * spriteSize;

    patterns[i].show(); // Render the pattern onto its buffer

    spriteSheet.image(patterns[i].buffer, x, y); // Draw the buffer onto the sprite sheet
  }

  // Display the sprite sheet on the main canvas
  image(spriteSheet, 0, 0);
  saveCanvas(spriteSheet, "sprite_sheet", "jpg");
}

function draw() {
  noLoop();
}
