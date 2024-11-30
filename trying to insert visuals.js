var gif_loadImg1, gif_createImg1;

function preload() {
  gif_loadImg1 = loadImage("fire man gift.gif");
  gif_createImg1 = createImg("fire man gift.gif");
}

function setup() {
  createCanvas(500, 700);
  noSmooth();
}

function draw() {
  
  image(gif_loadImg1, 50, 50, 80, 80);
  gif_createImg1.position(50, 350);
  
}
