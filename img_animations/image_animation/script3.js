const canvas = document.querySelector("canvas");
const img = new Image();
img.src = "img.webp";
class Cell {
  constructor(effect, x, y, size, color) {
    this.effect = effect;
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.baseX = this.x;
    this.baseY = this.y;
    this.speed = Math.random() * 5 + 2;
  }
  draw() {
    this.effect.ctx.beginPath();
    this.effect.ctx.fillStyle = this.color;
    this.effect.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    this.effect.ctx.fill();
  }
  update() {
    this.draw();
    const dx = this.effect.mouse.x - this.x;
    const dy = this.effect.mouse.y - this.y;
    const distance = Math.hypot(dy, dx);
    if (distance < this.effect.mouse.radius) {
      const dirX = dx / distance || 0;
      const dirY = dy / distance || 0;
      const force =
        (distance - this.effect.mouse.radius) / this.effect.mouse.radius;
      this.x += this.speed * dirX * force;
      this.y += this.speed * dirY * force;
    } else if (this.baseX != this.x || this.baseY != this.y) {
      this.x -= (this.x - this.baseX) / 10;
      this.y -= (this.y - this.baseY) / 10;
    }
  }
}
class Effect {
  constructor(canvas, image) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.image = image;
    this.size = 3;
    this.cells = [];
    this.createCells();
    this.mouse = {
      x: undefined,
      y: undefined,
      radius: 70,
    };
    this.canvas.addEventListener("mousemove", ({ clientX, clientY }) => {
      const { top, left } = this.canvas.getBoundingClientRect();
      this.mouse.x = clientX - left;
      this.mouse.y = clientY - top;
    });
    this.canvas.addEventListener("mouseleave", () => {
      this.mouse.x = undefined;
      this.mouse.y = undefined;
    });
  }
  createCells() {
    this.image.addEventListener("load", () => {
      this.ctx.drawImage(this.image, 0, 0, this.width, this.height);
      const pixles = this.ctx.getImageData(0, 0, this.width, this.height).data;
      for (let y = 0; y < this.height; y += this.size) {
        for (let x = 0; x < this.width; x += this.size) {
          const index = (y * this.width + x) * 4;
          const red = pixles[index];
          const green = pixles[index + 1];
          const blue = pixles[index + 2];
          const alpha = pixles[index + 3] / 255;
          const color = `rgba(${red},${green},${blue},${alpha})`;
          this.cells.push(new Cell(this, x, y, this.size, color));
        }
      }
      this.ctx.clearRect(0, 0, this.width, this.height);
    });
  }
  render() {
    this.cells.forEach((cell) => cell.update());
  }
  animate = () => {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.render();
    requestAnimationFrame(this.animate);
  };
}
const effect = new Effect(canvas, img);
effect.animate();