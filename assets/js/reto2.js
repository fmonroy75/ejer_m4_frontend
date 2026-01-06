function calcularArea() {
    // Obtener valores de los inputs
    let base = parseFloat(document.getElementById('base').value);
    let altura = parseFloat(document.getElementById('altura').value);
    let tipo = document.getElementById('tipo').value;
    
    // Validar entradas
    if (isNaN(base) || base <= 0) {
        alert("Por favor, ingresa una base válida (número mayor a 0)");
        return;
    }
    
    if (isNaN(altura) || altura <= 0) {
        alert("Por favor, ingresa una altura válida (número mayor a 0)");
        return;
    }
    
    if (!tipo) {
        alert("Por favor, selecciona un tipo de triángulo");
        return;
    }
    
    // Calcular área
    let area = (base * altura) / 2;
    
    // Convertir tipo a mayúsculas
    let tipoMayusculas = tipo.toUpperCase();
    
    // Mostrar resultado
    let resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `
        <h3>Resultado:</h3>
        <p>El área del triángulo <strong>${tipoMayusculas}</strong> de base <strong>${base}</strong> 
        y altura <strong>${altura}</strong>, es de <strong>${area}</strong></p>
    `;
    resultadoDiv.style.display = 'block';
    
    // Mostrar en consola
    console.log(`Cálculo completado: Triángulo ${tipoMayusculas} - Base: ${base}, Altura: ${altura}, Área: ${area}`);
}

// Permitir calcular con la tecla Enter en cualquier campo
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        calcularArea();
    }
});