const numJugadores = 2;
const numMonedas = 3;
const maxMonedas = numJugadores * numMonedas;
var playerName = "";

function primeraPartida() {
    playerName = prompt("Por favor, escriba su nombre");
    document.getElementById("instrucciones").style.display = "none";
    document.getElementById("tablero").style.display = "block";
    inicioJuego();
}

function inicioJuego(){
    document.getElementById("elegir").innerHTML = `${playerName}, elija su opción:`;
    document.getElementById("ganador").innerHTML = "";
    document.getElementById("final").innerHTML = "";
    document.getElementsByClassName("imagenes")[0].style.display = "flex";
}

function jugar(monedasUsuario) {
    let jugadaUsuario = prompt(`Has elejido ${monedasUsuario} monedas. Has ahora tu jugada introduciendo un número.`);
    let monedasPc = calculAleatori(0, numMonedas);
    let jugadaPC = calculAleatori(monedasPc, monedasPc + numMonedas);
    let totalMonedasJugadas = monedasPc + monedasUsuario;


    while (jugadaPC == jugadaUsuario) {
        jugadaPC = calculAleatori(monedasPc, monedasPc + numMonedas);
    }

    document.getElementsByClassName("imagenes")[0].style.display = "none";

    let mensajeFinal = `
        <p> El total de monedas es ${totalMonedasJugadas}</p>
        <p> ${playerName} tenías ${monedasUsuario} monedas y jugaste a que había ${jugadaUsuario} monedas.</p>
        <p> La máquina tenía ${monedasPc} monedas y jugó a que había ${jugadaPC} monedas</p>
    `;

    document.getElementById("final").innerHTML = mensajeFinal;

    if (jugadaPC == totalMonedasJugadas) {
        document.getElementById("ganador").innerHTML = "<p>Ha ganado el Ordenador.</p>";
    }
    else if (jugadaUsuario == totalMonedasJugadas) {
        document.getElementById("ganador").innerHTML = "<p>¡" + playerName + " has ganado!</p>";
    }
    else {
        document.getElementById("ganador").innerHTML = "<p>No ha habido ganador</p>";
    }

    // document.getElementsByClassName("centrar")[0].innerHTML = '<button  onclick="inicioJuego()" class="button" id="partida">Iniciar el Juego</button>';

    document.getElementById("partida").innerHTML = "Nueva Partida";
    document.getElementById("partida").onclick = function () {inicioJuego()};
}

function validarInput(value) {

}

function calculAleatori(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}