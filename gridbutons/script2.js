const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const size = 20;
const cellHeight = Math.floor(canvas.height / size);
const cellWidth = Math.floor(canvas.width / size);
let mouse = {
  x: null,
  y: null,
};
let color;
let isClicked = true;
let cells = [];
class Cell {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  draw(color = "#4070f4") {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fill();
  }
}
const creatCells = () => {
  for (let y = 0; y < canvas.height; y += cellHeight) {
    for (let x = 0; x < canvas.width; x += cellWidth) {
      cells.push(new Cell(x, y, cellWidth, cellHeight));
    }
  }
};
creatCells();
cells.forEach((cell) => cell.draw);
canvas.addEventListener("mousemove", ({ clientX, clientY }) => {
  if (isClicked) return;
  const x = Math.floor((clientX - canvas.offsetLeft) / cellWidth);
  const y = Math.floor((clientY - canvas.offsetTop) / cellHeight);
  const index = y * size + x;
  if (cells[index]) {
    cells[index].draw(color);
  }
});
canvas.addEventListener("mousedown", () => {
  isClicked = false;
});
canvas.addEventListener("mouseup", () => {
  isClicked = true;
});
document.querySelectorAll(".color").forEach((elmColor) => {
  elmColor.addEventListener("click", () => {
    color = elmColor.style.getPropertyValue("--clr");
  });
});
console.log(document.querySelector(".download-btn"));
document.querySelector(".download-btn").addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "canvas-image.png";
  link.href = canvas.toDataURL("image/png");
  // console.log(link)
  link.click()
});
