class Tank {
  constructor(x, y, w, h) {
    this.tankX = x;
    this.tankY = y;
    this.tankWidth = w;
    this.tankHeight = h;
  }

  drawTank = () => {
    ctx.beginPath();
    ctx.rect(this.tankX, this.tankY, this.tankWidth, this.tankHeight);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
  };
}

export default Tank;
