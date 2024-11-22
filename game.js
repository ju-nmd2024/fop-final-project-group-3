//let position = {
//x:250,
//y:150
//};

function setup() {
  createCanvas(500, 300);
  rectMode(CENTER);
}
class FireMan {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    fill(0);
    ellipse(this.x, this.y, 15);
  }

  update() {
    this.y += -1;
  }
}



let fireMan = new FireMan(250, 150);

function draw() {
  backG();
  //moving(not yet) dot
  fireMan.draw();
  fireMan.update();
  //fill (0);
  //ellipse(position.x,position.y,20);
}

function backG() {
  background(100);
  fill(200);
  noStroke();
  rect(250, 150, 300, 300);
}
