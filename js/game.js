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
    groundThreshold: function(){
        return 290;
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
    this.fps = 0;
    this.velocityPace = 230;
    this.runnerOffset = stage.endThreshold();
    this.bgXAxis = 0;
    this.stage = stage;
    this.background = new Image();
    this.background.src = stage.background();
    this.runnerImage = new Image();
    this.runnerImage.src = 'images/runner.png';
    this.runnerXAxis = stage.groundThreshold();
    this.movingToLeft = false;
    this.movingToRight = false;
}

GameEngine.prototype = {
    //PUBLIC
    updateFrame: function(fps){
        this.fps = fps;
        this.drawBackground();
        this.drawRunner();
    },
    startMoveLeft: function(){
        this.movingToLeft = true;
    },
    stopMoveLeft: function(){
        this.movingToLeft = false;
    },
    startMoveRight: function(){
        this.movingToRight = true;
    },
    stopMoveRight: function(){
        this.movingToRight = false;
    },
    //PRIVATE
    jump: function(){
        this.runnerXAxis -= 10;
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
    moveRunner: function(){
        if(this.movingToLeft)
            this.moveToLeft();
        if(this.movingToRight)
            this.moveToRight();
    },
    drawBackground: function() {
        this.context.drawImage(this.background, this.stage.getBgXAxis(), 0);
    },
    calculateGroundPos: function(){
        return this.runnerXAxis;
    },
    drawRunner: function() {
        this.moveRunner();
        this.context.drawImage(this.runnerImage, this.runnerOffset, this.calculateGroundPos());
    }
}