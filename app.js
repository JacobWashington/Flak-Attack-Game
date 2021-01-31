

// SETUP
let createLayout = () => {
  let layout = document.createElement("div");
  layout.setAttribute("class", "layout");

  let title = document.createElement("h1");
  title.setAttribute("class", "title");
  title.innerText = "Flak Attak";
  layout.appendChild(title);

  let instructions = document.createElement("p");
  instructions.setAttribute("class", "instructions");
  instructions.setAttribute("id", "instructions");
  instructions.innerText = `USE THE "A" AND "D" KEYS TO MOVE YOUR TANK LEFT AND RIGHT. FIRE ROUNDS WITH THE SPACE BAR!`;

  layout.appendChild(instructions);

  document.body.appendChild(layout);
};

createLayout();

const createCanvas = () => {

};

createCanvas();

let animate = () => {

};



// CONTROLS
function keyDownHandler(e) {
  if (e.key == "d") {
    rightPressed = true;
  } else if (e.key == "a") {
    leftPressed = true;
  } else if (e.key == " " && !fireRound) {
    fireRound = true;
    ammoX = tankX + tankWidth / 2;
  }
}

function keyUpHandler(e) {
  if (e.key == "d") {
    rightPressed = false;
  } else if (e.key == "a") {
    leftPressed = false;
  } else if (e.key == " ") {
    timeoutID = window.setTimeout(resetAmmo, 1.6 * 1000);
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//EVALUATIONS
const bomberCollisionDetection = (rect1, rect2) => {
  if (
    rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.y + rect1.h > rect2.y
  ) {
    targetHit();
    bomberHit = true;
  }
};

const tankCollisionDetection = (rect1, rect3) => {
  if (
    rect1.x < rect3.x + rect3.w &&
    rect1.x + rect1.w > rect3.x &&
    rect1.y < rect3.y + rect3.h &&
    rect1.y + rect1.h > rect3.y
  ) {
    tankHit = true;
  }
};

//TRIGGERS
const targetHit = () => {
  //trigger explosion drawing
  score += 10;
  resetAmmo();
  resetBomber();
};

const gameOver = () => {
  //triggered when player runs out of lives, or timer runs out
  //if player lives = 0 then GAME OVER
  //else, display score at center
  endGame = true;
  time = 60
  timeoutID = window.setTimeout(function () {
    location.reload();
  }, 10 * 1000);
};

//EFFECTS
const updateTimer = () => {
  time -= 1;
};

const resetAmmo = () => {
  fireRound = false;
  ammoY = canvas.height - tankHeight;
  ammoX = tankX + tankWidth / 2;
  window.clearTimeout(timeoutID);
};

const resetBomber = () => {
  moveBomber = 0;
  bomberHit = false;
  bomberY = randY;
  bomberX = canvas.width + 300;
  bomberSpeed = Math.floor(Math.random() * (15 - 5) + 5);
};

//DRAW FUNCTIONS
const draw = () => {
  randY = Math.floor(Math.random() * (400 - 50) + 50);

  drawBackground();
  drawTank();
  drawScore();
  drawTimer();
  tankCollisionDetection(rect1, rect2);

  if (endGame) {
    drawGameOver();
  } else {
    if (fireRound) {
      ammoY -= 1;
      bomberCollisionDetection(rect1, rect2);
      drawAmmoRound();
    }

    if (bomberX + moveBomber > 0 - bomberWidth) {
      drawBomber();
    } else drawingBomber = false;

    if (!drawingBomber) {
      resetBomber();
    }

    if (cloudX + moveX - 800 < canvas.width) {
      drawCloud(cloudX, cloudY);
    } else if (cloudX + moveX > canvas.width) {
      cloudX = Math.floor(Math.random() * (250 - 50) + 50);
      cloudY = 1.8583333333333334 * cloudX;
      moveX = 0;
      drawCloud(cloudX, cloudY);
    }

    if (rightPressed) {
      tankX += 8;
      if (tankX + tankWidth > canvas.width) {
        tankX = canvas.width - bomberWidth;
      }
    } else if (leftPressed) {
      tankX -= 8;
      if (tankX < 0) {
        tankX = 0;
      }
    }

    if (time == 0) {
      gameOver();
      clearInterval(timer);
    }
  }

  moveX += 3;
  moveBomber -= bomberSpeed;
};

const drawAmmoRound = () => {

};

const drawBackground = () => {
  //sky
  ctx.beginPath();
  ctx.rect(0, 0, 1368, 568);
  ctx.fillStyle = "#87ceeb";
  ctx.fill();
  ctx.closePath();

  //grass
  ctx.beginPath();
  ctx.rect(0, 568, 1368, 200);
  ctx.fillStyle = "#00c400";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.rect(0, 568, 1368, 2);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
};

const drawLifeRack = () => {
  ctx.beginPath();
  ctx.rect(canvas.width * 0.86, canvas.height * 0.9, 175, 60);
  ctx.fillStyle = "gray";
  ctx.lineWidth = 2;
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
};

const drawScore = () => {
  ctx.beginPath();
  ctx.textAlign = "center"
  ctx.font = "30px sans-serif";
  ctx.fillText(`SCORE: ${score}`, 1250, 30);
  ctx.closePath();
};

const drawTimer = () => {
  ctx.beginPath();
  ctx.textAlign = "center"
  ctx.font = "30px sans-serif";
  ctx.fillText(`TIMER: ${time}`, 100, 30);
  ctx.closePath();
};

const drawGameOver = () => {
  ctx.beginPath();
  ctx.font = "100px serif";
  ctx.textAlign = "center";
  ctx.strokeText("GAME OVER", canvas.width / 2, canvas.height / 2);
  ctx.closePath();
};

init();
animate();
