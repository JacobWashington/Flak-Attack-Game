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