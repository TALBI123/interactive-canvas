const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const text = "TALBI";
let h = (canvas.height = window.innerHeight);
let w = (canvas.width = window.innerWidth);
class Particle {
  constructor(effect, x, y, color) {
    this.effect = effect;
    this.color = color;
    this.x = Math.random() * this.effect.width;
    this.y = Math.random() * this.effect.height;
    this.originX = x;
    this.originY = y;
    this.size = this.effect.gap - 1;
    this.dx = 0;
    this.dy = 0;
    this.vx = 0;
    this.vy = 0;
    this.force = 0;
    this.angle = 0;
    this.distance = 0;
    this.friction = Math.random() * 0.6 + 0.15;
    this.ease = Math.random() * 0.1 + 0.005;
  }
  draw() {
    this.effect.context.fillStyle = this.color;
    this.effect.context.fillRect(this.x, this.y, this.size, this.size);
  }
  update() {
    this.dx = this.effect.mouse.x - this.x;
    this.dy = this.effect.mouse.y - this.y;
    this.distance = Math.hypot(this.dx, this.dy);
    this.force = -this.effect.mouse.radius / this.distance;
    if (this.distance < this.effect.mouse.radius) {
      this.angle = Math.atan2(this.dy, this.dx);
      this.vx += this.force * Math.cos(this.angle);
      this.vy += this.force * Math.sin(this.angle);
    }
    this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
    this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
  }
}
class Effect {
  constructor(context, width, height) {
    this.context = context;
    this.width = width;
    this.height = height;
    this.textY = this.height / 2;
    this.textX = this.width / 2;
    this.maxTextWidth = this.width * 0.8;
    this.lineHeight = 80;
    //Particle Text
    this.particles = [];
    this.gap = 3;
    this.mouse = {
      radius: 70,
      x: 0,
      y: 0,
    };
    window.addEventListener("mousemove", (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
  }
  wrapText(string) {
    const gradient = ctx.createLinearGradient(0, 0, w, h);
    gradient.addColorStop(0.4, "tomato");
    gradient.addColorStop(0.5, "pink");
    gradient.addColorStop(0.6, "tomato");
    this.context.fillStyle = gradient;
    ctx.font = `140px monospace`;
    ctx.textAlign = "center";
    //wrapping function
    let arr = [];
    let line = "";
    let testLine = "";
    let words = string.split(" ");
    let countlines = 0;
    for (let i = 0; i < words.length; i++) {
      testLine = line + words[i] + " ";
      if (this.context.measureText(testLine).width > this.maxTextWidth) {
        line = words[i] + " ";
        countlines++;
      } else line = testLine;
      arr[countlines] = line;
    }
    this.textY = this.textY - (this.lineHeight / 2) * countlines;
    arr.forEach((el, index) => {
      this.context.fillText(
        el,
        this.textX,
        this.textY + this.lineHeight * index
      );
    });
    this.convertToParticle();
  }
  convertToParticle() {
    this.particles = [];
    const pixels = this.context.getImageData(
      0,
      0,
      this.width,
      this.height
    ).data;
    this.context.clearRect(0, 0, this.width, this.height);
    for (let y = 0; y < this.height; y += this.gap) {
      for (let x = 0; x < this.width; x += this.gap) {
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
const effect = new Effect(ctx, w, h);
const str = "TALBI";
effect.wrapText(str);
function animation() {
  effect.context.clearRect(0, 0, w, h);
  effect.render();
  requestAnimationFrame(animation);
}
animation();
