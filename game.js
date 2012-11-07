function StageOne(){
  return {
	bgXAxis: 0,

    incrementBgXAxis: function(val){
		this.bgXAxis += val;
	},
    getBgXAxis: function(){
		return this.bgXAxis;
	},
    startThreshold: function(){
		return 300;
	},
	endThreshold: function(){
		return 40;
	},
    background: function(){
		return "images/background.png";
	}
  }
}

var canvas = document.getElementById('game-canvas'),
context = canvas.getContext('2d'),
lastAnimationFrameTime = 0,
lastFpsUpdateTime = 0,
fps = 60,
fpsElement = document.getElementById("fps"),
velocityPace = 290,
runnerOffset = 40,
bgXAxis = 0,
stage = new StageOne(),
background = new Image(),
runnerImage = new Image();

function drawBackground() {
	context.drawImage(background, stage.getBgXAxis(), 0);
}

function moveToLeft(){
	var pace = velocityPace/fps;
	if(runnerOffset > stage.startThreshold()){
		stage.incrementBgXAxis(-pace);
	}else{
		runnerOffset += pace;
	}
}

function moveToRight(){
	var pace = velocityPace/fps;
	if(runnerOffset <= stage.endThreshold()){
		stage.incrementBgXAxis(pace);
	}else{
		runnerOffset -= pace;
	}
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
    background.src = stage.background();
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