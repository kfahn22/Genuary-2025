class Pattern {
  constructor(buffer, n, overlap, palette) {
    this.buffer = buffer;
    this.n = n; // Number of sides
    this.ctr = createVector(width / 2, height / 2);
    this.radius = height / 2;
    this.overlap = overlap;
    this.polygons = [];
    this.palette = palette;
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
    let alpha = map(this.overlap, 0.5, 1.0, 50, 255);
    return color(r, g, b, alpha);
    //return color(r, g, b, int(random(50, 180)));
  }

  generatePaletteArray(url) {
    let hexCodes = this.extractHexCodes(url);
    return hexCodes.map((hex) => this.hexToColor(hex));
  }

  drawPattern(center, radius, depth, colIdx) {
    if (depth === 0) {
      // Base case
      let points = this.polygon(center, radius, this.n);
      this.polygons.push({ points, color: this.palette[colIdx] });
    } else {
      // Radius and distance for smaller hexagons
      let newRadius = radius / 3;
      //let distance = 2*newRadius;
      let distance = ((1 + sqrt(5)) / 2) * newRadius;
      // Draw central shape
      this.drawPattern(center, newRadius, depth - 1, colIdx);

      // Draw surrounding shapes
      for (let theta = 0; theta < 360; theta += 360 / this.n) {
        let newCenter = createVector(
          center.x + distance * this.overlap * cos(theta),
          center.y + distance * this.overlap * sin(theta)
        );
        // Cycle colors
        let newColIdx = (colIdx + 1) % this.palette.length;
        this.drawPattern(newCenter, newRadius, depth - 1, newColIdx);
      }
    }
  }

  polygon(center, radius, n) {
    let points = [];
    for (let theta = 0; theta < 360; theta += 360 / n) {
      let x = center.x + radius * cos(theta);
      let y = center.y + radius * sin(theta);
      points.push(createVector(x, y));
    }
    return points;
  }

  // Apothem for equilateral triangle
  triApothem(s) {
    return s / (6 * tan(30));
  }

  show() {
    for (let i = 0; i < this.quads.length; i++) {
      this.buffer.angleMode(DEGREES);
      this.buffer.noStroke();
      this.buffer.fill(this.polygons[i].color);
      this.buffer.push();
      this.buffer.rotate(30);
      this.buffer.beginShape();
      for (let p of this.polygons[i].points) {
        this.buffer.vertex(p.x, p.y);
      }
      this.buffer.endShape(CLOSE);
      this.buffer.pop();
    }
  }
}
