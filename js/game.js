function GameEngine(canvas, stage, runner){
    this.context = canvas.getContext('2d');
    this.fps = 60;
    this.jumpForce = 0;
    this.gravityForce = 280;
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
            this.stage.plusBgXAxis(-pace);
        }else{
            this.runner.plusXAxis(pace);
        }
    },
    moveToRight: function (){
        var pace = this.runner.paceVelocity / this.fps;
        if(this.runner.xAxis <= this.stage.endThreshold){
            this.stage.plusBgXAxis(pace);
        }else{
            this.runner.plusXAxis(-pace);
        }
    },
    moveRunner: function(){
        if(this.movingToLeft)
            this.moveToLeft();
        if(this.movingToRight)
            this.moveToRight();
	this.applyGravity();
    },
    jump: function(){
	if(this.stage.groundThreshold - this.runner.yAxis <= 5)
	    this.jumpForce = 850;
    },
    applyGravity: function(){
	if(this.jumpForce > 0){
	    this.jumpForce -= 40;
	    if(this.jumpForce < 0)
		this.jumpForce = 0;
	}
	var pace = (this.gravityForce - this.jumpForce) / this.fps;
	if(this.runner.yAxis+pace < this.stage.groundThreshold){
	    this.runner.yAxis += pace;
	}
    },
    drawBackground: function() {
        this.context.drawImage(this.stage.bg, this.stage.bgXAxis, 0);
    },
    drawRunner: function() {
        this.moveRunner();
        this.context.drawImage(this.runner.image, this.runner.xAxis, this.runner.yAxis);
    }
}