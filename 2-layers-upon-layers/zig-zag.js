// https://mathcurve.com/courbes2d.gb/abdank/abdank.shtml

class Zigzag {
  constructor(x, y, sc, a, n, sw, url) {
    this.x = x;
    this.y = y;
    this.a = a; 
    this.n = n;
    this.sc = sc;
    this.points = [];
    this.sw = sw;
    this.url = url;
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
    return color(r, g, b, int(random(50, 80)));
  }

  generatePaletteArray(url) {
    let hexCodes = this.extractHexCodes(url);
    return hexCodes.map((hex) => this.hexToColor(hex));
  }

  addPoints() {
    for (let theta = -PI / 2; theta < this.a * PI; theta += 0.1) {
      let x = this.sc *  sin(theta);
      let y =
        ((this.sc * pow(this.n, 2)) / 2) * (theta + sin(theta) * cos(theta));
      this.points.push(createVector(x, y));
    }
  }

  openShow() {
    push();
    translate(this.x, this.y);
    let palette = this.generatePaletteArray(this.url);
    stroke(random(palette));
    strokeWeight(this.sw);
    beginShape();
    for (let p of this.points) {
      vertex(p.x, p.y);
    }
    endShape();
    pop();
  }

  show() {
    push();
    rotate(this.angle);
    beginShape();
    for (let p of this.points) {
      vertex(p.x, p.y);
    }
    endShape(CLOSE);
    pop();
  }
}
