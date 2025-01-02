class Grid {
  constructor(s, w, h, font) {
    this.s = s;
    this.w = w;
    this.h = h;
    this.font = font;
  }

  addGrid() {
    for (let y = 0; y < this.s; y += this.h) {
      for (let x = 0; x < this.s; x += this.w) {
        let d = dist(width/2, height/2, x, y);
        let max = dist(width/2, height/2, width, height);
        let a = map(d, 0, max, 0, 255);
        noStroke();
        fill(255, 255, 255, a);
        strokeWeight(4);
        textFont(this.font);
        text("0", x+this.w*1/4, y+this.h*3/4);
      }
    }
  }
}
