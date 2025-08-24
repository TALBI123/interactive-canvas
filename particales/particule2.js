const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const numberParticules = 150;
const RADIUS = 60;
const SIZE = 3;
const COLOR = "azure";
let mouse = {
  x:0,
  y:0,
  radius:60
}
let w = (canvas.width = window.innerWidth);
let h = (canvas.height = window.innerHeight);
let particulsArr = [];
let count = 0;
let newCount = 0;
let rand = (value) => Math.random() * value;
class Particule {
  constructor(x, y, dirX, dirY, size, color) {
    this.x = x;
    this.y = y;
    this.dirX = dirX;
    this.dirY = dirY;
    this.size = size;
    this.color = color;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  update() {
    if (this.x + this.size > w || this.x - this.size < 0)
      this.dirX = -this.dirX;
    if (this.y + this.size > h || this.y - this.size < 0)
      this.dirY = -this.dirY;
    this.x += this.dirX;
    this.y += this.dirY;
  }
}
let creatElement = () => {
  for (let i = 0; i < numberParticules; i++) {
    let x = rand(w - 2 * SIZE) + SIZE;
    let y = rand(h - 2 * SIZE) + SIZE;
    let dirX = rand(2) + 0.5;
    let dirY = rand(2) + 0.5;
    particulsArr.push(
      new Particule( x, y, dirX, dirY,  SIZE, count++ % 2 === 0 ? "azure" : "black")
    );
    particulsArr[i].draw();
  }
};
function conncet() {
  for (let i = 0; i < numberParticules; i++) {
    for (let j = i; j < numberParticules; j++) {
      let dx = particulsArr[i].x - particulsArr[j].x;
      let dy = particulsArr[i].y - particulsArr[j].y;
      let distance = Math.hypot(dx, dy);
      if (distance < RADIUS) {
        ctx.beginPath();
        ctx.strokeStyle = 'azure';
        ctx.moveTo(particulsArr[i].x, particulsArr[i].y);
        ctx.lineTo(particulsArr[j].x,particulsArr[j].y);
        ctx.stroke();
      }
    }
  }
}
function animation() {
  requestAnimationFrame(animation);
  ctx.clearRect(0, 0, w, h);
  creatElement();
  conncet();
  particulsArr.forEach((elm) => {
    elm.update();
  });
}
window.addEventListener("resize", () => {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
});
window.addEventListener('mousemove',(e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  console.log(mouse.x,mouse.y);
});
animation();
