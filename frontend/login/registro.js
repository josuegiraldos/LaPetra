import { register } from './api.js';

$(document).ready(function() {
    $('#register-form').on('submit', async function(e) {
        e.preventDefault();

        const nombre = $('#name').val();
        const email = $('#email').val();
        const password = $('#password').val();

        if(password.length < 6){
            $('.error-message').remove();
            $('<small class="error-message">La contraseña debe tener mínimo 6 caracteres.</small>').insertAfter($('#password'));
        }

        try {
            const result = await register(nombre, email, password);
            if(result.msg === 'Usuario agregado correctamente.') {
                alert('Registro exitoso. Ahora puedes iniciar sesión.');
                window.location.href = 'login.html';
            } else {
                alert('Hubo un problema al registrar el usuario. Inténtalo de nuevo.');
            }
        } catch (error) {
            alert('Error de conexión con el servidor.');
            console.log(error);
        }
    })
})