let canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");
// Load the gif image
let gifImage = new Image();
gifImage.src = "oxygen.gif";

// Resize the gif image
gifImage.width = 100;
gifImage.height = 100;

// Draw the gif image on the canvas
ctx.drawImage(gifImage, 10, 10);
document.addEventListener("keydown",jump,false);
let isGameOver = false;
let gravity = 0.05;
let raf;
let endgame = document.getElementById("endGame");
endgame.style.display = "none";
let text = document.getElementById("text");
//New Bird Mechanics
let velocity = 0;
let gameIsRunning = false;
let pipeGap = 300;
let soundCount = 0;
let musicCount = 0;
let scoreElement = document.getElementById("score");
let score = 0;
let oxygenElement = document.getElementById("oxygenValue"); // Select the oxygen display element
let oxygen = 100;
let oxygenGifImage = new Image();
oxygenGifImage.src = "oxygen.gif";
// ctx.drawImage(oxygenGifImage,)
// oxygenGifImage.width = 50;
// oxygenGifImage.height = 50;
// oxygenGifImage.onload = function() {
//     gameLoop();
//   };
let oxygenGifFrames = 0; // Counter to control the oxygen GIF frames
const oxygenDecreaseRate = 0.07; // Adjust this value to control the oxygen decrease rate
const oxygenReplenishAmount = 40; // Adjust this value to control how much oxygen is replenished when the bird passes through a gap
scoreElement.textContent = score;

class Bird {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.dy = 0;
        this.width = width;
        this.height = height;
        this.rotation = 0; // New property to store rotation angle
    }
    draw() {
        ctx.save(); // Save the current canvas state
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2); // Translate to the center of the bird
        ctx.rotate(this.rotation); // Apply rotation
        ctx.drawImage(birdImage, -this.width / 2, -this.height / 2, this.width, this.height); // Draw the bird
        ctx.restore(); // Restore the previous canvas state
    }
    reset(){
        this.x = 10;
        this.y = 300;
        this.dy = 0;
        isGameOver = false;
    }
}

class Oxygen
{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    draw(){
        ctx.drawImage(oxygenGifImage,this.x,this.y,this.width,this.height);
    }
}

class PipeUp
{
    constructor(x,y,width,height)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    draw()
    {
        ctx.beginPath();
        ctx.drawImage(pipeImage, this.x, this.y, this.width, this.height);
    }
}

class PipeDown
{
    constructor(x,y,width,height)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    draw()
    {
        ctx.beginPath();
        ctx.drawImage(downPipeImage, this.x, this.y, this.width, this.height);
    }
}

class Foreground
{
    constructor(x,y,width,height)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    draw()
    {
        ctx.beginPath();
        ctx.drawImage(foregroundPicture, this.x, this.y, this.width, this.height);
    }
}

function jump(event){
    gameIsRunning = true;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    let key = event.key;
    if (key == "ArrowUp"){
        if(musicCount == 0)
        {
            new Audio(src = "Castlevania-VampireKiller.ogg").play();
            musicCount++;
        }
        new Audio(src = "Flap.mp3").play();
        bird.rotation = -1;
        birdDrop();
        text.style.display = "none";
    }
    if (key == "e"){
        isGameOver = false;
        gameIsRunning = false;
        bird.reset();
        resetPipe();
        soundCount = 0;
        musicCount = 0;
        foreground.draw();
        score = 0;
        scoreElement.textContent = 0;
        endgame.style.display =  "none";
        text.style.display = "block";
    }

}

function resetPipe(){
    firstPipeGoingUp.x = Math.random() * 800 + 200;
    firstPipeGoingUp.y = Math.random() * 800 + 100;
    firstPipeGoingDown.x = firstPipeGoingUp.x;
    firstPipeGoingDown.y = firstPipeGoingUp.y - 800 - pipeGap;
    secondPipeGoingUp.x = Math.random() * 400 + 200 + firstPipeGoingUp.x;
    secondPipeGoingUp.y = Math.random() * 500 + 500;
    secondPipeGoingDown.x = secondPipeGoingUp.x;
    secondPipeGoingDown.y = secondPipeGoingUp.y - 800 - pipeGap;
}


