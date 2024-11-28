class Button {
  constructor(x, y, width, height, text, fColor, tColor, lColor) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
    this.color = fColor;
    this.color2 = tColor;
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

const myButton = new Button(
  300,
  150,
  150,
  50,
  "Hello",
  "#ff8e4d",
  "#ffffff",
  "#873200"
);
const myButton2 = new Button(
  130,
  150,
  150,
  50,
  "Hi",
  "#ffffff",
  "#000000",
  "#873200"
);

function draw() {
  background(255);
  if(mouseIsPressed){
    if (myButton.hitTest(mouseX,mouseY)){
      //what hapens when the button is pressed
      background(0);
    }else if (myButton2.hitTest(mouseX,mouseY)){
      //second butoons function
      background(100); 
    }
  }
  myButton.draw();
  myButton2.draw();
}
