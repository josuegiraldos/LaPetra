import { getCategorias, postCategoria, deleteCategoria, putCategoria, getProductos } from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
    showCategorias();
    showCarrusel();
});
const contenedor = document.querySelector('#listaCategorias');
const contenedorCarrusel = document.querySelector("#contenedorCarrusel");

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

/* async function showCarrusel(){
    const productosResponse = await getProductos();
    console.log(productosResponse);
    const productos = productosResponse.productos;

    productos.forEach(producto => {
        const { _id, nombre, descripcion, precio, imagen, tallas, colores, categoria, inventario} = producto;

        const divGrande = document.createElement('div');
        const divMedio = document.createElement('div');
        const divPeque = document.createElement('div');
        
        divPeque.classList.add('p-3');
        divPeque.setAttribute("style", "max-width: 700px;");
        divPeque.innerHTML = 
        `
            <h4 class="text-light text-uppercase font-weight-medium mb-3">${descripcion}</h4>
            <h3 class="display-4 text-white font-weight-semi-bold mb-4">${nombre}</h3>
            <h4 class="display-4 text-white font-weight-semi-bold mb-4">$${precio}</h4>
            <a href="#" class="btn btn-light py-2 px-3">Comprar</a>
        `;

        divMedio.classList.add('carousel-caption', 'd-flex', 'flex-column', 'align-items-center', 'justify-content-center');

        divMedio.appendChild(divPeque);

        divGrande.classList.add('carousel-item', 'active');
        divGrande.setAttribute("style", "height: 410px;");
        divGrande.innerHTML = 
        `
        <img class="img-fluid" src="../img/${imagen}" alt="Image">
        `;
        divGrande.appendChild(divMedio);

        contenedorCarrusel.appendChild(divGrande);
    });
} */

/* async function showCarrusel() {
    const productosResponse = await getProductos();
    console.log(productosResponse);
    const productos = productosResponse.productos;
  
    const carruselContenedor = document.querySelector('.carousel-inner');
  
    carruselContenedor.innerHTML = ''; // Limpiar el contenido actual del carrusel
  
    productos.forEach((producto, index) => {
      const { _id, nombre, descripcion, precio, imagen } = producto;
  
      const slide = document.createElement('div');
      slide.classList.add('carousel-item');
      if (index === 0) {
        slide.classList.add('active');
      }
  
      slide.innerHTML = `
        <img class="d-block w-100 carousel-img" src="./img/${imagen}" alt="${nombre}" width="250px">
        <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
          <h4>${descripcion}</h4>
          <h3>${nombre}</h3>
          <h4>Precio: $${precio}</h4>
          <a href="#" class="btn btn-primary">Comprar</a>
        </div>
      `;
  
      carruselContenedor.appendChild(slide);
    });
  
    // Inicializar el carrusel
    $(carruselContenedor).parent().carousel();
}  */

async function showCarrusel() {
    const productosResponse = await getProductos();
    console.log(productosResponse);
    const productos = productosResponse.productos;
  
    const carruselContenedor = document.querySelector('.carousel-inner');
  
    carruselContenedor.innerHTML = ''; // Limpiar el contenido actual del carrusel
  
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
  
    // Inicializar el carrusel
    $(carruselContenedor).parent().carousel();
  }
  