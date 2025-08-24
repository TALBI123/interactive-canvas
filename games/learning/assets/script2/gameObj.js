import { HALF_TILE, TILE_SIZE } from "../main.js";

export class GameObject {
  constructor({ game, sprite, position, scale }) {
    this.game = game;
    this.sprite = sprite ?? {
      image: "",
      x: 0,
      y: 0,
      width: TILE_SIZE,
      TILE_SIZE,
    };
    this.position = position ?? { x: 0, y: 0 };
    this.scale = scale ?? 1;
    this.destinationPosition = { x: this.position.x, y: this.position.y };
    this.distanceToTravel = { x: 0, y: 0 };
    this.width = this.sprite.width * this.scale;
    this.height = this.sprite.height * this.scale;
  }
  moveTowards(destinationPosition, speed) {
    this.distanceToTravel.x = destinationPosition.x - this.position.x;
    this.distanceToTravel.y = destinationPosition.y - this.position.y;
    let distance = Math.hypot(this.distanceToTravel.x, this.distanceToTravel.y);
    if (distance <= speed) {
      this.position.x = this.destinationPosition.x;
      this.position.y = this.destinationPosition.y;
    } else {
      const stepX = this.distanceToTravel.x / distance;
      const stepY = this.distanceToTravel.y / distance;
      this.position.x += stepX * speed;
      this.position.y += stepY * speed;

      this.distanceToTravel.x = this.destinationPosition.x - this.position.x;
      this.distanceToTravel.y = this.destinationPosition.y - this.position.y;
      distance = Math.hypot(this.distanceToTravel.x, this.distanceToTravel.y);
    }
    if (
      this.game.eventTimer <= this.game.eventInterval &&
      this.game.hero.isMoving
    ) {
      this.game.isUpdated = false;
      // this.game.eventTimer +=
    } else {
      this.game.eventTimer = 0;
      this.game.isUpdated = true;
    }
    return distance;
  }
  draw(ctx) {
    ctx.fillStyle = "rgba(255,255,255,.3)";
    ctx.fillRect(this.position.x, this.position.y, TILE_SIZE, TILE_SIZE);
    ctx.strokStyle = "yellow";
    ctx.strokeRect(
      this.destinationPosition.x,
      this.destinationPosition.y,
      TILE_SIZE,
      TILE_SIZE
    );
    ctx.drawImage(
      this.sprite.image,
      this.sprite.x * this.sprite.width,
      this.sprite.y * this.sprite.height,
      this.sprite.width,
      this.sprite.height,
      this.position.x + HALF_TILE - this.width / 2,
      this.position.y + TILE_SIZE - this.height,
      this.width,
      this.height
    );
  }
}
