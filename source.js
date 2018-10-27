function $(_) { return document.getElementById(_); }

const road = $('road');

console.log('key', $('keylogger'));
$('keylogger').focus();
$('keylogger').addEventListener('keypress', e => {
	console.log('key', e);
});
