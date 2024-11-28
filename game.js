let paddelX = 250;
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

class FireMan {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speedX = 3;
    this.speedY = 3;
    this.paddel = new Paddel(paddelX, 286);
  }

  draw() {
    fill(0);
    //Image(gif_loadImg, this.x, this.y, this.width, this.height);
    ellipse(this.x, this.y, this.width, this.height);
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
    if (this.y > 292 || this.y < 8) {
      this.speedY *= -1;
    }
    // Reverse Y direction when hitting the bottom
    if (this.y > height - this.height / 2) {
      this.speedY *= -1;
    }
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
    this.x += 5;
  }
  moveLeft() {
    this.x += -5;
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
    // this.fireman = new FireMan(
    //   FireMan.x,
    //   FireMan.y,
    //   FireMan.width,
    //   FireMan.height
    // );
    // this.fireman.x = FireMan.x;
    // this.fireman.y = FireMan.y;
    // this.fireman.width = FireMan.width;
    // this.fireman.height = FireMan.height;
  }
  draw() {
    fill(0);
    rect(this.x, this.y, this.height, this.width);
  }

  // hitTest(fireman) {
  //   if (
  //     this.y + this.height / 2 >= fireman.y - fireman.height / 2 &&
  //     this.y - this.height / 2 <= fireman.y + fireman.height / 2
  //   ) {
  //     if (
  //       this.x >= fireman.x - fireman.width / 2 &&
  //       this.x <= fireman.x + fireman.width / 2
  //     ) {
  //       //collision found
  //       return true;
  //     }
  //   }
  //   //no collision found
  //   return false;
  // }
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
//rad1
let block1 = new Block(130, 30, 50, 10);
let block2 = new Block(190, 30, 50, 10);
let block3 = new Block(250, 30, 50, 10);
let block4 = new Block(310, 30, 50, 10);
let block5 = new Block(370, 30, 50, 10);
//rad2
let block6 = new Block(130, 55, 50, 10);
let block7 = new Block(190, 55, 50, 10);
let block8 = new Block(250, 55, 50, 10);
let block9 = new Block(310, 55, 50, 10);
let block10 = new Block(370, 55, 50, 10);
//rad3
let block11 = new Block(130, 80, 50, 10);
let block12 = new Block(190, 80, 50, 10);
let block13 = new Block(250, 80, 50, 10);
let block14 = new Block(310, 80, 50, 10);
let block15 = new Block(370, 80, 50, 10);

let paddel = new Paddel(paddelX, 286, 60, 10);
let fireMan = new FireMan(250, 120, 15, 15);

//block Arrey
blocks = [
  block1,
  block2,
  block3,
  block4,
  block5,
  block6,
  block7,
  block8,
  block9,
  block10,
  block11,
  block12,
  block13,
  block14,
  block15,
];

//
function draw() {
  if (state === "start") {
    background(80, 181, 90);
    startButton.draw();

    if (mouseIsPressed) {
      if (startButton.hitTest(mouseX, mouseY)) {
        //what hapens when the button is pressed
        state = "game";
      }
    }
  }
  if (state === "game") {
    rectMode(CENTER);
    backG();
    //movingdot
    fireMan.draw();
    fireMan.update();
    //player
    paddel.draw();
    paddel.update();

    //draw blocks
    for (let block of blocks) {
      block.draw();
    }

    //collision detection paddel
    if (fireMan.hitTest(paddel)) {
      // Reverse vertical speed, to make FireMan *boing (sound effect)
      fireMan.speedY *= -1;
      fireMan.y = paddel.y - paddel.height / 2 - fireMan.height / 2;
    }

    //collision detection blocks
    // if (block.hitTest(fireman)) {
    //   // keep track of points
    //   fireMan.speedY *= -1;
    //   fireMan.y = block.y - block.height / 2 - fireMan.height / 2;
    // }

    if (keyIsDown(LEFT_ARROW)) {
      paddel.moveLeft();
    } else if (keyIsDown(RIGHT_ARROW)) {
      paddel.moveRight();
    } else {
      paddel.moveNull();
    }
  }
}

function backG() {
  background(100);
  fill(200);
  noStroke();
  rect(250, 150, 300, 300);
}
