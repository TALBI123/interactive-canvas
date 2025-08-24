const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;
const ROW = 20;
const COL = 20;
const cellWidth = canvas.width / COL;
const cellHeight = canvas.height / ROW;
let Particules = [];
let count = 0;
let newX, newY,colIndex,rowIndex;
let isClicked = false;
class Particule {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  draw() {
    ctx.strokeStyle = "red";
    // ctx.strokeRect(this.x, this.y, cellWidth, cellHeight);
  }
  fill(){
    ctx.fillStyle = 'tomato';
    ctx.fillRect(this.x,this.y,cellWidth,cellHeight);
  }
}
function creatElements() {
  for (let i = 0; i < canvas.height; i += cellHeight) {
    for (let j = 0; j < canvas.width; j += cellWidth)
      Particules.push(new Particule(j, i));
  }
}
function drawElements() {
  Particules.forEach((elm, index) => {
    // setTimeout(() => ,10*index);
    elm.draw();
  });
}
creatElements();
drawElements();
canvas.addEventListener("mousemove", (e) => {
  if(!isClicked) return;
  newX = e.clientX - canvas.offsetLeft;
  newY = e.clientY - canvas.offsetTop;
  colIndex =  Math.floor(newX/cellWidth);
  rowIndex = Math.floor(newY/cellHeight);
  let elm = Particules[colIndex + rowIndex*ROW];
  if(elm)elm.fill();
});
canvas.addEventListener('mousedown',() => {
  isClicked = true;
});
canvas.addEventListener('mouseup',() => {
  isClicked = false;
});