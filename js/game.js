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
    this.fps = 0;
    this.velocityPace = 290;
    this.runnerOffset = stage.endThreshold();
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
    updateFrame: function(fps){
        this.fps = fps;
        this.drawBackground();
        this.drawRunner();
    }    
}