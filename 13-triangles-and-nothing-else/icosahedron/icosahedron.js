// 12 vertices, 20 faces
// https://en.wikipedia.org/wiki/Regular_icosahedron

class Icosahedron {
  constructor(r, images, palette) {
    this.r = r;
    this.images = images;
    this.palette = palette;
    this.vert = [];
    this.faces = [];
  }

  addVertices() {
    let phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
    this.vert.push(createVector(phi, 1, 0));
    this.vert.push(createVector(-phi, 1, 0));
    this.vert.push(createVector(phi, -1, 0));
    this.vert.push(createVector(-phi, -1, 0));
    this.vert.push(createVector(1, 0, phi));
    this.vert.push(createVector(1, 0, -phi));
    this.vert.push(createVector(-1, 0, phi));
    this.vert.push(createVector(-1, 0, -phi));
    this.vert.push(createVector(0, phi, 1));
    this.vert.push(createVector(0, phi, -1));
    this.vert.push(createVector(0, -phi, 1));
    this.vert.push(createVector(0, -phi, -1));
    this.vert.forEach((v) => v.mult(this.r));
  }

  addFaces() {
    this.faces.push([0, 2, 4]); 
    this.faces.push([0, 2, 5]);
    this.faces.push([9, 8, 0]);
    this.faces.push([0, 4, 8]);
    this.faces.push([0, 5, 9]);
    this.faces.push([1, 3, 6]); 
    this.faces.push([7, 3, 1]);
    this.faces.push([1, 6, 8]);
    this.faces.push([1, 7, 9]);
    this.faces.push([8, 9, 1]); 
    this.faces.push([2, 4, 10]);
    this.faces.push([2, 10, 11]);
    this.faces.push([11, 5, 2]); 
    this.faces.push([10, 6, 3]);
    this.faces.push([3, 7, 11]);
    this.faces.push([11, 10, 3]); 
    this.faces.push([4, 6, 10]); 
    this.faces.push([8, 6, 4]);
    this.faces.push([5, 7, 9]);
    this.faces.push([11, 7, 5]); 
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
    stroke(this.palette[this.palette.length-1]);
    strokeWeight(3);

    for (let i = 0; i < this.faces.length; i++) {
      let face = this.faces[i];

      // Apply the texture
      let sprite = this.images[i % this.images.length];
      texture(sprite);

      // Compute face center/centroid
      let center = this.calculateCentroid(face);

      // Compute Tangent (local X-axis) and Bitangent (local Y-axis)
      let v0 = this.vert[face[0]];
      let v1 = this.vert[face[1]];
      let tangent = p5.Vector.sub(v1, v0).normalize(); // X-axis
      let normal = p5.Vector.cross(
        tangent,
        p5.Vector.sub(this.vert[face[2]], v0)
      ).normalize();
      let bitangent = p5.Vector.cross(normal, tangent).normalize(); // Y-axis

      // UV Mapping: Project vertices onto the tangent-bitangent plane
      let uvCoords = [];
      let scale = this.r * 2; // Scale UVs based on radius for consistency
      for (let j = 0; j < face.length; j++) {
        let v = this.vert[face[j]];
        let relative = p5.Vector.sub(v, center); // Local coordinates

        // Project to 2D plane
        let uCoord = p5.Vector.dot(relative, tangent) / scale + 0.5; // Normalize to [0, 1]
        let vCoord = p5.Vector.dot(relative, bitangent) / scale + 0.5;

        // Apply 180 rotation b/c texture is upside down otherwise
       uvCoords.push(createVector(1 - uCoord, 1 - vCoord));
      }

      // Draw the face with UVs
      beginShape();
      for (let j = 0; j < face.length; j++) {
        let v = this.vert[face[j]];
        let uv = uvCoords[j];
        vertex(v.x, v.y, v.z, uv.x, uv.y);
      }
      endShape(CLOSE);
    }
  }
}
