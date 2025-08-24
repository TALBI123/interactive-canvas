const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const maxradius = 70;
let particles = [];
let isAnmating = false;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speedX = Math.random() * 8;
    this.speedY = Math.random() * 6;
    this.alpha = 1;
    this.angle = Math.random() * 2 * Math.PI;
  }
  draw() {
    ctx.beginPath();
    ctx.globalAlpha = this.alpha
    ctx.arc(this.x, this.y, 0, 0, 2 * Math.PI);
    ctx.fill();
    this.update();
  }
  update() {
    this.x += this.speedX * Math.cos(this.angle);
    this.y += this.speedY * Math.sin(this.angle);
    this.alpha -= 0.03;
  }
}
window.addEventListener("mousemove", ({ clientX, clientY }) => {
    for(let i=0;i<4;i++)
  particles.push(new Particle(clientX, clientY));
});
const connect = () => {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const pointA = particles[i];
      const pointB = particles[j];
      const dx = pointA.x - pointB.x;
      const dy = pointA.y - pointB.y;
      const distance = Math.hypot(dx, dy);
      if (distance <= maxradius) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255,255,255,${1 - distance/maxradius})`;
        // ctx.strokeStyle = "azure"
        ctx.moveTo(pointA.x, pointA.y);
        ctx.lineTo(pointB.x, pointB.y);
        ctx.stroke();
      }
    }
  }
};
const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle, index, arr) => {
    particle.draw();
    if (particle.alpha <= 0) arr.splice(index, 1);
  });
  connect();
  ctx.fillStyle = "rgba(0,0,0,0.1)";
  requestAnimationFrame(animate);
};
animate();
