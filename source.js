
console.log('ok');

document.addEventListener('DOMContentLoaded', e => {

console.log('ok');

const road = document.getElementById('road'),
	keyLogger = document.getElementById('keylogger');

console.log('key', keyLogger);
keyLogger.focus();
keyLogger.addEventListener('keypress', e => {
	switch(e.key) {
		case 'ArrowLeft': toggle('a'); break;
		case 'ArrowRight': toggle('b'); break;
		default: console.log(e); break;
	}
});

function toggle(c) { document.body.classList.toggle(c); }

});

