// Add functionality to Reloj1

let intervalo_reloj1
function startReloj1() {
    intervalo_reloj1 = setInterval(updateReloj, 1000, "#reloj1");
}
function stopReloj1() {
    clearInterval(intervalo_reloj1);
    // console.log("click boton stop1")
    updateReloj("#reloj1");
}

// Add functionality to Reloj2
let intervalo_reloj2;
function functionReloj2(estado) {
    if (estado == "start") {
        intervalo_reloj2 = setInterval(updateReloj, 1000, "#reloj2", true)
    }
    else if (estado == "stop") {
        clearInterval(intervalo_reloj2);
    }
}

// function updateReloj2() {
//     let fecha = new Date();
//     document.querySelector("#reloj2").innerHTML = `${fecha.getHours()}H:${fecha.getMinutes()}M:${fecha.getSeconds()}S`;
// }

// Añadir funcionalidad 3er boton

const botonInicio3 = document.querySelector("#inicioReloj3");
const botonDeterner3 = document.querySelector("#stopReloj3");
let interval_counter;

// botonInicio3.onclick = () => console.log("has hecho click"); //al hacer click cualquier otro evento no funciona

botonInicio3.addEventListener("click", () => {
                                        interval_counter = setInterval(updateReloj, 1000, "#reloj3")
                                    });
botonDeterner3.addEventListener("click", () => {clearInterval});

let intervalo_reloj3;



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