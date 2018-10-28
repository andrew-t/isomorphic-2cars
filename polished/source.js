
console.log('ok');

document.addEventListener('DOMContentLoaded', e => {

console.log('ok');

const road = document.getElementById('road');

function toggle(c) { document.body.classList.toggle(c); }

const obstacles = [],
	slowness = 1000,
	framesInView = 4,
	start = 3, bigStart = 3;
let time = 0, score = 0;

road.focus();
road.addEventListener('keypress', e => {
	if (!gameOver) switch(e.key) {
		case 'ArrowLeft': toggle('a'); break;
		case 'ArrowRight': toggle('b'); break;
		default: console.log(e); break;
	}
});

function wrs() {
	const cont = document.getElementById('container');
	const xs = window.innerWidth / cont.clientWidth,
		ys = window.innerHeight / cont.clientHeight;
	cont.style.transform = `scale(${Math.min(xs, ys)})`;
}
window.addEventListener('resize', wrs);
wrs();

let lastFrame = Date.now(), lastBigFrame = 0, lastHugeFrame = 0, gameOver = false;
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

	const hugeFrame = Math.floor(bigFrame / 10);
	if (lastHugeFrame != hugeFrame && hugeFrame >= start) {
		lastHugeFrame = hugeFrame;
		console.log('huge frame', hugeFrame);
		const happening = ~~(Math.random() * 5);
		switch(happening) {
			case 0: case 1: case 2:
				document.getElementById('road').classList.remove('invisible');
				document.getElementById('tunnel').classList.remove('invisible');
				break;
			case 3:
				document.getElementById('road').classList.remove('invisible');
				document.getElementById('tunnel').classList.add('invisible');
				break;
			case 4:
				document.getElementById('road').classList.add('invisible');
				document.getElementById('tunnel').classList.remove('invisible');
				 break;
		}
	}
	
	for (let i = obstacles.length - 1; i >= 0; --i) {
		const ob = obstacles[i],
			t = now - ob.startTime;
		if (t > framesInView * slowness * 1.2) {
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
		if (t / slowness > framesInView - 0.75 && t / slowness < framesInView - 0.25)
			pil.classList.add('danger');
		pil.classList.add(ob.car + ob.pos);
		pil.style.transform = 'scale(' +
			Math.pow(2.71, t * 5 / (framesInView * slowness) - 1) / 20 + ')';
		pil.style.zIndex = t * 50 / (framesInView * slowness) + 25;
	}

	if (!gameOver)
		requestAnimationFrame(frame);

	function addObstacle(car, pos) {
		console.log('rock', car, pos);
		obstacles.push({ car, pos, startTime: now });
	}
}

});

