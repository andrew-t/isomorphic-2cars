document.addEventListener('DOMContentLoaded', e => {

function aaa(a) { return document.getElementById(a); }

const road = $('road');

console.log('key', aaa('keylogger'));
aaa('keylogger').focus();
aaa('keylogger').addEventListener('keypress', e => {
	console.log('key', e);
});



});

