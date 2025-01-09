class Superellipse {
  constructor(sc, a, b, m, sw, url) {
    this.sc = sc;
    this.a = a;
    this.b = b;
    this.m = m;
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
   
  }

  polygon() {
    for (let theta = 0; theta < TWO_PI; theta += TWO_PI / this.m) {
      let x = this.r * cos(theta);
      let y = this.r * sin(theta);
      this.points.push(createVector(x, y));
    }
  }

  // https://thecodingtrain.com/challenges/19-superellipse
  sgn(val) {
    if (val == 0) {
      return 0;
    }
    return val / abs(val);
  }

  addPoints() {
    for (let theta = 0; theta < TWO_PI; theta += 0.05) {
      let na = 2 / this.m;
      let x = this.sc * pow(abs(cos(theta)), na) * this.a * this.sgn(cos(theta));
      let y = this.sc * pow(abs(sin(theta)), na) * this.b * this.sgn(sin(theta));
      this.points.push(createVector(x, y));
    }
  }

  show() {
    push();
    let palette = this.generatePaletteArray(this.url);
    let c = random(palette);
    // c[3] = 255;
    fill("red");
    stroke("yellow");
    strokeWeight(3);
    beginShape();
    for (let p of this.points) {
      vertex(p.x, p.y);
    }
    endShape(CLOSE);
    pop();
  }
}
