class CornuSpiral {
  constructor(sc) {
    this.sc = sc;
    this.points = [];
  }

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

  addPoints(a) {
    let numPoints = 200;
    let maxT = a * PI;
    for (let i = 0; i < numPoints; i++) {
      let t = map(i, 0, numPoints, -maxT, maxT);
      let x = this.sc * this.fresnelC(t);
      let y = this.sc * this.fresnelS(t);
      this.points.push(createVector(x, y));
    }
  }

  openShow(angle) {
    push();
    rotate(angle);
    stroke(255);
    noFill()
    strokeWeight(3);
    beginShape();
    for (let p of this.points) {
      vertex(p.x, p.y);
    }
    endShape();
    pop();
  }
}
