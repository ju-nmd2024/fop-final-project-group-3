let state = "game";

function setup() {
  createCanvas(500, 300);
  rectMode(CENTER);
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
    if (this.x > 392 || this.x < 108) {
      this.speedX *= -1;
    }
    // may be removed, death, beagining half
    if (this.y > 292 || this.y < 8) {
      this.speedY *= -1;
    }
  }
}

let fireMan = new FireMan(250, 150);

function draw() {
  if (state === "game") {
    backG();
    //moving(not yet) dot
    fireMan.draw();
    fireMan.update();
  }
}

function backG() {
  background(100);
  fill(200);
  noStroke();
  rect(250, 150, 300, 300);
}
