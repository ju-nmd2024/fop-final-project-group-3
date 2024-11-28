class Block {
  constructor(x, y, height, width) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.hit =false;
  }
  draw() {
    fill(0);
    rect(this.x, this.y, this.height, this.width);
  }
}

let block1 = new Block (100,100,90,20);
let block2 = new Block (200,100,90,20);
let block3 = new Block (300,100,90,20);
let block4 = new Block (400,100,90,20);
let block5 = new Block (100,150,90,20);
let block6 = new Block (200,150,90,20);
let block7 = new Block (300,150,90,20);
let block8 = new Block (400,150,90,20);

blocks = [block1, block2, block3, block4, block5, block6, block7, block8];

console.log(blocks.length);
console.log(blocks [4]);

function draw() {
    background(255); 
    for (let block of blocks) {
      block.draw(); // Ritar varje block
    }
  }

