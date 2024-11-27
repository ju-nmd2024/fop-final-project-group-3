let paddelX = 250;
let state = "game";
let direction = "null";

function setup() {
  createCanvas(500, 300);
  rectMode(CENTER);
  // to keep pixlynes
  noSmooth();
}
class FireMan {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speedX = 3;
    this.speedY = 2;
  }

  draw() {
    fill(0);
    ellipse(this.x, this.y, 15);
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

    //collision with paddel
    if (this.x >= paddelX) {
    }
  }
}

class Paddel {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    // drawn paddel for now
    rect(this.x, this.y, 55, 10);
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

//new objects
let paddel = new Paddel(paddelX, 286);
let fireMan = new FireMan(250, 150);
//
function draw() {
  if (state === "game") {
    backG();
    //moving(not yet) dot
    fireMan.draw();
    fireMan.update();

    paddel.draw();
    paddel.update();

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
