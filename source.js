function $(_) { return document.getElementById(_); }

const road = $('road');

road.focus();

road.addEventListener('keydown', e => {
	console.log(e.key);
});
