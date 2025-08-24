import { TILE_SIZE } from "../main.js";
import { GameObject } from "./gameObj.js";
import { DOWN, LEFT, RIGHT, UP } from "./input.js";

export class Hero extends GameObject {
  constructor({ game, sprite, position, scale }) {
    super({ game, sprite, position, scale });
    this.speed = 2;
    this.maxFrame = 8;
    this.isMoving = false;
  }
  update(delayTime) {
    let nextX = this.destinationPosition.x;
    let nextY = this.destinationPosition.y;
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
      const row = nextY / TILE_SIZE;
      const col = nextX / TILE_SIZE;
      if (!this.game.world.getTile(row, col)) {
        this.destinationPosition.x = nextX;
        this.destinationPosition.y = nextY;
      }
    }
    this.isMoving =  this.game.input.keys.length>0 || !isArrived;
    if (this.isMoving) this.game.eventTimer += delayTime * this.speed;
    if (this.isMoving && this.game.isUpdated)
      this.sprite.x = (this.sprite.x + 1) % this.maxFrame;
  }
}
