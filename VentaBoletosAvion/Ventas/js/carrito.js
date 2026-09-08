document.addEventListener("DOMContentLoaded", () => {
    let carrito = [];
    const listaCarrito = document.getElementById("lista-carrito");
    const totalCarrito = document.getElementById("total-carrito");
    const cartCount = document.getElementById("cart-count");

    // Capturar clics en los botones de "Agregar al carrito"
    document.querySelectorAll(".btn-add-cart").forEach(boton => {
        boton.addEventListener("click", (e) => {
            const id = e.target.getAttribute("data-id");
            const nombre = e.target.getAttribute("data-nombre");
            const precio = parseInt(e.target.getAttribute("data-precio"));

            agregarAlCarrito(id, nombre, precio);
        });
    });

    function agregarAlCarrito(id, nombre, precio) {
        // Revisar si el paquete ya está en el carrito
        const itemExistente = carrito.find(item => item.id === id);

        if (itemExistente) {
            itemExistente.cantidad++;
        } else {
            carrito.push({ id, nombre, precio, cantidad: 1 });
        }

        actualizarCarrito();
    }

    function actualizarCarrito() {
        // Limpiar HTML previo
        listaCarrito.innerHTML = "";
        let total = 0;
        let cantidadTotal = 0;

        carrito.forEach((item, index) => {
            total += item.precio * item.cantidad;
            cantidadTotal += item.cantidad;

            // Crear elemento de lista para el panel
            const li = document.createElement("li");
            li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-start");
            li.innerHTML = `
                <div class="ms-2 me-auto">
                    <div class="fw-bold">${item.nombre}</div>
                    $${item.precio.toLocaleString("es-CL")} x ${item.cantidad}
                </div>
                <button class="btn btn-sm btn-danger btn-eliminar" data-index="${index}">X</button>
            `;
            listaCarrito.appendChild(li);
        });

        // Actualizar contadores y totales
        totalCarrito.textContent = `$${total.toLocaleString("es-CL")}`;
        cartCount.textContent = cantidadTotal;

        // Asignar evento a los botones de eliminar individuales
        document.querySelectorAll(".btn-eliminar").forEach(boton => {
            boton.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                carrito.splice(index, 1);
                actualizarCarrito();
            });
        });
    }

    // Vaciar todo el carrito
    document.getElementById("btn-vaciar").addEventListener("click", () => {
        carrito = [];
        actualizarCarrito();
    });

    // Simular compra
    document.getElementById("btn-comprar").addEventListener("click", () => {
        if (carrito.length === 0) {
            alert("Tu carrito está vacío. Agrega paquetes antes de comprar.");
        } else {
            alert("¡Compra realizada con éxito! Redirigiendo a pasarela de pago...");
            carrito = [];
            actualizarCarrito();
            
            // Cerrar el offcanvas automáticamente
            const bsOffcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('carritoOffcanvas'));
            bsOffcanvas.hide();
        }
    });
});