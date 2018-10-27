document.addEventListener('DOMContentLoaded', e => {

function aaa(a) { return document.getElementById(a); }

const road = document.getElementById('road'),
	keyLogger = document.getElementById('keylogger');

console.log('key', keyLogger);
keyLogger.focus();
keyLogger.addEventListener('keypress', e => {
	console.log('key', e);
});



});

