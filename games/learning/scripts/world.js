import { COLS, GAME_HEIGHT, GAME_WIDTH, ROWS, TILE_SIZE } from "../script.js";
export class World {
  constructor(hero) {
    this.hero = hero;
    this.level1 = {
      waterLayer: [],
      groundLayer: [],
      collisionLayer:[
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,0,1,1,0,0,0,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,1,0,1,1,0,0,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,0,1,1,1,1,1,1,1,1,0,0,0,1,
        1,0,0,1,1,1,1,1,1,1,1,0,0,0,1,
        1,0,0,1,1,1,1,1,1,1,1,0,1,1,1,
        1,0,0,1,1,1,1,1,1,1,1,0,0,0,1,
        1,0,0,1,1,1,1,1,1,1,1,0,0,0,1,
        1,0,0,1,1,1,1,1,1,1,1,0,0,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,0,1,1,0,0,1,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
      ],
      backgroundLayer: document.querySelector(".bglevel1"),
      forGroundLayer: document.querySelector(".foregroundlv1"),
      hero: document.querySelector(".hero"),
    };
    console.log(this.level1.backgroundLayer);
  }
  drawBackground(ctx) {
    ctx.drawImage(this.level1.backgroundLayer, 0, 0, GAME_WIDTH, GAME_HEIGHT);
    this.hero.draw(ctx);
    ctx.drawImage(this.level1.forGroundLayer, 0, 0, GAME_WIDTH, GAME_HEIGHT);
  }
  getTile(row, col) {
    return this.level1.collisionLayer[row * COLS + col];
  }
  drawCollision(ctx) {
    ctx.fillStyle = "rgba(255,255,255,.5)";
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++)
        if(this.getTile(i,j))
          ctx.fillRect(j * TILE_SIZE,i*TILE_SIZE,TILE_SIZE,TILE_SIZE);
    }
  }
  drawGrid(ctx) {
    ctx.strokeStyle = "black";
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        ctx.strokeRect(TILE_SIZE * col, TILE_SIZE * row, TILE_SIZE, TILE_SIZE);
      }
    }
    this.drawCollision(ctx);
  }
}
