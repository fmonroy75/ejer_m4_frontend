document.getElementById('calculateBtn').addEventListener('click', function() {
    // Mostrar alerta para solicitar el diámetro
    Swal.fire({
        title: 'Ingresa el diámetro del círculo',
        input: 'number',
        inputLabel: 'Diámetro (en cm)',
        inputPlaceholder: 'Ejemplo: 10',
        showCancelButton: true,
        confirmButtonText: 'Calcular',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
            if (!value || parseFloat(value) <= 0) {
                return 'Por favor ingresa un número mayor a 0';
            }
            if (isNaN(value)) {
                return 'Por favor ingresa un número válido';
            }
        },
        backdrop: true,
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) {
            // Obtener el diámetro ingresado
            const diameter = parseFloat(result.value);
            
            // Calcular el radio (diámetro / 2)
            const radius = diameter / 2;
            
            // Calcular el área usando Math.PI y Math.pow()
            const area = Math.PI * Math.pow(radius, 2);
            
            // Mostrar resultados en la página HTML
            document.getElementById('diameterResult').textContent = diameter.toFixed(2);
            document.getElementById('radiusResult').textContent = radius.toFixed(2);
            document.getElementById('areaResult').textContent = area.toFixed(4);
            
            // Mostrar el contenedor de resultados con animación
            const resultContainer = document.getElementById('resultContainer');
            resultContainer.style.display = 'block';
            

            
            // Mostrar resultado en consola
            console.log('=== CÁLCULO DEL ÁREA DEL CÍRCULO ===');
            console.log(`Diámetro ingresado: ${diameter}`);
            console.log(`Radio calculado (d/2): ${radius}`);
            console.log(`Área calculada (π × r²): ${area}`);
            console.log(`π usado: ${Math.PI}`);
            console.log(`r² calculado con Math.pow(${radius}, 2): ${Math.pow(radius, 2)}`);
            console.log('====================================');
        }
    });
});
