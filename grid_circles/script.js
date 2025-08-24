const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let w = (canvas.width = window.innerWidth);
let h = (canvas.height = window.innerHeight);
const size = 2;
const radius = 40;
const numberOfPartW = Math.floor(w / radius);
const numberOfPartH = Math.floor(h / radius);
let Particules = [];
let mouse = {
  x: 0,
  y: 0,
  radius: 100,
};
class Particule {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.basX = this.x;
    this.basY = this.y;
    this.speed = Math.random() * 5 + 5;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
    ctx.fillStyle = "azure";
    ctx.fill();
  }
  update() {
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.hypot(dx, dy);
    if (mouse.x === 0 && mouse.y === 0) {
      if (this.x !== this.basX) this.x -= (this.x - this.basX) / 10;
      if (this.y !== this.basY) this.y -= (this.y - this.basY) / 10;
      return;
    }
    const force = (mouse.radius - distance) / mouse.radius;
    const dirX = dx / distance || 0;
    const dirY = dy / distance || 0;

    if (distance < mouse.radius) {
      this.x -= dirX * force * this.speed;
      this.y -= dirY * force * this.speed;
    } else {
      if (this.x != this.basX) this.x -= (this.x - this.basX) / 10;
      if (this.y != this.basY) this.y -= (this.y - this.basY) / 10;
    }
  }
}
function creatElement() {
  for (let y = radius; y < h; y += radius) {
    for (let x = radius; x < w; x += radius) {
      const newParticule = new Particule(x, y);
      newParticule.draw();
      Particules.push(newParticule);
    }
  }
}
function movement() {
  Particules.forEach((elm) => {
    elm.draw();
    elm.update();
  });
}
function connect() {
  for (let i = 0; i < Particules.length; i++) {
    for (let j = 0; j < Particules.length; j++) {
      const dx = Particules[i].x - Particules[j].x;
      const dy = Particules[i].y - Particules[j].y;
      const distance = Math.hypot(dx, dy);
      if (distance <= 2 * radius) {
        ctx.beginPath();
        ctx.lineWidth = 0.4;
        ctx.strokeStyle = "#f0ffff86";
        ctx.moveTo(Particules[i].x, Particules[i].y);
        ctx.lineTo(Particules[j].x, Particules[j].y);
        ctx.stroke();
      }
    }
  }
}
function mousemove(e) {
  mouse.x = e.x;
  mouse.y = e.y;
  // console.log(mouse)
}
function mouseout() {
  mouse.x = 0;
  mouse.y = 0;
}
window.addEventListener("mousemove", mousemove);
window.addEventListener("mouseout", mouseout);
function animation() {
  ctx.clearRect(0, 0, w, h);
  movement();
  connect();
  requestAnimationFrame(animation);
}
animation();
creatElement();
connect();
