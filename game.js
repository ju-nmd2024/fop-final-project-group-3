let position = {
  x:100,
  y:100
};

function setup() {
  createCanvas(500, 300);
  rectMode(CENTER);
}

function draw() {
  backG();
  //FireMan.draw();
  fill (0);
    ellipse(position.x,position.y,100);
  
}

function backG(){
  background(100);
  fill (200);
  noStroke();
  rect(250,150,300,300);
}

 //class FireMan{
 // update(){}
 // draw(){
   // fill (0);
    //ellipse(position.x,position.y,100);
  //}

 //}