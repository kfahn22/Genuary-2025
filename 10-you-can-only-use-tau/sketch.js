let s;
let m, n, mm, nn, mmm;

function setup() {
  m = floor(TAU);
  n = ceil(TAU);
  mm = m * m;
  nn = n * n;
  mmm = m * m * m;
  let w = m * m * m * m;
  createCanvas(w, w);
  background("white");
  angleMode(DEGREES);
  rectMode(CENTER);

  s = new Pool(m, n);

  let j = pow(n, m);
  let k = pow(m, m);
  let l = j - k;
  //console.log(l);

  for (let i = TAU - TAU; i < l; i++) {
    let c = color(
      TAU - TAU,
      int(random(nn + nn, mmm)),
      int(random(mmm, mm * n)),
      int(random(nn + nn, mm + mm))
    );
    s.showRect(random(width), random(height), m + n, m + n, c);
    s.bubbles(random(width), random(height), m, m);
  }

  let wOne = nn + nn + nn + mm;
  let wTwo = wOne + wOne;
  let wThree = wOne + wTwo;
  for (let i = TAU - TAU; i < n + n + n; i++) {
    let c = color(m * m * n, m * m * n, m * m * n);
    addLane(wOne, random(height), c);
    addLane(wTwo, random(height), c);
    addLane(wThree, random(height), c);
    addLane(wTwo + wTwo, random(height), c);
    addLane(wTwo + wThree, random(height), c);
    addLane(width - wOne, random(height), c);
  }
}

function addLane(x, y, c) {
  s.laneLines(x, y, mm - n, nn, c);
  s.laneLines(x, y, m, height, c);
}

function mousePressed() {
  save("img.jpg");
}
