export const RIGHT = "RIGHT";
export const LEFT = "LEFT";
export const DOWN = "DOWN";
export const UP = "UP";
export class Input {
  constructor(game) {
    this.game = game;
    this.keys = [];
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowUp" || e.key.toLowerCase() === "z")
        this.keyPressed(UP);
      else if (e.key === "ArrowDown" || e.key.toLowerCase() === "s")
        this.keyPressed(DOWN);
      else if (e.key === "ArrowLeft" || e.key.toLowerCase() === "q")
        this.keyPressed(LEFT);
      else if (e.key === "ArrowRight" || e.key.toLowerCase() === "d")
        this.keyPressed(RIGHT);
      else if (e.key === "Enter") this.game.debug = !this.game.debug;
      console.log(this.keys);
    });
    window.addEventListener("keyup", (e) => {
      if (e.key === "ArrowUp" || e.key.toLowerCase() === "z")
        this.keyReleased(UP);
      else if (e.key === "ArrowDown" || e.key.toLowerCase() === "s")
        this.keyReleased(DOWN);
      else if (e.key === "ArrowLeft" || e.key.toLowerCase() === "q")
        this.keyReleased(LEFT);
      else if (e.key === "ArrowRight" || e.key.toLowerCase() === "d")
        this.keyReleased(RIGHT);
    });
  }
  keyPressed(key) {
    if (!this.keys.includes(key)) this.keys.unshift(key);
  }
  keyReleased(key) {
    const index = this.keys.indexOf(key);
    if (index !== -1) this.keys.splice(index, 1);
  }
  get lastKey() {
    return this.keys[0];
  }
}
