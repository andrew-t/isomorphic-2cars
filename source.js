
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
	slowness = 1000;

let lastFrame = Date.now(), lastBigFrame = 0;
requestAnimationFrame(frame);
function frame() {
	let delay = Math.min(Date.now() - lastFrame, 100);
	lastFrame = Date.now();
	
	const bigFrame = Math.floor(delay / slowness);
	const subFrame = (delay % slowness) / slowness;
	if (lastBigFrame != bigFrame) {
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
	

	requestAnimationFrame(frame);
}

});

