// Reference for how to use p5 geometry
// https://p5js.org/learn/getting-started-in-webgl-custom-geometry.html

let myGeometry;
let ang = 0;
let rotation = true;
const R = 80;
const detail = 100; 


function setup() {
  createCanvas(600, 600, WEBGL);
  
  pixelDensity(1);

  myGeometry = new p5.Geometry(detail, detail, function () {
    for (let i = 0; i < detail + 1; i++) {
      let lat = map(i, 0, detail, 0, TWO_PI);

      for (let j = 0; j < detail + 1; j++) {
        let lon = map(j, 1, detail - 1, 0, PI);

        let x = R * pow(cos(lon), 3) * cos(lat);
        let y = R * pow(sin(lon), 3) * sin(lat);

        let z = R * cos(lon);

        this.vertices.push(new p5.Vector(x, y, z));
      }
    }
    // this will attach all our vertices and create faces automatically
    this.computeFaces();
    // this will calculate the normals to help with lighting
    this.computeNormals();
    this.averageNormals();
    this.averagePoleNormals();
  });
}

function draw() {
  background(202, 240, 248)
  
  //rotateY(ang);
  setAttributes("antialias", true);
  setAttributes("perPixelLighting", true);
  ambientLight(58, 79, 65, 255);

  lights();

  ambientMaterial(58, 79, 65);
  noStroke();

  // orbitControl allows us to control shape with the mouse
  //https://p5js.org/reference/#/p5/orbitControl
 orbitControl();

  // We need two directional lights coming from opposite directions
  // If we add different colors to each directional light, we get stripes
  directionalLight(255, 200, 87, 0, 0, 1);
  directionalLight(246, 189, 209, 0, 0, -1);

  push();
  //translate(0, 0, 100);
  tower();
  thatThingYouWalkOn(0, -170, 110);
  thatThingYouWalkOn(0, -90, 90);
  thatThingYouWalkOn(0, 0, 90);
  thatThingYouWalkOn(0, 90, 90);
  thatThingYouWalkOn(0, 190, 90);
  pop();

  push()
  rotateY(PI/4)
  addStairs(70, 205, 70)
  addStairs(55, 220, 80);
  addStairs(40, 235, 90);
  addStairs(25, 250, 100);
   addStairs(5, 265, 110);
  pop()

  if (rotation) {
    ang += 0.01;
  }
}

// Lots of naming conflicts...floor, ceil, top
function thatThingYouWalkOn(x, y, r) {
  push();
  translate(x, y, 0);
  cylinder(r, 10);
  pop();
}

function addStairs(x, y, z) {
  push()
  translate(x, y, z)
  rotateY(-PI/6)
  box(20, 5, 30);
  pop();
}

function tower() {
  push();
  towerFloor(-100, PI / 2);
  towerFloor(0, PI / 2);
  towerFloor(100, PI / 2);
  towerFloor(200, PI / 2);
  pop();
}

function towerFloor(translateY, angle) {
  push();
  translate(0, translateY);
  rotateZ(angle);

  model(myGeometry);
  pop();
  push();
  translate(0, translateY);
  //glass(0, -50, 80);
  rotateY(angle);
  rotateZ(angle);

  model(myGeometry);
  pop();
}

// https://mathcurve.com/courbes2d.gb/astroid/astroid.shtml
// https://mathworld.wolfram.com/Astroid.html
function astroid() {
  for (let theta = 0; theta < TWO_PI; theta += 0.05) {
    let x = this.r * this.a * pow(cos(theta), 3);
    let y = this.r * this.a * pow(sin(theta), 3);
    this.points.push(createVector(x, y));
  }
}

// Maybe someday I will figure out how to add windows...
// https://mathcurve.com/courbes2d.gb/bouche/bouche.shtml
function kissCurve(a, b, r) {
  beginShape();
  for (let theta = 0; theta < TWO_PI; theta += 0.05) {
    let x = a * r * cos(theta);
    let y = b * r * pow(sin(theta), 3);
    vertex(x, y);
  }
  endShape(CLOSE);
}

function glass(x, y, z) {
  push();
  fill(255, 0, 0);
  noStroke();
  translate(x, y, z);
  kissCurve(2, 2, 20);
  pop();
}

// function mousePressed() {
//   save("20.jpg");
// }
