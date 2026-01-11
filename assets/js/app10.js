'use strict';

// M4L5 Ejercicio Práctico 2 - Sistema de Registro de Pacientes
// Mejoras aplicadas:
// ✅ Interfaz gráfica (sin prompts/alerts)
// ✅ Objetos para cada paciente
// ✅ Validaciones de entrada
// ✅ Lista visual de pacientes
// ✅ Estadísticas múltiples (peso promedio, edad promedio)
// ✅ Diseño responsive
// ✅ Estado de formulario paso a paso

// Arreglo global que almacena todos los pacientes (Módulo 4: Arreglos)
let pacientes = [];
let pacienteActual = 0;
let totalPacientes = 0;

// 1) Función para validar datos del paciente
function validarPaciente() {
  const nombre = document.getElementById('nombrePaciente').value.trim();
  const edad = parseInt(document.getElementById('edadPaciente').value);
  const peso = parseFloat(document.getElementById('pesoPaciente').value);
  const altura= parseInt(document.getElementById('alturaPaciente').value)
  const sexo = document.getElementById('sexoPaciente').value;

  // Validaciones
  if (!nombre) return { ok: false, msg: 'Nombre requerido' };
  if (isNaN(edad) || edad < 0 || edad > 120) return { ok: false, msg: 'Edad 0-120' };
  if (isNaN(altura) || altura < 15 || altura > 250) return { ok: false, msg: 'Altura 15-250' };
  if (isNaN(peso) || peso < 0 || peso > 300) return { ok: false, msg: 'Peso 0-300kg' };
  if (!sexo) return { ok: false, msg: 'Seleccionar sexo' };

  return { ok: true, paciente: { nombre, edad, peso, sexo } };
}

// 2) Función para crear objeto paciente (Módulo 4: Objetos/Diccionarios)
function crearPaciente(nombre, edad, peso, altura, sexo) {
  return {
    id: Date.now() + Math.random(),
    nombre: nombre.trim(),
    edad: parseInt(edad),
    peso: parseFloat(peso),
    altura: parseInt(altura),
    sexo: sexo,
    fechaRegistro: new Date().toLocaleString('es-CL')
  };
}

// 3) Función principal: procesar siguiente paciente
function siguientePaciente() {
  const validacion = validarPaciente();
  
  if (!validacion.ok) {
    mostrarMensaje(validacion.msg, 'error');
    return;
  }

  // Agregar paciente al arreglo global
  pacientes.push(crearPaciente(
    document.getElementById('nombrePaciente').value,
    document.getElementById('edadPaciente').value,
    document.getElementById('pesoPaciente').value,
    document.getElementById('alturaPaciente').value,
    document.getElementById('sexoPaciente').value
  ));

  pacienteActual++;

  // Si hay más pacientes
  if (pacienteActual < totalPacientes) {
    actualizarFormularioPaciente();
  } else {
    // Completado - calcular estadísticas
    finalizarRegistro();
  }
}

// 4) Actualizar formulario para siguiente paciente
function actualizarFormularioPaciente() {
  document.getElementById('pacienteNum').textContent = `Paciente ${pacienteActual + 1}`;
  
  // Limpiar campos
  document.getElementById('nombrePaciente').value = '';
  document.getElementById('edadPaciente').value = '';
  document.getElementById('pesoPaciente').value = '';
  document.getElementById('alturaPaciente').value = '';
  document.getElementById('sexoPaciente').value = '';

  mostrarMensaje(`✅ Paciente ${pacienteActual} registrado. Siguiente →`, 'success');
}

