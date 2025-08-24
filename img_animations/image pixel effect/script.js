const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const image = new Image();
image.src = "frog.webp";
image.addEventListener("load", () => {
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  class Cell {
    constructor(x, y, symbol, color) {
      this.x = x;
      this.y = y;
      this.symbol = symbol;
      this.color = color;
    }
    draw() {
      ctx.fillStyle = this.color;
      ctx.fillText(this.symbol, this.x, this.y);
    }
   
  }
  class asciiArt {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.pixles = ctx.getImageData(0, 0, this.width, this.height).data;
      this.imageCells = [];
    }
    convertToSymbol(val) {
      if (val > 250) return "c";
      else if (val < 240) return "b";
      else if (val < 220) return "i";
      else if (val < 200) return "n";
      else if (val < 180) return "3";
      else if (val < 160) return "2";
      else if (val < 140) return "n";
      else if (val < 120) return "f";
      else if (val < 100) return "l";
      else if (val < 80) return "o";
      else if (val < 60) return "r";
      else if (val < 40) return "a";
      else if (val < 20) return "m";
      else return "h";
    }
    scnaImage(cellSize) {
      for (let y = 0; y < this.height; y += cellSize) {
        for (let x = 0; x < this.width; x += cellSize) {
          const index = (y * canvas.width + x) * 4;
          //   if (this.pixles[index + 3] > 128) {
          const red = this.pixles[index];
          const green = this.pixles[index + 1];
          const blue = this.pixles[index + 2];
          const total = red + green + blue;
          const averge = total / 3;
          const color = "rgb(" + red + "," + green + "," + blue + ")";
          const symbol = this.convertToSymbol(Math.random() * 300);
          this.imageCells.push(new Cell(x, y, symbol, color));
          //   }
        }
      }
      console.log(this.imageCells);
    }
    draw() {
      ctx.clearRect(0, 0, this.width, this.height);
      this.imageCells.forEach((cell) => {
        cell.draw();
      });
    }
  }
  const effect = new asciiArt(canvas.width, canvas.height);
  effect.scnaImage(17);
  effect.draw();
  ctx.fillStyle = "rgb(0, 0, 0)";
    function animation() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particules.forEach((particule) => {
        particule.update();
        ctx.globalAlpha = particule.speed * 0.5;
      });
      requestAnimationFrame(animation);
    }
    animation();
});
