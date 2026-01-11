let usuarios = [];
let totalUsuarios = 0;
let usuarioActual = 0;

// Iniciar registro
document.getElementById('btnIniciar').addEventListener('click', () => {
    totalUsuarios = parseInt(document.getElementById('cantidadUsuarios').value);

    if (isNaN(totalUsuarios) || totalUsuarios < 1) {
        alert('Cantidad inválida');
        return;
    }

    usuarios = [];
    usuarioActual = 0;

    document.getElementById('formUsuario').style.display = 'block';
    actualizarFormulario();
});

// Agregar usuario
document.getElementById('btnAgregar').addEventListener('click', () => {
    const nombre = document.getElementById('nombre').value.trim();
    const id = document.getElementById('userId').value.trim();
    const anio = parseInt(document.getElementById('anio').value);

    if (!nombre || !id || isNaN(anio)) {
        alert('Datos inválidos');
        return;
    }

    // Contraseña = hexadecimal del año + random 1-100
    const hexAnio = anio.toString(16);
    const random = Math.floor(Math.random() * 100) + 1;
    const password = hexAnio + random;

    // Diccionario (objeto)
    const usuario = {
        nombre: nombre,
        id: id,
        anioNacimiento: anio,
        password: password
    };

    // Lista de diccionarios
    usuarios.push(usuario);
    usuarioActual++;

    if (usuarioActual < totalUsuarios) {
        actualizarFormulario();
    } else {
        mostrarUsuarios();
        document.getElementById('formUsuario').style.display = 'none';
    }
});

// Actualizar formulario
function actualizarFormulario() {
    document.getElementById('usuarioNum').textContent =
        `Usuario ${usuarioActual + 1}`;
    document.getElementById('nombre').value = '';
    document.getElementById('userId').value = '';
    document.getElementById('anio').value = '';
}

// Mostrar usuarios
function mostrarUsuarios() {
    let html = '<ul class="list-group">';

    usuarios.forEach(u => {
        html += `
            <li class="list-group-item">
                <strong>${u.nombre}</strong><br>
                ID: ${u.id}<br>
                Año nacimiento: ${u.anioNacimiento}<br>
                Contraseña: <code>${u.password}</code>
            </li>
        `;
    });

    html += '</ul>';
    document.getElementById('listaUsuarios').innerHTML = html;
}
