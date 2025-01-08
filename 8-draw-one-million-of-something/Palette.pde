color[] palette ={ 
  color(111,45,189), 
  color(166, 99, 204), 
  color(178, 152, 220), 
  color(184, 208, 235), 
  color(185, 250, 248), 
  
};

color randomColor() {
  int i = floor(random(palette.length));
  return palette[i];
}