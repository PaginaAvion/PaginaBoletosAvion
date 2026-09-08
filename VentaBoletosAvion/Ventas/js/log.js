// 1. Simulación de Base de Datos de Usuarios (Requerimiento ERS)
const usuariosDB = [
    {
        email: "admin@aerolinefex.cl", 
        password: "admin123",
        rol: "administrador",
        nombre: "Staff AerolineFex"
    },
    {
        email: "cliente@gmail.com", 
        password: "cliente123",
        rol: "cliente",
        nombre: "Juan Pérez"
    }
];

document.addEventListener("DOMContentLoaded", function() {
    // 2. Referencias a los elementos del formulario
    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    
    // 3. Referencias a los mensajes de error
    const errorEmail = document.getElementById("error-email");
    const errorPassword = document.getElementById("error-password");
    const errorGlobal = document.getElementById("error-global");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Evita que la página se recargue

        // 4. Limpiar mensajes de error previos
        errorEmail.textContent = "";
        errorPassword.textContent = "";
        errorGlobal.textContent = "";
        
        let isValid = true;
        const emailValue = emailInput.value.trim().toLowerCase();
        const passwordValue = passwordInput.value.trim();

        // 5. Validación de los campos (Seguridad)
        if (emailValue === "") {
            errorEmail.textContent = "Falta ingresar el correo electrónico.";
            isValid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(emailValue)) {
            errorEmail.textContent = "Ingresa un correo electrónico válido.";
            isValid = false;
        }

        if (passwordValue === "") {
            errorPassword.textContent = "Falta ingresar la contraseña.";
            isValid = false;
        } else if (passwordValue.length < 6) {
            errorPassword.textContent = "La contraseña debe tener al menos 6 caracteres.";
            isValid = false;
        }

        // 6. Si no hay errores, comprobamos con los usuarios creados
        if (isValid) {
            const usuarioEncontrado = usuariosDB.find(u => u.email === emailValue && u.password === passwordValue);

            if (usuarioEncontrado) {
                // Guardar datos en el navegador para mantener la sesión
                localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioEncontrado));

                // Redirección dependiendo del ROL del usuario
                if (usuarioEncontrado.rol === "administrador") {
                    alert(`¡Bienvenido ${usuarioEncontrado.nombre}! Redirigiendo al Panel de Administración...`);
                    window.location.href = "panel-admin.html"; // Va a tu panel
                } else {
                    alert(`¡Bienvenido ${usuarioEncontrado.nombre}! Redirigiendo a Vuelos...`);
                    window.location.href = "Vuelos.html"; // Va a tu página de cliente
                }
            } else {
                errorGlobal.textContent = "Correo o contraseña incorrectos. Intenta nuevamente.";
            }
        }
    });
});