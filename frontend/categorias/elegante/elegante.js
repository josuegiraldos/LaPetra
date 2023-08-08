import { getProductosByCategoria } from "../../inicio/api.js";

document.addEventListener("DOMContentLoaded", () => {
    showProductos();
});

async function showProductos(){
    try {
        let idCategoria = '64cadc244cea9c702c3c1606';
      const contenedor = document.querySelector('#contenedorProductos');
      const productosResponse = await getProductosByCategoria(idCategoria);
      console.log(productosResponse);
      /* const productos = productosResponse.productos;
      productos.forEach(producto => {
        const { _id, nombre, descripcion, precio, imagen } = producto;
        const card = document.createElement('div');
        card.innerHTML = 
        `
          <div class="card" style="width: 18rem;">
            <img src="../../img/${imagen}" class="card-img-top" alt="...">
              <div class="card-body card-body d-flex flex-column justify-content-between">
              <h5 class="card-title">${nombre}</h5>
              <p class="card-text">${descripcion}</p>
              <p class="card-text">${precio}</p>
              <a href="#" class="btn btn-primary">Ver más</a>
              </div>
          </div>
        `;
        contenedor.appendChild(card);
      }); */
    } catch (error) {
      console.log(error, "Error al listar productos.");
    }
  }