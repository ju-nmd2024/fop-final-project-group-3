let paddelX = 250;
let fireManY = 130;
let fireManX = 250;
let brickWidth = 50;
let brickHeight = 20;
let state = "start";
let direction = "null";
let point = 0;

let blocksInitialized = false;

//most of the ways images and gifs are added,  https://editor.p5js.org/kjhollen/sketches/S1bVzeF8Z
//https://editor.p5js.org/FAAH/sketches/8s1g0vilF
// however we only got it to work when using only "loadImage" and down bellow "image(...)", and not using createimg.
var gif_loadImg1,
  gif_loadImg2,
  gif_fireLoad,
  png_startBLoad,
  png_backBLoad,
  gif_house,
  png_heart,
  gif_gameOver,
  gif_youWin,
  gif_flower,
  png_start,
  png_studs;
//
function preload() {
  // Load GIFs as images to draw on the canvas
  gif_loadImg1 = loadImage("fire man gift.gif");
  gif_loadImg2 = loadImage("talking guy.gif");
  png_loadImg3 = loadImage("text rectangle.png");
  gif_fireLoad = loadImage("Fire new-2.gif");
  png_startBLoad = loadImage("start button.png");
  png_backBLoad = loadImage("backbutton.png");
  gif_house = loadImage("house on fire.gif");
  png_heart = loadImage("Heart.png");
  gif_gameOver = loadImage("Game Over.gif");
  gif_youWin = loadImage("You win.gif");
  gif_flower = loadImage("Flower.gif");
  png_start = loadImage("main screen.png");
  png_studs = loadImage("studs.png");
}

function setup() {
  createCanvas(500, 300);
  noSmooth(); // to keep pixlynes
}

function drawBlocks() {
  // creates arrey
  blocks = [];

  let numRows = 3;
  let numCols = 5;

  // Create blocks using nested for-loops
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      let x = 110 + col * (brickWidth + 8); // Horizontal
      let y = 15 + row * (brickHeight + 5); // Vertical
      blocks.push(new Block(x, y, brickWidth, brickHeight)); //fills the Arrey
    }
  }
}

class Life {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw() {
    //hart image
    image(png_heart, this.x, this.y, this.width, this.height);
  }
}

class FireMan {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speedX = 1.5;
    this.speedY = 1.5;

    this.paddel = new Paddel(paddelX, 286);
    this.lifeLost = false;
  }

  draw() {
    //sourse stated above preload
    image(
      gif_loadImg1,
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );
  }

  hearts() {
    // to make the lives disapear when the player dies
    if (fireMan.y >= 290 && !this.lifeLost) {
      lives.pop();
      this.lifeLost = true;
      this.x = 250;
      this.y = 130;
      this.speedX = 1.5;
      this.speedY = 1.5;
    }
  }

  resetHearts() {
    // to prevent all harts from disapering with one death
    if (this.y < 290 && this.lifeLost) {
      this.lifeLost = false;
    }
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;

    /* with guidance from MindForCode, "How to create a bouncing ball in p5.js" 
    https://www.youtube.com/watch?v=eHZXvR6NDLo 
    */
    //collision with wals
    if (this.x > 392 || this.x < 108) {
      this.speedX *= -1;
    }
    // may be removed, death, beagining half
    if (this.y < 8) {
      this.speedY *= -1;
    }
  }

  //collision with paddel
  hitTest(paddle) {
    if (
      this.y + this.height / 7 >= paddle.y - paddle.height / 7 &&
      this.y - this.height / 7 <= paddle.y + paddle.height / 7 &&
      this.x >= paddle.x - paddle.width - 7 &&
      this.x <= paddle.x + paddle.width - 7
    ) {
      //chengfeng xia, folowing 5 lines
      let paddelCenter = paddel.x + paddel.width / 2;
      let ballCenter = this.x;
      let distanceFromCenter = ballCenter - paddelCenter;
      let angel = distanceFromCenter / (paddel.width / 1.5);
      this.speedX = angel * 3; //play
      //collision found
      return true;
    }

    // No collision found
    return false;
  }
}

class Paddel {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw() {
    // drawn paddel for now
    image(png_studs, this.x, this.y, this.width, this.height);
  }

  update() {
    //Collision1 (bounsing back)
    if (this.x > 340) {
      this.moveEdgeL();
    }
    if (this.x < 90) {
      this.moveEdgeR();
    }
  }

  // movement of paddel
  moveRight() {
    this.x += 6;
  }
  moveLeft() {
    this.x += -6;
  }
  moveNull() {
    this.x += 0;
  }
  // collision(2) variable (bounsing back) left wall,right wall
  moveEdgeL() {
    this.x += -6;
  }
  moveEdgeR() {
    this.x += 6;
  }
}

class Block {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.hit = false;
  }

  draw() {
    // draws if it is not hit
    if (!this.hit) {
      strokeWeight(2);
      fill(220, 50, 50);
      rect(this.x, this.y, this.width, this.height);
    }
  }

  hitTest(fireMan) {
    if (
      fireMan.x >= this.x &&
      fireMan.x <= this.x + this.width &&
      fireMan.y >= this.y &&
      fireMan.y <= this.y + this.height
    ) {
      // collision detected
      return true;
    }
    // no collision
    return false;
  }
}

