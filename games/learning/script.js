import { GameObject } from "./scripts/gameObj.js";
import { Hero } from "./scripts/hero.js";
import { Input } from "./scripts/input.js";
import { World } from "./scripts/world.js";
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
        position: { x: 2 * TILE_SIZE, y: 4 * TILE_SIZE },
        scale: 0.8,
      });
      this.world = new World(this.hero);
      this.input = new Input(this);
      this.debug = true;
      this.eventUpdate = false;
      this.eventInterval = 120;
      this.eventTimer = 0;
    }
    render(ctx, deltaTime) {
      this.world.drawBackground(ctx);
      if (this.debug) this.world.drawGrid(ctx);
      this.hero.update(deltaTime);
      this.hero.drawMoveToNextPosition(ctx);
      if (this.eventTimer < this.eventInterval) {
        this.eventTimer += deltaTime;
        this.eventUpdate = false;
      } else {
        this.eventTimer = 0;
        this.eventUpdate = true;
      }
    }
  }
  const game = new Game();
  let lastTime = 0;
  function animate(timeStamp) {
    requestAnimationFrame(animate);
    const deltaTime = timeStamp - lastTime;
    // console.log(deltaTime,lastTime);
    lastTime = timeStamp;
    game.render(ctx, deltaTime);
  }
  requestAnimationFrame(animate);
});
console.log("dssd");
