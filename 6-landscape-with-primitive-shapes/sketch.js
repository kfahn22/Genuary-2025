// https://editor.p5js.org/codingtrain/sketches/OPYPc4ueq

let angle = 0;

const detail = 30;
const r = 150;
const scl = 100;
let flying = 0;

const frames = 60;
let myGeometry;
let img;

function keyPressed() {
  if (key == "s") {
    const options = {
      units: "frames",
      delay: 0,
    };
    saveGif("GIF/mountain.gif", frames, options);
  }
}

function setup() {
  createCanvas(600, 600, WEBGL);
  pixelDensity(1);
}

function draw() {
  background(67, 87, 173);
  translate(-50, 0);
  rotateX(PI / 3);
  
  flying -= 0.1;
  addTerrainGeometry(flying);

  ambientLight(139, 93, 51);

  directionalLight(139, 93, 51, 0, 0, 1);
  directionalLight(139, 93, 51, 0, 0, -1);

  translate((-width * 3) / 4, -height / 2);
  
  model(myGeometry);
  freeGeometry(myGeometry);
  
}

function addTerrainGeometry(flying) {
  let yoff = flying;

  myGeometry = new p5.Geometry(detail, detail, function () {
    for (let i = 0; i < detail + 1; i++) {
      let xoff = 0;
      let lat = map(i, 0, detail, 0, 3 * PI);

      for (let j = 0; j < detail + 1; j++) {
        let lon = map(j, 0, detail, 0, 3 * PI);
        let x = lon * scl;
        let y = lat * scl;
        let z = map(noise(xoff, yoff), 0, 1, -100, 100);
        xoff += 0.2;
        
        this.vertices.push(new p5.Vector(x, y, z));
        // console.log(this.vertices[0])
        
      }
      yoff += 0.2;
    }
    // this will attach all our vertices and create faces automatically
    this.computeFaces();
    // this will calculate the normals to help with lighting
    this.computeNormals();
  });
}



// Function to save the canvas as an image when 's' key is pressed
// function keyPressed() {
//   if (key === "s" || key === "S") {
//     save("img.jpg");
//   }
// }

function mousePressed() {
  save("terrain.jpg");
}
