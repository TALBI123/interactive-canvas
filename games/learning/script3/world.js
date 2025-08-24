import { COLS, GAME_HEIGHT, GAME_WIDTH, ROWS, TILE_SIZE } from "../main3.js";

export class World {
  constructor() {
    this.levl1 = {
      backgroundImage: document.querySelector(".bglevel1"),
      backImg2:document.querySelector('.foregroundlv1')
    };
  }
  drawBackgroundImg(ctx) {
    ctx.drawImage(this.levl1.backgroundImage, 0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx.drawImage(this.levl1.backImg2,0,0,GAME_WIDTH,GAME_HEIGHT);
  }
  drawGrid(ctx) {
    for (let x = 0; x < ROWS; x++) {
      for (let y = 0; y < COLS; y++)
        ctx.strokeRect(y * TILE_SIZE, x * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }
  }
}
