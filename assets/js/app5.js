document.addEventListener('DOMContentLoaded', function() {
    const btnIniciar = document.getElementById('btnIniciar');
    const resultArea = document.getElementById('resultArea');
    
    // Función para validar una nota
    function validarNota(valor) {
        if (valor === null || valor === '') {
            return false;
        }
        const nota = parseFloat(valor);
        return !isNaN(nota) && nota >= 1.0 && nota <= 7.0;
    }

    function solicitarNotas() {   
        // Mostrar instrucciones al usuario
        window.alert("A continuación deberá ingresar 3 notas por alumno para calcular el promedio final del curso. Las ponderaciones para la Nota 1, Nota 2 y Nota 3 son respectivamente 25%, 35% y 40%.");
        
        // Solicitar cantidad de alumnos
        let cantidadInput = prompt("Ingrese cantidad de alumnos:");
        
        // Validar que no se haya cancelado
        if (cantidadInput === null) {
            return;
        }
        
        let cantidad = parseInt(cantidadInput);
        
        // Validar que sea un número válido y mayor a 0
        if (isNaN(cantidad) || cantidad <= 0) {
            window.alert("Debe ingresar un número válido mayor a 0");
            return;
        }
        
        // Variable para acumular la suma de promedios
        let sumaPromedios = 0;
        let alumnosProcesados = [];
        
        // Ciclo de alumnos
        for (let i = 0; i < cantidad; i++) {
            let numeroAlumno = i + 1;
            
            // Solicitar las 3 notas para cada alumno
            let nota1Input = prompt("Para Alumno " + numeroAlumno + ", Ingrese Nota 1:");
            if (nota1Input === null) {
                window.alert("Proceso cancelado");
                return;
            }
            
            let nota2Input = prompt("Para Alumno " + numeroAlumno + ", Ingrese Nota 2:");
            if (nota2Input === null) {
                window.alert("Proceso cancelado");
                return;
            }
            
            let nota3Input = prompt("Para Alumno " + numeroAlumno + ", Ingrese Nota 3:");
            if (nota3Input === null) {
                window.alert("Proceso cancelado");
                return;
            }
            console.log('alumno '+ numeroAlumno + ' procesado');             
            let nota1 = parseFloat(nota1Input);
            let nota2 = parseFloat(nota2Input);
            let nota3 = parseFloat(nota3Input);
            
            // Validar las notas
            if (!validarNota(nota1Input) || !validarNota(nota2Input) || !validarNota(nota3Input)) {
                window.alert("Las notas deben estar entre 1.0 y 7.0. Alumno " + numeroAlumno + " no procesado.");
                continue;
            }
            
            // Calcular promedio ponderado del alumno
            let promedioAlumno = (nota1 * 0.25) + (nota2 * 0.35) + (nota3 * 0.40);
            console.log('promedio alumno '+ promedioAlumno );  
            // Acumular el promedio en la suma total
            sumaPromedios += promedioAlumno;
            
            // Guardar información del alumno
            alumnosProcesados.push({
                numero: numeroAlumno,
                nota1: nota1,
                nota2: nota2,
                nota3: nota3,
                promedio: promedioAlumno
            });
        }
        
        // Calcular el promedio del curso
        let promedioCurso = sumaPromedios / cantidad;
        console.log('promedio curso '+ promedioCurso );  
        // Mostrar el área de resultados
        resultArea.style.display = 'block';
        
        // Mostrar el resultado final
        document.getElementById('promedioFinal').textContent = promedioCurso.toFixed(2);
        
        const mensajeFinal = document.getElementById('mensajeFinal');
        mensajeFinal.innerHTML = `<p><strong>Total de alumnos procesados:</strong> ${cantidad}</p>`;
        
        // También mostrar en alert
        window.alert("El promedio del curso es: " + promedioCurso.toFixed(2));
    }
    
    // Event listener para el botón iniciar
    btnIniciar.addEventListener('click', solicitarNotas);
    
    // Inicializar
    console.log('Sistema de calificaciones iniciado');
});
