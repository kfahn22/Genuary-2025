class MaskedImage {
  constructor(img, x, y, size) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.size = size; // Size of the circular mask
  }

  display() {
    stroke("#FFA91F");
    strokeWeight(3)
    push();
    translate(this.x, this.y);

    // Apply clipping mask
    beginClip();
    ellipse(0, 0, this.size/2, this.size/2);
    endClip();

    // Draw the image centered within the mask
    image(this.img, -this.size / 2, -this.size / 2, this.size, this.size);
    stroke("#FFA91F");
    // strokeWeight(3);
    // circle(0, -this.size/4, this.size);
    pop();
  }
}
