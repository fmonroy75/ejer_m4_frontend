/*
Módulo 4 – Manejo de sesiones y LocalStorage
Cada usuario posee un historial independiente de localizaciones.
*/

let usandoLocalStorage = true;
let userId = obtenerUsuario();
let historial = [];

// DOM
const citySelect = document.getElementById('citySelect');
const historialDiv = document.getElementById('historial');
const storageType = document.getElementById('storageType');
const userIdDisplay = document.getElementById('userIdDisplay');

// Ciudades
const ciudades = [
    { nombre: "Santiago", lat: -33.45, lon: -70.66 },
    { nombre: "Valparaíso", lat: -33.05, lon: -71.62 },
    { nombre: "Concepción", lat: -36.83, lon: -73.05 },
    { nombre: "La Serena", lat: -29.90, lon: -71.25 }
];

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    cargarCiudades();
    cargarHistorial();
    actualizarUI();
});

// Usuario
function obtenerUsuario() {
    let id = sessionStorage.getItem('userId');
    if (!id) {
        id = 'user_' + Date.now();
        sessionStorage.setItem('userId', id);
    }
    return id;
}

// Ciudades
function cargarCiudades() {
    ciudades.forEach(c => {
        const option = document.createElement('option');
        option.value = c.nombre;
        option.textContent = c.nombre;
        citySelect.appendChild(option);
    });
}

// Selección
citySelect.addEventListener('change', () => {
    if (!citySelect.value) return;

    const ciudad = ciudades.find(c => c.nombre === citySelect.value);
    registrarLocalizacion(ciudad);
});

// Registro
function registrarLocalizacion(ciudad) {
    const item = {
        nombre: ciudad.nombre,
        coords: `${ciudad.lat}, ${ciudad.lon}`,
        fecha: new Date().toLocaleString(),
        userId: userId
    };

    historial.unshift(item);
    historial = historial.slice(0, 10);
    guardarHistorial();
    renderHistorial();
}

// Storage
function guardarHistorial() {
    const storage = usandoLocalStorage ? localStorage : sessionStorage;
    storage.setItem(`historial_${userId}`, JSON.stringify(historial));
}

function cargarHistorial() {
    const storage = usandoLocalStorage ? localStorage : sessionStorage;
    const data = storage.getItem(`historial_${userId}`);
    historial = data ? JSON.parse(data) : [];
}

// Render
function renderHistorial() {
    historialDiv.innerHTML = historial.length === 0
        ? '<p class="text-muted fst-italic">Sin registros</p>'
        : historial.map(h => `
            <div class="alert-message alert-info">
                <strong>${h.nombre}</strong><br>
                <small>${h.fecha}</small>
            </div>
        `).join('');
}

// Cambio storage
document.getElementById('btnCambiarStorage').addEventListener('click', () => {
    usandoLocalStorage = !usandoLocalStorage;
    cargarHistorial();
    renderHistorial();
    actualizarUI();
});

// UI
function actualizarUI() {
    storageType.textContent = usandoLocalStorage ? 'LocalStorage' : 'SessionStorage';
    userIdDisplay.textContent = userId;
}
