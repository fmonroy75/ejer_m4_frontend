 // variables
 let secretNumber;
 let attempts = 0;
 let maxAttempts = 3;
 let usedNumbers = [];
 let gameOver = false;
 let gameStarted = false;

 // DOM 
 const userGuessInput = document.getElementById('userGuess');
 const submitGuessBtn = document.getElementById('submitGuess');
 const startGameBtn = document.getElementById('startGame');
 const resetGameBtn = document.getElementById('resetGame');
 const secretNumberDisplay = document.getElementById('secretNumberDisplay');
 const remainingAttemptsSpan = document.getElementById('remainingAttempts');
 const usedNumbersDisplay = document.getElementById('usedNumbersDisplay');
 const gameMessages = document.getElementById('gameMessages');
 const gameResults = document.getElementById('gameResults');
 const finalResult = document.getElementById('finalResult');
 

 // generar random
 function generarNumeroAleatorio() {
     return Math.floor(Math.random() * 10) + 1;
 }

 // revisa lista usados
 function revisarLista(lista, numero) {
     for (let i = 0; i < lista.length; i++) {
         if (lista[i] === numero) {
             showMessage("Ya has elegido este número. Por favor, elige otro.", "warning");
             return false;
         }
     }
     
     return true;
 }

 // Function iniciar juego
 function startGame() {
     secretNumber = generarNumeroAleatorio();
     attempts = 0;
     usedNumbers = [];
     gameOver = false;
     gameStarted = true;
     
     // limpiar
     secretNumberDisplay.textContent = "?";
     secretNumberDisplay.style.background = "linear-gradient(135deg, var(--primary-color), var(--secondary-color))";
    
     updateUsedNumbersDisplay();
     gameMessages.innerHTML = "";
     gameResults.style.display = "none";
     userGuessInput.value = "";
     userGuessInput.disabled = false;
     submitGuessBtn.disabled = false;
     
     showMessage("¡Juego iniciado! Adivina el número del 1 al 10. Tienes 3 intentos.", "info");
     
     // actualiza boton inicio
     startGameBtn.innerHTML = '<i class="bi bi-arrow-clockwise"></i> Reiniciar Juego';
     startGameBtn.classList.remove('btn-outline-primary');
     startGameBtn.classList.add('btn-outline-warning');
 }

 // funcion del proceso
 function processGuess() {
     if (!gameStarted) {
         showMessage("Primero debes iniciar el juego.", "warning");
         return;
     }
     
     if (gameOver) {
         showMessage("El juego ha terminado. Reinicia para jugar de nuevo.", "warning");
         return;
     }
     
     const userGuess = parseInt(userGuessInput.value);
     
     // valida
     if (isNaN(userGuess)) {
         showMessage("Por favor, ingresa un número válido.", "warning");
         return;
     }
     
     if (userGuess < 1 || userGuess > 10) {
         showMessage("El número debe estar entre 1 y 10.", "warning");
         return;
     }
     
     // revisa si ya fue usado
     if (!revisarLista(usedNumbers, userGuess)) {
         return;
     }
     
     // numeros usados
     usedNumbers.push(userGuess);
     
     // intentos
     attempts++;
     
     // checkea respuesta
     if (userGuess === secretNumber) {
         // gana
         gameOver = true;
         secretNumberDisplay.textContent = secretNumber;
         //secretNumberDisplay.style.background = "linear-gradient(135deg, var(--success-color), #10b981)";
         showMessage(`¡Felicidades! Has adivinado el número ${secretNumber} en ${attempts} intento(s).`, "success");
         displayFinalResult(true);
     } else {
         // perdio
         showMessage(`No es ${userGuess}. Intenta de nuevo.`, "info");
         
         // intentos
         if (attempts >= maxAttempts) {
             gameOver = true;
             secretNumberDisplay.textContent = secretNumber;
             //secretNumberDisplay.style.background = "linear-gradient(135deg, var(--danger-color), #dc2626)";
             displayFinalResult(false);
         }
     }
     
     // actualiza mensajes
     updateUsedNumbersDisplay();
     userGuessInput.value = "";
     userGuessInput.focus();
 }



 // actualiza numeros usados
 function updateUsedNumbersDisplay() {
     usedNumbersDisplay.innerHTML = "";
     
     if (usedNumbers.length === 0) {
         const emptyMsg = document.createElement("p");
         emptyMsg.className = "text-muted fst-italic";
         emptyMsg.textContent = "Aún no has usado ningún número";
         usedNumbersDisplay.appendChild(emptyMsg);
         return;
     }
     
     usedNumbers.forEach(num => {
         const numBubble = document.createElement("div");
         numBubble.className = "attempt-bubble used-number";
         numBubble.textContent = num;
         usedNumbersDisplay.appendChild(numBubble);
     });
 }

 // muestra mensajes
 function showMessage(message, type) {
     const messageDiv = document.createElement("div");
     messageDiv.className = `alert-message alert-${type}`;
     const iconClass = type === 'success' ? 'bi-check-circle' : type === 'warning' ? 'bi-exclamation-triangle' : type === 'danger' ? 'bi-x-circle' : 'bi-info-circle';
     messageDiv.innerHTML = `<i class="bi ${iconClass} me-2"></i> ${message}`;
     
     gameMessages.prepend(messageDiv);
     

 }

 // resultado final
 function displayFinalResult(winner) {
     gameResults.style.display = "block";

     
     if (winner) {
         finalResult.innerHTML = `
             <div class="alert alert-success">
                 <h4><i class="bi bi-trophy"></i> ¡Ganaste!</h4>
                 <p>Adivinaste el número ${secretNumber} en ${attempts} intento(s).</p>
             </div>
         `;
     } else {
         finalResult.innerHTML = `
             <div class="alert alert-danger">
                 <h4><i class="bi bi-x-circle"></i> ¡Perdiste!</h4>
                 <p>No lograste adivinar el número. </p>
             </div>
         `;
     }
     
     // deshabilita botones
     userGuessInput.disabled = true;
     submitGuessBtn.disabled = true;
 }

 //  listeners
 startGameBtn.addEventListener('click', startGame);
 
 resetGameBtn.addEventListener('click', function() {
     startGame();
     showMessage("Juego reiniciado. ¡Buena suerte!", "info");
 });
 
 submitGuessBtn.addEventListener('click', processGuess);
 
 userGuessInput.addEventListener('keypress', function(e) {
     if (e.key === 'Enter') {
         processGuess();
     }
 });