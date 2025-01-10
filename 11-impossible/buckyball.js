class Buckyball {
  constructor(r, palette, images, font) {
    this.r = r;
    this.images = images;
    this.palette = palette;
    this.font = font;
    this.vert = [];
    this.faces = [];
  }

  // Vertices from https://www.goldennumber.net/bucky-balls/
  addVertices() {
    let phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
    this.vert.push(createVector(0, 1, 3 * phi));
    this.vert.push(createVector(0, 1, -3 * phi));
    this.vert.push(createVector(0, -1, 3 * phi));
    this.vert.push(createVector(0, -1, -3 * phi));
    this.vert.push(createVector(1, 3 * phi, 0));
    this.vert.push(createVector(1, -3 * phi, 0)); // 5
    this.vert.push(createVector(-1, 3 * phi, 0));
    this.vert.push(createVector(-1, -3 * phi, 0));
    this.vert.push(createVector(3 * phi, 0, 1));
    this.vert.push(createVector(3 * phi, 0, -1)); // 9
    this.vert.push(createVector(-3 * phi, 0, 1)); //10
    this.vert.push(createVector(-3 * phi, 0, -1));
    this.vert.push(createVector(2, 1 + 2 * phi, phi));
    this.vert.push(createVector(2, 1 + 2 * phi, -phi));
    this.vert.push(createVector(2, -(1 + 2 * phi), phi));
    this.vert.push(createVector(2, -(1 + 2 * phi), -phi)); // 15
    this.vert.push(createVector(-2, 1 + 2 * phi, phi));
    this.vert.push(createVector(-2, 1 + 2 * phi, -phi));
    this.vert.push(createVector(-2, -(1 + 2 * phi), phi));
    this.vert.push(createVector(-2, -(1 + 2 * phi), -phi));
    this.vert.push(createVector(1 + 2 * phi, phi, 2)); //20
    this.vert.push(createVector(1 + 2 * phi, phi, -2));
    this.vert.push(createVector(1 + 2 * phi, -phi, 2));
    this.vert.push(createVector(1 + 2 * phi, -phi, -2));
    this.vert.push(createVector(-(1 + 2 * phi), phi, 2));
    this.vert.push(createVector(-(1 + 2 * phi), phi, -2)); //25
    this.vert.push(createVector(-(1 + 2 * phi), -phi, 2)); // 26
    this.vert.push(createVector(-(1 + 2 * phi), -phi, -2));
    this.vert.push(createVector(phi, 2, 1 + 2 * phi));
    this.vert.push(createVector(phi, 2, -(1 + 2 * phi)));
    this.vert.push(createVector(phi, -2, 1 + 2 * phi)); //30
    this.vert.push(createVector(phi, -2, -(1 + 2 * phi)));
    this.vert.push(createVector(-phi, 2, 1 + 2 * phi));
    this.vert.push(createVector(-phi, 2, -(1 + 2 * phi)));
    this.vert.push(createVector(-phi, -2, 1 + 2 * phi));
    this.vert.push(createVector(-phi, -2, -(1 + 2 * phi))); // 35
    this.vert.push(createVector(1, 2 + phi, 2 * phi));
    this.vert.push(createVector(1, 2 + phi, -2 * phi));
    this.vert.push(createVector(1, -(2 + phi), 2 * phi));
    this.vert.push(createVector(1, -(2 + phi), -2 * phi));
    this.vert.push(createVector(-1, 2 + phi, 2 * phi)); //40
    this.vert.push(createVector(-1, 2 + phi, -2 * phi));
    this.vert.push(createVector(-1, -(2 + phi), 2 * phi));
    this.vert.push(createVector(-1, -(2 + phi), -2 * phi));
    this.vert.push(createVector(2 + phi, 2 * phi, 1));
    this.vert.push(createVector(2 + phi, 2 * phi, -1)); //45
    this.vert.push(createVector(2 + phi, -2 * phi, 1)); // 46
    this.vert.push(createVector(2 + phi, -2 * phi, -1));
    this.vert.push(createVector(-(2 + phi), 2 * phi, 1)); //48
    this.vert.push(createVector(-(2 + phi), 2 * phi, -1));
    this.vert.push(createVector(-(2 + phi), -2 * phi, 1)); //50
    this.vert.push(createVector(-(2 + phi), -2 * phi, -1));
    this.vert.push(createVector(2 * phi, 1, 2 + phi));
    this.vert.push(createVector(2 * phi, 1, -(2 + phi)));
    this.vert.push(createVector(2 * phi, -1, 2 + phi));
    this.vert.push(createVector(2 * phi, -1, -(2 + phi)));
    this.vert.push(createVector(-2 * phi, 1, 2 + phi));
    this.vert.push(createVector(-2 * phi, 1, -(2 + phi)));
    this.vert.push(createVector(-2 * phi, -1, 2 + phi));
    this.vert.push(createVector(-2 * phi, -1, -(2 + phi)));
    this.vert.forEach((v) => v.mult(this.r));
  }

  //let xz = [1, 6, 10, 11, 20, 21, 22, 23];
  // https://p5js.org/reference/p5.Geometry/flipV/
  // For example, a plane's four vertices are added clockwise starting from the top-left corner.
  addFaces() {
    // Pentagon faces
    this.faces.push([42, 38, 30, 2, 34]);
    this.faces.push([6, 17, 49, 48, 16]); // color bleed
    this.faces.push([0, 28, 36, 40, 32]);
    this.faces.push([1, 29, 37, 41, 33]);
    this.faces.push([11, 25, 57, 59, 27]); // 4
    this.faces.push([8, 20, 52, 54, 22]); // OK
    this.faces.push([4, 12, 44, 45, 13]); // 6
    this.faces.push([56, 24, 10, 26, 58]); // 7
    this.faces.push([39, 31, 3, 35, 43]);
    this.faces.push([53, 21, 9, 23, 55]); // 9
    this.faces.push([47, 46, 14, 5, 15]); // 10
    this.faces.push([19, 7, 18, 50, 51]);

    // Hexagon faces
    this.faces.push([32, 56, 58, 34, 2, 0]);
    this.faces.push([0, 2, 30, 54, 52, 28]);
    this.faces.push([29, 53, 55, 31, 3, 1]);
    this.faces.push([1, 3, 35, 59, 57, 33]);
    this.faces.push([4, 6, 16, 40, 36, 12]);
    this.faces.push([13, 37, 41, 17, 6, 4]);
    this.faces.push([5, 7, 19, 43, 39, 15]);
    this.faces.push([5, 14, 38, 42, 18, 7]);
    this.faces.push([45, 44, 20, 8, 9, 21]); //20
    this.faces.push([8, 22, 46, 47, 23, 9]);
    this.faces.push([24, 48, 49, 25, 11, 10]); //22
    this.faces.push([10, 11, 27, 51, 50, 26]);
    this.faces.push([45, 21, 53, 29, 37, 13]);
    this.faces.push([46, 22, 54, 30, 38, 14]);
    this.faces.push([48, 24, 56, 32, 40, 16]); //26
    this.faces.push([18, 42, 34, 58, 26, 50]);
    this.faces.push([51, 27, 59, 35, 43, 19]);
    this.faces.push([36, 28, 52, 20, 44, 12]);
    this.faces.push([39, 31, 55, 23, 47, 15]);
    this.faces.push([41, 33, 57, 25, 49, 17]);
  }

  // Calculate the centroid of a face
  calculateCentroid(face) {
    let sum = createVector(0, 0, 0);
    for (let j = 0; j < face.length; j++) {
      let v = this.vert[face[j]];
      sum.add(v);
    }
    return sum.div(face.length); // Average of face vertices
  }

  // I got some help from chatGPT for this function
  show() {
    stroke(255);
    strokeWeight(2);

    for (let i = 0; i < this.faces.length; i++) {
      let face = this.faces[i];

      // Apply the texture
      let img = this.images[i % this.images.length];
      texture(img);

      // Compute face center/centroid
      let centroid = this.calculateCentroid(face);

      // Compute Tangent (local X-axis) and Bitangent (local Y-axis)
      let [tangent, bitangent] = this.computeBasisVectors(face);

      // UV Mapping: Project vertices onto the tangent-bitangent plane
      let uvCoords = [];
      let scale = this.r * 2; // Scale UVs based on radius for consistency
      for (let j = 0; j < face.length; j++) {
        let v = this.vert[face[j]];
        let relative = p5.Vector.sub(v, centroid); // Local coordinates

        // Project to 2D plane
        let uCoord = 0.5 + (0.5 * p5.Vector.dot(relative, tangent)) / scale; // Normalize to [0, 1]
        let vCoord = 0.5 + (0.5 * p5.Vector.dot(relative, bitangent)) / scale;

        // Apply 180 rotation to vCoord
        uvCoords.push(createVector(1 - uCoord, 1 - vCoord));
      }

      // Draw the face with proper UVs
      beginShape();
      for (let j = 0; j < face.length; j++) {
        let v = this.vert[face[j]];
        let uv = uvCoords[j];
        vertex(v.x, v.y, v.z, uv.x, uv.y);
      }
      endShape(CLOSE);
    }
  }

  computeBasisVectors(face) {
    let v0 = this.vert[face[0]];
    let v1 = this.vert[face[1]];
    let tangent = p5.Vector.sub(v1, v0).normalize(); // X-axis
    let normal = p5.Vector.cross(
      tangent,
      p5.Vector.sub(this.vert[face[2]], v0)
    ).normalize();
    let bitangent = p5.Vector.cross(normal, tangent).normalize(); // Y-axis
    return [tangent, bitangent];
  }

  getUV(face) {
    // UV Mapping: Project vertices onto the tangent-bitangent plane
    let centroid = this.calculateCentroid(face);
    let [tangent, bitangent] = this.computeBasisVectors(face);
    let scale = this.r * 2; // Scale UVs based on radius for consistency
    for (let j = 0; j < face.length; j++) {
      let v = this.vert[face[j]];
      let relative = p5.Vector.sub(v, centroid); // Local coordinates

      // Project to 2D plane
      let uCoord = 0.5 + (0.5 * p5.Vector.dot(relative, tangent)) / scale; // Normalize to [0, 1]
      let vCoord = 0.5 + (0.5 * p5.Vector.dot(relative, bitangent)) / scale;
      return createVector(1 - uCoord, 1 - vCoord);
    }
  }

  // Helper function to figure out faces
  showVert() {
    noStroke();
    fill(200, 100, 255);
    for (let i = 0; i < this.vert.length; i++) {
      let v = this.vert[i];
      push();
      translate(v.x, v.y, v.z);
      sphere(2);
      pop();
    }

    // Display vertex indices
    fill(255, 0, 0);
    textFont(this.font);
    textSize(20);
    for (let i = 0; i < this.vert.length; i++) {
      let v = this.vert[i];
      push();
      translate(v.x, v.y, v.z);
      text(i, 0, 0, 0);
      pop();
    }
  }

  displayFaceIndex(i, face) {
    // Calculate and display face index
    let centroid = this.calculateCentroid(face);
    push();
    translate(centroid.x, centroid.y + 30, centroid.z);
    fill(0);
    stroke(0);
    textSize(50);
    textFont(this.font);
    textAlign(CENTER, CENTER);
    text(i, 0, 0, 0); // Display the face index
    pop();
  }
}
