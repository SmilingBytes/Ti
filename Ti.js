var id, elem, time,frameRate,timeLim,delayTime,width,timeSec,ts,i,widthPlus,delayFrame, shapeType;
var rando = 0;
var negative = 5;
var shapeViewed = [];
var Key = {
    LEFT:   37,
    UP:     38,
    RIGHT:  39,
    DOWN:   40
};
var shape = ["shape1", "circle"];
var randShape = [];
var left = document.getElementById("left");
var right = document.getElementById("right");

var playGround = document.getElementById("playGround");
var fScore = document.getElementById("fScore");

var res = document.getElementById("res");
var sh1 = document.getElementById("sh1");
var sh2 = document.getElementById("sh2");
var sh3 = document.getElementById("sh3");
var sh4 = document.getElementById("sh4");
var sh5 = document.getElementById("sh5");
var sh6 = document.getElementById("sh6");
var sh7 = document.getElementById("sh7");


function init(){
	sessionStorage.check = 1;
	sessionStorage.score = 0;
	sessionStorage.delay = 0;

	res.style.display = 'inline';
	res.innerHTML = Number(sessionStorage.score);
	playGround.style.display = 'inline';
	
	elem = document.getElementById("myBar");   
	time = document.getElementById("time"); 
	frameRate = 10; // in ms
	timeLim = 30; //in sec (time to play)
	delayTime = 800; //in ms
	shapeType = shape.length; // shape type
  
	width = 0;
	timeSec = 0;
	i = 0;
	ts = timeLim;
	widthPlus = (100*frameRate)/(timeLim*1000);
	delayFrame = Math.round(delayTime/frameRate);
	clearInterval(id);
	for(var s=0; s < 7; s++){
		rando = Math.floor(Math.random() * shapeType );
		shapeViewed[s] = rando;
	}
	
	randShape = RandUnique(shape, shape.length);
	
	left.className = randShape[0];
	right.className = randShape[1];
	
	sh1.className = randShape[shapeViewed[0]];
	sh2.className = randShape[shapeViewed[1]];
	sh3.className = randShape[shapeViewed[2]];
	sh4.className = randShape[shapeViewed[3]];
	sh5.className = randShape[shapeViewed[4]];
	sh6.className = randShape[shapeViewed[5]];
	sh7.className = randShape[shapeViewed[6]];
	
	timer();
}

//Select Randomly uniqe index from array, where n is the total selected random number.
function RandUnique(array, n) {
	var at = 0;
	var tmp, current, top = array.length;

	if(top) while(--top && at++ < n) {
		current = Math.floor(Math.random() * (top - 1));
		tmp = array[current];
		array[current] = array[top];
		array[top] = tmp;
	}
	return array.slice(-n);
}

function timer() {
	id = setInterval(frame, frameRate);
	function frame() {
		timeSec = timeSec + 0.01;
		ts = timeLim - Number(Math.floor(timeSec));
		
		if(sessionStorage.delay == 1){
			if( i < delayFrame ){
				i++;
			}else{
				sessionStorage.delay = 0;
				i = 0;
			}
		}
		
		time.innerHTML = ts;
		if(ts==0){
			clearInterval(id);
			sessionStorage.check = 0;
			playGround.style.display = "none";
			res.innerHTML = "Final Score : "+ Number(sessionStorage.score);
			fScore.innerHTML = '<h1 class="gameOver">Game Over</h1><h2 class="finalScore">Final Score: '+ + Number(sessionStorage.score)+' </h2>';
			return false;
		}
		if(width == 100 || width > 100) {
			clearInterval(id);
		}else{
			width = width + Number(widthPlus); 
			elem.style.width = width + '%'; 
		}
	}
}
		
		
/* IE: attachEvent, Firefox & Chrome: addEventListener */
function _addEventListener(evt, element, fn){
    if (window.addEventListener){
		element.addEventListener(evt, fn, false);
	}else{
		element.attachEvent('on'+evt, fn);
	}
}

function onInputKeydown(evt){
	
    if (!evt){evt = window.event;} // for IE compatible
    var keycode = evt.keyCode || evt.which; // also for cross-browser compatible
	
    if(sessionStorage.check == 0){
		res.innerHTML = Number(sessionStorage.score);
		return false;
	}
	
	if(sessionStorage.delay == 1){
		return false;
	}
    if (keycode == Key.LEFT){
		if( randShape[shapeViewed[6]] == randShape[0] ){
			sessionStorage.score = Number(sessionStorage.score) + 10;
			res.innerHTML = Number(sessionStorage.score);
			shapeOrdering();
		}else{
			//sessionStorage.score = Number(sessionStorage.score) - negative;
			//res.innerHTML = Number(sessionStorage.score);
			sessionStorage.delay = 1;
			shapeOrdering();
		}
    }else if( keycode == Key.RIGHT ){
		if(randShape[shapeViewed[6]] == randShape[1]){
			sessionStorage.score = Number(sessionStorage.score) + 10;
			res.innerHTML = Number(sessionStorage.score);
			shapeOrdering();
		}else{
			//sessionStorage.score = Number(sessionStorage.score) - negative;
			//res.innerHTML = Number(sessionStorage.score);
			sessionStorage.delay = 1;
			shapeOrdering();
		}
    }
	
    
}

function shapeOrdering(){
	for(var s=6; s>0; s--){
		shapeViewed[s] = shapeViewed[s-1];
	}
	shapeViewed[0] = Math.floor(Math.random() * 2);
	sh1.className = randShape[shapeViewed[0]];
	sh2.className = randShape[shapeViewed[1]];
	sh3.className = randShape[shapeViewed[2]];
	sh4.className = randShape[shapeViewed[3]];
	sh5.className = randShape[shapeViewed[4]];
	sh6.className = randShape[shapeViewed[5]];
	sh7.className = randShape[shapeViewed[6]];

}

function addevt() {
	res = document.getElementById("res");
	res.innerHTML = Number(sessionStorage.score);
    _addEventListener('keydown', document, onInputKeydown);
}
