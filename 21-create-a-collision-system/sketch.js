// Genuary 21: Create a collision system from scratch
// REALLY trivial change in Daniel's code;
// Daniel Shiffman
// http://natureofcode.com
// https://thecodingtrain.com/challenges/184-elastic-collisions
// https://editor.p5js.org/codingtrain/sketches/z8n19RFz9

let particles = [];
let sum = 0;
let frames = 120;

function keyPressed() {
  if (key == "s") {
    const options = {
      units: "frames",
      delay: 0,
    };
    saveGif("GIF/collision.gif", frames, options);
  }
}

// Making sure pairs of particles are not checked twice
let checkedPairs = new Set();
function setup() {
  createCanvas(640, 640);
  colorMode(HSB);
  for (let i = 0; i < 30; i++) {
    let x = random(width);
    let y = random(height);
    let mass = random(50, 150);
    particles.push(new Particle(x, y, mass, i));
  }
}

function draw() {
  background(0);
  sum = 0;

  // Create a quadtree
  let boundary = new Rectangle(width / 2, height / 2, width, height);
  let qtree = new QuadTree(boundary, 4);
  checkedPairs.clear();

  // Insert all particles
  for (let particle of particles) {
    let point = new Point(particle.position.x, particle.position.y, particle);
    qtree.insert(point);
  }

  for (let i = 0; i < particles.length; i++) {
    let particleA = particles[i];
    let range = new Circle(
      particleA.position.x,
      particleA.position.y,
      particleA.r * 2
    );

    // Check only nearby particles based on quadtree
    let points = qtree.query(range);
    for (let point of points) {
      let particleB = point.userData;
      if (particleB !== particleA) {
        let idA = particleA.id;
        let idB = particleB.id;
        let pair = idA < idB ? `${idA},${idB}` : `${idB},${idA}`;
        if (!checkedPairs.has(pair)) {
          particleA.collide(particleB);
          checkedPairs.add(pair);
        }
      }
    }
  }


  for (let particle of particles) {
    sum += particle.count;
    particle.update();
    particle.edges();
    //particle.show();
  }
   for (let particle of particles) {
    particle.show(sum);
  }

  if (frameCount % 120 == 0) {
   // console.log(frameRate());
  }
}

function mousePressed() {
  save("21.jpg");
}