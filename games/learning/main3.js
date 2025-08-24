import { World } from "./script3/world.js";
 export const TILE_SIZE = 28;
 export  const ROWS = 20;
 export  const COLS = 15;
 export  const GAME_WIDTH = TILE_SIZE * COLS;
 export  const GAME_HEIGHT = TILE_SIZE * ROWS;
window.addEventListener("load", () => {
 

  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = GAME_WIDTH;
  canvas.height = GAME_HEIGHT;
  class Game{
    constructor(){
        this.world = new World();
    }
    render(ctx){
        this.world.drawBackgroundImg(ctx);
        this.world.drawGrid(ctx);
        }
  }
  const game = new Game();
  game.render(ctx);
});
