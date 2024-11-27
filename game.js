let paddelX = 250;
let state = "game";
let direction = "null";

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
        // Collision detected
        return true;
      }
    }
    // No collision
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

//new objects
let paddel = new Paddel(paddelX, 286, 60, 10);
let fireMan = new FireMan(250, 150, 15, 15);
//
function draw() {
  rectMode(CENTER);
  if (state === "game") {
    backG();
    //movingdot
    fireMan.draw();
    fireMan.update();

    paddel.draw();
    paddel.update();

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
}

function backG() {
  background(100);
  fill(200);
  noStroke();
  rect(250, 150, 300, 300);
}
