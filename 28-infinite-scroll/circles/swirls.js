class Swirl {
  constructor(w) {
    this.w = w;
    // this.col = random(colors);
    this.sw = random(0.5, 1.5);
    this.n = 20;
    this.colors = [
      [98, 182, 203],
      [190, 233, 232],
      [202, 233, 255],
     [95, 168, 211],
     
    ]
    this.col = random(this.colors);
  }

  swirl() {
    //translate(width / 2, height / 2);
    for (let i = 0; i < this.n; i++) {
      stroke(random(this.colors));
      strokeWeight(this.sw);
      noFill();
      let x = random(2);
      let y = random(2);
      let r = random(this.w);
      circle(x, y, r);
    }
  }

  show(x, y) {
    push();
    translate(x, y);
    this.swirl();
    pop();
  }
}
