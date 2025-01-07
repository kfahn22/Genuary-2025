class Maze {
  constructor(s, a, b) {
    this.s = s;
    this.a = a;
    this.b = b;
    this.url =
      "https://supercolorpalette.com/?scp=G0-hsl-BF1FFF-C846FB-D16CF9-DB91F8-E5B4F8-F0D6FA";
    this.palette = this.generatePaletteArray(this.url);
    this.lsystem = null;
  }

  // Helper functions to convert the url to the color palette
  extractHexCodes(url) {
    let startIndex = url.indexOf("=");
    let hexPart = url.substring(startIndex + 1);
    let parts = hexPart.split("-");

    // Filter valid hex codes
    return parts.filter((part) => /^[0-9A-Fa-f]{6}$/.test(part));
  }

  hexToColor(hex) {
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    return color(r, g, b);
  }

  generatePaletteArray(url) {
    let hexCodes = this.extractHexCodes(url);
    return hexCodes.map((hex) => this.hexToColor(hex));
  }

  polygon(s, sign, i) {
    let apothem = this.triApothem(s);
    let r = s / sqrt(3);
    fill(this.palette[i]);
    push();
    scale(sign, 1);
    translate(apothem, 0);

    beginShape();
    for (let theta = 0; theta < 360; theta += 120) {
      let v0 = r * cos(theta);
      let v1 = r * sin(theta);
      vertex(v0, v1);
    }
    endShape(CLOSE);
    pop();
  }

  // Apothem for equilateral triangle
  triApothem(s) {
    return s / (6 * tan(30));
  }

  diamond(x, y) {
    push();
    translate(x, y);
    // draw larger diamond
    push();
    this.polygon(this.s, 1, 5);
    pop();
    push();
    this.polygon(this.s, -1, 5);
    pop();
    // draw smaller diamond
    push();
    this.polygon(this.s / 2, 1, 3);
    pop();
    push();
    this.polygon(this.s / 2, -1, 0);
    pop();
    pop();
  }

  section(x, y) {
    let h = (sqrt(3) / 2) * s;
    fill(this.palette[3]);
    rect(x - h, y, h, 2 * h);
    fill(this.palette[0]);
    rect(x, y, h, 2 * h);
    this.diamond(x, y, this.s);
  }

  addRow() {
    for (let i = 0; i <= width; i += width / 2) {
      this.section(i, this.a);
    }

    for (let i = width / 4; i <= width * 0.75; i += width / 2) {
      this.section(i, this.b);
    }
  }
}
