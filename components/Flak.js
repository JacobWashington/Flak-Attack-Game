import { ctx, flakRound } from "../variables/variables.js";

class Flak {
    constructor (x,y,w,h){
        this.flakX = x;
        this.flakY = y;
        this.flakWidth = w;
        this.flakHeight = h;
    }

    //if tank is facing left, flakX is negative
    //if tank is facing right, flakX is positive
    //flakY will always be negative
    //at 50 degrees, x is 83.91%  of y
    //at 60 degrees, x i 57.74% of y
    //at 70 degrees, x is 36.4% of y
    //probably add logic in app or draw

    drawFlak = () => {
        flakRound.x = this.flakX;
        flakRound.y = this.flakY;
        flakRound.w = this.flakWidth;
        flakRound.h = this.flakHeight;
      
        ctx.beginPath();
        ctx.rect(this.flakX, this.flakY, this.flakWidth, this.flakHeight);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    }
}

export default Flak;