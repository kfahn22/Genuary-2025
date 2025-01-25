class ContructLine {
  constructor(x, y, spacing, r, angle, url) {
    this.x = x;
    this.y = y;
    this.spacing = spacing;
    this.r = r;
    this.s = this.spacing * this.r;
    this.points = [];
    this.angle = angle;
    this.url = url;
    this.palette = this.generatePaletteArray(this.url);
    // x, y, r, a, b, m, n1, n2, n3, n, d, angle
    this.shape = new Shape(this.x, this.y, this.s, 1, 1, 1, 1, 1, 1, 1, 1, 0);
  }

  extractHexCodes(url) {
    let startIndex = url.indexOf("=");
    let hexPart = url.substring(startIndex + 1);
    let parts = hexPart.split("-");
    return parts.filter((part) => /^[0-9A-Fa-f]{6}$/.test(part));
  }

  hexToColor(hex, alpha) {
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    return color(r, g, b, 255);
  }

  generatePaletteArray(url, alpha) {
    let hexCodes = this.extractHexCodes(url);
    return hexCodes.map((hex) => this.hexToColor(hex, alpha));
  }

spiral(a, b, c) {
     this.shape.spiral((a) * spacing, (b) * spacing, c, -1);
}
  spiralLine(a, b, c, d, n) {
    this.shape.points = [];
    for (let i = 0; i < n; i++)
  {  this.shape.spiral((a + i) * spacing, (b+i) * spacing, c, -1);
    this.shape.reverseSpiral((a + i + 1) * spacing, (b + i + 1) * spacing, d, 1);}
  }

  show(a, b, angle) {
    //stroke(random(this.palette));
    stroke(this.palette[0])
    strokeWeight(2.5);
    noFill();
    this.shape.openShow(a, b, angle, this.spacing);
  }
}
