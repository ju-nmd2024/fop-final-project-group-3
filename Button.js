class Button {
  constructor(x, y, width, height, text) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
  }
  draw() {
    push();
    translate(this.x, this.y);
    stroke(200);
    strokeWsight(4);
    fill(200, 0, 0);
    rect(0,0, this.width,this.height);
    pop();
  }
}

const myButton = new Button (100,100,100,50,"hello");

function draw (){
    myButton.draw();
}