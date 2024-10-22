const zapas = [
  { id: 1, nombre: "Puma Sude", precio: 95000, img: "images/urbano/img1.jpeg" },
  {
    id: 2,
    nombre: "Adidas Campus",
    precio: 135000,
    img: "images/urbano/img15.jpeg",
  },
  {
    id: 3,
    nombre: "Nike Force",
    precio: 92000,
    img: "images/urbano/img3.jpeg",
  },
  {
    id: 4,
    nombre: "Nike AirForce A2",
    precio: 195000,
    img: "images/urbano/img4.jpeg",
  },
  {
    id: 5,
    nombre: "Nike Vuitton",
    precio: 210000,
    img: "images/urbano/img5.jpeg",
  },
  {
    id: 6,
    nombre: "Nike Vuitton 2",
    precio: 210000,
    img: "images/urbano/img6.jpeg",
  },
  {
    id: 7,
    nombre: "Nike Vuitton 3",
    precio: 210000,
    img: "images/urbano/img7.jpeg",
  },
  {
    id: 8,
    nombre: "Nike Air Force 07",
    precio: 150000,
    img: "images/urbano/img8.jpeg",
  },
  {
    id: 9,
    nombre: "Nike Air Force 07 Fresh",
    precio: 175000,
    img: "images/urbano/img9.jpeg",
  },
  {
    id: 10,
    nombre: "Nike AirMax",
    precio: 120000,
    img: "images/urbano/img10.jpeg",
  },
  {
    id: 11,
    nombre: "Nike AirMax2",
    precio: 125000,
    img: "images/urbano/img11.jpeg",
  },
  {
    id: 12,
    nombre: "Nike AirMax3",
    precio: 130000,
    img: "images/urbano/img12.jpeg",
  },
];

let carrito = [];

// agregar productos al carrito
function agregarProducto(id, nombre, precio, img) {
  // Verificar si carrito es un array
  if (!Array.isArray(carrito)) {
    console.error("Error:", carrito);
    carrito = [];
  }

  const productoExistente = carrito.find((producto) => producto.id === id);

  if (productoExistente) {
    productoExistente.cantidad += 1;
  } else {
    carrito.push({
      id: id,
      nombre: nombre,
      precio: precio,
      cantidad: 1,
      img: img,
    });
  }

  // guardar el carrito en localStorage
  localStorage.setItem("carrito", JSON.stringify(carrito));

  console.log(`Producto agregado: ${nombre}`);
  console.log("Carrito actual:", carrito);

  actualizarContadorCarrito();
}

// actualizar el contador del carrito
function actualizarContadorCarrito() {
  const cartIcon = document.getElementById("cart");
  const contadorCarritoFlotante = document.querySelector("#carrito"); // Contador del carrito flotante
  const totalProductos = carrito.reduce(
    (total, producto) => total + producto.cantidad,
    0
  );
  if (cartIcon) {
    cartIcon.textContent = totalProductos;
  }
  if (contadorCarritoFlotante) {
    contadorCarritoFlotante.textContent = totalProductos;
  }
}

//  mostrar los productos en la página
function mostrarProductos() {
  const productosContainer = document.getElementById("productos-container");
  if (!productosContainer) return;

  productosContainer.innerHTML = "";

  zapas.forEach((zapatilla) => {
    const imgSrc = zapatilla.img ? zapatilla.img : "images/default.jpg";

    const productoHtml = `
      <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6">
        <div class="glasses_box">
          <span>${zapatilla.nombre}</span><br>
          <figure><img src="${imgSrc}" alt="${zapatilla.nombre}" /></figure>
          <span>$${zapatilla.precio}</span><br>
<button type="button" class="btn btn-outline-primary" onclick="agregarProducto(${zapatilla.id}, '${zapatilla.nombre}', ${zapatilla.precio}, '${zapatilla.img}')">Agregar al carrito</button>
        </div>
      </div>
    `;

    productosContainer.insertAdjacentHTML("beforeend", productoHtml);
  });
}

//  cargar el carrito desde localStorage
function cargarCarrito() {
  const carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
    try {
      carrito = JSON.parse(carritoGuardado);
      // Asegurarse de que carrito sea un array
      if (!Array.isArray(carrito)) {
        carrito = [];
        console.warn("Carrito cargado no es un array. Reinicializado.");
      }
    } catch (error) {
      console.error("Error al parsear carrito desde localStorage:", error);
      carrito = [];
    }
  } else {
    carrito = [];
  }
}

//  cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
  cargarCarrito();
  mostrarProductos();
  actualizarContadorCarrito();
});
