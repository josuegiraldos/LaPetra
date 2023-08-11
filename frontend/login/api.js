const url = "http://localhost:7777/api";

export const login = async (email, password) => {
    try {
        const response = await fetch(`${url}/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password})
        })

        const data = await response.json();

        if(response.ok){
            localStorage.setItem('userData', JSON.stringify(data.usuario));
            localStorage.setItem('token', data.token);
            return data;
        } else {
            throw new Error("Correo electrónico incorrecto o inexistente en la base de datos.");
        }
    } catch (error) {
        throw new Error('Error de conexión con el servidor.')
    }
}

export const register = async (nombre, email, password) => {
    const data = {
        nombre,
        email,
        password
    };

    try {
        const response = await fetch(`${url}/usuarios`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error('Error de conexión con el servidor.');
    }
};

export async function logout() {
    try {
        localStorage.removeItem('userData');
        localStorage.removeItem('token');
        localStorage.removeItem('cart');
        window.location.href = "index.html";
    } catch (error) {
        console.log(error);
    }
}