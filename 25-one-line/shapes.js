const e = 2.71828;

class Shape {
  constructor(x, y, r, a, b, m, n1, n2, n3, n, d, angle) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.a = a;
    this.b = b;
    this.n1 = n1;
    this.n2 = n2;
    this.n3 = n3;
    this.m = m;
    this.n = n;
    this.d = d;
    this.angle = angle;
    this.points = [];
  }

  arc(sc) {
    for (let theta = 0; theta < this.a * PI; theta += 0.05) {
      let x = sc * cos(theta);
      let y = sc * sin(theta);
      this.points.push(createVector(x, y));
    }
  }

  // Butterfly curve equation from http://paulbourke.net/geometry/butterfly/
  butterfly() {
    for (let theta = 0; theta < 8 * PI; theta += 0.05) {
      let r =
        pow(e, sin(theta)) -
        2 * cos(4 * theta) +
        pow(sin((2 * theta - PI) / 24), 5);
      const x = this.r * r * cos(theta);
      const y = -this.r * r * sin(theta);
      this.points.push(createVector(x, y));
    }
  }

  // https://mathcurve.com/courbes2d/ornementales/ornementales.shtml
  butterfly2() {
    for (let theta = 0; theta < 2 * PI; theta += 0.01) {
      let r = -3 * cos(2 * theta) + sin(7 * theta) - 1;
      //let r = -this.a * cos(this.m * theta) + sin(this.d * theta) - 1;
      const x = this.r * r * cos(theta);
      const y = -this.r * r * sin(theta);
      this.points.push(createVector(x, y));
    }
  }

  // http://paulbourke.net/geometry/chrysanthemum/

  chrysanthemum() {
    let N = 30000;
    for (let theta = 0; theta < N; theta += 1) {
      let u = (theta * 21.0 * PI) / N;
      let r =
        this.a *
        (5 * (1 + sin((11 * u) / 5)) -
          4 * pow(sin((17 * u) / 3), 4) * pow(sin(2 * cos(3 * u) - 28 * u), 8));
      let x = this.r * r * cos(u);
      let y = this.r * r * sin(u);
      this.points.push(createVector(x, y));
    }
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

  cornuSpiral() {
    let numPoints = 200;
    let maxT = this.a * PI;
    for (let i = 0; i < numPoints; i++) {
      let t = map(i, 0, numPoints, -maxT, maxT);
      let x = this.n + this.r * this.fresnelC(t);
      let y = this.n + this.r * this.fresnelS(t);
      this.points.push(createVector(x, y));
    }
  }

  // https://mathcurve.com/courbes2d/ornementales/ornementales.shtml

  knot() {
    for (let theta = -2 * PI; theta < 2 * PI; theta += 0.1) {
      let x = 0.5 * this.r * (3 * sin(theta) + 2 * sin(3 * theta));
      let y = 0.5 * this.r * (cos(theta) - 2 * cos(3 * theta));
      this.points.push(createVector(x, y));
    }
  }

  // https://mathworld.wolfram.com/DumbbellCurve.html
  // https://thecodingtrain.com/challenges/116-lissajous-curve-table

  showLine(x, y, sc) {
    //this.points.push(createVector(x, y));
    this.points.push(createVector(sc * x, sc * y));
  }

  // https://mathcurve.com/courbes2d.gb/lissajous/lissajous.shtml
  // https://thecodingtrain.com/challenges/116-lissajous-curve-table

  lissajous() {
    for (let theta = -2 * PI; theta <= 2 * PI; theta += 0.01) {
      let x = this.r * sin(this.a * theta + this.m) + 1;
      let y = this.r * sin(this.b * theta);
      this.points.push(createVector(x, y));
    }
  }

  // https://mathworld.wolfram.com/Ophiuride.html

  ophiuride() {
    for (let theta = (-PI * 1) / 2; theta < (PI * 1) / 2; theta += 0.05) {
      let r = (this.b * sin(theta) - this.a * cos(theta)) * tan(theta);
      let x = this.r * r * cos(theta);
      let y = this.r * r * sin(theta);
      this.points.push(createVector(x, y));
    }
  }

  // https://mathcurve.com/courbes2d.gb/rosace/rosace.shtml
  // https://thecodingtrain.com/challenges/55-mathematical-rose-patterns
  // https://editor.p5js.org/codingtrain/sketches/3kanFIcHd

  reduceDenominator(numerator, denominator) {
    function rec(a, b) {
      return b ? rec(b, a % b) : a;
    }
    return denominator / rec(numerator, denominator);
  }

  rose() {
    let k = this.d / this.m;
    for (
      let theta = 0;
      theta < TWO_PI * this.reduceDenominator(this.d, this.m);
      theta += 0.02
    ) {
      let r = this.r * cos(k * theta);
      let x = r * cos(theta);
      let y = r * sin(theta);
      this.points.push(createVector(x, y));
    }
  }

  folium(x, y, sc) {
    push();
    translate(x, y);
    for (let theta = 0; theta < PI; theta += 0.05) {
      let v0 = sc * (2 * pow(sin(theta), 2) * cos(theta));
      let v1 = sc * (2 * pow(cos(theta), 2) * sin(theta));
      this.points.push(createVector(v0, v1));
    }
    pop();
  }

  // https://mathcurve.com/courbes2d.gb/archimede/archimede.shtml
  // https://mathcurve.com/courbes2d.gb/spirale/spirale.shtml
  // this.n = 1 Archimedian Spiral
  // this.n = -1 Hyperbolic Spiral
  // this.n = 1/2 Fermat spiral
  // this.n = -1/2 Lituus spiral
  // this.n = 2 Galilean spiral
  spiral(x, y, sc, dir) {
    //0.5 * PI;

    for (let theta = 0; theta < 3.25 * PI; theta += 0.05) {
      let r = dir * this.a * pow(theta, this.n);
      //let r = this.a * pow(theta, this.n);
      let v0 = x + sc * r * cos(theta);
      let v1 = y + sc * r * sin(theta);
      this.points.push(createVector(v0, v1));
    }
  }

  reverseSpiral(x, y, sc, dir) {

    for (let theta = 3.25* PI; theta >= 0 ; theta -= 0.05) {
      let r = dir * this.a * pow(theta, this.n);
      let v0 = x + sc * r * cos(theta);
      let v1 = y + sc * r * sin(theta);
      this.points.push(createVector(v0, v1));
    }
  }

  // https://mathcurve.com/courbes2d.gb/larme/larme.shtml

  tearDrop() {
    let n = 4;
    for (let theta = 0; theta < TWO_PI; theta += 0.1) {
      let x = this.r * cos(theta);
      let y = this.r * sin(theta) * pow(sin(theta / 2), n);
      this.points.push(createVector(x, y));
    }
  }

  //https://mathcurve.com/courbes2d.gb/moulinavent/moulinavent.shtml
  windmill() {
    for (let theta = 0; theta < 2 * PI; theta += 0.01) {
      let r = abs(this.m * tan(2 * theta)) + this.a;
      let x = this.r * r * cos(theta);
      let y = this.r * r * sin(theta);
      this.points.push(createVector(x, y));
    }
  }

  openShow(x, y, angle, spacing) {
    push();
    translate(x * spacing, y * spacing);
    rotate(angle);
    beginShape();
    for (let p of this.points) {
      vertex(p.x, p.y);
    }
    endShape();
    pop();
  }
}
