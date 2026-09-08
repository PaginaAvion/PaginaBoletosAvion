// Seguridad: Verificar sesión al cargar
document.addEventListener("DOMContentLoaded", () => {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
    if (!usuario || usuario.rol !== "administrador") {
        alert("Acceso denegado.");
        window.location.href = "login.html";
        return;
    }

    // Cerrar sesión
    document.getElementById("btnLogout").addEventListener("click", () => {
        localStorage.removeItem("usuarioLogueado");
        window.location.href = "login.html";
    });

    renderizarTabla();
});

// Base de datos simulada de vuelos
let vuelosDB = [
    { id: 1, origen: "Santiago", destino: "Buenos Aires", fecha: "2026-10-15", precio: 150000 },
    { id: 2, origen: "Santiago", destino: "Lima", fecha: "2026-11-02", precio: 120000 }
];

const formVuelo = document.getElementById("formVuelo");
const tablaBody = document.getElementById("tablaVuelosBody");

// Función Leer (Read)
function renderizarTabla() {
    tablaBody.innerHTML = "";
    vuelosDB.forEach(vuelo => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${vuelo.origen}</td>
            <td>${vuelo.destino}</td>
            <td>${vuelo.fecha}</td>
            <td>$${vuelo.precio}</td>
            <td>
                <button onclick="editarVuelo(${vuelo.id})" class="btn-edit">Editar</button>
                <button onclick="eliminarVuelo(${vuelo.id})" class="btn-danger">Eliminar</button>
            </td>
        `;
        tablaBody.appendChild(fila);
    });
}

// Función Crear / Actualizar (Create / Update)
formVuelo.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const id = document.getElementById("vueloId").value;
    const origen = document.getElementById("origen").value;
    const destino = document.getElementById("destino").value;
    const fecha = document.getElementById("fecha").value;
    const precio = document.getElementById("precio").value;

    if (id) {
        // Actualizar vuelo existente
        const index = vuelosDB.findIndex(v => v.id == id);
        vuelosDB[index] = { id: parseInt(id), origen, destino, fecha, precio };
    } else {
        // Crear nuevo vuelo
        const nuevoId = vuelosDB.length > 0 ? Math.max(...vuelosDB.map(v => v.id)) + 1 : 1;
        vuelosDB.push({ id: nuevoId, origen, destino, fecha, precio });
    }

    formVuelo.reset();
    document.getElementById("vueloId").value = "";
    document.getElementById("btnGuardar").innerText = "Guardar Vuelo";
    renderizarTabla();
});

// Función Editar (Carga datos en el formulario)
function editarVuelo(id) {
    const vuelo = vuelosDB.find(v => v.id === id);
    document.getElementById("vueloId").value = vuelo.id;
    document.getElementById("origen").value = vuelo.origen;
    document.getElementById("destino").value = vuelo.destino;
    document.getElementById("fecha").value = vuelo.fecha;
    document.getElementById("precio").value = vuelo.precio;
    document.getElementById("btnGuardar").innerText = "Actualizar Vuelo";
}

// Función Eliminar (Delete)
function eliminarVuelo(id) {
    if (confirm("¿Estás seguro de eliminar este vuelo?")) {
        vuelosDB = vuelosDB.filter(v => v.id !== id);
        renderizarTabla();
    }
}