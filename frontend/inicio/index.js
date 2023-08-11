import { getCategorias, getProductos, getProductoById } from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
    showCategorias();
    showCarrusel();
    listarCategorias();
    listarProductos();
});

const contenedor = document.querySelector('#listaCategorias');
const listaCategorias = document.querySelector('#categoriasLista');
const searchForm = document.querySelector("#buscardorSearch");
const searchInput = document.querySelector('#searchInput');
const contenedorProductos = document.querySelector('#contenedorProductos');
const contenedorCarrusel = document.querySelector('#contenedorCarrusel');

contenedorProductos.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('PRODUCTOS');
  addToCart(e);
});

contenedorCarrusel.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('CARRUSEL');
  addToCart(e);
});

searchForm.addEventListener('submit', function(e){
  e.preventDefault();
  console.log("LLAMADO - SEARCH");
  const searchTerm = searchInput.value.trim().toLowerCase();
  if(searchTerm !== ""){
    filterAndShowProductos(searchTerm);
  } else {
    listarProductos();
  }
});

async function showCategorias(){
  try {
    const categoriasResponse = await getCategorias();
    console.log(categoriasResponse);
    const categorias = categoriasResponse.categorias;
    categorias.forEach(categoria => {
        const { _id, nombre, descripcion, imagen, cat } = categoria;
        const item = document.createElement('div');
        item.innerHTML = 
        `
          <a href="./categorias/${cat}/index.html" id="${_id}">${nombre}</a>
        `;
        contenedor.appendChild(item);
    });
  } catch (error) {
    console.log(error, "Error al cargar categorías.");
  }
}

async function showCarrusel() {
  try {
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
          <a href="#" class="btn btn-primary carrito" id="${_id}">Comprar</a>
        </div>
      `;
  
      carruselContenedor.appendChild(slide);
    });
  
    $(carruselContenedor).parent().carousel(); 
  } catch (error) {
    console.log(error, "Error al cargar carrusel.");
  }
}
 
async function listarCategorias(){
  try {
    const categoriasResponse = await getCategorias();
    const categorias = categoriasResponse.categorias;
    categorias.forEach(categoria => {
        const { _id, nombre, descripcion, imagen, cat } = categoria;

        const card = document.createElement('div');
        card.innerHTML = 
        `
        <div class="card custom-card" style="width: 18rem;">
            <img src="./img/${imagen}" class="card-img-top" alt="...">
                <div class="card-body card-body d-flex flex-column justify-content-between">
                    <h5 class="card-title">${nombre}</h5>
                    <p class="card-text">${descripcion}</p>
                    <a href="./categorias/${cat}/index.html" class="btn btn-primary" target="_blank">Ver más</a>
                </div>
        </div>
        `;
        
        listaCategorias.appendChild(card);
    });
  } catch (error) {
    console.log(error, "Error al listar categorías.");
  }
}

function crearProductoCard(producto) {
  const { _id, nombre, descripcion, precio, imagen, inventario } = producto;
  const card = document.createElement('div');
  card.innerHTML = 
  `
    <div class="card custom-card" style="width: 18rem;">
      <img src="./img/${imagen}" class="card-img-top">
      <div class="card-body card-body d-flex flex-column justify-content-between">
        <h5 class="card-title">${nombre}</h5>
        <p class="card-text">${descripcion}</p>
        <p class="card-text">Stock: ${inventario}</p>
        <p class="card-text">$${precio.toFixed(2)}</p>
        <a href="#" class="btn btn-primary carrito" id="${_id}">Comprar</a>
      </div>
    </div>
  `;
  return card;
}

async function listarProductos(){
  try {
    const productosResponse = await getProductos();
    const productos = productosResponse.productos;
    listarProductosEnContenedor(contenedorProductos, productos);
  } catch (error) {
    console.log(error, "Error al listar productos.");
  }
}

async function filterAndShowProductos(searchTerm){
  console.log("RESPUESTA - SEARCH");
  try {
    const productosResponse = await getProductos();
    const productos = productosResponse.productos;

    if (searchTerm == "") {
      listarProductosEnContenedor(contenedorProductos, productos);
      return;
    }

    const productosFiltrados = productos.filter(producto => {
      return producto.nombre.toLowerCase().includes(searchTerm) || producto.descripcion.toLowerCase().includes(searchTerm);
    });

    listarProductosEnContenedor(contenedorProductos, productosFiltrados);
  } catch (error) {
    console.log(error, "Error al filtrar y mostrar productos.");
  }
}

async function listarProductosEnContenedor(contenedor, productos) {
  contenedor.innerHTML = ""; // Limpia el contenedor
  productos.forEach(producto => {
    // Crear y agregar elementos al contenedor
    const card = crearProductoCard(producto);
    contenedor.appendChild(card);
  });
}

async function addToCart(e) {
  if (e.target.classList.contains('carrito')) {
    const id = e.target.getAttribute('id');
    const response = await getProductoById(id);
    const producto = response.producto;

    if (producto) {
      const user = JSON.parse(localStorage.getItem('userData'));

      if (user) {
        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        cartItems.push(producto);
        localStorage.setItem('cart', JSON.stringify(cartItems));
        updateCartItemCount(cartItems.length);
        alert('Producto agregado al carrito correctamente.');
      } else {
        alert('Debes iniciar sesión para agregar productos al carrito.');
      }
    } else {
      alert('Error al agregar el producto al carrito.');
    }
  }
}

function updateCartItemCount(itemCount){
  const cartItemCount = document.querySelector('#cartItemCount');
  cartItemCount.textContent = itemCount;
}
