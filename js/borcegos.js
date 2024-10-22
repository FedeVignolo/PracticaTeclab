const zapas = [
  {
    id: 100,
    nombre: "Runa Negro",
    precio: 70000,
    img: "../images/borcegos/bor5.jpeg",
  },
  {
    id: 200,
    nombre: "Texana Flex",
    precio: 55000,
    img: "../images/borcegos/bor2.jpeg",
  },
  {
    id: 300,
    nombre: "Borcego Jerry",
    precio: 75000,
    img: "../images/borcegos/bor3.jpeg",
  },
  {
    id: 400,
    nombre: "Araquina",
    precio: 101000,
    img: "../images/borcegos/bor4.jpeg",
  },
  {
    id: 500,
    nombre: "Clapton",
    precio: 97000,
    img: "../images/borcegos/bor10.jpeg",
  },
  {
    id: 600,
    nombre: "Borcego Clapto Unisex",
    precio: 87000,
    img: "../images/borcegos/bor6.jpeg",
  },
  {
    id: 700,
    nombre: "Clapton2",
    precio: 103000,
    img: "../images/borcegos/bor7.jpeg",
  },
  {
    id: 800,
    nombre: "Borcego Clapton3",
    precio: 96000,
    img: "../images/borcegos/bor8.jpeg",
  },
  {
    id: 900,
    nombre: "Borcegos Deni",
    precio: 132000,
    img: "../images/borcegos/bor9.jpeg",
  },
  {
    id: 1000,
    nombre: "Dm Brown",
    precio: 97000,
    img: "../images/borcegos/bor20.jpeg",
  },
  {
    id: 1100,
    nombre: "Borcegos Jerry",
    precio: 121000,
    img: "../images/borcegos/bor11.jpeg",
  },
  {
    id: 1200,
    nombre: "Botitas Isis",
    precio: 78000,
    img: "../images/borcegos/bor12.jpeg",
  },
  {
    id: 1300,
    nombre: "Anne",
    precio: 69000,
    img: "./images/borcegos/bor31.jpeg",
  },
  {
    id: 1400,
    nombre: "Janice",
    precio: 78000,
    img: "./images/borcegos/bor32.jpeg",
  },
  {
    id: 1500,
    nombre: "Napoles",
    precio: 145000,
    img: "./images/borcegos/bor33.jpeg",
  },
  {
    id: 1600,
    nombre: "Liverpool white",
    precio: 120000,
    img: "./images/borcegos/bor28.jpeg",
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
