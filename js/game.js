function StageOne(){
    this.bgXAxis = 0;
    this.groundThreshold = 290;
    this.startThreshold = 300;
    this.endThreshold = 40;
    this.bg = new Image();
    this.bg.src = "images/background.png";
}
StageOne.prototype = {
    incrementBgXAxis: function(val){
        this.bgXAxis += val;
    }
}

function Runner(){
    this.image = new Image();
    this.image.src = 'images/runner.png';
    this.xAxis = 40;
    this.yAxis = 250;
    this.paceVelocity = 230;
}
Runner.prototype = {
    plusXAxis: function(pace){
	this.xAxis += pace;
    }
}

function GameEngine(canvas, stage, runner){
    this.context = canvas.getContext('2d');
    this.fps = 0;
    this.bgXAxis = 0;
    this.stage = stage;
    this.runner = runner;
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
    moveToLeft: function (){
        var pace = this.runner.paceVelocity / this.fps;
        if(this.runner.xAxis > this.stage.startThreshold){
            this.stage.incrementBgXAxis(-pace);
        }else{
            this.runner.plusXAxis(pace);
        }
    },
    moveToRight: function (){
        var pace = this.runner.paceVelocity / this.fps;
        if(this.runner.xAxis <= this.stage.endThreshold){
            this.stage.incrementBgXAxis(pace);
        }else{
            this.runner.plusXAxis(-pace);
        }
    },
    moveRunner: function(){
        if(this.movingToLeft)
            this.moveToLeft();
        if(this.movingToRight)
            this.moveToRight();
    },
    calculateGroundPos: function(){
        return this.runner.yAxis;
    },
    drawBackground: function() {
        this.context.drawImage(this.stage.bg, this.stage.bgXAxis, 0);
    },
    drawRunner: function() {
        this.moveRunner();
        this.context.drawImage(this.runner.image, this.runner.xAxis, this.calculateGroundPos());
    }
}