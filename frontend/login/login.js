import { login } from './api.js';

$(document).ready(function() {
    $('#login-form').on('submit', async function(e) {
        e.preventDefault();

        const email = $('#email').val();
        const password = $('#password').val();

        try {
            const result = await login(email, password);
            localStorage.setItem('token', result.token);
            alert(`Bienvenido a La Petra CO.`);
            window.location.href = 'index.html';    
        } catch (error) {
            /* alert('Email o contraseña erróneos. Intenta de nuevo.'); */
            $('.error-message').remove();
            $('<small class="error-message">Email or password incorrect.</small>').insertAfter($('#password'));
        }
    })
})