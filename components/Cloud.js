import { ctx, moveCloud } from "../variables/variables.js";

class Cloud {
  constructor(x, y) {
    this.cloudX = x;
    this.cloudY = y;
  }

  drawCloud = () => {
    ctx.beginPath();
    ctx.moveTo(this.cloudX + moveCloud - canvas.width / 2, this.cloudY);

    ctx.bezierCurveTo(
      0.23333333333333332 * this.cloudX + moveCloud - canvas.width / 2,
      0.9912536443148689 * this.cloudY,
      0.5083333333333333 * this.cloudX + moveCloud - canvas.width / 2,
      0.717201166180758 * this.cloudY,
      0.9666666666666667 * this.cloudX + moveCloud - canvas.width / 2,
      0.7696793002915452 * this.cloudY
    );
    ctx.bezierCurveTo(
      0.8833333333333333 * this.cloudX + moveCloud - canvas.width / 2,
      0.6822157434402332 * this.cloudY,
      1.5 * this.cloudX + moveCloud - canvas.width / 2,
      0.641399416909621 * this.cloudY,
      1.5833333333333331 * this.cloudX + moveCloud - canvas.width / 2,
      0.6997084548104957 * this.cloudY
    );
    ctx.bezierCurveTo(
      1.9666666666666666 * this.cloudX + moveCloud - canvas.width / 2,
      0.4897959183673469 * this.cloudY,
      2.625 * this.cloudX + moveCloud - canvas.width / 2,
      0.6501457725947522 * this.cloudY,
      2.5166666666666666 * this.cloudX + moveCloud - canvas.width / 2,
      0.7959183673469387 * this.cloudY
    );
    ctx.bezierCurveTo(
      3.058333333333333 * this.cloudX + moveCloud - canvas.width / 2,
      0.8017492711370262 * this.cloudY,
      3.0416666666666663 * this.cloudX + moveCloud - canvas.width / 2,
      0.9970845481049562 * this.cloudY,
      2.5416666666666666 * this.cloudX + moveCloud - canvas.width / 2,
      this.cloudY
    );
    ctx.lineTo(this.cloudX + moveCloud - canvas.width / 2, this.cloudY);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();
  }
}

export default Cloud;
