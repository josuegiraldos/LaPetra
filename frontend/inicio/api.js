const url = "http://localhost:7777/api";

export const getCategorias = async () => {
    try {
        const data = await fetch(`${url}/categorias`);
        const categorias = await data.json();
        return categorias;
    } catch (error) {
        console.log(error, "Error al obtener las categorías.");
    }
}

export const postCategoria = async (categoria) => {
    try {
        await fetch(`${url}/categorias`, {
            method: "POST",
            body: JSON.stringify(categoria),
            headers: {
                'Content-Type': 'application/json'
                //'x-api-token-jwt': headers
            }
        })
        window.location.href = 'index.html';
    } catch (error) {
        console.log(error, "Error al agregar las categorías.");
    }
}

export const deleteCategoria = async (id) => {
    try {
        await fetch(`${url}/categorias/${id}`, {
            method: 'DELETE'
        })
        window.location.href = 'index.html';
    } catch (error) {
        console.log(error, "Error al eliminar la categoría.");
    }
}

export const putCategoria = async (id, categoriaUpdated) => {
    try {
        await fetch(`${url}/categorias/${id}`, {
            method: 'PUT',
            body: JSON.stringify(categoriaUpdated),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        window.location.href = 'index.html';
    } catch (error) {
        console.log(error, "Error al actualizar la categoría.");
    }
}

// - - - - - - - - - - PRODUCTOS - - - - - - - - 
export const getProductos = async () => {
    try {
        const data = await fetch(`${url}/productos`);        
        const productos = await data.json();
        return productos; 
    } catch (error) {
        console.log(error, "Error al obtener los productos.");
    }
}

export const getProductosByCategoria = async (id) => {
    try {
        const data = await fetch(`${url}/categorias/productos/${id}`);
        const productos = await data.json();
        return productos;
    } catch (error) {
        console.log(error, "Error al obtener productos por categoría.");
    }
}

export const postProducto = async (producto) => {
    try {
        await fetch(`${url}/productos`, {
            method: 'POST',
            body: JSON.stringify(producto),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        window.location.href = 'index.html';
    } catch (error) {
        console.log(error, "Error al agregar producto.");
    }
}

export const deleteProducto = async (id) => {
    try {
        await fetch(`${url}/productos/${id}`, {
            method: 'DELETE'
        })
        window.location.href = 'index.html';
    } catch (error) {
        console.log(error, "Error al eliminar producto.");
    }
}

export const putProducto = async (id, productoUpdated) => {
    try {
        await fetch(`${url}/productos/${id}`, {
            method: 'PUT',
            body: JSON.stringify(productoUpdated),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        window.location.href = 'index.html';
    } catch (error) {
        console.log(error, "Error al actualizar el producto.");
    }
}