document.addEventListener("DOMContentLoaded", () => {
  mostrarCarrito(); // Mostrar productos y actualizar total al cargar la página
});

function mostrarCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const carritoContainer = document.getElementById("carrito-container");
  const mensajeCarritoVacio = document.getElementById("mensaje-carrito-vacio");
  const totalPrecioElement = document.getElementById("total-precio");

  carritoContainer.innerHTML = ""; // Limpiar el contenedor

  if (carrito.length === 0) {
    mensajeCarritoVacio.style.display = "block";
    totalPrecioElement.textContent = "$0"; // Mostrar $0 si el carrito está vacío
  } else {
    mensajeCarritoVacio.style.display = "none";
    let total = 0;

    carrito.forEach((producto) => {
      const productoHtml = `
        <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
          <div class="card">
            <button type="button" class="btn-close" onclick="eliminarProducto(${
              producto.id
            })">
            
            </button>
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

      carritoContainer.insertAdjacentHTML("beforeend", productoHtml);
      total += producto.precio * producto.cantidad; // Sumar subtotales al total
    });

    totalPrecioElement.textContent = `$${total.toLocaleString("es-ES", {
      minimumFractionDigits: 0,
    })}`;
  }
}

// Función para eliminar producto del carrito
function eliminarProducto(id) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Filtrar el carrito para eliminar el producto con el id pasado
  carrito = carrito.filter((producto) => producto.id !== id);

  // Actualizar localStorage y recargar el carrito
  localStorage.setItem("carrito", JSON.stringify(carrito));

  mostrarCarrito(); // Actualizar la vista del carrito y el total
}

// Vaciar el carrito completamente
document.getElementById("vaciar-carrito").addEventListener("click", () => {
  localStorage.removeItem("carrito"); // Elimina los productos del localStorage
  mostrarCarrito(); // Actualiza la vista del carrito
});