class Button {
  constructor(x, y, width, height, text, fColor, tColor, lColor) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
    //fill color
    this.color = fColor;
    // text color
    this.color2 = tColor;
    //line color
    this.color3 = lColor;
  }
  draw() {
    if (state === "start") {
      image(png_startBLoad, this.x, this.y, this.width, this.height);
    } else {
      push();
      stroke(this.color3);
      strokeWeight(3);
      fill(this.color);
      rect(this.x, this.y, this.width, this.height, 5);
      noStroke();
      fill(this.color2);
      textSize(min(this.height / 1.3, 22));
      textAlign(CENTER, CENTER);
      text(this.text, this.x + this.width / 2, this.y + this.height / 2);
      pop();
    }
  }
  hitTest(x, y) {
    return (
      x > this.x &&
      x < this.x + this.width &&
      y > this.y &&
      y < this.y + this.height
    );
  }
}
// objects in game start
let startButton = new Button(275, 200, 150, 60);
let overButton = new Button(
  175,
  235,
  150,
  50,
  "back to start",
  "#873200",
  "#000000",
  "#000000"
);
let winButton = new Button(
  310,
  265,
  60,
  20,
  "Back",
  "#ffdfdf",
  "#ff9898",
  "#ff9898"
);

//new objects in State "game"
let paddel = new Paddel(paddelX, 270, 65, 20);
let fireMan = new FireMan(fireManX, fireManY, 40, 40);

let life0 = new Life(2, 5, 35, 35);
let life1 = new Life(32, 5, 35, 35);
let life2 = new Life(62, 5, 35, 35);

// Block Arrey
let blocks = [];
//Lives Arrey
lives = [life0, life1, life2];

function draw() {
  if (state === "start") {
    //startscreen
    image(png_start, 0, 0, 500, 300);
    startButton.draw();
  }
  if (state === "game") {
    if (!blocksInitialized) {
      drawBlocks();
      blocksInitialized = true;
    }
    //background(ratios)
    push();
    rectMode(CENTER);
    backG();
    pop();

    push();
    fill(255);
    textSize(15);
    textAlign(RIGHT, TOP);
    text("Points: " + point, width - 20, 15);
    pop();

    //moving fireman
    fireMan.update();
    fireMan.draw();
    fireMan.hearts();
    fireMan.resetHearts();

    //console.log(lives.length);

    if (lives.length === 0) {
      state = "Over";
    }
    //player
    push();
    paddel.update();
    paddel.draw();
    pop();

    //Lives loop
    for (let life of lives) {
      push();
      rectMode(CENTER);
      life.draw();
      pop();
    }

    //draw blocks loop
    for (let block of blocks) {
      //collision for blocks
      if (!block.hit && block.hitTest(fireMan)) {
        fireMan.speedY *= -1;
        block.hit = true;
        point = point + 1;
        console.log(point);
      }
      block.draw();
    }

    //collision detection paddel
    if (fireMan.hitTest(paddel)) {
      // Reverse vertical speed
      fireMan.speedY *= -1;
    }
    // movement of paddel key-logic
    if (keyIsDown(LEFT_ARROW)) {
      paddel.moveLeft();
    } else if (keyIsDown(RIGHT_ARROW)) {
      paddel.moveRight();
    } else {
      paddel.moveNull();
    }
    if (lives.length === 0) {
      state = "Over";
    }
    if (point === 15) {
      state = "win";
    }
  }
  if (state === "Over") {
    gameOverScreen();
    overButton.draw();
    if (mouseIsPressed && overButton.hitTest(mouseX, mouseY)) {
      state = "start";
    }
  }
  if (state === "win") {
    winScreen();
    winButton.draw();
   
  }
}

function mousePressed() {
  if (state === "start" && startButton.hitTest(mouseX, mouseY)) {
    state = "game";
  } else if (state === "Over" && overButton.hitTest(mouseX, mouseY)) {
    state = "start";
    //resets everything in state, "game"
    blocksInitialized = false;
    lives = [life0, life1, life2];
    fireMan.x = 250;
    fireMan.y = 130;
    fireMan.speedX = 1.5;
    fireMan.speedY = 1.5;
    point = 0;
  } else if (state === "win" && winButton.hitTest(mouseX, mouseY)) {
    state = "start";
    //resets everything in state, "game"
    blocksInitialized = false;
    lives = [life0, life1, life2];
    fireMan.x = 250;
    fireMan.y = 130;
    fireMan.speedX = 1.5;
    fireMan.speedY = 1.5;
    point = 0;
  }
}

function backG() {
  background(100);
  fill(200);
  noStroke();
  rect(250, 150, 300, 300);
  image(gif_fireLoad, -7, 200, 114, 114);
  image(gif_fireLoad, 393, 200, 114, 114);
}

function winScreen() {
  push();
  rectMode(CENTER);
  background(135, 193, 255);
  fill(135, 193, 255);
  noStroke();
  rect(250, 150, 300, 300);
  pop();
  image(gif_loadImg2, 160, 58, 160, 160); //character
  image(png_loadImg3, 90, 49, 316, 370); //text box
  image(gif_youWin, 150, 15, 200, 60); //win text
  image(gif_flower, 0, 200, 100, 100); // flower 1
  image(gif_flower, 400, 200, 100, 100); // flower 2
  fill("#ff9898");
  textSize(21);
  text("Thank you for saving me!", 127, 250);
  //button :))
  winButton.draw();
  if (mouseIsPressed && winButton.hitTest(mouseX, mouseY)) {
    state = "start";
  }
}

function gameOverScreen() {
  push();
  rectMode(CENTER);
  background(100);
  fill("#bfbfbf");
  noStroke();
  rect(250, 150, 300, 300);
  pop();
  image(gif_house, 100, 40, 300, 300);
  image(gif_fireLoad, -7, 200, 114, 114);
  image(gif_fireLoad, 393, 200, 114, 114);
  image(gif_gameOver, 100, 5, 300, 70);
}
