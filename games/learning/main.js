import { Hero } from "./script2/hero.js";
import { Input } from "./script2/input.js";
import { World } from "./script2/world.js";

export const TILE_SIZE = 28;
export const COLS = 15;
export const ROWS = 20;
export const GAME_WIDTH = TILE_SIZE * COLS;
export const GAME_HEIGHT = TILE_SIZE * ROWS;
export const HALF_TILE = TILE_SIZE / 2;
window.addEventListener("load", () => {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = GAME_WIDTH;
  canvas.height = GAME_HEIGHT;
  class Game {
    constructor() {
      this.hero = new Hero({
        game: this,
        sprite: {
          image: document.querySelector(".hero"),
          x: 0,
          y: 10,
          width: 64,
          height: 64,
        },
        position: { x: 3 * TILE_SIZE, y: 4 * TILE_SIZE },
      });
      this.input = new Input(this);
      this.world = new World(this.hero);
      this.debug = true;
      this.eventTimer = 0;
      this.isUpdated = false;
      this.eventInterval = 300;
    }
    render(ctx,delayTime) {
      this.world.drawBackgroundImags(ctx);
      this.hero.update(delayTime);
      if (this.debug) this.world.drawGrid(ctx);
    }
  }
  const game = new Game();
  let lastTime = 0;
  function animate(timeStap) {
    requestAnimationFrame(animate);
    const delayTime = timeStap - lastTime;
    lastTime = timeStap;
    game.render(ctx, delayTime);
  }
  requestAnimationFrame(animate);
});
