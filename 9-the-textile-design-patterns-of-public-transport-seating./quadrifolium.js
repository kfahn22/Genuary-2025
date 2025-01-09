class Quadrifolium {
  constructor(sc, sw, url) {
    this.sc = sc;
    this.sw = sw;
    this.url = url;
    this.points = [];
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
    return color(r, g, b, 240);
  }

  generatePaletteArray(url) {
    let hexCodes = this.extractHexCodes(url);
    return hexCodes.map((hex) => this.hexToColor(hex));
  }

  addPoints() {
    for (let theta = 0; theta < TWO_PI; theta += 0.05) {
      let x = this.sc * (2 * pow(sin(theta), 2) * cos(theta));
      let y = this.sc * (2 * pow(cos(theta), 2) * sin(theta));
      this.points.push(createVector(x, y));
    }
  }

  polygon() {
    for (let theta = 0; theta < TWO_PI; theta += TWO_PI / this.m) {
      let x = this.r * cos(theta);
      let y = this.r * sin(theta);
      this.points.push(createVector(x, y));
    }
  }

  // https://thecodingtrain.com/challenges/19-superellipse

  // this.n = 0.5 astroid
  sgn(val) {
    if (val == 0) {
      return 0;
    }
    return val / abs(val);
  }

  superellipse() {
    for (let theta = 0; theta < TWO_PI; theta += 0.05) {
      let na = 2 / this.m;
      let x = this.r * pow(abs(cos(theta)), na) * this.a * this.sgn(cos(theta));
      let y = this.r * pow(abs(sin(theta)), na) * this.b * this.sgn(sin(theta));
      this.points.push(createVector(x, y));
    }
  }

  show() {
    push();
    let palette = this.generatePaletteArray(this.url);
    let c = random(palette);
    fill(c);
    stroke(0);
    strokeWeight(3);
    beginShape();
    for (let p of this.points) {
      vertex(p.x, p.y);
    }
    endShape(CLOSE);
    pop();
  }
}
