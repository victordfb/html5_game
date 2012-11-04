
// --------------------------- DECLARATIONS ----------------------------
var canvas = document.getElementById('game-canvas'),
    context = canvas.getContext('2d'),

// Constants............................................................
PLATFORM_HEIGHT = 8,
PLATFORM_STROKE_WIDTH = 2,
PLATFORM_STROKE_STYLE = 'rgb(0,0,0)',

STARTING_RUNNER_LEFT = 50,
PACE = 4,
START_JUMP = false,
JUMP_UP = true,
JUMP = 0,
JUMP_MAX = 100,
JUMP_PACE = 5,
STARTING_RUNNER_TRACK = 1,

// Track baselines
//
// Platforms move along tracks. The constants that follow define
// the Y coordinate (from the top of the canvas) for each track.
TRACK_1_BASELINE = 323,
TRACK_2_BASELINE = 223,
TRACK_3_BASELINE = 123,

// Images
background  = new Image(),
runnerImage = new Image(),

// Platforms
//
// Each platform has its own fill style, but the stroke style is
// the same for each platform.
platformData = [  // One screen for now
    // Screen 1.......................................................
    {
        left:      10,
        width:     230,
        height:    PLATFORM_HEIGHT,
        fillStyle: 'rgb(255,255,0)',
        opacity:   0.5,
        track:     1,
        pulsate:   false,
    },
    
    {  left:      250,
       width:     100,
       height:    PLATFORM_HEIGHT,
       fillStyle: 'rgb(150,190,255)',
       opacity:   1.0,
       track:     2,
       pulsate:   false,
    },
    
    {  left:      400,
       width:     125,
       height:    PLATFORM_HEIGHT,
       fillStyle: 'rgb(250,0,0)',
       opacity:   1.0,
       track:     3,
       pulsate:   false
    },

    {  left:      633,
       width:     100,
       height:    PLATFORM_HEIGHT,
       fillStyle: 'rgb(255,255,0)',
       opacity:   1.0,
       track:     1,
       pulsate:   false,
    },
];

// ------------------------- INITIALIZATION ----------------------------
function initializeImages() {
    background.src = 'images/background_level_one_dark_red.png';
    runnerImage.src = 'images/runner.png';

    background.onload = function(e){
	startGame();
    }
}

function drawBackground() {
    context.drawImage(background, 0, 0);
}

function calculatePlatformTop(track) {
    var top;

    if      (track === 1) { top = TRACK_1_BASELINE; }
    else if (track === 2) { top = TRACK_2_BASELINE; }
    else if (track === 3) { top = TRACK_3_BASELINE; }

    return top;
}

function drawPlatforms() {
    var pd, top;
    context.save(); // Save context attributes on a stack

    for (var i=0; i < platformData.length; ++i) {
	pd = platformData[i];
	top = calculatePlatformTop(pd.track);

	context.lineWidth = PLATFORM_STROKE_WIDTH;
	context.strokeStyle = PLATFORM_STROKE_STYLE;
	context.fillStyle = pd.fillStyle;
	context.globalAlpha = pd.opacity;
	
	// If you switch the order of the following two
	// calls, the stroke will appear thicker.
      
	context.strokeRect(pd.left, top, pd.width, pd.height);
	context.fillRect  (pd.left, top, pd.width, pd.height);
    }
    context.restore(); // Restore context attributes
}

function drawRunner() {
    context.drawImage(runnerImage,
		      STARTING_RUNNER_LEFT,
		      (calculatePlatformTop(STARTING_RUNNER_TRACK) - runnerImage.height) - JUMP);
}

function draw(now) {
    drawBackground();
    drawPlatforms();
    drawRunner();
}

function jump(){
    if(START_JUMP){
	if(JUMP_UP){
	    JUMP += JUMP_PACE;
	    if(JUMP == JUMP_MAX)
		JUMP_UP = false;
	}else{
	    JUMP -= JUMP_PACE;
	    if(JUMP == 0){
		START_JUMP = false;
		JUMP_UP = true;
	    }
	}
    }
}

function drawGame() {
    jump();
    draw();
}

document.onkeypress = function(event){
    if(event.keyCode == 108){
	STARTING_RUNNER_LEFT += PACE;
    }
    if(event.keyCode == 107){
	STARTING_RUNNER_LEFT -= PACE;
    }
    if(event.keyCode == 105){
	START_JUMP = true;
    }
}

// Launch game
initializeImages();

var fps;

function animate(now) { 
    fps = calculateFps(now);
    drawGame();
    requestNextAnimationFrame(animate);
} 
          
function startGame() {
   requestNextAnimationFrame(animate);
}
