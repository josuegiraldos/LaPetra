const url = "http://localhost:7777/api";

export const login = async (email, password) => {
    const data = {
        email,
        password
    };

    try {
        const response = await fetch(`${url}/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if(response.ok){
            const result = await response.json();
            return result;
        } else {
            const error = await response.json();
            throw new Error(error.msg);
        }
    } catch (error) {
        throw new Error('Error de conexión con el servidor.');
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