import { COLS, GAME_HEIGHT, GAME_WIDTH, ROWS, TILE_SIZE } from "../../main.js";

export class World {
  constructor(hero) {
    (this.hero = hero),
      (this.level1 = {
        backgroundLevel1: document.querySelector(".bglevel1"),
        foreGound: document.querySelector(".foregroundlv1"),
        collisionLayer : [
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
        ]
      });
    // this.colision
  }
  drawBackgroundImags(ctx) {
    ctx.drawImage(this.level1.backgroundLevel1, 0, 0, GAME_WIDTH, GAME_HEIGHT);
    this.hero.draw(ctx);
    ctx.drawImage(this.level1.foreGound, 0, 0, GAME_WIDTH, GAME_HEIGHT);
  }
  getTile(row,col){
    return this.level1.collisionLayer[row *COLS + col];
  }
  drawGrid(ctx) {
    ctx.strokeStyle = "black";
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++)
        ctx.strokeRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }
    this.drawColision(ctx);
  }
  drawColision(ctx) {
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        if(this.getTile(i,j))
          ctx.fillRect(j * TILE_SIZE,i*TILE_SIZE,TILE_SIZE,TILE_SIZE);
      }
    }
  }
}