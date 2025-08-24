const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
class Cell {
  constructor(effect, x, y) {
    this.effect = effect;
    this.x = x;
    this.y = y;
    this.positionX = this.effect.width / 2;
    this.positionY = this.effect.height / 2;
    this.speedX;
    this.speedY;
    this.random = Math.random() * 80 + 30;
    (this.width = this.effect.cellWidth),
      (this.height = this.effect.cellHeight);
  }
  draw() {
    const sx = (this.x / this.effect.width) * this.effect.image.width;
    const sy = (this.y / this.effect.height) * this.effect.image.height;
    const sWidth = (this.width / this.effect.width) * this.effect.image.width;
    const sHeight =
      (this.height / this.effect.height) * this.effect.image.height;
    this.effect.ctx.beginPath();
    this.effect.ctx.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
    this.effect.ctx.drawImage(
      this.effect.image,
      sx,
      sy,
      sWidth,
      sHeight,
      this.positionX,
      this.positionY,
      this.width,
      this.height
    );
  }
  update() {
    this.speedX = (this.x - this.positionX) / this.random;
    this.speedY = (this.y - this.positionY) / this.random;
    this.positionX += this.speedX;
    this.positionY += this.speedY;
  }
}
class Effect {
  constructor(canvas, image) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.image = image;
    this.cellWidth = this.width / 35;
    this.cellHeight = this.height / 40;
    this.cells = [];
    this.creatGrid();
  }
  creatGrid() {
    for (let y = 0; y < this.height; y += this.cellHeight) {
      for (let x = 0; x < this.width; x += this.cellWidth)
        this.cells.push(new Cell(this, x, y));
    }
  }
  render() {
    this.cells.forEach((elm, i) => {
      elm.update();
      elm.draw();
    });
  }
}
const image = new Image();
image.src = "./img/cat2.webp";
console.log(image.width, image.height);
const effectImage1 = new Effect(canvas, image);
function animation() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animation);
  effectImage1.render();
}
animation();