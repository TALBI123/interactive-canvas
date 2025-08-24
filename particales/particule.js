const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const h = (canvas.height = window.innerHeight);
const w = (canvas.width = window.innerWidth);
const numParticuls = 100;
const COLOR = "azure";
let arrParticules = [];
let mouse = {
  x: 0,
  y: 0,
  radius: 50,
};
window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
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
    ctx.beginPath(this.x, this.y);
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  update() {
    if (this.x > w || this.x < 0 || this.y > h || this.y < 0) {
      arrParticules = [...arrParticules.filter(elm => elm.x !== this.x  || elm.y !== this.y)];
      let size = Math.random() * 4 + 2;
      let newX = Math.random() * (innerWidth - 2*size/3);
      let newY = Math.random() * (innerHeight - 2*size/3);
      let newDirX = Math.random() * 5 +1;
      let newDirY = Math.random() * 5 +1;
      arrParticules.push(new Particule(newX,newY,newDirX,newDirY,size,'red'));
    }
    if (this.x + this.size > w || this.x - this.size < 0)
      this.dirX = -this.dirX;
    if (this.y + this.size > h || this.y - this.size < 0)
      this.dirY = -this.dirY;
    
    this.x += this.dirX;
    this.y += this.dirY;
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.hypot(dx, dy);
    if (distance < this.size + mouse.radius) {
      const angle = Math.atan2(dy, dx);
      const moveDistance = 10;
      this.x -= moveDistance * Math.cos(angle);
      this.y -= moveDistance * Math.atan2(dy, dx);
    }
    this.draw();
  }
}
function connect() {
  for (let i = 0; i < arrParticules.length; i++) {
    for (let j = i; j < arrParticules.length; j++) {
      let dx = arrParticules[i].x - arrParticules[j].x;
      let dy = arrParticules[i].y - arrParticules[j].y;
      let distance = Math.hypot(dx, dy);
      if (distance < 100) {
        // ctx.strokeStyle = 'red';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(arrParticules[i].x, arrParticules[i].y);
        ctx.lineTo(arrParticules[j].x, arrParticules[j].y);
        ctx.stroke();
      }
    }
  }
}
let creatParticules = () => {
  for (let i = 0; i < numParticuls; i++) {
    let size = 2;
    let x = Math.random() * (innerWidth - size);
    let y = Math.random() * (innerHeight - size);
    let dirX = Math.random() * 2;
    let dirY = Math.random() * 2;
    let color = COLOR;
    arrParticules.push(new Particule(x, y, dirX, dirY, size, color));
  }
};
let drawParticules = () => {
  creatParticules();
  arrParticules.forEach((part) => {
    part.draw();
  });
};
drawParticules();
function animation() {
  requestAnimationFrame(animation);
  // ctx.clearRect(0, 0, w, h);
  connect();
  arrParticules.forEach((part) => {
    part.update();
  });
 
}
animation();
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
connect();