let canvas;
let ctx;
let ammoRoundRadius = 10;
let fireRound;
let ammoStart;
let ammoY;
let ammoX;
let ammoWidth;
let ammoHeight;
let moveX = 0;
let cloudX;
let cloudY;
let tankHeight;
let tankWidth;
let tankX;
let tankY;
let tankHit;
let bomberHeight;
let bomberWidth;
let bomberX;
let bomberY;
let bomberHit;
let moveBomber = 0;
let drawingBomber;
let rightPressed = false;
let leftPressed = false;
let score;
let time;
let timer;
let moveBackground;
let endGame;
let timeoutID;
let bomberSpeed;
let dropBomb;
let bombWidth;
let bombHeight;
let bombX;
let bombY;
let randY;
let rect1 = {
  x: "",
  y: "",
  w: "",
  h: "",
};
let rect2 = {
  x: "",
  y: "",
  w: "",
  h: "",
};

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
  let cv = document.createElement("canvas");
  cv.setAttribute("id", "canvas");
  cv.setAttribute("width", "1366");
  cv.setAttribute("height", "768");

  document.body.appendChild(cv);
};

createCanvas();

let animate = () => {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  draw();
};

const init = () => {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  time = 60;

  randY = Math.floor(Math.random() * (400 - 50) + 50);

  //cloudStuff
  cloudX = Math.floor(Math.random() * (250 - 50) + 50);
  cloudY = 1.8583333333333334 * cloudX;

  //tankStuff
  tankWidth = 150;
  tankHeight = 0.53333 * tankWidth;
  tankX = (canvas.width - tankWidth) / 2;
  tankY = canvas.height - tankHeight * 1.5;
  tankHit = false;

  //bomberStuff
  bomberHeight = 40;
  bomberWidth = 150;
  bomberX = canvas.width + 300;
  bomberY = randY;
  bomberHit = false;
  bomberSpeed = Math.floor(Math.random() * (15 - 5) + 5);

  //backgroundStuff
  score = 0;

  //ammoStuff
  fireRound = false;
  ammoX = tankX + tankWidth / 2;
  ammoY = canvas.height - tankHeight;
  ammoWidth = 8;
  ammoHeight = 16;

  timer = setInterval(updateTimer, 1000);
  endGame = false;
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

const drawCloud = (cloudX, cloudY) => {
  ctx.beginPath();
  ctx.moveTo(cloudX + moveX - canvas.width / 2, cloudY);

  ctx.bezierCurveTo(
    0.23333333333333332 * cloudX + moveX - canvas.width / 2,
    0.9912536443148689 * cloudY,
    0.5083333333333333 * cloudX + moveX - canvas.width / 2,
    0.717201166180758 * cloudY,
    0.9666666666666667 * cloudX + moveX - canvas.width / 2,
    0.7696793002915452 * cloudY
  );
  ctx.bezierCurveTo(
    0.8833333333333333 * cloudX + moveX - canvas.width / 2,
    0.6822157434402332 * cloudY,
    1.5 * cloudX + moveX - canvas.width / 2,
    0.641399416909621 * cloudY,
    1.5833333333333331 * cloudX + moveX - canvas.width / 2,
    0.6997084548104957 * cloudY
  );
  ctx.bezierCurveTo(
    1.9666666666666666 * cloudX + moveX - canvas.width / 2,
    0.4897959183673469 * cloudY,
    2.625 * cloudX + moveX - canvas.width / 2,
    0.6501457725947522 * cloudY,
    2.5166666666666666 * cloudX + moveX - canvas.width / 2,
    0.7959183673469387 * cloudY
  );
  ctx.bezierCurveTo(
    3.058333333333333 * cloudX + moveX - canvas.width / 2,
    0.8017492711370262 * cloudY,
    3.0416666666666663 * cloudX + moveX - canvas.width / 2,
    0.9970845481049562 * cloudY,
    2.5416666666666666 * cloudX + moveX - canvas.width / 2,
    cloudY
  );
  ctx.lineTo(cloudX + moveX - canvas.width / 2, cloudY);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.stroke();
};

const drawTank = () => {
  ctx.beginPath();
  ctx.rect(tankX, tankY, tankWidth, tankHeight);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
};

const drawBomber = () => {
  console.log(randY);
  drawingBomber = true;
  rect1.x = bomberX + moveBomber;
  rect1.y = bomberY;
  rect1.w = bomberWidth;
  rect1.h = bomberHeight;
  ctx.beginPath();
  ctx.rect(bomberX + moveBomber, bomberY, bomberWidth, bomberHeight);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
};

const drawAmmoRound = () => {
  rect2.x = ammoX;
  rect2.y = ammoY -= 5;
  rect2.w = ammoWidth;
  rect2.h = ammoHeight;

  ctx.beginPath();
  ctx.rect(ammoX, (ammoY -= 10), ammoWidth, ammoHeight);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
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
