const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const image = new Image();
image.src = "img.webp";
let mouse = {
  x: 0,
  y: 0,
  radius: 70,
};
window.addEventListener("load", () => {
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  class Cell {
    constructor(x, y, symbol, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.symbol = symbol;
      this.baseX = this.x;
      this.baseY = this.y;
      this.speed = Math.random() * 5 + 5;
    }
    draw() {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      // ctx.fillText(this.symbol,this.x,this.y);
      ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI);
      ctx.fill();
    }
    update() {
      this.draw();
      if (mouse.x == 0 && mouse.y == 0) {
        if (this.x != this.baseX) this.x -= (this.x - this.baseX) / 10;
        if (this.y != this.baseY) this.y -= (this.y - this.baseY) / 10;
        return;
      }
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const distance = Math.hypot(dx, dy);
      if (distance < mouse.radius) {
        const dirX = dx / distance || 0;
        const dirY = dy / distance || 0;
        const force = (mouse.radius - distance) / mouse.radius;
        this.x += dirX * this.speed * force;
        this.y += dirY * this.speed * force;
      } else {
        if (this.baseX != this.x) this.x -= (this.x - this.baseX) / 10;
        if (this.baseY != this.y) this.y -= (this.y - this.baseY) / 10;
      }
    }
  }
  class asciiArt {
    constructor(width, height) {
      this.height = height;
      this.width = width;
      this.pixles = ctx.getImageData(0, 0, this.width, this.height).data;
      this.arrPixles = [];
    }
    convertNumToSymbol(val) {
      if (val > 250) return "a";
      else if (val < 40) return "b";
      else if (val < 70) return "c";
      else if (val < 100) return "d";
      else if (val < 120) return "e";
      else if (val < 140) return "n";
      else if (val < 170) return "x";
      else if (val < 200) return "$";
      else if (val < 230) return "m";
      else if (val < 250) return "r";
      else return "*";
    }
    scanImage(cellSize) {
      for (let y = 0; y < this.height; y += cellSize) {
        for (let x = 0; x < this.width; x += cellSize) {
          const index = (y * this.width + x) * 4;
          if (this.pixles[index + 3] > 128) {
            const red = this.pixles[index];
            const green = this.pixles[index + 1];
            const blue = this.pixles[index + 2];
            const color = `rgb(${red},${green},${blue})`;
            const symbol = this.convertNumToSymbol(Math.random() * 300);
            this.arrPixles.push(new Cell(x, y, symbol, color));
          }
        }
      }
    }
    draw(cellSize) {
      ctx.clearRect(0, 0, this.width, this.height);
      this.scanImage(cellSize);
      this.arrPixles.forEach((pixel) => pixel.draw());
    }
  }
  const mousemove = (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  };
  const mouseout = () => {
    mouse.x = 0;
    mouse.y = 0;
  };
  const effect = new asciiArt(canvas.width, canvas.height);
  effect.draw(5);
  canvas.addEventListener("mousemove", mousemove);
  canvas.addEventListener("mouseout", mouseout);
  function animation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    effect.arrPixles.forEach((elm) => elm.update());
    requestAnimationFrame(animation);
  }
  animation();
});