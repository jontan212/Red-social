// HREF DE LOS NAV
// Perfil
const perfil = document.getElementById('perfil');
perfil.addEventListener('click', () => {
	window.location.href = '/perfil';
});

// Inicio
const inicio = document.getElementById('inicio');
inicio.addEventListener('click', () => {
	window.location.href = '/';
});

// Logout
const logout = document.getElementById('logout');
logout.addEventListener('click', () => {
	window.location.href = '/users/logout';
});