const productos = [
    { id: 1, nombre: "Headphones", descripcion: "Imerse yourself in the world of video games with the JBL gamer headphones in black", precio: 10.00, imagen: "images/producto1.jpg" },
    
    
    { id: 2, nombre: "Dron DJI", descripcion: "Is a ultralight and compact drone, accompanied by a remote control, designed to capture unforgettable moments", precio: 20.00, imagen: "images/producto2.jpg" },
    { id: 3, nombre: "Sound Equipment", descripcion: "The compact design of this equipment makes it easy to place it anywhere", precio: 30.00, imagen: "images/producto3.jpg" },
    { id: 4, nombre: "LED Proyector", descripcion: "Perfect for home entertainment and professional use", precio: 15.00, imagen: "images/producto4.jpg" },
    { id: 5, nombre: "PC Gaming", descripcion: "Don't waste time. Buy the best gaming PC on the market", precio: 25.00, imagen: "images/producto5.jpg" },
    { id: 6, nombre: "TV led 50 ", descripcion: "Experience your favorite content up close with a 4K UHD TV", precio: 35.00, imagen: "images/producto6.jpg" },
    { id: 7, nombre: "Smartphone", descripcion: "It has everything you are looking for in a First Level phone", precio: 40.00, imagen: "images/producto7.jpg" },
    { id: 8, nombre: "Tablet ", descripcion: "The ideal companion with plenty of capacity for each of the activities", precio: 50.00, imagen: "images/producto8.jpg" },
    { id: 9, nombre: "Gaming chair", descripcion: "Comfort and well-being throughout your day", precio: 60.00, imagen: "images/producto9.jpg" },
    { id: 10, nombre: "Video Card", descripcion: "Add speed and image quality to your PC", precio: 70.00, imagen: "images/producto10.jpg" },
    { id: 11, nombre: "Router", descripcion: "Get a stable and secure connection", precio: 80.00, imagen: "images/producto11.jpg" },
    { id: 12, nombre: "Air-conditioning", descripcion: "Find comfort and good rest", precio: 90.00, imagen: "images/producto12.jpg" }
];

let carrito = [];

// Función para agregar productos al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(prod => prod.id === id);
    if (producto) {
        // Verificar si el producto ya está en el carrito
        const productoEnCarrito = carrito.find(item => item.producto.id === id);
        if (productoEnCarrito) {
            // Si el producto ya está en el carrito, aumentar la cantidad
            productoEnCarrito.cantidad++;
        } else {
            // Si el producto no está en el carrito, agregarlo con cantidad 1
            carrito.push({ producto, cantidad: 1 });
        }
        alert(`${producto.nombre} added to cart.`);
        mostrarCarrito(); // Actualiza el carrito
    }
}

// Función para aumentar o disminuir la cantidad de un producto en el carrito
function actualizarCantidad(id, cantidad) {
    const productoEnCarrito = carrito.find(item => item.producto.id === id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad = cantidad;
        if (productoEnCarrito.cantidad <= 0) {
            // Si la cantidad es 0 o menor, eliminar el producto del carrito
            carrito = carrito.filter(item => item.producto.id !== id);
        }
        mostrarCarrito(); // Actualiza el carrito
    }
}


// Función para mostrar los productos
function mostrarProductos() {
    const contenedorProductos = document.getElementById('productos');
    productos.forEach(prod => {
        const divProducto = document.createElement('div');
        divProducto.classList.add('producto');
        divProducto.innerHTML = `
            <img src="${prod.imagen}" alt="${prod.nombre}" class="imagen-producto" onclick="mostrarImagenMaximizada('${prod.imagen}')">
            <h3>${prod.nombre}</h3>
            <p>${prod.descripcion}</p>
            <p>Price: $${prod.precio.toFixed(2)}</p>
            <button onclick="agregarAlCarrito(${prod.id})">Add to cart</button>
        `;
        contenedorProductos.appendChild(divProducto);
    });
}

// Función para mostrar la imagen maximizada
function mostrarImagenMaximizada(imagenSrc) {
    // Crear un contenedor para la imagen maximizada
    const contenedorImagen = document.createElement('div');
    contenedorImagen.id = 'contenedor-imagen-maximizada';
    contenedorImagen.innerHTML = `
        <div id="imagen-maximizada">
            <img src="${imagenSrc}" alt="Imagen Maximizada">
            <button id="cerrar-imagen">Close</button>
        </div>
    `;
    
    // Agregar el contenedor al cuerpo
    document.body.appendChild(contenedorImagen);

    // Agregar el evento para cerrar la imagen cuando se haga clic en el botón
    document.getElementById('cerrar-imagen').addEventListener('click', function() {
        document.body.removeChild(contenedorImagen);
    });
}

// Función para mostrar el carrito
function mostrarCarrito() {
    const contenedorCarrito = document.getElementById('carrito');
    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = '<p>The cart is empty.</p>';
    } else {
        let total = 0;
        let contenidoCarrito = `
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
        `;
        carrito.forEach(item => {
            contenidoCarrito += `
                <tr>
                    <td>${item.producto.nombre}</td>
                    <td>$${item.producto.precio.toFixed(2)}</td>
                    <td>${item.producto.descripcion}</td>
                    <td>
                        <button onclick="actualizarCantidad(${item.producto.id}, ${item.cantidad - 1})">-</button>
                        ${item.cantidad}
                        <button onclick="actualizarCantidad(${item.producto.id}, ${item.cantidad + 1})">+</button>
                    </td>
                    <td>$${(item.producto.precio * item.cantidad).toFixed(2)}</td>
                </tr>
            `;
            total += item.producto.precio * item.cantidad;
        });
        contenidoCarrito += `
                </tbody>
            </table>
            <h3>Total: $${total.toFixed(2)}</h3>
        `;
        contenedorCarrito.innerHTML = contenidoCarrito;
    }
}


// Mostrar productos al cargar la página de productos
if (document.getElementById('productos')) {
    mostrarProductos();
}

// Mostrar carrito al cargar la página de carrito
if (document.getElementById('carrito')) {
    mostrarCarrito();
}
