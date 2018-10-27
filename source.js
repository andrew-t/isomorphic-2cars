document.addEventListener('DOMContentLoaded', e => {

function $(a) { return document.getElementById(a); }

const road = $('road');

console.log('key', $('keylogger'));
$('keylogger').focus();
$('keylogger').addEventListener('keypress', e => {
	console.log('key', e);
});



});

