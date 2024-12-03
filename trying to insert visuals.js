var gif_loadImg1, gif_createImg1;

function preload() {
  gif_loadImg1 = loadImage("fire man gift.gif");
  gif_loadImg2 = loadImage("talking guy.gif");
  png_loadImg3 = loadImage("text rectangle.png");

}

function setup() {
  createCanvas(500, 300);
  noSmooth();
}

function draw() {
  background(255);
  image(gif_loadImg2,50,20,190,190);

 

  image(png_loadImg3,50,40,400,370);

}
