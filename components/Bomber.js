import { ctx } from "../variables/variables.js";

class Bomber  {
    constructor(x, y, w, h) {
        this.bomberX = x;
        this.bomberY = y;
        this.bomberWidth = w;
        this.bomberHeight = h;
    }

    drawBomber() {
        ctx.beginPath();
        ctx.rect(this.bomberX, this.bomberY,this.bomberWidth, this.bomberHeight);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    }
  };

  export default Bomber;