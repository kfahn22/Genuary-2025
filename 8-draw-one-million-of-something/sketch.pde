// https://github.com/scottdraves/flam3
// From: https://github.com/scottdraves/flam3/blob/master/test.flam3


// Coding Train Livestream
// https://www.youtube.com/watch?v=6Uy1SifiBig
// Code edit from https://github.com/CodingTrain/FractalFlame

PVector current;
Variation finalV;

ArrayList<Variation> variations = new ArrayList<Variation>();

Pixel[][] pixies;
PImage flameImg;

int total = 10000000;
int perFrame = 500000;
int count = 0;

color c1, c2;

void setup() {
  size(640, 480);

  // Pick two colors
  c1 = randomColor();
  c2 = randomColor();
  // Make sure they aren't the same
  while (c1 == c2) {
    c2 = randomColor();
  }

  Variation s1 = new Gear().setColor(0.16);
  s1.setTransform(new float[]{-0.357523, 0.774667, 0.397446, 0.674359, -0.730708, 0.812876});
  Variation s2 = new Flower().setColor(0.16);
  s2.setTransform(new float[]{-0.69942, 0.141688, -0.743472, 0.475451, -0.336206, 0.0958816});
  Variation s3 = new Gear().setColor(0.16);
  s3.setTransform(new float[]{0.0738451, -0.349212, -0.635205, 0.262572, -0.398985, -0.736904});
  Variation s4 = new Clover().setColor(0.16);
  s4.setTransform(new float[]{0.992697, 0.433488, -0.427202, -0.339112, -0.507145, 0.120765});
  Variation s5 = new Clover().setColor(0.16);
  s5.setTransform(new float[]{0.840613, -0.816191, 0.318971, -0.430402, 0.905589, 0.909402});
  //Variation s6 = new Flower().setColor(0.16);
  //s6.setTransform(new float[]{-0.681206, -0.0779465, 0.20769, 0.755065, -0.0416126, -0.262334});

  variations.add(s1);
  variations.add(s2);
  variations.add(s3);
  variations.add(s4);
  variations.add(s5);
  //variations.add(s6);

  // pixel map and image
  pixies = new Pixel[width][height];
  for (int i = 0; i < width; i++) {
    for (int j = 0; j < height; j++) {
      pixies[i][j] = new Pixel();
    }
  }
  flameImg = createImage(width, height, RGB);

  //variations.add(new Linear(1));
  //variations.add(new Sinusoidal());
  //variations.add(new Swirl());
  //variations.add(new Spherical());
  //variations.add(new HorseShoe());
  //variations.add(new Polar());
  //variations.add(new Hankerchief());
  //variations.add(new Heart());
  //variations.add(new Disc());
  //variations.add(new Hyperbolic());
  //variations.add(new Fisheye());

  // Starting point
  current  = new PVector();
  // Random xy
  current.x = random(-1, 1);
  current.y = random(-1, 1);
  // Using z for "c" (color)
  current.z = random(0, 1);
}

void draw() {

  // Iterations per frame
  for (int i = 0; i < perFrame; i++) {
    // Pick a variation (equal probabilities)
    int index = int(random(variations.size()));
    Variation variation = variations.get(index);
    // Save previous point just in case
    PVector previous = current.copy();

    // New point
    current = variation.flame(current);

    // If we end up in some divide by zero disaster land go back to previous point
    if (Float.isNaN(current.x) || Float.isNaN(current.y) || !Float.isFinite(current.x) || !Float.isFinite(current.y)) {
      current = previous.copy();
    }

    // Silly double-checking
    if (Float.isNaN(current.x) || Float.isNaN(current.y) || !Float.isFinite(current.x) || !Float.isFinite(current.y)) {
      println("problem!");
    }


    // A final transformation to fit on window
    float zoom = 0.5;
    float x = current.x * width * zoom;
    float y = -1*current.y * height * zoom;

    // Pixel location
    int px = int(x + width/2);
    int py = int(y + height/2);

    // Are we in the window?
    if (px >= 0 && px < width && py >= 0 && py < height) {
      // Increase count
      pixies[px][py].value++;
      // Pick color
      color c = lerpColor(c1, c2, current.z);
      // Increase rgb counters
      pixies[px][py].r += red(c) / 255;
      pixies[px][py].g += green(c) / 255;
      pixies[px][py].b += blue(c) / 255;
    }
  }

  // Find maximum
  float max = 0;
  for (int i = 0; i < width; i++) {
    for (int j = 0; j < height; j++) {
      Pixel pix = pixies[i][j];
      float value = (float) Math.log10(pix.value);
      max = max(max, value);
    }
  }

  // Set all pixels
  flameImg.loadPixels();
  for (int i = 0; i < width; i++) {
    for (int j = 0; j < height; j++) {
      Pixel pix = pixies[i][j];
      float value = (float) Math.log10(pix.value)/max;
      //if (value > 0.2) {
      int index = i + j * width;
      float r = pix.r * value;
      float g = pix.g * value;
      float b = pix.b * value;

      // Apply gamma
      float gamma = 1 / 4.0;
    
      // This is my bad hack to keep the colors from peaking in the center of the canvas
      r = constrain(255 * pow((r/255), gamma), 0, 255);
      g = constrain(255 * pow((g/255), gamma), 0, 150);
      b = constrain(255 * pow((b/255), gamma), 0, 255);
      //r = 255 * pow((r/255), gamma);
      //g = 255 * pow((g/255), gamma);
      //b = 255 * pow((b/255), gamma);
     
      flameImg.pixels[index] = color(r, g, b);
      //}
    }
  }
  flameImg.updatePixels();

  // Draw image
  background(0);
  image(flameImg, 0, 0);
  filter(BLUR, 0.5);

  // Check progress
  count += perFrame;
  if (count < total) {
    float percent = float(count) / total;
    //fill(255);
    //rect(0, 50, percent * width, 50);
  } else {
    noLoop();
    print("All done");
    saveFrame("flame"+millis()+".png");
  }
}

void getRandomVariations(ArrayList<Variation> variations, int n, ArrayList<Variation> variationOptions, float[] weights) {
  for (int j = 0; j < n; j++) {
    int i = int(random(variationOptions.size()));
    Variation v = variationOptions.get(i);
    float w = weights[j];
    v.setColor(w);
    float[] coeff = new float[6];
    for (int k = 0; k < 6; k++) {
      coeff[k] = random(-1, 1);
    }
    v.setTransform(coeff);
    variations.add(v);
  }
}

float[] getVariationsWeights(int variationsCount) {
  if (variationsCount < 2) return new float[]{1};

  float[] weights = new float[variationsCount];
  for (int i = 0; i < variationsCount; i++) {
    weights[i] = 0;
  }

  float totalSum = 0;
  float increment = 0.015;

  while (totalSum < 1) {
    weights[int(random(0, variationsCount - 1))] += increment;
    totalSum += increment;
  }

  return weights;
}