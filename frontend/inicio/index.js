import { getCategorias, postCategoria, deleteCategoria, putCategoria, getProductos } from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
    showCategorias();
    showCarrusel();
    listarCategorias();
});
const contenedor = document.querySelector('#listaCategorias');
const listaCategorias = document.querySelector('#categoriasLista');

async function showCategorias(){
    const categoriasResponse = await getCategorias();
    console.log(categoriasResponse);
    const categorias = categoriasResponse.categorias;
    categorias.forEach(categoria => {
        const { _id, nombre, descripcion, imagen } = categoria;
        const item = document.createElement('a');
        item.classList.add('nav-item', 'nav-link');
        item.innerHTML = `${nombre}`;
        contenedor.appendChild(item);
    });
}

async function showCarrusel() {
    const productosResponse = await getProductos();
    console.log(productosResponse);
    const productos = productosResponse.productos;
  
    const carruselContenedor = document.querySelector('.carousel-inner');
  
    carruselContenedor.innerHTML = '';
  
    productos.forEach((producto, index) => {
      const { _id, nombre, descripcion, precio, imagen } = producto;
  
      const slide = document.createElement('div');
      slide.classList.add('carousel-item');
      if (index === 0) {
        slide.classList.add('active');
      }
  
      slide.innerHTML = `
        <div class="img-fluid">
          <img src="./img/${imagen}" width="250px" alt="${nombre}">
        </div>
        <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
          <h6 class="cap-carrusel">${descripcion}</h6>
          <h3 class="cap-carrusel">${nombre}</h3>
          <h4 class="cap-carrusel">Precio: $${precio}</h4>
          <a href="#" class="btn btn-primary">Comprar</a>
        </div>
      `;
  
      carruselContenedor.appendChild(slide);
    });
  
    $(carruselContenedor).parent().carousel();
}
 
async function listarCategorias(){
    const categoriasResponse = await getCategorias();
    const categorias = categoriasResponse.categorias;
    categorias.forEach(categoria => {
        const { _id, nombre, descripcion, imagen } = categoria;

        const card = document.createElement('div');
        card.innerHTML = 
        `
        <div class="card custom-card" style="width: 18rem;">
            <img src="./img/${imagen}" class="card-img-top" alt="...">
                <div class="card-body card-body d-flex flex-column justify-content-between">
                    <h5 class="card-title">${nombre}</h5>
                    <p class="card-text">${descripcion}</p>
                    <a href="#" class="btn btn-primary">Ver más</a>
                </div>
        </div>
        `;
        listaCategorias.appendChild(card);
    });
}