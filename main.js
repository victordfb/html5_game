function Html5GameLoop(gameEngine){
    this.gameEngine = gameEngine;
    this.lastAnimationFrameTime = 0;
    this.lastFpsUpdateTime = 0;
    this.fpsElement = document.getElementById("fps");
}
Html5GameLoop.prototype = {
    animate: function(now) {
        var fps = html5GameLoop.calculateFps(now);
        html5GameLoop.gameEngine.updateFrame(fps);
        requestNextAnimationFrame(html5GameLoop.animate);
    },
    startGame: function() {
        requestNextAnimationFrame(this.animate);
    },
    calculateFps: function(now) {
        var fps = 1000 / (now - this.lastAnimationFrameTime);
        this.lastAnimationFrameTime = now;
        if (now - this.lastFpsUpdateTime > 1000) {
            this.lastFpsUpdateTime = now;
            this.fpsElement.innerHTML = fps.toFixed(0) + ' fps';
        }
        return fps; 
    }
}

var canvas = document.getElementById('game-canvas');
var gameEngine = new GameEngine(canvas, new StageOne(), new Runner());
var html5GameLoop = new Html5GameLoop(gameEngine);

html5GameLoop.startGame();

window.onkeydown = function(e){
    var key = e.keyCode;
    if(key == 39){
        gameEngine.startMoveLeft();
    }
    if(key == 37){
        gameEngine.startMoveRight();
    }
    if(key == 32){
        gameEngine.jump();
    }
}

window.onkeyup = function(e){
    var key = e.keyCode;
    if(key == 39){
        gameEngine.stopMoveLeft();
    }
    if(key == 37){
        gameEngine.stopMoveRight();
    }
}