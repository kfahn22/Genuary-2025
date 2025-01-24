class MoreShapes {
  constructor(x, y, s, n) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.n = n;
    // this.strokePalette = strokePalette;
    // this.fillPalette = fillPalette;
    this.url =
      "https://supercolorpalette.com/?scp=G0-hsl-FFA91F-FF9924-FF8929-FF7B2E-FF6D33-FF6038-8B1FFF-961FFF-A11FFF-AD1FFF-B81FFF-C31FFF";
    this.palette = this.generatePaletteArray(this.url);
  }
  extractHexCodes(url) {
    let startIndex = url.indexOf("=");
    let hexPart = url.substring(startIndex + 1);
    let parts = hexPart.split("-");
    return parts.filter((part) => /^[0-9A-Fa-f]{6}$/.test(part));
  }

  hexToColor(hex) {
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    return color(r, g, b, 150);
  }

  generatePaletteArray(url) {
    let hexCodes = this.extractHexCodes(url);
    return hexCodes.map((hex) => this.hexToColor(hex));
  }

  alternatingSquares() {
    push();
    translate(this.x, this.y);
    stroke("#2A1FFF");
    for (let i = 0; i < this.n; i += 1) {
      fill(random(this.palette));
      square(i * this.s, i * this.s, this.s);
    }
    pop();
  }

  alternatingCircles() {
    push();
    translate(this.x, this.y);
    stroke("#2A1FFF");
    for (let i = 0; i < this.n; i += 1) {
      fill(random(this.palette));
      circle(i * this.s, i * this.s, 1.5 * this.s);
    }
    pop();
  }

  grid(x, y, n) {
    let s = 1.5 * this.s;
    stroke("#2A1FFF");
    push();
    translate(x, y);
    rotate(PI/4);
    for (let i = 0; i < n; i++) {
       for (let j = 0; j < n; j++) {
    fill(random(this.palette));
    circle(i * s, j * s, s);
    }
  }
  pop();
}
  
}