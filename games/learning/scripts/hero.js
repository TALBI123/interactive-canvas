import { TILE_SIZE } from "../script.js";
import { GameObject } from "./gameObj.js";
import { UP, DOWN, LEFT, RIGHT } from "./input.js";

export class Hero extends GameObject {
  constructor({ game, sprite, position, scale }) {
    super({ game, sprite, position, scale });
    this.maxFrame = 8;
    this.speed = 1.5;
    this.isMoving = false;
  }
  update(timeDelay) {
    let nextX = this.destinationPosition.x;
    let nextY = this.destinationPosition.y;
    // const scaledSpeed = this.speed * (timeDelay / 1000);
    const distance = this.moveTowards(this.destinationPosition, this.speed);
    const isArrived = distance < this.speed;
    if (isArrived) {
      switch (this.game.input.lastKey) {
        case UP:
          nextY -= TILE_SIZE;
          this.sprite.y = 8;
          break;
        case DOWN:
          nextY += TILE_SIZE;
          this.sprite.y = 10;
          break;
        case LEFT:
          nextX -= TILE_SIZE;
          this.sprite.y = 9;
          break;
        case RIGHT:
          nextX += TILE_SIZE;
          this.sprite.y = 11;
          break;
      }
      const col = nextX / TILE_SIZE;
      const row = nextY / TILE_SIZE;
      // console.log(this.game..getTile(row, col))
      if (!this.game.world.getTile(row, col)) {
        this.destinationPosition.x = nextX;
        this.destinationPosition.y = nextY;
      }
    }
    // if (this.game.input.keys.length>0 || !isArrived) {
    //   this.isMoving = true;
    // } else this.isMoving = false;
    if (
      this.game.eventUpdate &&
      (this.game.input.keys.length > 0 || !isArrived)
    )
      this.sprite.x = (this.sprite.x + 1) % this.maxFrame;
    // else this.sprite.x = 0;
  }
}
