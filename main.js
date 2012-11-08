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