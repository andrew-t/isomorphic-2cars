
console.log('ok');

document.addEventListener('DOMContentLoaded', e => {

console.log('ok');

const road = document.getElementById('road'),
	keyLogger = document.getElementById('keylogger');

console.log('key', keyLogger);
keyLogger.focus();
keyLogger.addEventListener('keypress', e => {
	console.log('key', e);
});



});

