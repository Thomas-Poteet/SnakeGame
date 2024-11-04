const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

let speed = 7;

function drawGame(){
    clearScreen();
    setTimeout(drawGame, 1000/speed);
}

function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

drawGame();

//requestAnimationFrame(drawGame);
//setInterval xtimes per second
//setTimeout --