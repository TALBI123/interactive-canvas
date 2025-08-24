const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let Particules = [];
let mouse = { x: 0, y: 0 };
class particule {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speedX = Math.random() * 12 + 6;
    this.speedY = Math.random() * 12 + 6;
    this.size = Math.random() * 5 + 3;
    this.angle = Math.random() * Math.PI * 2;
    this.alpha = 1;
    this.angle = Math.random() * Math.PI * 2;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = `rgba(240, 255, 255, ${this.alpha})`;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }
  update() {
    this.x += this.speedX * Math.cos(this.angle);
    this.y += this.speedY * Math.sin(this.angle);
    if (this.x <= 0 || this.x >= canvas.width - this.size)
      this.speedX = -this.speedX;
    if (this.y <= 0 || this.y >= canvas.height - this.size)
      this.speedY = -this.speedY;
    this.alpha -= 0.02;
  }
}
window.addEventListener("mousemove", (e) => {
  Particules.push(new particule(e.clientX, e.clientY));
});
function connect() {
  for (let i = 0; i < Particules.length; i++) {
    for (let j = 0; j < Particules.length; j++) {
      const dx = Particules[i].x - Particules[j].x;
      const dy = Particules[i].y - Particules[j].y;
      const distance = Math.hypot(dy, dx);
      if (distance <= 100) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(250,250,250,${1 - distance/100})`;
        ctx.moveTo(Particules[i].x, Particules[i].y);
        ctx.lineTo(Particules[j].x, Particules[j].y);
        ctx.stroke();
      }
    }
  }
}
function animation() {
  requestAnimationFrame(animation);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  connect();
  Particules.forEach((elm, index) => {
    elm.draw();
    elm.update();
    if (elm.alpha <= 0) Particules.splice(index, 1);
  });
}
animation();
