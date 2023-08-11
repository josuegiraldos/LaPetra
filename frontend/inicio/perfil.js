import { logout } from '../login/api.js';

const userContainer = document.getElementById('tbodie');
const logoutButton = document.getElementById('logout-button');
const loginLink = document.getElementById('linkLogin');
const registerLink = document.getElementById('linkRegistrar');

logoutButton.addEventListener('click', () => {
    logout();
    hideUserDetails();
    showLoginAndRegisterLinks(); // Mostrar los enlaces de Login y Register
});

const userData = localStorage.getItem('userData');

if (userData) {
    const user = JSON.parse(userData);
    showUserDetails(user);
    enableLogoutButton();
    hideLoginAndRegisterLinks(); // Ocultar los enlaces de Login y Register
} else {
    showNoSessionMessage();
    disableLogoutButton();
    showLoginAndRegisterLinks(); // Mostrar los enlaces de Login y Register
}

function showUserDetails(user) {
    userContainer.innerHTML = '';
    const row = document.createElement('tr');
    row.innerHTML = `
        <th>${user.nombre}</th>
        <th>${user.email}</th>
        <th>${user.rol}</th>
    `;
    userContainer.appendChild(row);
}

function showNoSessionMessage() {
    userContainer.innerHTML = '';
    const row = document.createElement('tr');
    row.innerHTML = `
        <td colspan="3">No hay ninguna sesión iniciada</td>
    `;
    userContainer.appendChild(row);
}

function hideUserDetails() {
    userContainer.innerHTML = '';
    showNoSessionMessage();
    disableLogoutButton();
}

function enableLogoutButton() {
    logoutButton.removeAttribute('disabled');
}

function disableLogoutButton() {
    logoutButton.setAttribute('disabled', 'true');
}

function hideLoginAndRegisterLinks() {
    loginLink.style.display = 'none';
    registerLink.style.display = 'none';
}

function showLoginAndRegisterLinks() {
    loginLink.style.display = 'block';
    registerLink.style.display = 'block';
}
