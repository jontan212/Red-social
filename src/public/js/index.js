// LOGIN
let btnAbrirPopupLogin = document.getElementById('btn-abrir-popup-login');
let	overlayLogin = document.getElementById('overlay-login');
let	popupLogin = document.getElementById('popup-login');
let	btnCerrarPopupLogin = document.getElementById('btn-cerrar-popup-login');

btnAbrirPopupLogin.addEventListener('click', function(){
	overlayLogin.classList.add('active');
	popupLogin.classList.add('active');
});

btnCerrarPopupLogin.addEventListener('click', function(e){
	e.preventDefault();
	overlayLogin.classList.remove('active');
	popupLogin.classList.remove('active');
});

// REGISTRO
let btnAbrirPopup = document.getElementById('btn-abrir-popup');
let	overlay = document.getElementById('overlay');
let	popup = document.getElementById('popup');
let	btnCerrarPopup = document.getElementById('btn-cerrar-popup');

btnAbrirPopup.addEventListener('click', function(){
	overlay.classList.add('active');
	popup.classList.add('active');
});

btnCerrarPopup.addEventListener('click', function(e){
	e.preventDefault();
	overlay.classList.remove('active');
	popup.classList.remove('active');
});
