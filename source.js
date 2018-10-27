
console.log('ok');

document.addEventListener('DOMContentLoaded', e => {

console.log('ok');

const road = document.getElementById('road');

function toggle(c) { document.body.classList.toggle(c); }

const obstacles = [],
	slowness = 1000,
	framesInView = 4,
	start = 3;
let time = 0, score = 0;

road.focus();
road.addEventListener('keypress', e => {
	if (!gameOver) switch(e.key) {
		case 'ArrowLeft': toggle('a'); break;
		case 'ArrowRight': toggle('b'); break;
		default: console.log(e); break;
	}
});

let lastFrame = Date.now(), lastBigFrame = 0, gameOver = false;
requestAnimationFrame(frame);
function frame() {
	const now = Date.now();
	let delay = Math.min(now - lastFrame, 100);
	lastFrame = now;
	time += delay;
	
	document.getElementById('score').innerHTML = score;

	const bigFrame = Math.floor(time / slowness);
	const subFrame = (time % slowness) / slowness;
	if (lastBigFrame != bigFrame && bigFrame >= start) {
		lastBigFrame = bigFrame;
		console.log('big frame', bigFrame);
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
	
	for (let i = obstacles.length - 1; i >= 0; --i) {
		const ob = obstacles[i],
			t = now - ob.startTime;
		if (t > framesInView * slowness) {
			console.log('drive past rock');
			++score;
			obstacles.splice(i, 1);
			break;
		}
		if (t / slowness > framesInView - 0.75 && t / slowness < framesInView - 0.25) {
			if (document.body.classList.contains(ob.car) == (ob.pos == 1)) {
				gameOver = true;
				console.log('gameOver');
				document.body.classList.add('game-over');
			}
		}
	}

	[ ...document.querySelectorAll('#obstacles div') ]
		.forEach(o => {
			o.setAttribute('class', 'hidden');
		});
	[ ...document.querySelectorAll('#pillars div') ]
		.forEach(o => {
			o.setAttribute('class', 'hidden');
		});

	// console.log(obstacles.length)
	for (let i = obstacles.length - 1; i >= 0; --i) {
		const ob = obstacles[i],
			t = now - ob.startTime;

		const el = document.getElementById('obstacle-' + (i + 1));
		// console.log(el);
		el.classList.remove('hidden');
		el.classList.add(ob.car + ob.pos);
		el.style.top = (t / (framesInView * slowness) * 800) + 'px';

		const pil = document.getElementById('pillar-' + (i + 1));
		// console.log(el);
		pil.classList.remove('hidden');
		pil.classList.add(ob.car + ob.pos);
		pil.style.transform = 'scale(' +
			(t / (framesInView * slowness) * 1.2) + ')';
	}

	if (!gameOver)
		requestAnimationFrame(frame);

	function addObstacle(car, pos) {
		console.log('rock', car, pos);
		obstacles.push({ car, pos, startTime: now });
	}
}

});

