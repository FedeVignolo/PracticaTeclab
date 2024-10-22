const zapas = [
  {
    id: 10,
    nombre: "Nike Nature",
    precio: 150000,
    img: "images/deportivas/depor1.jpeg",
  },
  {
    id: 20,
    nombre: "Adidas Response",
    precio: 100000,
    img: "images/deportivas/depor2.jpeg",
  },
  {
    id: 30,
    nombre: "VaporMax",
    precio: 113000,
    img: "images/deportivas/depor3.jpeg",
  },
  {
    id: 40,
    nombre: "VaporMax2",
    precio: 113000,
    img: "images/deportivas/depor4.jpeg",
  },
  {
    id: 50,
    nombre: "VaporMax3",
    precio: 110300,
    img: "images/deportivas/depor5.jpeg",
  },
  {
    id: 60,
    nombre: "Adidas Balenciaga",
    precio: 180000,
    img: "images/deportivas/depor6.jpeg",
  },
  {
    id: 70,
    nombre: "Nike SB",
    precio: 100000,
    img: "images/deportivas/depor7.jpeg",
  },
  {
    id: 80,
    nombre: "Adidas QueStar",
    precio: 150000,
    img: "images/deportivas/depor8.jpeg",
  },
  {
    id: 90,
    nombre: "Nike Air Force LV8",
    precio: 130000,
    img: "images/deportivas/depor9.jpeg",
  },
  {
    id: 100,
    nombre: "Adidas PureBoost",
    precio: 110000,
    img: "images/deportivas/depor10.jpeg",
  },
  {
    id: 110,
    nombre: "Nike Air Force",
    precio: 145000,
    img: "images/deportivas/depor11.jpeg",
  },
  {
    id: 120,
    nombre: "Adidas UltraBoost",
    precio: 120000,
    img: "images/deportivas/depor12.jpeg",
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
