document.addEventListener("DOMContentLoaded", () => {
  mostrarCarrito();
  configurarBotones();
});

// Función para actualizar el total
function actualizarTotal(carrito) {
  const totalPrecioElement = document.getElementById("total-precio");
  let total = carrito.reduce(
    (sum, producto) => sum + producto.precio * producto.cantidad,
    0
  );

  totalPrecioElement.textContent = `$${total.toLocaleString("es-ES", {
    minimumFractionDigits: 0,
  })}`;
}

// Función para mostrar el carrito
function mostrarCarrito() {
  const carrito = obtenerCarrito();
  const carritoContainer = document.getElementById("carrito-container");
  const mensajeCarritoVacio = document.getElementById("mensaje-carrito-vacio");

  carritoContainer.innerHTML = "";

  if (carrito.length === 0) {
    mensajeCarritoVacio.style.display = "block";
    actualizarTotal(carrito);
  } else {
    mensajeCarritoVacio.style.display = "none";
    carrito.forEach((producto) => {
      carritoContainer.insertAdjacentHTML(
        "beforeend",
        crearProductoHtml(producto)
      );
    });
    actualizarTotal(carrito);
  }
}

// Función para obtener el carrito del localStorage
function obtenerCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

// Función para crear el HTML de un producto
function crearProductoHtml(producto) {
  return `
    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
      <div class="card">
        <button type="button" class="btn-close" onclick="eliminarProducto(${
          producto.id
        })"></button>
        <div class="card-body">
          <img src="${
            producto.img || "images/default.jpg"
          }" class="card-img-top" alt="${producto.nombre}">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">$${producto.precio}</p>
          <p class="card-text">Cantidad: ${producto.cantidad}</p>
          <p class="card-text">Subtotal: $${
            producto.precio * producto.cantidad
          }</p>
        </div>
      </div>
    </div>
  `;
}

// Función para eliminar un producto del carrito
function eliminarProducto(id) {
  let carrito = obtenerCarrito();
  carrito = carrito.filter((producto) => producto.id !== id);
  actualizarCarrito(carrito);
  mostrarCarrito();
}

// Función para vaciar el carrito
function vaciarCarrito() {
  localStorage.removeItem("carrito");
  mostrarCarrito();
}

// Función para actualizar el carrito en localStorage
function actualizarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Configurar los eventos de los botones
function configurarBotones() {
  document
    .getElementById("vaciar-carrito")
    .addEventListener("click", vaciarCarrito);
}

// Configuración de MercadoPago
const mp = new MercadoPago("APP_USR-4eb0b9f6-32e1-4afd-8933-76b1d02a7a2c");
const bricksBuilder = mp.bricks();

mp.bricks().create("wallet", "wallet_container", {
  initialization: {
    preferenceId: "<PREFERENCE_ID>", // Esto debe ser generado dinámicamente en el backend
  },
  customization: {
    texts: {
      valueProp: "smart_option",
    },
  },
});
