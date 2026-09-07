// Simulación de Base de Datos de Usuarios (Objetos JS según requerimiento ERS)
const usuariosDB = [
    {
        email: "admin@aerolinefex.cl",
        password: "admin123",
        rol: "administrador",
        nombre: "Staff AerolineFex"
    },
    {
        email: "cliente@correo.com",
        password: "cliente123",
        rol: "cliente",
        nombre: "Juan Pérez"
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    if (!loginForm) return;

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Evita recargar la página

        // Limpiar errores previos
        document.getElementById("error-email").innerText = "";
        document.getElementById("error-password").innerText = "";
        document.getElementById("error-global").innerText = "";

        // Capturar entradas
        const email = document.getElementById("email").value.trim().toLowerCase();
        const password = document.getElementById("password").value.trim();

        let hayErrores = false;

        // Validaciones de campos vacíos (Requisito de seguridad JS)
        if (email === "") {
            document.getElementById("error-email").innerText = "Falta ingresar el correo electrónico.";
            hayErrores = true;
        }
        
        if (password === "") {
            document.getElementById("error-password").innerText = "Falta ingresar la contraseña.";
            hayErrores = true;
        }

        if (hayErrores) return;

        // Buscar coincidencias
        const usuarioEncontrado = usuariosDB.find(u => u.email === email && u.password === password);

        if (usuarioEncontrado) {
            // Guardar datos de sesión
            localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioEncontrado));

            // Redirecciones con las rutas exactas de tus archivos
            if (usuarioEncontrado.rol === "administrador") {
                alert(`¡Bienvenido ${usuarioEncontrado.nombre}! Redirigiendo al Panel de Administración...`);
                window.location.href = "panel-admin.html"; // Apunta al archivo en la raíz
            } else {
                alert(`¡Bienvenido ${usuarioEncontrado.nombre}! Redirigiendo al sitio...`);
                window.location.href = "index.html"; // Apunta a tu página de cliente
            }
        } else {
            document.getElementById("error-global").innerText = "Correo o contraseña incorrectos.";
        }
    });
});