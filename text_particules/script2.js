const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
class Particle {
  constructor(effect, x, y, color) {
    (this.effect = effect), (this.originX = x);
    this.originY = y;
    this.color = color;
    this.size = this.effect.gap - 6;
    this.x = Math.random() * this.effect.width;
    this.y = Math.random() * this.effect.height;
    this.dx = 0;
    this.dy = 0;
    this.vx = 0;
    this.vy = 0;
    this.distance = 0;
    this.friction = Math.random() * .8 + 0.12;
    this.ease = Math.random() * 0.05 + 0.015;
  }
  draw() {
    ctx.save();
    this.effect.context.fillStyle = this.color;
    this.effect.context.beginPath();
    this.effect.context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    this.effect.context.fill();
    ctx.restore();
  }
  update() {
    this.dx = this.effect.mouse.x - this.x;
    this.dy = this.effect.mouse.y - this.y;
    this.distance = Math.hypot(this.dx, this.dy);
    this.force = -this.effect.mouse.RADIUS / this.distance;
    if (-this.force > 1) {
      this.angle = Math.atan2(this.dy, this.dx);
      this.vx += this.force * Math.cos(this.angle);
      this.vy += this.force * Math.sin(this.angle);
    }
    this.x += (this.vx *= this.friction) + (this.originX - this.x)*this.ease;
    this.y += (this.vy *= this.friction) + (this.originY - this.y)*this.ease;
  }
}
class Effect {
  constructor(context, width, height) {
    this.context = context;
    this.width = width;
    this.height = height;
    this.textX = this.width / 2;
    this.textY = this.height / 2;
    this.TextHeight = 120;
    this.particles = [];
    this.gap = 7;
    this.mouse = {
      RADIUS: 60,
      x: 0,
      y: 0,
    };
    window.addEventListener("mousemove", (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
  }
  wrapping(string) {
    const gradient = this.context.createLinearGradient(
      0,
      0,
      this.width,
      this.height
    );
    gradient.addColorStop(0.4, "tomato");
    gradient.addColorStop(0.5, "pink");
    gradient.addColorStop(0.6, "tomato");
    this.context.fillStyle = gradient;
    this.context.font = "180px Bangers";
    this.textX -= this.context.measureText(string).width / 2;
    this.context.fillText(string, this.textX, this.textY);
    this.convertTextToParticle();
  }
  convertTextToParticle() {
    const pixels = this.context.getImageData(
      0,
      0,
      this.width,
      this.height
    ).data;
    for (let x = 0; x < this.height; x += this.gap) {
      for (let y = 0; y < this.width; y += this.gap) {
        const index = (y * this.width + x) * 4;
        const alpha = pixels[index + 3];
        if (alpha > 0) {
          const red = pixels[index];
          const green = pixels[index + 1];
          const blue = pixels[index + 2];
          const color = `rgb(${red},${green},${blue})`;
          this.particles.push(new Particle(this, x, y, color));
        }
      }
    }
  }
  render() {
    this.particles.forEach((elm) => {
      elm.update();
      elm.draw();
    });
  }
}
const effect = new Effect(ctx, canvas.width, canvas.height);
function connect() {
  const arr = [...effect.particles];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      const Dx = arr[i].x - arr[j].x;
      const Dy = arr[i].y - arr[j].y;
      const Distance = Math.hypot(Dx, Dy);
      if (Distance < 20) {
        ctx.save();
        ctx.beginPath();
        ctx.globalAlpha = .5;
        ctx.strokeStyle = arr[j].color;
        ctx.moveTo(arr[j].x, arr[j].y);
        ctx.lineTo(arr[i].x, arr[i].y);
        ctx.stroke();
        ctx.restore();
      }
    }
  }
}
effect.wrapping("TALBI MOHAMED");
function animation() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  effect.render();
  connect();
  requestAnimationFrame(animation);
}
connect();
animation();
