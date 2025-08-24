const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const h = (canvas.height = window.innerHeight);
const w = (canvas.width = window.innerWidth);
const cellWidth = 20;
const cellHeight = 20;
let particules = [];
const size = 10;
class cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = Math.random() * 3;
  }
  draw() {
    ctx.beginPath();
    // ctx.arc(this.x, this.y, 4, 0, 2 * Math.PI);
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + size, this.y + size);
    ctx.stroke();
  }
  update() {
    if (this.y >= h) {
      this.y =0;
    }
    if (this.x >= w) this.x =0;
    this.x += this.speed;
    this.y += this.speed;
  }
}
const creatCells = () => {
  for (let y = 0; y < h; y += cellHeight) {
    for (let x = 0; x < w; x += cellWidth) particules.push(new cell(x, y));
  }
};
creatCells();
const animation = () => {
  ctx.clearRect(0, 0, w, h);
  requestAnimationFrame(animation);
  particules.forEach((CELL) => {
    CELL.update();
    CELL.draw();
  });
};
animation();