const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

class SnakePart{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;

let xVelocity = 0;
let yVelocity = 0;

let score = 0;

const gulpSound = new Audio("gulp-37759.mp3");
const gameOverSound = new Audio("cat-laugh-meme-1.mp3");

function drawGame(){
    changeSnakePostion();
    let result = isGameOver();
    if(result){

        return;
    }

    clearScreen();
    

    checkAppleCollision();
    drawApple();
    drawSnake();

    drawScore();

    if(score > 2){
        speed = 11;
    }
    if(score > 5){
        speed = 15;
    }

    setTimeout(drawGame, 1000/speed);
}

function isGameOver(){
    let gameOver = false;

    if(yVelocity === 0 && xVelocity === 0){
        return false;
    }

    //walls
    if(headX < 0 || headY < 0 || headX == tileCount || headY == tileCount){ 
        gameOver = true;
    }

    //snake collision
    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        if(part.x === headX && part.y === headY){
            gameOver = true;
            break;
        }
    }

    if(gameOver){
        ctx.fillStyle = 'white';
        ctx.font = '50px Roboto';

        var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0.25", "red");
        gradient.addColorStop("0.75", "blue");
        // Fill with gradient
        ctx.fillStyle = gradient;

        ctx.fillText('Game Over ...', canvas.width / 10, canvas.height / 2);
        gameOverSound.volume = 0.1;
        gameOverSound.play();
    }

    return gameOver;
}

function drawScore(){
    ctx.fillStyle = 'white';
    ctx.font = '15px Roboto';
    ctx.fillText('Score ' + score, canvas.width-55, 15);
}

function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake(){
    ctx.fillStyle = 'green';
    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    snakeParts.push(new SnakePart(headX, headY)); //put an item at the end of the list next to the head
    while(snakeParts.length > tailLength){
        snakeParts.shift(); // remove the furthest item from the snake parts if we have more than our tail size.
    }

    ctx.fillStyle = 'orange';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePostion(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawApple(){
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function checkAppleCollision(){
    if(appleX === headX && appleY === headY){
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
        gulpSound.play();
    }
}

document.addEventListener('keydown', keyDown);

//Use WASD keys to control the snake
function keyDown(event){
    console.log(event.keyCode);
    //W - up
    if(event.keyCode == 87){
        if(yVelocity == 1)
            return;
        yVelocity = -1;
        xVelocity = 0;
    }
    //A - left
    if(event.keyCode == 65){
        if(xVelocity == 1)
            return
        yVelocity = 0;
        xVelocity = -1;
    }
    //S - down
    if(event.keyCode == 83){
        if(yVelocity == -1)
            return;
        yVelocity = 1;
        xVelocity = 0;
    }
    //D - right
    if(event.keyCode == 68){
        if(xVelocity == -1)
            return;
        yVelocity = 0;
        xVelocity = 1;
    }
}
drawGame();

//requestAnimationFrame(drawGame);
//setInterval xtimes per second
//setTimeout --