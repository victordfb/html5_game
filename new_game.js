function StageOne(){
    this.bgXAxis = 0;
}
StageOne.prototype = {
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

function GameEngine(canvas, stage){
    this.context = canvas.getContext('2d');
    this.lastAnimationFrameTime = 0;
    this.lastFpsUpdateTime = 0;
    this.fps = 0;
    this.fpsElement = document.getElementById("fps");
    this.velocityPace = 290;
    this.runnerOffset = 40;
    this.bgXAxis = 0;
    this.stage = stage;
    this.background = new Image();
    this.background.src = stage.background();
    this.runnerImage = new Image();
    this.runnerImage.src = 'images/runner.png';
}

GameEngine.prototype = {
    drawBackground: function() {
        this.context.drawImage(this.background, this.stage.getBgXAxis(), 0);
    },
    moveToLeft: function (){
        var pace = this.velocityPace/this.fps;
        if(this.runnerOffset > this.stage.startThreshold()){
            this.stage.incrementBgXAxis(-pace);
        }else{
            this.runnerOffset += pace;
        }
    },
    moveToRight: function (){
        var pace = this.velocityPace/this.fps;
        if(this.runnerOffset <= this.stage.endThreshold()){
            this.stage.incrementBgXAxis(pace);
        }else{
            this.runnerOffset -= pace;
        }
    },
    drawRunner: function() {
        this.context.drawImage(this.runnerImage, this.runnerOffset, 290);
    },
    calculateFps: function(now) {
        var fps = 1000 / (now - this.lastAnimationFrameTime);
        this.lastAnimationFrameTime = now;
        if (now - this.lastFpsUpdateTime > 1000) {
            this.lastFpsUpdateTime = now;
            this.fpsElement.innerHTML = this.fps.toFixed(0) + ' fps';
        }
        this.fps = fps; 
    },
    updateFrame: function(now){
        this.calculateFps(now);
        this.drawBackground();
        this.drawRunner();
    }    
}

function Html5GameLoop(gameEngine){
    this.gameEngine = gameEngine;
}
Html5GameLoop.prototype = {
    animate: function(now) { 
        html5GameLoop.gameEngine.updateFrame(now);
        this.requestNextAnimationFrame(html5GameLoop.animate);
    },
    startGame: function() {
        requestNextAnimationFrame(this.animate);
    }
}

var canvas = document.getElementById('game-canvas');
var gameEngine = new GameEngine(canvas, new StageOne());
var html5GameLoop = new Html5GameLoop(gameEngine);

html5GameLoop.startGame();

window.onkeydown = function(e){
    var key = e.keyCode;
    if(key == 39){
        gameEngine.moveToLeft();
    }
    if(key == 37){
        gameEngine.moveToRight();
    }
}