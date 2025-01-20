// Shadow code from https://editor.p5js.org/theannalytical/sketches/mr1yc-85c

// Set a linear gradient
function linearGradient(x1, y1, x2, y2, col1, col2) {
  let grad = drawingContext.createLinearGradient(x1, y1, x2, y2);
  grad.addColorStop(0, col1);
  grad.addColorStop(1, col2);
  drawingContext.fillStyle = grad;
}
// Set a radial gradient
function radialGradient(x, y, rStart, rStop, col1, col2) {
  let grad = drawingContext.createRadialGradient(x, y, rStart, x, y, rStop);
  grad.addColorStop(0, col1);
  grad.addColorStop(1, col2);
  drawingContext.fillStyle = grad;
}
// Set a shadow effect
function shadow(x, y, blur, col) {
  drawingContext.shadowOffsetX = x;
  drawingContext.shadowOffsetY = y;
  drawingContext.shadowBlur = blur;
  drawingContext.shadowColor = col;
}
// Cancel the shadow effect
function noShadow() {
  drawingContext.shadowOffsetX = null;
  drawingContext.shadowOffsetY = null;
  drawingContext.shadowBlur = null;
  drawingContext.shadowColor = null;
}
