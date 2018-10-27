
console.log('ok');

document.addEventListener('DOMContentLoaded', e => {

console.log('ok');

const road = document.getElementById('road');

road.focus();
road.addEventListener('keypress', e => {
	switch(e.key) {
		case 'ArrowLeft': toggle('a'); break;
		case 'ArrowRight': toggle('b'); break;
		default: console.log(e); break;
	}
});

function toggle(c) { document.body.classList.toggle(c); }

const obstacles = [],
	slowness = 1000,
	framesInView = 8,
	start = 3,
	time = 0;

let lastFrame = Date.now(), lastBigFrame = 0, gameOver = false;
requestAnimationFrame(frame);
function frame() {
	const now = Date.now();
	let delay = Math.min(now - lastFrame, 100);
	lastFrame = now;
	time += delay;
	
	const bigFrame = Math.floor(time / slowness);
	const subFrame = (time % slowness) / slowness;
	if (lastBigFrame != bigFrame && bigFrame <= start) {
		lastBigFrame = bigFrame;
		const happening = ~~(Math.random() * 5);
		switch(happening) {
			case 0:
				// nothing
				break;
			case 1: addObstacle('a', 0); break;
			case 2: addObstacle('a', 1); break;
			case 3: addObstacle('b', 0); break;
			case 4: addObstacle('b', 1); break;
		}
	}
	
	for (let i = obstacles.length; i >= 0; --i) {
		const ob = obstacles[i];
		const t = now = ob.startTime;
		if (t > framesInView * slowness) {
			obstacles.splice(i, 1);
			break;
		}
		if (t * slowness == framesInView) {
			if (document.body.classList.contains(ob.car) == (ob.pos == 1)) {
				gameOver = true;
				document.body.classList.add('game-over');
			}
		}
	}

	if (!gameOver)
		requestAnimationFrame(frame);
}

function addObstacle(car, pos) {
	obstacles.push({ car, pos, startTime: 0 });
}

});

