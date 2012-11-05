var canvas = document.getElementById('game-canvas'),
context = canvas.getContext('2d'),
lastAnimationFrameTime = 0,
lastFpsUpdateTime = 0,
fps = 60,
fpsElement = document.getElementById("fps"),
velocityPace = 290,
runnerOffset = 40,
background = new Image(),
runnerImage = new Image();

function drawBackground() {
    context.drawImage(background, 0, 0);
}

function moveToLeft(){
    runnerOffset += velocityPace/fps;
}

function moveToRight(){
    runnerOffset -= velocityPace/fps;
}

function drawRunner() {
    context.drawImage(runnerImage, runnerOffset, 290);
}

function runGame(){
    drawBackground();
    drawRunner();
}

function calculateFps(now) {
    var fps = 1000 / (now - lastAnimationFrameTime);
    lastAnimationFrameTime = now;

    if (now - lastFpsUpdateTime > 1000) {
	lastFpsUpdateTime = now;
	fpsElement.innerHTML = fps.toFixed(0) + ' fps';
    }
    return fps; 
}

function animate(now) { 
   fps = calculateFps(now); 
   runGame();
   requestNextAnimationFrame(animate);
}

function initializeImages() {
    background.src = 'images/background_level_one_dark_red.png';
    runnerImage.src = 'images/runner.png';

    background.onload = function(e){
	startGame();
    }
}

function startGame() {
   window.requestNextAnimationFrame(animate);
}

initializeImages();

window.onkeydown = function(e){
    var key = e.keyCode;
    if(key == 39){
	moveToLeft();
    }
    if(key == 37){
	moveToRight();
    }
}