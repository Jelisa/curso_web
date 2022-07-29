const numJugadores = 2;
const numMonedas = 3;
const maxMonedas = numJugadores * numMonedas;
var partidasJugadas = 0;
var playerName = "";

function inicioJuego(){
    /* Función para iniciar el juego */
    if (partidasJugadas == 0){
        playerName = prompt("Por favor, escriba su nombre"); // pedimos el nombre al usuario.
        document.getElementById("instrucciones").style.display = "none"; // esconde las instrucciones.
        document.getElementById("tablero").style.display = "block"; // muestra las imagenes para la selección.        
    }
    document.getElementById("elegir").innerHTML = `${playerName}, elija su opción:`;
    // Borrado de los posibles resultados anteriores y reseteo del tablero tras acabar una partida.
    document.getElementById("ganador").innerHTML = "";
    document.getElementById("final").innerHTML = "";
    document.getElementsByClassName("imagenes")[0].style.display = "flex"; // muestra el contenedor de las imágenes
}

function jugar(monedasUsuario) {
    /* Una función para implementar el juego de los xinos en sí.
    Entrada: monedasUsuario un int.
    */
   let monedasPc = calculAleatori(0, numMonedas); // genera la selección de la máquina de forma aleatoria.
   let totalMonedasJugadas = monedasPc + monedasUsuario;
   let jugadaPC = calculAleatori(monedasPc, monedasPc + numMonedas); // genera la apuesta de la máquina de forma aleatoria.
   let jugadaUsuario;
   console.log(1, partidasJugadas, partidasJugadas%2)
   if (partidasJugadas%2==0 || partidasJugadas == 0){
       jugadaUsuario = prompt(`Has elejido ${monedasUsuario} monedas. Has ahora tu jugada introduciendo un número.`);  // pedir la apuesta al usuario
       // si la apuesta del ordenador es como la del usuario genera una nueva apuesta para el Pc.
       while (jugadaPC == jugadaUsuario) {
           jugadaPC = calculAleatori(monedasPc, monedasPc + numMonedas);
       }
   }
   else{
        do {jugadaUsuario = prompt(`Has elejido ${monedasUsuario} monedas y la máquina ha apostado a que había ${jugadaPC}. Has ahora tu jugada introduciendo un número diferente al de la máquina.`)} while (jugadaUsuario == jugadaPC);
   }
    // esconde el contenedor de las imagenes para evitar seguir jugando sin reiniciar el juego.
    document.getElementsByClassName("imagenes")[0].style.display = "none"; 
    // genera el mensaje resumen de las jugadas.
    document.getElementById("elegir").innerHTML = `${playerName}, aquí tienes un resumen de la partida:`;
    let mensajeFinal = `
        <p> El total de monedas es ${totalMonedasJugadas}</p>
        <p> ${playerName} tenías ${monedasUsuario} monedas y jugaste a que había ${jugadaUsuario} monedas.</p>
        <p> La máquina tenía ${monedasPc} monedas y jugó a que había ${jugadaPC} monedas</p>
    `;

    document.getElementById("final").innerHTML = mensajeFinal;
    // comprueba quien ha ganado y muestralo por pantalla.
    if (jugadaPC == totalMonedasJugadas) {
        document.getElementById("ganador").innerHTML = "<p>Ha ganado el Ordenador.</p>";
    }
    else if (jugadaUsuario == totalMonedasJugadas) {
        document.getElementById("ganador").innerHTML = "<p>¡" + playerName + " has ganado!</p>";
    }
    else {
        document.getElementById("ganador").innerHTML = "<p>No ha habido ganador</p>";
    }
    // Actualiza el boton de inicio de partida a volver a jugar.
    document.getElementById("partida").innerHTML = "Nueva Partida";
    document.getElementById("partida").onclick = function () {inicioJuego()};
    partidasJugadas++;

}

function calculAleatori(min, max) {
    /* Función para generar un número aleatorio entre dos números
    Recibe: dos enteros usados como mínimo y máximo del rango de números a seleccionar
    Devuelve: un entero  generado aleatoriamente comprendido entre los valores de entrada.
    */
    return Math.floor(Math.random() * (max - min)) + min;
}