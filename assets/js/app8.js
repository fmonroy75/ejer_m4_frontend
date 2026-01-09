function resolver() {
    const a = parseFloat(document.getElementById("a").value);
    const b = parseFloat(document.getElementById("b").value);
    const c = parseFloat(document.getElementById("c").value);

    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        resultado.innerHTML = `
            <div class="alert-message alert-warning">
                <i class="bi bi-exclamation-triangle"></i>
                Ingresa valores numéricos válidos.
            </div>`;
        return;
    }

    const d = discriminante(a, b, c);

    if (d > 0) {
        const x1 = (-b + Math.sqrt(d)) / (2 * a);
        const x2 = (-b - Math.sqrt(d)) / (2 * a);

        resultado.innerHTML = `
            <div class="alert-message alert-success">
                <h5>Dos soluciones reales</h5>
                <p>x₁ = ${x1.toFixed(2)}</p>
                <p>x₂ = ${x2.toFixed(2)}</p>
            </div>`;
    }
    else if (d === 0) {
        const x = -b / (2 * a);

        resultado.innerHTML = `
            <div class="alert-message alert-info">
                <h5>Una solución real</h5>
                <p>x = ${x.toFixed(2)}</p>
            </div>`;
    }
    else {
        resultado.innerHTML = `
            <div class="alert-message alert-danger">
                <h5>No existen soluciones reales</h5>
                <p>El discriminante es negativo</p>
            </div>`;
    }
}

/* FUNCIÓN FULLY HOISTED */
function discriminante(a, b, c) {
    return Math.pow(b, 2) - 4 * a * c;
}
