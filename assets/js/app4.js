
        document.addEventListener('DOMContentLoaded', function() {
            const btnIniciar = document.getElementById('btnIniciar');
            const resultArea = document.getElementById('resultArea');
            
            // Variables para las notas (sin arreglo)
            let nota1, nota2, nota3;
            
            // Función para validar una nota
            function validarNota(valor) {
                const nota = parseFloat(valor);
                return !isNaN(nota) && nota >= 1.0 && nota <= 7.0;
            }
            
            // Función para obtener mensaje según promedio
            function obtenerMensaje(promedio) {
                if (promedio >= 6.0) {
                    return {
                        texto: `¡Excelente! Tienes promedio ${promedio.toFixed(2)}.`,
                        clase: 'message-excellent',
                        icono: 'bi-emoji-smile-fill'
                    };
                } else if (promedio >= 5.0) {
                    return {
                        texto: `Tienes promedio ${promedio.toFixed(2)}. ¡Sigue adelante, puedes mejorar!`,
                        clase: 'message-good',
                        icono: 'bi-emoji-neutral-fill'
                    };
                } else if (promedio >= 4.0) {
                    return {
                        texto: `Tienes promedio ${promedio.toFixed(2)}. Debes esforzarte más.`,
                        clase: 'message-regular',
                        icono: 'bi-emoji-frown-fill'
                    };
                } else {
                    return {
                        texto: `Has reprobado con promedio ${promedio.toFixed(2)}. Continúa intentándolo.`,
                        clase: 'message-failed',
                        icono: 'bi-emoji-dizzy-fill'
                    };
                }
            }
            
            // Función para mostrar resultados 
            function mostrarResultados() {
                // Calcular promedio
                const suma = parseFloat(nota1) + parseFloat(nota2) + parseFloat(nota3);
                const promedio = suma / 3;
                
                // Obtener mensaje
                const mensaje = obtenerMensaje(promedio);
                
                // Mostrar notas en la página
                document.getElementById('nota1').textContent = parseFloat(nota1).toFixed(1);
                document.getElementById('nota2').textContent = parseFloat(nota2).toFixed(1);
                document.getElementById('nota3').textContent = parseFloat(nota3).toFixed(1);
                document.getElementById('promedioFinal').textContent = promedio.toFixed(2);
                
                // Mostrar mensaje
                const mensajeFinal = document.getElementById('mensajeFinal');
                mensajeFinal.innerHTML = `<i class="bi ${mensaje.icono} me-2"></i> ${mensaje.texto}`;
                mensajeFinal.className = `message-display ${mensaje.clase}`;
                
                // Mostrar área de resultados
                resultArea.style.display = 'block';
                
                // Mostrar en consola
                console.log('=== RESULTADOS DEL SISTEMA DE CALIFICACIONES ===');
                console.log(`Nota 1: ${nota1}`);
                console.log(`Nota 2: ${nota2}`);
                console.log(`Nota 3: ${nota3}`);
                console.log(`Suma total: ${suma}`);
                console.log(`Promedio: ${promedio.toFixed(2)}`);
                console.log(`Mensaje: ${mensaje.texto}`);
                console.log('================================================');
            }
            
            // Función para solicitar datos
            function solicitarNotas() {
                //  nota 1
                Swal.fire({
                    title: 'Ingrese la primera nota',
                    input: 'number',
                    inputLabel: 'Nota 1 (entre 1.0 y 7.0)',
                    inputPlaceholder: 'Ej: 5.5',
                    showCancelButton: true,
                    confirmButtonText: 'Siguiente',
                    cancelButtonText: 'Cancelar',
                    inputValidator: (value) => {
                        if (!value) {
                            return 'Por favor ingresa una nota';
                        }
                        if (!validarNota(value)) {
                            return 'La nota debe ser un número entre 1.0 y 7.0';
                        }
                    }
                }).then((result1) => {
                    if (result1.isConfirmed) {
                        nota1 = result1.value;
                        
                        //  nota 2
                        Swal.fire({
                            title: 'Ingrese la segunda nota',
                            input: 'number',
                            inputLabel: 'Nota 2 (entre 1.0 y 7.0)',
                            inputPlaceholder: 'Ej: 6.0',
                            showCancelButton: true,
                            confirmButtonText: 'Siguiente',
                            cancelButtonText: 'Cancelar',
                            inputValidator: (value) => {
                                if (!value) {
                                    return 'Por favor ingresa una nota';
                                }
                                if (!validarNota(value)) {
                                    return 'La nota debe ser un número entre 1.0 y 7.0';
                                }
                            }
                        }).then((result2) => {
                            if (result2.isConfirmed) {
                                nota2 = result2.value;
                                
                                // nota 3
                                Swal.fire({
                                    title: 'Ingrese la tercera nota',
                                    input: 'number',
                                    inputLabel: 'Nota 3 (entre 1.0 y 7.0)',
                                    inputPlaceholder: 'Ej: 4.5',
                                    showCancelButton: true,
                                    confirmButtonText: 'Calcular',
                                    cancelButtonText: 'Cancelar',
                                    inputValidator: (value) => {
                                        if (!value) {
                                            return 'Por favor ingresa una nota';
                                        }
                                        if (!validarNota(value)) {
                                            return 'La nota debe ser un número entre 1.0 y 7.0';
                                        }
                                    }
                                }).then((result3) => {
                                    if (result3.isConfirmed) {
                                        nota3 = result3.value;
                                        
                                        // Mostrar resultados
                                        mostrarResultados();
                                        
                                        // Mostrar alerta final
                                        const suma = parseFloat(nota1) + parseFloat(nota2) + parseFloat(nota3);
                                        const promedio = suma / 3;
                                        const mensaje = obtenerMensaje(promedio);
                                        
                                        Swal.fire({
                                            title: 'Cálculo completado',
                                            html: `
                                                <div class="text-left">
                                                    <p><strong>Nota 1:</strong> ${parseFloat(nota1).toFixed(1)}</p>
                                                    <p><strong>Nota 2:</strong> ${parseFloat(nota2).toFixed(1)}</p>
                                                    <p><strong>Nota 3:</strong> ${parseFloat(nota3).toFixed(1)}</p>
                                                    <hr>
                                                    <p><strong>Promedio:</strong> ${promedio.toFixed(2)}</p>
                                                    <p class="mt-3"><strong>Resultado:</strong> ${mensaje.texto}</p>
                                                </div>
                                            `,
                                            icon: 'success',
                                            confirmButtonText: 'Entendido'
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
            
            // Event listener para el botón iniciar
            btnIniciar.addEventListener('click', solicitarNotas);
            
            // Inicializar
            console.log('iniciado');
        });
