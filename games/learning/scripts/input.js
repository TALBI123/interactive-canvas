export const LEFT = "LEFT";
export const RIGHT = "RIGHT";
export const UP = "UP";
export const DOWN = "DOWN";
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
      else if(e.key === "Enter")
        this.game.debug = !this.game.debug;

    });
    window.addEventListener("keyup", (e) => {
      console.log("before", this.keys);
      if (e.key === "ArrowUp" || e.key.toLowerCase() === "z")
        this.keyReleased(UP);
      else if (e.key === "ArrowDown" || e.key.toLowerCase() === "s")
        this.keyReleased(DOWN);
      else if (e.key === "ArrowLeft" || e.key.toLowerCase() === "q")
        this.keyReleased(LEFT);
      else if (e.key === "ArrowRight" || e.key.toLowerCase() === "d")
        this.keyReleased(RIGHT);
      console.log(this.keys);
    });
    console.log("ze", this.keys);
  }
  keyPressed(key) {
    if (!this.keys.includes(key)) this.keys.unshift(key);
  }
  keyReleased(key) {
    if (!this.keys.includes(key)) return;
    this.keys.splice(this.keys.indexOf(key), 1);
  }
  get lastKey() {
    return this.keys[0];
  }
}