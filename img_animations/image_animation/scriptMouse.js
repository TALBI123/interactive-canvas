const canvas = document.querySelector("canvas");
const image = new Image();
image.src = "./img/gaza.webp";
class Cell {
  constructor(effect, x, y) {
    this.effect = effect;
    this.height = this.effect.cellHeight;
    this.width = this.effect.cellWidth;
    this.x = x;
    this.y = y;
    this.baseX = this.x;
    this.baseY = this.y;
    this.speed = Math.random() * 5 + 0.5;
  }
  draw() {
    const sx = (this.x / this.effect.width) * this.effect.image.width;
    const sy = (this.y / this.effect.height) * this.effect.image.height;
    const swidth = (this.width / this.effect.width) * this.effect.image.width;
    const sheight =
      (this.height / this.effect.height) * this.effect.image.height;
    this.effect.ctx.drawImage(
      this.effect.image,
      sx,
      sy,
      swidth,
      sheight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  update() {
    const dx = this.x - this.effect.mouse.x;
    const dy = this.y - this.effect.mouse.y;
    const distance = Math.hypot(dx, dy);
    if (distance < this.effect.mouse.radius) {
      const dirx = dx / distance || 0;
      const diry = dy / distance || 0;
      const force =
        (this.effect.mouse.radius - distance) / this.effect.mouse.radius;
      this.x += dirx * this.speed * force;
      this.y += diry * this.speed * force;
    } else {
      if (this.baseX != this.x) this.x -= (this.x - this.baseX) / 10;
      if (this.baseY!= this.y) this.y -= (this.y - this.baseY) / 10;
    }
  }
}
class Effect {
  constructor(canvas, image) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.ctx = this.canvas.getContext("2d");
    this.cellHeight = this.height / 65;
    this.cellWidth = this.width / 30;
    this.image = image;
    this.cells = [];
    this.creatCells();
    this.mouse = {
      x: undefined,
      y: undefined,
      radius: 100,
    };
    this.rect = this.canvas.getBoundingClientRect();
    this.canvas.addEventListener("mousemove", (e) => {
      this.mouse.x = e.clientX - this.rect.left;
      this.mouse.y = e.clientY - this.rect.top;
    });
    this.canvas.addEventListener("mouseleave", () => {
      this.mouse.x = undefined;
      this.mouse.y = undefined;
    });
  }
  creatCells() {
    for (let y = 0; y < this.height; y += this.cellHeight) {
      for (let x = 0; x < this.width; x += this.cellWidth)
        this.cells.push(new Cell(this, x, y));
    }
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