// 5) Finalizar y calcular estadísticas
function finalizarRegistro() {
  document.getElementById('formPaciente').style.display = 'none';
  document.getElementById('btnSiguiente').style.display = 'none';

  // Calcular promedios (Módulo 4: Operaciones sobre arreglos)
  const totalPeso = pacientes.reduce((sum, p) => sum + p.peso, 0);
  const totalAltura = pacientes.reduce((sum, p) => sum + p.altura, 0);
  const totalEdad = pacientes.reduce((sum, p) => sum + p.edad, 0);
  console.log(totalAltura);
  const promedioPeso = (totalPeso / pacientes.length).toFixed(1);
  const promedioAltura = (totalAltura / pacientes.length).toFixed(1);
  const promedioEdad = Math.round(totalEdad / pacientes.length);
  console.log(promedioAltura);
  // Contar hombres y mujeres
    const totalHombres = pacientes.filter(p => p.sexo === 'H').length;
    const totalMujeres = pacientes.filter(p => p.sexo === 'M').length;


  // Actualizar estadísticas
  document.getElementById('totalPacientes').textContent = pacientes.length;
  document.getElementById('promedioPeso').textContent = promedioPeso;
  document.getElementById('promedioAltura').textContent = promedioAltura;
  document.getElementById('edadPromedio').textContent = promedioEdad;
// Actualizar en pantalla
document.getElementById('totalHombres').textContent = totalHombres;
document.getElementById('totalMujeres').textContent = totalMujeres;
  // Mostrar lista de pacientes
  mostrarListaPacientes();

  // Console log con formato %d %f (como pide la lámina)
  console.log(
    "El promedio de peso de los %d pacientes es de %f kg y edad promedio %d años",
    pacientes.length,
    parseFloat(promedioPeso),
    promedioEdad
  );

  mostrarMensaje('🎉 ¡Registro completado! Revisa las estadísticas.', 'success');
}

// 6) Renderizar lista de pacientes en tabla
function mostrarListaPacientes() {
  const contenedor = document.getElementById('listaPacientes');
  
  contenedor.innerHTML = pacientes.map((p, i) => `
    <div class="paciente-item">
      <span class="paciente-id">#${i + 1}</span>
      <span class="paciente-nombre">${p.nombre}</span>
      <span class="paciente-edad">${p.edad} años</span>
      <span class="paciente-peso">${p.peso.toFixed(1)} kg</span>
      <span class="paciente-altura">${p.altura} cm</span>
      <span class="paciente-sexo">${p.sexo}</span>
    </div>
  `).join('');
}

// 7) Utilidades UI
function mostrarMensaje(texto, tipo = 'info') {
  const btnSiguiente = document.getElementById('btnSiguiente');
  
  // Cambiar texto del botón temporalmente
  const textoOriginal = btnSiguiente.textContent;
  btnSiguiente.textContent = texto;
  btnSiguiente.className = `btn btn-${tipo}`;
  
  setTimeout(() => {
    btnSiguiente.textContent = textoOriginal;
    btnSiguiente.className = 'btn btn-primary';
  }, 2000);
}

// 8) Eventos del formulario
document.addEventListener('DOMContentLoaded', () => {
  // Botón iniciar registro
  document.getElementById('btnIniciar').addEventListener('click', () => {
    totalPacientes = parseInt(document.getElementById('cantidadPacientes').value);
    
    if (totalPacientes < 1 || totalPacientes > 50) {
      alert('❌ Ingresa entre 1 y 50 pacientes');
      return;
    }

    pacientes = [];  // Reiniciar lista
    pacienteActual = 0;
    
    document.getElementById('formPaciente').style.display = 'block';
    document.getElementById('btnIniciar').style.display = 'none';
    document.getElementById('btnSiguiente').style.display = 'block';
    
    actualizarFormularioPaciente();
  });

  // Botón siguiente paciente
  document.getElementById('btnSiguiente').addEventListener('click', siguientePaciente);

  // Botón limpiar
  document.getElementById('btnLimpiar').addEventListener('click', () => {
    if (confirm('🧹 ¿Limpiar todos los datos?')) {
      pacientes = [];
      pacienteActual = 0;
      document.getElementById('cantidadPacientes').value = '3';
      document.getElementById('formPaciente').style.display = 'none';
      document.getElementById('btnIniciar').style.display = 'block';
      document.getElementById('btnSiguiente').style.display = 'none';
      
      // Limpiar resultados
      document.getElementById('totalPacientes').textContent = '0';
      document.getElementById('promedioPeso').textContent = '0.0';
      document.getElementById('edadPromedio').textContent = '0';
      document.getElementById('promedioAltura').textContent = '0';
      document.getElementById('listaPacientes').innerHTML = '';
    }
  });
});