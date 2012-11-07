function StageOne(){
  return {
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

function GameEngine(canvas, stage){
	return {
		context: canvas.getContext('2d'),
		lastAnimationFrameTime: 0,
		lastFpsUpdateTime: 0,
		fps: 60,
		fpsElement: document.getElementById("fps"),
		velocityPace: 290,
		runnerOffset: 40,
		bgXAxis: 0,
		stage: new StageOne(),
		background: new Image(),
		runnerImage: new Image(),

		drawBackground: function() {
			this.context.drawImage(this.background, this.stage.getBgXAxis, 0);
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

		runGame: function(){
			this.drawBackground();
			this.drawRunner();
		},

		calculateFps: function(now) {
			var fps = 1000 / (now - this.lastAnimationFrameTime);
			this.lastAnimationFrameTime = now;

			if (now - this.lastFpsUpdateTime > 1000) {
				this.lastFpsUpdateTime = now;
				this.fpsElement.innerHTML = this.fps.toFixed(0) + ' fps';
			}
			return fps; 
		},

		animate: function(now) { 
		   this.fps = this.calculateFps(now); 
		   this.runGame();
		   this.requestNextAnimationFrame(animate);
		},

		initializeImages: function() {
			var self = this;
			this.background.src = this.stage.background();
			this.runnerImage.src = 'images/runner.png';
			this.background.onload = function(e){
			  self.startGame();
			}
		},

		startGame: function() {
		   window.requestNextAnimationFrame(this.animate);
		}
	}
}

var canvas = document.getElementById('game-canvas');
var gameEngine = new GameEngine(canvas, new StageOne());

gameEngine.initializeImages();