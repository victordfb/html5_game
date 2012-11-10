function StageOne(){
    this.bgXAxis = 0;
    this.groundThreshold = 290;
    this.startThreshold = 300;
    this.endThreshold = 40;
    this.bg = new Image();
    this.bg.src = "images/background.png";
}
StageOne.prototype = {
    plusBgXAxis: function(val){
        this.bgXAxis += val;
    }
}

function Runner(){
    this.image = new Image();
    this.image.src = 'images/runner.png';
    this.xAxis = 40;
    this.yAxis = 30;
    this.paceVelocity = 230;
}
Runner.prototype = {
    plusXAxis: function(pace){
	this.xAxis += pace;
    }
}