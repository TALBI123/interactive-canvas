const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const RADIUS = 3;
const numberOfParticules = 300;
let w = (canvas.width = window.innerWidth);
let h = (canvas.height = window.innerHeight);
let arrParticules = [];
let mouse = {
  x: 0,
  y: 0,
};
const gravity = 0.01;
const friction = 0.0009;
// const
class Particule {
  constructor(x, y, color,velocity) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.alpha;
    ctx.arc(this.x, this.y, RADIUS, 0, 2 * Math.PI);
    ctx.fill();
  }
  update() {
    this.velocity.y += gravity;
    this.velocity.x += friction;
    this.velocity.y += friction;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.01;
    this.draw();
  }
}
window.addEventListener("click", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  const angleIncrement = (2 * Math.PI) / numberOfParticules;
  for (let i = 0; i < numberOfParticules; i++) {
    arrParticules.push(
      new Particule(
        mouse.x,
        mouse.y,
        `hsl(${Math.random() * 360},50%,50%)`,
        {
          x: Math.random() * Math.cos(angleIncrement * i) * 3,
          y: Math.random() * Math.sin(angleIncrement * i) * 3,
        }
      )
    );
  }
});
function animation() {
  ctx.clearRect(0, 0, w, h);
  arrParticules.forEach((particule, index) => {
    if (particule.alpha > 0) particule.update();
    else arrParticules.splice(index, 1);
  });
  requestAnimationFrame(animation);
}
animation();
window.addEventListener("resize", () => {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
});
