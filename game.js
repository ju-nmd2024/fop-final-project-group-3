let paddelX = 250;
let fireManY = 100;
let fireManX = 250;
let brickWidth = 50;
let brickHeight = 20;
let state = "start";
let direction = "null";

// let gif_loadImg, gif_createImg;
// function preload() {
//   gif_load = loadImage("fire man gift.gif");

//   gif_createImg = createImg("fire man gift.gif");
// }

function setup() {
  createCanvas(500, 300);
  // to keep pixlynes
  noSmooth();
}

function drawBlocks() {
  // Clear the array before filling it with new blocks
  blocks = [];

  // Define number of rows and columns for the blocks
  let numRows = 3;
  let numCols = 5;

  // Create blocks using nested for loops
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      let x = 135 + col * (brickWidth + 7); // Horizontal position
      let y = 25 + row * (brickHeight + 3); // Vertical position
      blocks.push(new Block(x, y, brickWidth, brickHeight));
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
    fill(255);
    rect(this.x, this.y, this.width, this.height);
  }
}

class FireMan {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;


    this.speedX = 2;
    this.speedY = 2;

    this.paddel = new Paddel(paddelX, 286);
    this.lifeLost = false;
  }

  draw() {
    fill(0);
    //Image(gif_loadImg, this.x, this.y, this.width, this.height);
    ellipse(this.x, this.y, this.width, this.height);
  }

  hearts() {
    if (fireMan.y >= 290 && !this.lifeLost) {
      lives.pop();
      this.lifeLost = true;
      this.x = 250;
      this.y = 100;
    }
  }

  resetHearts() {
    if (this.y < 290 && this.lifeLost) {
      this.lifeLost = false;
    }
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;

    /* line 25-30 with guidance from MindForCode, "How to create a bouncing ball in p5.js" 
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

    // // Reverse Y direction when hitting the bottom
    // if (this.y > height - this.height / 2) {
    //   this.speedY *= -1;
    // }
  }
  //collision with paddel
  //var audio = new Audio('audio_file.mp3'); audio.play();
  hitTest(paddle) {
    if (
      this.y + this.height / 2 >= paddle.y - paddle.height / 2 &&
      this.y - this.height / 2 <= paddle.y + paddle.height / 2
    ) {
      if (
        this.x >= paddle.x - paddle.width / 2 &&
        this.x <= paddle.x + paddle.width / 2
      ) {
        // Collision found
        return true;
      }
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
    rect(this.x, this.y, this.width, this.height);
  }

  update() {
    //Collision1 (bounsing back)
    if (this.x > 370) {
      this.moveEdgeL();
    }
    if (this.x < 130) {
      this.moveEdgeR();
    }
  }
  // movement paddel
  moveRight() {
    this.x += 6;
  }
  moveLeft() {
    this.x += -6;
  }
  moveNull() {
    this.x += 0;
  }
  // collision(2) variable (bounsing back)
  moveEdgeL() {
    this.x += -6;
  }
  moveEdgeR() {
    this.x += 6;
  }
}

class Block {
  constructor(x, y, height, width) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.fireman = new FireMan(
      FireMan.x,
      FireMan.y,
      FireMan.width,
      FireMan.height
    );
    // this.fireman.x = FireMan.x;
    // this.fireman.y = FireMan.y;
    // this.fireman.width = FireMan.width;
    // this.fireman.height = FireMan.height;
  }
  draw() {
    fill(0);
    rect(this.x, this.y, this.height, this.width);
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
    push();
    translate(this.x, this.y);
    stroke(this.color3);
    strokeWeight(7);
    fill(this.color);
    rect(0, 0, this.width, this.height, 10);
    noStroke();
    fill(this.color2);
    textSize(this.height / 2);
    textAlign(CENTER);
    text(this.text, 0, this.height / 4, this.width);
    pop();
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
let startButton = new Button(
  130,
  150,
  150,
  50,
  "Start",
  "#873200",
  "#ffffff",
  "#000000"
);
//new objects in State "game"
let paddel = new Paddel(paddelX, 286, 60, 10);
let fireMan = new FireMan(fireManX, fireManY, 15, 15);

let life0 = new Life(20, 20, 20, 20);
let life1 = new Life(50, 20, 20, 20);
let life2 = new Life(80, 20, 20, 20);

// Block Arrey
let blocks = [];
//Lives Arrey
lives = [life0, life1, life2];

//
function draw() {
  if (state === "start") {
    background(80, 181, 90);
    startButton.draw();

    if (mouseIsPressed) {
      if (startButton.hitTest(mouseX, mouseY)) {
        //what hapens when the button is pressed
        state = "game";
        drawBlocks();
      }
    }
  }
  if (state === "game") {
    rectMode(CENTER);
    backG();

    //moving fireman
    fireMan.draw();
    fireMan.update();
    fireMan.hearts();
    fireMan.resetHearts();
    console.log(lives.length);
    //  if (lives.lenght = 0){
    //   state = "Over";
    //  }

    //player
    paddel.draw();
    paddel.update();

    //Lives loop
    for (let life of lives) {
      life.draw();
    }


    if (fireMan.y >= 290) {
      lives.pop();
    }

    //draw blocks loop
    for (let block of blocks) {
      block.draw();
    }

    //collision detection paddel
    if (fireMan.hitTest(paddel)) {
      // Reverse vertical speed, to make FireMan *boing (sound effect)
      fireMan.speedY *= -1;
      fireMan.y = paddel.y - paddel.height / 2 - fireMan.height / 2;
    }

    if (keyIsDown(LEFT_ARROW)) {
      paddel.moveLeft();
    } else if (keyIsDown(RIGHT_ARROW)) {
      paddel.moveRight();
    } else {
      paddel.moveNull();
    }
  }
  if (state === "Over") {
    background(0);
  }
}

function backG() {
  background(100);
  fill(200);
  noStroke();
  rect(250, 150, 300, 300);
}
