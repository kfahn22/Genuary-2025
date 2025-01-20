let points = []

  function setup() {
    createCanvas(800, 800);
    background(58, 8, 66)

    shadowColor = color(191, 174, 72, 150);
    shadowOffsetX = 8;
    shadowOffsetY = 8;
    shadowBlur = 5;
    //Apply the shadow
    shadow(shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor);
    translate(width/2, height/2)
    spiral(7, 1);

   
  }

  // https://mathcurve.com/courbes2d.gb/archimede/archimede.shtml
  // https://mathcurve.com/courbes2d.gb/spirale/spirale.shtml
  // this.n = 1 Archimedian Spiral
  // this.n = -1 Hyperbolic Spiral
  // this.n = 1/2 Fermat spiral
  // this.n = -1/2 Lituus spiral
  // this.n = 2 Galilean spiral
  function spiral(sc, n) {
    let a = 1;
    let dir = -1;
    for (let theta = 0; theta < 12 * PI; theta += 0.04) {
      let r = dir * a * pow(theta, n);
      let x = sc * r * cos(theta);
      let y = sc * r * sin(theta);
      push();
      fill(95, 173, 65, 150);
      rect(x, y, 6, 40);
      pop();
      
    }
  }

  function mousePressed() {
    save("19.jpg");
  }
