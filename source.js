function $(_) { return document.getElementById(_); }

const road = $('road');

$('keylogger').focus();
$('keylogger').addEventListener('keypress', e => {
	console.log('key', e);
});
