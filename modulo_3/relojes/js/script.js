//Función para actualizar los relojes con independencia del método usado.

function updateReloj(selectorId, useSeparator = false) {
    let fecha = new Date();
    if (useSeparator) {
        document.querySelector(selectorId).innerHTML = `${fecha.getHours()}H:${fecha.getMinutes()}M:${fecha.getSeconds()}S`
    }
    else {
        // console.log("estoy en el update reloj falso");
        document.querySelector(selectorId).innerHTML = fecha.toLocaleTimeString();
    }
}

// Add functionality to Reloj1

let intervalo_reloj1
function startReloj1() {
    intervalo_reloj1 = setInterval(updateReloj, 1000, "#reloj1");
}
function stopReloj1() {
    clearInterval(intervalo_reloj1);
    updateReloj("#reloj1");
}

// Add functionality to Reloj2
let intervalo_reloj2;
function functionReloj2(estado) {
    if (estado == "start") {
        intervalo_reloj2 = setInterval(updateReloj, 1000, "#reloj2", "true")
    }
    else if (estado == "stop") {
        clearInterval(intervalo_reloj2);
    }
}

// Añadir funcionalidad 3er boton

const botonInicio3 = document.querySelector("#inicioReloj3");
const botonDeterner3 = document.querySelector("#stopReloj3");
const botonProgramar = document.querySelector("#programarReloj3");

let interval_counter;
let alarm_interval;
console.log(alarm_interval);
botonInicio3.addEventListener("click", () => {
                                        interval_counter = setInterval(updateReloj, 1000, "#reloj3",'w')
                                    });
botonDeterner3.addEventListener("click", () => {clearInterval(interval_counter),
                                                updateReloj("#reloj3")});

botonProgramar.addEventListener("click",
                                () => { if (alarm_interval !== undefined){
                                            clearInterval(alarm_interval);
                                        }
                                        document.getElementById("alarm").innerHTML = "";
                                        alarm_interval = setInterval(esLaHora, 1000)});

function esLaHora() {
    let fecha = new Date();
    console.log('alarm running');
    if (fecha.getHours() == document.querySelector("#hora").value &&
        fecha.getMinutes() == document.getElementById("minutos").value &&
        fecha.getSeconds() == document.getElementById("segundos").value){
        document.getElementById("alarm").innerHTML = "Es la hora!!"
        clearInterval(alarm_interval);
    }
}

/* Apuntes

// botonInicio3.onclick = () => console.log("has hecho click"); //al hacer click cualquier otro evento no funciona

*/