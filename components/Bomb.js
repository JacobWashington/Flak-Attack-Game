import { ctx } from "../variables/variables.js";

class Bomb {
  constructor(x, y, w, h) {
    this.bombX = x;
    this.bombY = y;
    this.bombWidth = w;
    this.bombHeight = h;
  }
  drawBomb = () => {
    ctx.beginPath();
    ctx.rect(this.bombX, this.bombY += 1, this.bombWidth, this.bombHeight);
    ctx.fillStyle = "gray";
    ctx.fill();
    ctx.closePath();
  }
}

export default Bomb;
