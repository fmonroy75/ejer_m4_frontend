document.addEventListener('DOMContentLoaded', function() {
    const btnIniciar = document.getElementById('btnIniciar');
    const resultArea = document.getElementById('resultArea');
    const stepInfo = document.getElementById('stepInfo');
    const bubbleAnimation = document.getElementById('bubbleAnimation');
    const sortingSteps = document.getElementById('sortingSteps');
    const mensajeFinal = document.getElementById('mensajeFinal');
    
    btnIniciar.addEventListener('click', iniciarEjercicio);
    
    function iniciarEjercicio() {
        // Mostrar área de resultados
        resultArea.style.display = 'block';
        
        // Resetear contenido
        bubbleAnimation.innerHTML = '';
        sortingSteps.innerHTML = '';

        mensajeFinal.innerHTML = '<p>Procesando...</p>';
        
        // Solicitar los tres números
        let numeros = [];
        
        // Función para solicitar números con SweetAlert2
        function solicitarNumero(contador) {
            return Swal.fire({
                title: `Número ${contador}`,
                text: `Ingresa el número ${contador} de 3:`,
                input: 'number',
                inputAttributes: {
                    step: 'any'
                },
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
                preConfirm: (valor) => {
                    if (valor === '' || valor === null) {
                        Swal.showValidationMessage('Por favor ingresa un número');
                        return false;
                    }
                    return parseFloat(valor);
                }
            });
        }
        
        // Solicitar los tres números secuencialmente
        async function solicitarNumeros() {
            stepInfo.textContent = 'Paso 1: Ingresando números...';
            
            for (let i = 0; i < 3; i++) {
                const contador = i + 1;
                
                const resultado = await solicitarNumero(contador);
                
                if (resultado.value !== false) {
                    numeros.push(resultado.value);
                    
                    // Mostrar paso actual
                    sortingSteps.innerHTML += `<div class="mb-1">✓ Número ${contador} ingresado: ${resultado.value}</div>`;
                } else {
                    // Si el usuario cancela, salir
                    return;
                }
            }
            
            // Proceder con el ordenamiento
            realizarOrdenamiento(numeros);
        }
        
        solicitarNumeros();
    }
    
    async function realizarOrdenamiento(arr) {
        stepInfo.textContent = 'Paso 2: Aplicando Ordenamiento Burbuja...';
        
        // Hacer una copia del array para no modificar el original
        let lista = [...arr];
        let pasos = [];
        let n;
        
        // Mostrar array inicial
        sortingSteps.innerHTML += `<div class="mb-2"><strong>Array inicial:</strong> [${lista.join(', ')}]</div>`;
        
        // Algoritmo de Ordenamiento Burbuja
        do {
            n = 0;
            
            // Mostrar iteración
            pasos.push(`Iniciando nueva pasada por el array...`);

            for (let i = 1; i < lista.length; i++) {
                // Actualizar visualización para mostrar comparación
                stepInfo.textContent = `Comparando ${lista[i-1]} y ${lista[i]}...`;
                               
                if (lista[i-1] > lista[i]) {
                    // Mostrar que se va a intercambiar
                    stepInfo.textContent = `Intercambiando ${lista[i-1]} y ${lista[i]}...`;
                                       
                    // Intercambiar elementos
                    let temp = lista[i-1];
                    lista[i-1] = lista[i];
                    lista[i] = temp;
                    n = 1;
                    
                    // Mostrar resultado del intercambio
                    pasos.push(`Intercambiado: ${lista[i-1]} ↔ ${lista[i]} → [${lista.join(', ')}]`);
                } else {
                    pasos.push(`Comparación: ${lista[i-1]} ≤ ${lista[i]} → No se intercambia`);
                }
            }
            
            // Mostrar estado actual del array
            pasos.push(`<strong>Array después de pasada:</strong> [${lista.join(', ')}]`);
            pasos.push('---');
            
        } while (n != 0);
        
        // Mostrar array final ordenado
        sortingSteps.innerHTML += `<div class="mt-2 mb-2"><strong>Array ordenado:</strong> [${lista.join(', ')}]</div>`;
        
        // Determinar resultados
        stepInfo.textContent = 'Ordenamiento Finalizado...';
        if (lista[0] == lista[lista.length - 1]) {
           mensajeFinal.innerHTML = '<p>Los 3 números son iguales</p>';
        } else {
            mensajeFinal.innerHTML = '<p>El <strong>menor</strong> de los números que ingresaste es ' + lista[0] + '<br>El <strong>mayor</strong> de los números que ingresaste es ' + lista[lista.length - 1] + '</p>';
        
        }
        
    }
   
});