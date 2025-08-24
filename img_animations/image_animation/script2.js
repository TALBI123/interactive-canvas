const canvas = document.querySelector("canvas");
const image = new Image();
image.src = "./img/cat2.webp";
class Cell {
  constructor(effect, x, y, symbol, color) {
    this.effect = effect;
    this.symbol = symbol;
    this.x = x;
    this.y = y;
    this.color = color;
    this.positionX = this.effect.width / 2;
    this.positionY = this.effect.height / 2;
    this.speedX;
    this.speedY;
    this.random = Math.random() * 14 + 10;
  }
  draw() {
    this.effect.ctx.fillStyle = this.color;
    this.effect.ctx.fillText(this.symbol, this.positionX, this.positionY);
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
    this.size = 5;
    this.cells = [];
    this.creatCells();
  }
  randomSymbol(value) {
    if (value < 20) return "a";
    else if (value < 40) return "o";
    else if (value < 70) return "d";
    else if (value < 100) return "u";
    else if (value < 140) return "n";
    else if (value < 200) return "b";
  }
  creatCells() {
    this.image.addEventListener("load", () => {
      this.ctx.drawImage(this.image, 0, 0, this.width, this.height);
      const pixels = this.ctx.getImageData(0, 0, this.width, this.height).data;
      for (let y = 0; y < this.height; y += this.size) {
        for (let x = 0; x < this.width; x += this.size) {
          const index = (y * this.width + x) * 4;
          const red = pixels[index];
          const blue = pixels[index + 1];
          const green = pixels[index + 2];
          const color = `rgb(${red},${blue},${green})`;
          const symbol = this.randomSymbol(Math.random() * 200);
          this.cells.push(new Cell(this, x, y, symbol, color));
        }
      }
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.render();
    });
  }
  render() {
    this.cells.forEach((cell) => {
      cell.draw();
      cell.update();
    });
  }
  animate = () => {
    requestAnimationFrame(this.animate);
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.render();
  };
}
const effect = new Effect(canvas, image);
effect.animate();
