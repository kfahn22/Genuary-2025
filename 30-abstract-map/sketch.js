// January 30: Abtract Map

// I retrieved a map from  https://apps.nationalmap.gov/viewer/

// https:/ / github.com / prontopablo / p5.FIP / blob / main / p5.FIP.js;

let customShaders = [];
let layer;
let img0, img1;

let shaderNames = ["Pixelate", "Ripple"];

function preload() {
  // Load the shaders during preload
  customShaders.push(createShader(fip.defaultVert, fip.pixelate));
  customShaders.push(createShader(fip.defaultVert, fip.ripple));

  // Load the images during preload
  img0 = loadImage("map.jpg");
}

function setup() {
  createCanvas(800, 800, WEBGL);
  layer = createFramebuffer();

  noStroke();
  addShader(0, img0);
}

function draw() {
  resetShader();
  if (img1)
  {addShader(1, img1);}
}

function addShader(index, img) {
  // Draw a scene to a framebuffer
  layer.begin();
  clear();
  lights();
  scale(1, -1);
  image(img, -width / 2, -height / 2, width, height);
  layer.end();

  // Apply the shader
  shader(customShaders[index]);

  // Set the uniforms for the shaders
  switch (index) {
    case 0:
      customShaders[index].setUniform("pixelSize", 0.03); // Pixelate
      break;
    case 1:
      customShaders[index].setUniform("rippleFrequency", 50.0); // Ripple
      customShaders[index].setUniform("rippleAmplitude", 0.01);
      break;

    default:
      break;
  }

  // Uniforms that most shaders need
  customShaders[index].setUniform("texture", layer.color);
  customShaders[index].setUniform("resolution", [width, height]);
  customShaders[index].setUniform("uTextureSize", [width, height]);

  rect(0, 0, width, height);
}

function mousePressed() {
  img1 = get(); // Capture the entire canvas
}

function keyPressed() {
  if (key === "k" || key === "K") {
    save("30.jpg");
  }
}

