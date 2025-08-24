const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let w = (canvas.width = window.innerWidth);
let h = (canvas.height = window.innerHeight);
const cellSize = 10;
const Cell = 40;
const size = 6;
let arrCells = [];
class cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = Math.random() + 0.7;
  }
  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + size, this.y + size);
    ctx.stroke();
  }
  update() {
    this.x += this.speed;
    this.y += this.speed;
    if (this.x > w) this.x = 0;
    if (this.y > h) this.y = 0;
  }
}
const creatCells = () => {
  for (let y = 0; y < w; y += cellSize) {
    for (let x = 0; x < h; x += cellSize) arrCells.push(new cell(y, x));
  }
};
const creatGradient = () => {
  const gradient = ctx.createLinearGradient(0, 0, w, h);
  gradient.addColorStop(0, "rgb(37 99 235 )");
  gradient.addColorStop(0.4, "#113");
  gradient.addColorStop(0.7, "#114");
  gradient.addColorStop(1, "#118");
  ctx.strokeStyle = gradient;
};
creatCells();
function animation() {
  creatGradient();
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, w, h);
  arrCells.forEach((newCell) => {
    newCell.draw();
    newCell.update();
  });
  requestAnimationFrame(animation);
}
animation();