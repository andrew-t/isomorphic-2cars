function $(_) { return document.getElementById(_); }

const road = $('road');

road.focus();

window.addEventListener('keydown', e => {
	console.log(e.key);
});
