var gif_loadImg1,
  gif_createImg1,
  gif_house,
  png_heart,
  gif_gameOver,
  gif_youWin,
  gif_flower,
  png_start,
  png_paddle;

function preload() {
  gif_loadImg1 = loadImage("fire man gift.gif");
  gif_loadImg2 = loadImage("talking guy.gif");
  png_loadImg3 = loadImage("text rectangle.png");
  gif_house = loadImage("house on fire.gif");
  png_heart = loadImage("Heart.png");
  gif_gameOver = loadImage("Game Over.gif");
  gif_youWin = loadImage("You win.gif");
  gif_flower = loadImage ("Flower.gif");
  png_start = loadImage ("main screen.png");
  png_paddle = loadImage ("Trampoline.png");
}

function setup() {
  createCanvas(500, 300);
  noSmooth();
}

function draw() {
  // push();
  // rectMode(CENTER);
  // background(100);
  // fill("#bfbfbf");
  // noStroke();
  // rect(250, 150, 300, 300);
  // // image(gif_loadImg2,50,20,190,190);
  // // image(png_loadImg3,50,40,400,370);
  // pop();
  // // image (gif_house, 100,40,300,300);
  // png_heart = loadImage ("Heart.png");
  // image (gif_gameOver, 93,0,314,100);
  // image(gif_youWin, 100, 5, 300, 70);
  // image (gif_flower, 0, 200, 100, 100);
  // image(gif_flower, 400, 200, 100, 100);
// image (png_start, 0,0,500,300);
image (png_paddle, 100,100,50,50);
}
