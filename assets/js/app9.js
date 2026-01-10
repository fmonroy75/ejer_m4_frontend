const contarVocales = (texto) => {
    //const vocales = "aáeéiíoóuúAÁEÉIÍOÓUÚ";
    const vocales = "aeiouAEIOU";
    const vocales_acento = "áéíóúÁÉÍÓÚ";
    let cantidad = 0;
    let cantidad_A = 0;
    for (const letra of texto) {
        if (vocales.includes(letra)) {
            cantidad++;
        }
        if (vocales_acento.includes(letra)) {
            cantidad_A++;
        }
    }
    console.log(cantidad + "|" + cantidad_A);
    return cantidad + "|" + cantidad_A;
};




function procesarTexto() {
    const textarea = document.getElementById("texto");
    const resultado = document.getElementById("resultado");
    const detalle = document.getElementById("detalle");

    const texto = textarea.value.trim();

    if (!texto) {
        resultado.className = "alert-message alert-warning";
        resultado.textContent = "⚠️ Primero ingresa una o más palabras.";
        detalle.textContent = "";
        return;
    }

    const palabras = texto
        .split("\n")
        .map(p => p.trim())
        .filter(Boolean);

    const textoUnido = palabras.join("");
    const totalVocales = contarVocales(textoUnido);
    let arr_vocales=totalVocales.split("|");
console.log(totalVocales.split("|"));
    resultado.className = "alert-message alert-success";
    resultado.innerHTML = `
        🔎 Todas las palabras ingresadas tienen 
        <strong>${parseInt(arr_vocales[0])+parseInt(arr_vocales[1])}</strong> vocales en total.<br>
        Compuesto de:<br>
         <strong>${arr_vocales[0]}</strong> vocales sin acento <br>
         <strong>${arr_vocales[1]}</strong> vocales con acento.
    `;

    detalle.textContent =
        `Palabras ingresadas: [${palabras.join(", ")}] · 
         Total de caracteres: ${textoUnido.length}`;

    console.log(
        "Todas las palabras ingresadas en total tienen %d vocales",
        totalVocales
    );
}

function limpiarFormulario() {
    document.getElementById("texto").value = "";
    document.getElementById("resultado").className = "alert-message alert-info";
    document.getElementById("resultado").textContent =
        "Aún no se han procesado palabras.";
    document.getElementById("detalle").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btnContar")
        .addEventListener("click", procesarTexto);

    document.getElementById("btnLimpiar")
        .addEventListener("click", limpiarFormulario);

    document.getElementById("texto")
        .addEventListener("keydown", (e) => {
            if (e.key === "Enter" && e.ctrlKey) {
                procesarTexto();
            }
        });
});
