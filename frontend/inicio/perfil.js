import { login, logout } from './api.js';

const logoutButton = document.getElementById('logout-button'); // Declarar logoutButton primero

logoutButton.addEventListener('click', () => {
    logout();
    hideUserDetails();
});

const userContainer = document.getElementById('user-info');
const userDetails = document.getElementById('user-details');
const userName = document.getElementById('user-name');
const userEmail = document.getElementById('user-email');

const userData = localStorage.getItem('userData');

if(userData){
    const user = JSON.parse(userData);
    showUserDetails(user);
} else {
    hideUserDetails();
}

function showUserDetails(user){
    userName.textContent = user.nombre;
    userEmail.textContent = user.email;
    userDetails.style.display = 'block';
}

function hideUserDetails(){
    userDetails.style.display = 'none';
}
