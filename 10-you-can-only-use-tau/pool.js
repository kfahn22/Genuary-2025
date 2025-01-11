class Pool {
  constructor(m, n) {
    this.m = m;
    this.n = n;
    this.light = this.m * this.m * this.n;
    this.points = [];
  }

  showRect(x, y, w, h, c) {
    push();
    fill(c);
    noStroke();
    rect(x, y, w, h);
    pop();
  }

  laneLines(x, y, w, h, c) {
    push();
    fill(c);
    noStroke();
    rect(x, y, w, h);
    pop();
  }

  bubbles(x, y) {
    let nn = this.n * this.n;
    push();
    translate(x, y);
    fill(this.light, this.light, this.light, nn + nn);
    noStroke();
    ellipse(x, y, this.m, this.m);
    pop();
  }

  
}