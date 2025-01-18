class Wind {
  constructor(nrows, ncols, r, url) {
    this.nrows = nrows;
    this.ncols = ncols;
    this.w = width / nrows;
    this.h = height / ncols;
    this.r = r;
    this.url = url;
    this.palette = this.generatePaletteArray(url);
    this.points = [];
    this.spirals = [];
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

  // https://mathcurve.com/courbes2d.gb/cornu/cornu.shtml
  // https://virtualmathmuseum.org/Curves/clothoid/kappaCurve.html

  fresnelC(t) {
    let sum = 0;
    let n = 50;
    let dt = t / n;
    for (let i = 0; i < n; i++) {
      let u = i * dt;
      sum += cos((u * u) / 2) * dt;
    }
    return sum;
  }

  fresnelS(t) {
    let sum = 0;
    let n = 50;
    let dt = t / n;
    for (let i = 0; i < n; i++) {
      let u = i * dt;
      sum += sin((u * u) / 2) * dt;
    }
    return sum;
  }

  cornuSpiral(a, r) {
    let numPoints = 200;
    let maxT = a * PI;

    beginShape();
    for (let i = 0; i < numPoints; i++) {
      let t = map(i, 0, numPoints, -maxT, maxT);
      let x = r * this.fresnelC(t);
      let y = r * this.fresnelS(t);
      vertex(x, y);
    }
    endShape();
  }

  show(x, y, shapeAngle) {
    noFill();
    push();
    translate(x, y);
    rotate(shapeAngle);
    this.cornuSpiral(random(0.3, 0.5), random(this.r * 0.5, this.r));
    pop();
  }

  addStorm() {
    // Sine curve parameters
    let amplitude = 3 * this.h;
    let frequency = (TWO_PI / this.w) * this.ncols;

    for (let col = 0; col < this.ncols; col++) {
      for (let row = 0; row < this.nrows; row++) {
        // Calculate x and y positions
        let x = col * random(this.w);
        let sineOffset = amplitude * sin(frequency * col);
        let y = row * this.h + sineOffset;

        // Adjust strokeWeight based on distance from middle row and ncols
        let middleRow = this.nrows / 2;
        let distRow = abs(row - middleRow);

        let middleCol = this.ncols / 2;
        let distCol = abs(col - middleCol);

        // Decrease max weight as ncols increases
        let maxStrokeWeight = map(distCol, 0, 10, 8, 1);

        // Calculate strokeWeight based on distance from middle row
        let weight = map(distRow, 0, middleRow, maxStrokeWeight, 0);
        this.spirals.push(this.cornuSpiral(random(0.25, 0.45)));
        strokeWeight(weight);
        noFill();
        let c = random(this.palette);
        c[3] = randomGaussian(160, 10);
        stroke(c);
        this.show(x, y, random(-PI / 8, PI / 16));
      }
    }
  }
}
