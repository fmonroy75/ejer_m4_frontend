// MATRICES
let matrizBruto = [];
let matrizLiquido = [];

let totalEmpleados = 0;
let empleadoActual = 0;

// Iniciar proceso
document.getElementById('btnIniciar').addEventListener('click', () => {
    totalEmpleados = parseInt(document.getElementById('cantidadEmpleados').value);

    if (isNaN(totalEmpleados) || totalEmpleados < 1) {
        alert('Ingresa una cantidad válida');
        return;
    }

    matrizBruto = [];
    matrizLiquido = [];
    empleadoActual = 0;

    document.getElementById('formEmpleado').style.display = 'block';
    actualizarFormulario();
});

// Agregar empleado
document.getElementById('btnAgregar').addEventListener('click', () => {
    const nombre = document.getElementById('nombreEmpleado').value.trim();
    const sueldo = parseFloat(document.getElementById('sueldoBruto').value);

    if (!nombre || isNaN(sueldo) || sueldo <= 0) {
        alert('Datos inválidos');
        return;
    }

    // MATRIZ SUELDO BRUTO
    matrizBruto.push([nombre, sueldo]);

    // Cálculo sueldo líquido (17% descuento)
    const liquido = sueldo * 0.83;

    // MATRIZ SUELDO LÍQUIDO
    matrizLiquido.push([nombre, liquido]);

    empleadoActual++;

    if (empleadoActual < totalEmpleados) {
        actualizarFormulario();
    } else {
        mostrarMatrices();
        document.getElementById('formEmpleado').style.display = 'none';
    }
});

// Actualiza formulario
function actualizarFormulario() {
    document.getElementById('empleadoNum').textContent =
        `Empleado ${empleadoActual + 1}`;
    document.getElementById('nombreEmpleado').value = '';
    document.getElementById('sueldoBruto').value = '';
}

// Mostrar matrices
function mostrarMatrices() {
    document.getElementById('matrizBruto').innerHTML =
        generarTabla(matrizBruto, 'Sueldo Bruto');

    document.getElementById('matrizLiquido').innerHTML =
        generarTabla(matrizLiquido, 'Sueldo Líquido');
}

// Generar tabla HTML desde matriz
function generarTabla(matriz, titulo) {
    let html = `
        <table class="table table-sm table-bordered">
            <thead>
                <tr>
                    <th>Empleado</th>
                    <th>${titulo}</th>
                </tr>
            </thead>
            <tbody>
    `;

    matriz.forEach(fila => {
        html += `
            <tr>
                <td>${fila[0]}</td>
                <td>$${fila[1].toFixed(0)}</td>
            </tr>
        `;
    });

    html += '</tbody></table>';
    return html;
}

// Limpiar
document.getElementById('btnLimpiar').addEventListener('click', () => {
    matrizBruto = [];
    matrizLiquido = [];
    document.getElementById('matrizBruto').innerHTML = '';
    document.getElementById('matrizLiquido').innerHTML = '';
    document.getElementById('formEmpleado').style.display = 'none';
});
