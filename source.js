function $(_) { return document.getElementById(_); }

const road = $('road');

$('keylogger').focus();
$('keylogger').addEventListener('keydown', e => {
	console.log('key', e);
});