function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!isGameOver && gameIsRunning) {
        bird.x += 2 + score/5;
        oxygen -= oxygenDecreaseRate;

        // Calculate rotation angle based on bird's velocity
        //bird.rotation = Math.atan2(bird.dy, 2) + Math.PI / 2;
        //bird.x = bird.x % canvas.width;
        bird.dy = bird.dy + gravity;
        bird.y = bird.y + bird.dy;
        if(bird.rotation < 1)
        {
            bird.rotation += 0.01;
        }
        bird.draw();
        firstPipeGoingUp.draw();
        firstPipeGoingDown.draw();
        secondPipeGoingUp.draw();
        secondPipeGoingDown.draw();
        foreground.draw();
        oxygenDeclare.draw();
        
        if (bird.x >= firstPipeGoingUp.x + firstPipeGoingUp.width && !firstPipeGoingUp.isPassed) {
            // Replenish oxygen when the bird passes through the gap
            firstPipeGoingUp.isPassed = true;
            oxygen += oxygenReplenishAmount;
        }
        
        if (bird.x >= secondPipeGoingUp.x + secondPipeGoingUp.width && !secondPipeGoingUp.isPassed) {
            // Replenish oxygen when the bird passes through the gap
            secondPipeGoingUp.isPassed = true;
            oxygen += oxygenReplenishAmount;
        }
          oxygen = Math.max(0, Math.min(100, oxygen));
          oxygenElement.textContent = Math.round(oxygen);
          if (oxygen <= 0) {
            isGameOver = true;
            endgame.style.display = "block";
            window.cancelAnimationFrame(raf);
            if (soundCount == 0) {
              new Audio(src = "Death.mp3").play();
              soundCount++;
            }
          }
      
          if (bird.x >= canvas.width) {
            new Audio(src = "Point.mp3").play();
            resetPipe();
            bird.x = 0;
            score++;
            scoreElement.textContent = score;
          }
        }
        if (bird.x >= canvas.width)
        {
            new Audio(src = "Point.mp3").play();
            resetPipe();
            bird.x = 0;
            score++;
            scoreElement.textContent = score;
        }

    if (bird.y >= 930 || inDanger()) {
        isGameOver = true;
        endgame.style.display = "block";
        window.cancelAnimationFrame(raf);
        if(soundCount == 0)
        {
            new Audio(src = "Death.mp3").play();
            soundCount++;
        }
    }
    // if (oxygenGifFrames >= 30 && Math.random() < 0.1) {
    //     var x = Math.random() * (secondPipeGoingDown.x - firstPipeGoingUp.x) + firstPipeGoingUp.x;
    //     var y = Math.random() * (secondPipeGoingDown.y - firstPipeGoingUp.y) + firstPipeGoingUp.y + 800;
    //     ctx.drawImage(oxygenGifImage, x, y, 50, 50);
    //     oxygenGifFrames = 0; // Reset the frame counter
    //   }
    
    // oxygenGifFrames++;
    raf = window.requestAnimationFrame(gameLoop);

}

function birdDrop(){
    bird.dy = -3;
}

function inDanger()
{
    //Check the first set of pipes
    if(bird.x > firstPipeGoingUp.x - 50 && bird.x < firstPipeGoingUp.x + 100)
    {
        if(bird.y > firstPipeGoingUp.y - 50 || bird.y < firstPipeGoingDown.y + 770)
        {
            return true;
        }
    }
    //Check the second set of pipes
    else if(bird.x > secondPipeGoingUp.x - 50 && bird.x < secondPipeGoingUp.x + 100)
    {
        if(bird.y > secondPipeGoingUp.y - 50 || bird.y < secondPipeGoingDown.y + 770)
        {
            return true;
        }
    }
    else
    {
        return false;
    }
    if (bird.x > firstPipeGoingUp.x - 50 && bird.x < firstPipeGoingUp.x + 100 &&
        bird.y > firstPipeGoingUp.y - 50 && bird.y < firstPipeGoingUp.y + 800 - pipeGap) {
            firstPipeGoingUp.isPassed = true;
        }
    
    if (bird.x > secondPipeGoingUp.x - 50 && bird.x < secondPipeGoingUp.x + 100 &&
        bird.y > secondPipeGoingUp.y - 50 && bird.y < secondPipeGoingUp.y + 800 - pipeGap) {
            secondPipeGoingUp.isPassed = true;
        }
}

let birdImage = new Image();
birdImage.src = "icon.png";

let pipeImage = new Image();
pipeImage.src = "birdPipe.png";

let downPipeImage = new Image();
downPipeImage.src = "birdPipeGoingDown.png";

let foregroundPicture = new Image();
foregroundPicture.src = "foreground.jpg";

let bird = new Bird(10,300,80,80);
bird.draw();

let firstPipeGoingUp = new PipeUp(Math.random() * 800 + 200, Math.random() * 800 + 100, 100, 800);
let firstPipeGoingDown = new PipeDown(firstPipeGoingUp.x, firstPipeGoingUp.y - 800 - pipeGap, 100, 800);

let secondPipeGoingUp = new PipeUp(Math.random() * 400 + 200 + firstPipeGoingUp.x, Math.random() * 500 + 500, 100, 800);
let secondPipeGoingDown = new PipeDown(secondPipeGoingUp.x, secondPipeGoingUp.y - 800 - pipeGap, 100, 800);

let foreground = new Foreground(0, 930, 2000, 100);
let oxygenDeclare = new Oxygen(Math.random() * (secondPipeGoingDown.x - firstPipeGoingUp.x) + firstPipeGoingUp.x, Math.random() * (secondPipeGoingDown.y - firstPipeGoingUp.y) + firstPipeGoingUp.y +790, 60,60);
foreground.draw();

gameLoop();